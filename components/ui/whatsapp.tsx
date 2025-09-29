'use client'

import posthog from 'posthog-js'

function WhatsAppLink({ origin, children }: { origin: string; children: React.ReactNode }) {
  return (
    <a
      onClick={() => posthog.capture('clicked_whatsapp_chat', { origin: origin })}
      href='https://wa.me/6580684206?text=Hello%21%20Can%20you%20share%20more%20information%3F'
      target='_blank'
      rel='noreferrer'
    >
      {children}
    </a>
  )
}

export default WhatsAppLink
