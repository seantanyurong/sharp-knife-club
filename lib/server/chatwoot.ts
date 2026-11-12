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
  /** Approved template name in WhatsApp Manager, e.g. "website_collection_reminder". */
  name: string;
  language: string;
  category: "UTILITY" | "MARKETING";
  /**
   * Body variables in order: {{1}}, {{2}}, ... Must match the template exactly,
   * and none may be empty: Chatwoot drops empty values, which shifts the rest.
   */
  body: string[];
  /** For templates with an image header. */
  headerImageUrl?: string;
  /**
   * One entry per template button, in the template's order (Chatwoot matches
   * them by position). URL buttons with a {{1}} take the value in `parameter`.
   */
  buttons?: TemplateButton[];
};

export type TemplateButton =
  | { type: "url"; parameter: string }
  | { type: "quick_reply" };

/** A template as WhatsApp approved it, from Chatwoot's synced copy. */
export type ApprovedTemplate = {
  name: string;
  language: string;
  status: string;
  components: {
    type: string;
    format?: string;
    text?: string;
    buttons?: { type: string; text: string; url?: string }[];
  }[];
};

type Contact = { id: number; name: string | null; phone_number: string | null };
type Conversation = { id: number; inbox_id: number; status: string };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = async <T>(
  path: string,
  init: Parameters<typeof fetch>[1] = {},
): Promise<T> => {
  if (!CHATWOOT_URL || !CHATWOOT_API_TOKEN || !CHATWOOT_INBOX_ID) {
    throw new Error(
      "Chatwoot is not configured (CHATWOOT_URL, CHATWOOT_API_TOKEN, CHATWOOT_INBOX_ID)",
    );
  }
  let response: Response;
  // Chatwoot rate-limits some endpoints (e.g. contact search) during a batch.
  // A 429 means nothing happened, so retrying is safe for every method.
  for (let attempt = 0; ; attempt++) {
    response = await fetch(
      `${CHATWOOT_URL}/api/v1/accounts/${CHATWOOT_ACCOUNT_ID}${path}`,
      {
        ...init,
        headers: {
          "Content-Type": "application/json",
          // Hyphens, not underscores: nginx drops headers with underscores,
          // and Chatwoot accepts either spelling.
          "api-access-token": CHATWOOT_API_TOKEN,
          ...init.headers,
        },
      },
    );
    if (response.status !== 429 || attempt >= 5) break;
    await sleep(2000 * (attempt + 1));
  }
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

// Order numbers look like "38O9". A repeat customer's name lists them all.
const ORDER_PREFIX = /^(\d+O\d+(?:\/\d+O\d+)*) - /;

/** "39O1/38O9 - Jane Tan": latest order first, as the team names contacts. */
const orderContactName = (
  current: string | null,
  orderNumber: string,
  name: string,
) => {
  const previous = current?.match(ORDER_PREFIX)?.[1].split("/") ?? [];
  const orders = [orderNumber, ...previous.filter((n) => n !== orderNumber)];
  return `${orders.join("/")} - ${name}`;
};

const templateParams = (template: TemplateMessage) => ({
  name: template.name,
  language: template.language,
  category: template.category,
  processed_params: {
    // Always present (even empty) so Chatwoot reads this as its current format.
    body: Object.fromEntries(
      template.body.map((value, i) => [String(i + 1), value]),
    ),
    ...(template.headerImageUrl && {
      header: { media_url: template.headerImageUrl, media_type: "image" },
    }),
    ...(template.buttons && { buttons: template.buttons }),
  },
});

const fill = (text: string, values: string[]) =>
  text.replace(/{{(\d+)}}/g, (_, n) => values[Number(n) - 1]);

const placeholderCount = (text = "") =>
  new Set(text.match(/{{\d+}}/g) ?? []).size;

/**
 * The message as the customer sees it: header, body with the variables filled
 * in, footer, then buttons. Chatwoot stores whatever text we give it, so this is
 * what the team and the KSS agent see. Throws if our variables don't fit the
 * approved template, since WhatsApp would reject the send anyway.
 */
export const renderTemplate = (
  approved: ApprovedTemplate,
  template: TemplateMessage,
): string => {
  const part = (type: string) =>
    approved.components.find((c) => c.type === type);
  const header = part("HEADER");
  const body = part("BODY");
  const footer = part("FOOTER");
  const buttons = part("BUTTONS")?.buttons ?? [];

  const expected = placeholderCount(body?.text);
  if (template.body.length !== expected) {
    throw new Error(
      `${template.name}: approved template has ${expected} body variables, we sent ${template.body.length}`,
    );
  }
  if (header?.format === "IMAGE" && !template.headerImageUrl) {
    throw new Error(`${template.name}: approved template needs a header image`);
  }

  // URL buttons with a {{1}} take our url parameters, in order.
  const urlParams = (template.buttons ?? []).flatMap((b) =>
    b.type === "url" ? [b.parameter] : [],
  );
  const buttonLine = (b: { type: string; text: string; url?: string }) => {
    if (b.type !== "URL" || !b.url) return `[${b.text}]`;
    const url = b.url.includes("{{1}}")
      ? fill(b.url, [urlParams.shift() ?? ""])
      : b.url;
    return `[${b.text}] ${url}`;
  };

  return [
    header?.format === "TEXT" ? (header.text ?? null) : null,
    header?.format === "IMAGE" ? `[Photo] ${template.headerImageUrl}` : null,
    body?.text ? fill(body.text, template.body) : null,
    footer?.text ?? null,
    buttons.length ? buttons.map(buttonLine).join("\n") : null,
  ]
    .filter((line): line is string => !!line)
    .join("\n\n");
};

let templatesCache: { at: number; templates: ApprovedTemplate[] } | null = null;

/** The approved template, as Chatwoot synced it from WhatsApp. */
const approvedTemplate = async (
  template: TemplateMessage,
): Promise<ApprovedTemplate> => {
  // Cached briefly: a reminder batch sends many messages in one invocation.
  if (!templatesCache || Date.now() - templatesCache.at > 5 * 60_000) {
    const inbox = await api<{ message_templates?: ApprovedTemplate[] }>(
      `/inboxes/${CHATWOOT_INBOX_ID}`,
    );
    templatesCache = {
      at: Date.now(),
      templates: inbox.message_templates ?? [],
    };
  }
  const found = templatesCache.templates.find(
    (t) =>
      t.name === template.name &&
      t.language === template.language &&
      t.status === "APPROVED",
  );
  if (!found) {
    throw new Error(
      `${template.name} (${template.language}) is not an approved template in Chatwoot inbox ${CHATWOOT_INBOX_ID}`,
    );
  }
  return found;
};

/**
 * Sends a template into the customer's latest WhatsApp conversation, or starts
 * one. New conversations start as "pending" so the KSS agent answers replies.
 */
export const sendChatwootTemplate = async (
  customer: { name: string; phone: string },
  template: TemplateMessage,
  /** Adds this order to the contact's name: "<latest>/<previous> - <name>". */
  orderNumber?: string,
) => {
  // First, so a template that doesn't fit fails before we touch the contact.
  const content = renderTemplate(await approvedTemplate(template), template);
  const phone = toE164(customer.phone);
  const contact = await findOrCreateContact(
    orderNumber
      ? orderContactName(null, orderNumber, customer.name)
      : customer.name,
    phone,
  );
  const conversations = await api<{ payload: Conversation[] }>(
    `/contacts/${contact.id}/conversations`,
  );
  const conversation = conversations.payload
    .filter((c) => c.inbox_id === CHATWOOT_INBOX_ID)
    .sort((a, b) => b.id - a.id)[0];

  const message = {
    content,
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

  const name =
    orderNumber && orderContactName(contact.name, orderNumber, customer.name);
  if (name && name !== contact.name) {
    // After sending: a failed rename must not cost the customer their message.
    try {
      await api(`/contacts/${contact.id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
      });
    } catch (error) {
      console.error(`[chatwoot] couldn't rename contact ${contact.id}`, error);
    }
  }
};
