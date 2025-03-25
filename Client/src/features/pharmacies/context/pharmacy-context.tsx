import { createContext } from 'react'
import React from 'react'
import { Pharmacy } from '@/entities/Pharmacy'

export type PharmacyDialogType = 'add' | 'edit' | 'delete' | null

interface PharmacyContextType {
  open: PharmacyDialogType
  setOpen: (type: PharmacyDialogType) => void
  currentPharmacy: Pharmacy | null
  setCurrentPharmacy: (pharmacy: Pharmacy | null) => void
}

export const PharmacyContext = createContext<PharmacyContextType>({
  open: null,
  setOpen: () => {},
  currentPharmacy: null,
  setCurrentPharmacy: () => {},
})

export default function PharmacyContextProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: PharmacyContextType
}) {
  return (
    <PharmacyContext.Provider value={value}>
      {children}
    </PharmacyContext.Provider>
  )
}

export const usePharmacyContext = () => {
  const context = React.useContext(PharmacyContext)
  if (!context) {
    throw new Error(
      'usePharmacyMedicinesContext deve ser utilizado dentro de um PharmacyMedicinesContextProvider'
    )
  }
  return context
}
