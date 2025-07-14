'use client'

import posthog from 'posthog-js'

function WhatsAppLink({ origin, children }: { origin: string; children: React.ReactNode }) {
  return (
    <a
      onClick={() => posthog.capture('clicked_whatsapp_chat', { origin: origin })}
      href='https://wa.me/message/LQDK2KE5I3PNF1'
      target='_blank'
      rel='noreferrer'
    >
      {children}
    </a>
  )
}

export default WhatsAppLink
