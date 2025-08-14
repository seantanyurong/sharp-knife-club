'use client'

import posthog from 'posthog-js'

function WhatsAppLink({ origin, children }: { origin: string; children: React.ReactNode }) {

  const handleClick = () => {
    posthog.capture('clicked_whatsapp_chat', { origin: origin })
  }

  return (
    <a onClick={handleClick}
      href='https://wa.me/message/LQDK2KE5I3PNF1'
      target='_blank'
      rel='noreferrer'
    >
      {children}
    </a>
  )
}

export default WhatsAppLink

