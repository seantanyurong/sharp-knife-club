'use client'

import posthog from 'posthog-js'

function WhatsAppLink({ origin, children }: { origin: string; children: React.ReactNode }) {
  const handleClick = () => {
    const distinctId = posthog.get_distinct_id();
    const clickedAt = new Date().toISOString();

    posthog.capture('clicked_whatsapp_chat', {
      origin,
      clicked_at: clickedAt,
    });

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'WhatsApp Contact',
        content_category: origin,
        value: 10.00,
        currency: 'SGD',
        status: true,
      });
    }

    try {
      fetch('https://server.knifesharpening.sg/analytics/whatsapp-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ distinctId, origin, clickedAt }),
      });
    } catch(e) {
      // do nothing
    }
  };

  return (
    <a
      onClick={handleClick}
      href='https://wa.me/6580684206?text=Hello%21%20Can%20you%20share%20more%20information%3F'
      target='_blank'
      rel='noreferrer'
    >
      {children}
    </a>
  )
}

export default WhatsAppLink
