import { Receptionist } from '@/entities/Receptionist' // Alterado para `Receptionist`
import { createContext } from 'react'
import React from 'react'

export type ReceptionistsDialogType = 'add' | 'edit' | 'delete' | null // Alterado para `ReceptionistsDialogType`

interface ReceptionistsContextType { // Alterado para `ReceptionistsContextType`
  open: ReceptionistsDialogType // Alterado para `ReceptionistsDialogType`
  setOpen: (type: ReceptionistsDialogType) => void // Alterado para `ReceptionistsDialogType`
  currentRow: Receptionist | null // Alterado para `Receptionist`
  setCurrentRow: (receptionist: Receptionist | null) => void // Alterado para `Receptionist`
}

export const ReceptionistsContext = createContext<ReceptionistsContextType>({
  open: null,
  setOpen: () => {},
  currentRow: null,
  setCurrentRow: () => {},
})

export default function ReceptionistsContextProvider({ children, value }: { children: React.ReactNode, value: ReceptionistsContextType }) {
  return (
    <ReceptionistsContext.Provider value={value}>
      {children}
    </ReceptionistsContext.Provider>
  )
}

export const useReceptionistsContext = () => { 
  const receptionistsContext = React.useContext(ReceptionistsContext)

  if (!receptionistsContext) {
    throw new Error(
      'useReceptionistsContext has to be used within <ReceptionistsContext.Provider>'
    )
  }

  return receptionistsContext
}
