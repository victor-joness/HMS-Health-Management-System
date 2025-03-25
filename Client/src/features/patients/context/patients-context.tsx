import { Patient } from '@/entities/Patients'
import { createContext } from 'react'
import React from 'react'

export type PatientsDialogType = 'add' | 'edit' | 'delete' | null

interface PatientsContextType {
  open: PatientsDialogType
  setOpen: (type: PatientsDialogType) => void
  currentRow: Patient | null
  setCurrentRow: (patient: Patient | null) => void
}

export const PatientsContext = createContext<PatientsContextType>({
  open: null,
  setOpen: () => {},
  currentRow: null,
  setCurrentRow: () => {},
})

export default function PatientsContextProvider({ children, value }: { children: React.ReactNode, value: PatientsContextType }) {
  return (
    <PatientsContext.Provider value={value}>
      {children}
    </PatientsContext.Provider>
  )
}

export const usePatientsContext = () => {
  const patientsContext = React.useContext(PatientsContext)

  if (!patientsContext) {
    throw new Error(
      'usePatientsContext has to be used within <PatientsContext.Provider>'
    )
  }

  return patientsContext
}
