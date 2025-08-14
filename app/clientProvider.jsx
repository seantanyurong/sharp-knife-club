"use client";

import { PurchaseFormProvider } from "@/context/purchaseForm";

export default function ClientProvider({ children }) {
  return <PurchaseFormProvider>{children}</PurchaseFormProvider>;
}
