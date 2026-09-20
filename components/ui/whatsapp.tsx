'use client'

import React from 'react'
import posthog from 'posthog-js'

function WhatsAppLink({ origin, message, className, children }: { origin: string; message?: string; className?: string; children: React.ReactNode }) {
  const handleClick = () => {
    posthog.capture('clicked_whatsapp_chat', {
      origin,
      clicked_at: new Date().toISOString(),
    });

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'WhatsApp Contact',
        content_category: origin,
        value: 10.00,
        currency: 'SGD',
        status: true,
      });
    }
  };

  const defaultMessage = 'Hello%21%20Can%20you%20share%20more%20information%3F';
  const href = `https://wa.me/6580684206?text=${message ?? defaultMessage}`;

  return (
    <a
      onClick={handleClick}
      href={href}
      target='_blank'
      rel='noreferrer'
      className={className}
    >
      {children}
    </a>
  )
}

export default WhatsAppLink
