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

// The URL buttons on these templates still point at BotSpace's redirector
// ("https://link.bot.space/redirect?to={{1}}"), so the variable is the encoded
// destination. They stop working once BotSpace is cancelled: replace them with
// _v5 templates whose buttons link to our own URLs before then.
const PACKING_VIDEO_URL = "https://www.instagram.com/reel/DVOULr9Eh1e/";
const WEBSITE_URL = "https://www.knifesharpening.sg";
const linkButton = (url: string) =>
  ({ type: "url", parameter: encodeURIComponent(url) }) as const;

// Chatwoot drops empty variables, which would shift the rest and fail the send.
const orDash = (value: string | undefined) => value?.trim() || "-";

export const reminderTemplate = (p: ReminderPayload): TemplateMessage => {
  switch (p.reminderType) {
    case "collection":
      // {{1}} timing, {{2}} address, {{3}} notes; button: packing instructions
      return {
        name: "collection_reminder_v4",
        language: LANGUAGE,
        category: "UTILITY",
        body: [orDash(p.timing), orDash(p.address), orDash(p.note)],
        buttons: [linkButton(PACKING_VIDEO_URL)],
        preview: `Collection reminder: tomorrow between ${orDash(p.timing)}`,
      };
    case "delivery":
      return {
        name: "return_delivery_reminder_v4",
        language: LANGUAGE,
        category: "UTILITY",
        body: [],
        preview: "Return delivery reminder: knives delivered tomorrow",
      };
    case "oneeighty":
      // Buttons: "Yes, please", "No, thank you", then the "Learn more" link
      return {
        name: "one_eighty_reminder",
        language: LANGUAGE,
        category: "MARKETING",
        body: [],
        buttons: [
          { type: "quick_reply" },
          { type: "quick_reply" },
          linkButton(WEBSITE_URL),
        ],
        preview: "180-day reminder: time to sharpen again?",
      };
    case "request":
      return {
        name: "requested_reminder",
        language: LANGUAGE,
        category: "UTILITY",
        body: [],
        preview: "Requested reminder",
      };
    case "followup":
      return {
        name: "reaching_order_capacity",
        language: LANGUAGE,
        category: "MARKETING",
        body: [],
        preview: "Follow-up: reaching order capacity",
      };
    case "collected":
      // Button: "Image Proof" (the collection photo)
      return {
        name: "order_collected",
        language: LANGUAGE,
        category: "UTILITY",
        body: [],
        buttons: [linkButton(p.imageUrl || WEBSITE_URL)],
        preview: "Order collected",
      };
    case "delivered":
      // Button: "Image Proof" (the delivery photo)
      return {
        name: "delivered_v5",
        language: LANGUAGE,
        category: "MARKETING",
        body: [],
        buttons: [linkButton(p.imageUrl || WEBSITE_URL)],
        preview: "Order delivered",
      };
  }
};

// {{1}} pickup date, {{2}} timing, {{3}} return date, {{4}} address, {{5}} note;
// button: packing instructions
export const newOrderTemplate = (p: NewOrderPayload): TemplateMessage => ({
  name: "new_order_v2",
  language: LANGUAGE,
  category: "UTILITY",
  body: [
    orDash(p.pickupDate),
    orDash(p.timing),
    orDash(p.deliveryDate),
    orDash(p.address),
    p.note?.trim() || "NA",
  ],
  buttons: [linkButton(PACKING_VIDEO_URL)],
  preview: `Payment received: order ${p.orderNumber}, pickup ${p.pickupDate} ${p.timing}, return ${p.deliveryDate}`,
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
    await sendChatwootTemplate(payload, newOrderTemplate(payload));
  } catch (error) {
    console.error("[whatsapp] new order message failed", error);
  }
};
