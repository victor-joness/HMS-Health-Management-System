import { Nurse } from '@/entities/Nurse'
import { createContext } from 'react'
import React from 'react'

export type NursesDialogType = 'add' | 'edit' | 'delete' | null

interface NursesContextType {
  open: NursesDialogType
  setOpen: (type: NursesDialogType) => void
  currentRow: Nurse | null
  setCurrentRow: (nurse: Nurse | null) => void
}

export const NursesContext = createContext<NursesContextType>({
  open: null,
  setOpen: () => {},
  currentRow: null,
  setCurrentRow: () => {},
})

export default function NursesContextProvider({ children, value }: { children: React.ReactNode, value: NursesContextType }) {
  return (
    <NursesContext.Provider value={value}>
      {children}
    </NursesContext.Provider>
  )
}

export const useNursesContext = () => {
  const nursesContext = React.useContext(NursesContext)

  if (!nursesContext) {
    throw new Error(
      'useNursesContext has to be used within <NursesContext.Provider>'
    )
  }

  return nursesContext
} 