import { sendChatwootTemplate, type TemplateMessage } from "./chatwoot";

/**
 * One place that sends our automated WhatsApp messages.
 *
 * WHATSAPP_PROVIDER=botspace (default) keeps today's behaviour: the payload is
 * posted to the BotSpace flow, which picks the template. WHATSAPP_PROVIDER=chatwoot
 * sends the same template through Chatwoot. Flip it when the WhatsApp number
 * moves from BotSpace to Chatwoot; nothing else changes.
 */
const PROVIDER =
  process.env.WHATSAPP_PROVIDER === "chatwoot" ? "chatwoot" : "botspace";

const BOTSPACE_REMINDER_WEBHOOK_URL =
  "https://hook.bot.space/ZHVAL4hD99ef/v1/webhook/automation/68da50444ce0c3f496978e79/flow/68eff0c8bf1d5ae40860a005";
const BOTSPACE_NEW_ORDER_WEBHOOK_URL =
  "https://hook.bot.space/ZHVAL4hD99ef/v1/webhook/automation/68da50444ce0c3f496978e79/flow/68e4cbdbbf1d5ae408c5657d";

export const fetchBotspace = async (url: string, body: unknown) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("Success:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export type ReminderPayload = {
  id?: string;
  name: string;
  phone: string;
  reminderType:
    | "collection"
    | "delivery"
    | "oneeighty"
    | "request"
    | "followup"
    | "collected"
    | "delivered";
  timing?: string;
  address?: string;
  note?: string;
  imageUrl?: string;
};

export type NewOrderPayload = {
  name: string;
  phone: string;
  address: string;
  note: string;
  orderNumber: string;
  pickupDate: string;
  deliveryDate: string;
  timing: string;
  knives: number;
  repairs: number;
  orderTotal: number;
};

// Checked against the approved templates synced into Chatwoot (Nov 2026). Each
// body array must match the template's {{1}}, {{2}}, ... exactly; templates
// without variables get an empty body. Language must match exactly too.
const LANGUAGE = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US";

// What the team and the KSS agent see in Chatwoot is rendered from the approved
// template itself (chatwoot.ts renderTemplate), so it always matches the customer's copy.

// The website_* templates are the website's own copies, built so they can also be sent by
// hand from Chatwoot: the packing and website buttons are static links (no parameter),
// and the collected/delivered photo is an image header rather than a {{1}} button.

// Chatwoot drops empty variables, which would shift the rest and fail the send.
const orDash = (value: string | undefined) => value?.trim() || "-";

export const reminderTemplate = (p: ReminderPayload): TemplateMessage => {
  switch (p.reminderType) {
    case "collection":
      // {{1}} timing, {{2}} address, {{3}} notes
      return {
        name: "website_collection_reminder",
        language: LANGUAGE,
        category: "UTILITY",
        body: [orDash(p.timing), orDash(p.address), orDash(p.note)],
      };
    case "delivery":
      return {
        name: "website_return_delivery_reminder",
        language: LANGUAGE,
        category: "UTILITY",
        body: [],
      };
    case "oneeighty":
      // Buttons: "Yes, please", "No, thank you", then the static "Learn more" link
      return {
        name: "website_one_eighty_reminder",
        language: LANGUAGE,
        category: "MARKETING",
        body: [],
        buttons: [
          { type: "quick_reply" },
          { type: "quick_reply" },
        ],
      };
    case "request":
      return {
        name: "website_requested_reminder",
        language: LANGUAGE,
        category: "UTILITY",
        body: [],
      };
    case "followup":
      return {
        name: "website_reaching_order_capacity",
        language: LANGUAGE,
        category: "MARKETING",
        body: [],
      };
    case "collected":
      // Image header: the collection photo
      return {
        name: "website_order_collected",
        language: LANGUAGE,
        category: "UTILITY",
        body: [],
        headerImageUrl: p.imageUrl,
      };
    case "delivered":
      // Image header: the delivery photo
      return {
        name: "website_delivered",
        language: LANGUAGE,
        category: "MARKETING",
        body: [],
        headerImageUrl: p.imageUrl,
      };
  }
};

// {{1}} pickup date, {{2}} timing, {{3}} return date, {{4}} address, {{5}} note
export const newOrderTemplate = (p: NewOrderPayload): TemplateMessage => ({
  name: "website_new_order",
  language: LANGUAGE,
  category: "UTILITY",
  body: [
    orDash(p.pickupDate),
    orDash(p.timing),
    orDash(p.deliveryDate),
    orDash(p.address),
    p.note?.trim() || "NA",
  ],
});

export const sendReminder = async (payload: ReminderPayload) => {
  if (PROVIDER === "botspace") {
    return fetchBotspace(BOTSPACE_REMINDER_WEBHOOK_URL, payload);
  }
  try {
    await sendChatwootTemplate(payload, reminderTemplate(payload));
  } catch (error) {
    // Same as fetchBotspace: log and carry on, so one bad number doesn't stop the batch.
    console.error(`[whatsapp] ${payload.reminderType} reminder failed`, error);
  }
};

export const sendNewOrderMessage = async (payload: NewOrderPayload) => {
  if (PROVIDER === "botspace") {
    return fetchBotspace(BOTSPACE_NEW_ORDER_WEBHOOK_URL, payload);
  }
  try {
    await sendChatwootTemplate(
      payload,
      newOrderTemplate(payload),
      payload.orderNumber,
    );
  } catch (error) {
    console.error("[whatsapp] new order message failed", error);
  }
};
