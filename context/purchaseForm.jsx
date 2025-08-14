'use client';

import { createContext, useContext, useState } from "react";

const PurchaseFormContext = createContext();

export const PurchaseFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PurchaseFormContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PurchaseFormContext.Provider>
  );
};

export const usePurchaseForm = () => useContext(PurchaseFormContext);
