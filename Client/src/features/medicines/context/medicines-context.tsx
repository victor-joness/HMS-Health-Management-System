import { createContext } from 'react'
import React from 'react'
import { Medicines } from '@/entities/Medicines'

export type MedicinesDialogType = 'add' | 'edit' | 'delete' | null

interface MedicinesContextType {
  open: MedicinesDialogType
  setOpen: (type: MedicinesDialogType) => void
  currentMedicine: Medicines | null
  setCurrentMedicine: (medicine: Medicines | null) => void
}

export const MedicinesContext = createContext<MedicinesContextType>({
  open: null,
  setOpen: () => {},
  currentMedicine: null,
  setCurrentMedicine: () => {},
})

export default function MedicinesContextProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: MedicinesContextType
}) {
  return (
    <MedicinesContext.Provider value={value}>
      {children}
    </MedicinesContext.Provider>
  )
}

export const useMedicinesContext = () => {
  const context = React.useContext(MedicinesContext)
  if (!context) {
    throw new Error(
      'useMedicinesContext deve ser utilizado dentro de um MedicinesContextProvider'
    )
  }
  return context
}
