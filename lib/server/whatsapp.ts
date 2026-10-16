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

// TODO before switching to Chatwoot: check each template's variables and
// language code against WhatsApp Manager (BotSpace's flow holds the current
// mapping). The body arrays below are the expected order of {{1}}, {{2}}, ...
const LANGUAGE = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en";

const reminderTemplate = (p: ReminderPayload): TemplateMessage => {
  switch (p.reminderType) {
    case "collection":
      return {
        name: "collection_reminder_v4",
        language: LANGUAGE,
        category: "UTILITY",
        body: [p.name, p.timing ?? ""],
        preview: `Collection reminder: tomorrow, ${p.timing ?? ""}`,
      };
    case "delivery":
      return {
        name: "return_delivery_reminder_v4",
        language: LANGUAGE,
        category: "UTILITY",
        body: [p.name, p.timing ?? ""],
        preview: `Return delivery reminder: tomorrow, ${p.timing ?? ""}`,
      };
    case "oneeighty":
      return {
        name: "one_eighty_reminder",
        language: LANGUAGE,
        category: "MARKETING",
        body: [p.name],
        preview: "180-day reminder: time to sharpen again?",
      };
    case "request":
      return {
        name: "requested_reminder",
        language: LANGUAGE,
        category: "MARKETING",
        body: [p.name],
        preview: "Requested reminder",
      };
    case "followup":
      return {
        name: "reaching_order_capacity",
        language: LANGUAGE,
        category: "MARKETING",
        body: [p.name],
        preview: "Follow-up: slots are filling up",
      };
    case "collected":
      return {
        name: "order_collected",
        language: LANGUAGE,
        category: "UTILITY",
        body: [p.name],
        headerImageUrl: p.imageUrl,
        preview: "Order collected",
      };
    case "delivered":
      return {
        name: "delivered_v5",
        language: LANGUAGE,
        category: "UTILITY",
        body: [p.name],
        headerImageUrl: p.imageUrl,
        preview: "Order delivered",
      };
  }
};

const newOrderTemplate = (p: NewOrderPayload): TemplateMessage => ({
  name: "new_order_v2",
  language: LANGUAGE,
  category: "UTILITY",
  body: [p.pickupDate, p.timing, p.deliveryDate, p.address, p.note || "NA"],
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
