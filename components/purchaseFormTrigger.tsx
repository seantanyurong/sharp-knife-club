'use client'

import { usePurchaseForm } from '@/context/purchaseForm'

function PurchaseFormTrigger({ origin, children }: { origin: string, children: React.ReactNode }) {
  const { setIsOpen } = usePurchaseForm()

  const handleClick = () => {
    setIsOpen(true)
    console.log('placeholder for posthog origin', origin)
  }

  return (
    <a onClick={handleClick}>
      {children}
    </a>
  )
}

export default PurchaseFormTrigger
