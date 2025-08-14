'use client'

import posthog from 'posthog-js'
import { usePurchaseForm } from '@/context/purchaseForm'

function WhatsAppLink({ origin, children }: { origin: string; children: React.ReactNode }) {
  const { setIsOpen } = usePurchaseForm()

  const handleClick = () => {
    posthog.capture('clicked_whatsapp_chat', { origin: origin })
    setIsOpen(true)
  }

  return (
    <a onClick={handleClick}>
      {children}
    </a>
  )
}

export default WhatsAppLink

// href='https://wa.me/message/LQDK2KE5I3PNF1'
// target='_blank'
// rel='noreferrer'
