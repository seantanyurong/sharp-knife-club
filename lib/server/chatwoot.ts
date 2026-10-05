/**
 * Sends WhatsApp template messages through our self-hosted Chatwoot
 * (chat.knifesharpening.sg) instead of BotSpace.
 *
 * Messages go into the customer's conversation in the WhatsApp inbox, so the
 * team and the KSS agent see every reminder alongside the chat, and the agent
 * knows what a customer is replying to.
 *
 * Env:
 *   CHATWOOT_URL          https://chat.knifesharpening.sg
 *   CHATWOOT_API_TOKEN    access token of a Chatwoot user (agent role, member of
 *                         the WhatsApp inbox). Bot tokens can't search contacts.
 *   CHATWOOT_ACCOUNT_ID   usually 1
 *   CHATWOOT_INBOX_ID     the WhatsApp inbox
 */

const CHATWOOT_URL = process.env.CHATWOOT_URL;
const CHATWOOT_API_TOKEN = process.env.CHATWOOT_API_TOKEN;
const CHATWOOT_ACCOUNT_ID = process.env.CHATWOOT_ACCOUNT_ID || "1";
const CHATWOOT_INBOX_ID = Number(process.env.CHATWOOT_INBOX_ID);

export type TemplateMessage = {
  /** Approved template name in WhatsApp Manager, e.g. "collection_reminder_v4". */
  name: string;
  language: string;
  category: "UTILITY" | "MARKETING";
  /** Body variables in order: {{1}}, {{2}}, ... */
  body: string[];
  /** For templates with an image header (e.g. the collected/delivered photo). */
  headerImageUrl?: string;
  /** What the team sees in Chatwoot for this message. */
  preview: string;
};

type Contact = { id: number; phone_number: string | null };
type Conversation = { id: number; inbox_id: number; status: string };

const api = async <T>(
  path: string,
  init: Parameters<typeof fetch>[1] = {},
): Promise<T> => {
  if (!CHATWOOT_URL || !CHATWOOT_API_TOKEN || !CHATWOOT_INBOX_ID) {
    throw new Error(
      "Chatwoot is not configured (CHATWOOT_URL, CHATWOOT_API_TOKEN, CHATWOOT_INBOX_ID)",
    );
  }
  const response = await fetch(
    `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}${path}`,
    {
      ...init,
      headers: {
        "Content-Type": "application/json",
        api_access_token: CHATWOOT_API_TOKEN,
        ...init.headers,
      },
    },
  );
  if (!response.ok) {
    throw new Error(
      `Chatwoot ${init.method ?? "GET"} ${path} -> ${response.status} ${await response.text()}`,
    );
  }
  return response.json() as Promise<T>;
};

/** Notion and Stripe phones may contain spaces; Chatwoot stores E.164. */
const toE164 = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `+${digits}`;
};

const findOrCreateContact = async (
  name: string,
  phone: string,
): Promise<Contact> => {
  const search = await api<{ payload: Contact[] }>(
    `/contacts/search?q=${encodeURIComponent(phone.replace("+", ""))}`,
  );
  const existing = search.payload.find(
    (contact) => contact.phone_number === phone,
  );
  if (existing) return existing;

  const created = await api<{ payload: { contact: Contact } }>("/contacts", {
    method: "POST",
    body: JSON.stringify({
      name,
      phone_number: phone,
      inbox_id: CHATWOOT_INBOX_ID,
    }),
  });
  return created.payload.contact;
};

const templateParams = (template: TemplateMessage) => ({
  name: template.name,
  language: template.language,
  category: template.category,
  processed_params: {
    body: Object.fromEntries(
      template.body.map((value, i) => [String(i + 1), value]),
    ),
    ...(template.headerImageUrl && {
      header: { media_url: template.headerImageUrl, media_type: "image" },
    }),
  },
});

/**
 * Sends a template into the customer's latest WhatsApp conversation, or starts
 * one. New conversations start as "pending" so the KSS agent answers replies.
 */
export const sendChatwootTemplate = async (
  customer: { name: string; phone: string },
  template: TemplateMessage,
) => {
  const phone = toE164(customer.phone);
  const contact = await findOrCreateContact(customer.name, phone);
  const conversations = await api<{ payload: Conversation[] }>(
    `/contacts/${contact.id}/conversations`,
  );
  const conversation = conversations.payload
    .filter((c) => c.inbox_id === CHATWOOT_INBOX_ID)
    .sort((a, b) => b.id - a.id)[0];

  const message = {
    content: template.preview,
    message_type: "outgoing",
    template_params: templateParams(template),
  };

  if (conversation) {
    await api(`/conversations/${conversation.id}/messages`, {
      method: "POST",
      body: JSON.stringify(message),
    });
  } else {
    await api("/conversations", {
      method: "POST",
      body: JSON.stringify({
        inbox_id: CHATWOOT_INBOX_ID,
        contact_id: contact.id,
        status: "pending",
        message,
      }),
    });
  }
  console.log(`[chatwoot] sent ${template.name} to contact ${contact.id}`);
};
