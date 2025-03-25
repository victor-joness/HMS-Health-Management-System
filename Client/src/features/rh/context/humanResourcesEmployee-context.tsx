import { HumanResourcesEmployee } from '@/entities/HumanResourcesEmployee' // Alterado para `HumanResourcesEmployee`
import { createContext } from 'react'
import React from 'react'

export type HumanResourcesEmployeesDialogType = 'add' | 'edit' | 'delete' | null // Alterado para `HumanResourcesEmployeesDialogType`

interface HumanResourcesEmployeesContextType { // Alterado para `HumanResourcesEmployeesContextType`
  open: HumanResourcesEmployeesDialogType // Alterado para `HumanResourcesEmployeesDialogType`
  setOpen: (type: HumanResourcesEmployeesDialogType) => void // Alterado para `HumanResourcesEmployeesDialogType`
  currentRow: HumanResourcesEmployee | null // Alterado para `HumanResourcesEmployee`
  setCurrentRow: (employee: HumanResourcesEmployee | null) => void // Alterado para `HumanResourcesEmployee`
}

export const HumanResourcesEmployeesContext = createContext<HumanResourcesEmployeesContextType>({
  open: null,
  setOpen: () => {},
  currentRow: null,
  setCurrentRow: () => {},
})

export default function HumanResourcesEmployeesContextProvider({ children, value }: { children: React.ReactNode, value: HumanResourcesEmployeesContextType }) {
  return (
    <HumanResourcesEmployeesContext.Provider value={value}>
      {children}
    </HumanResourcesEmployeesContext.Provider>
  )
}

export const useHumanResourcesEmployeesContext = () => { 
  const humanResourcesEmployeesContext = React.useContext(HumanResourcesEmployeesContext)

  if (!humanResourcesEmployeesContext) {
    throw new Error(
      'useHumanResourcesEmployeesContext has to be used within <HumanResourcesEmployeesContext.Provider>'
    )
  }

  return humanResourcesEmployeesContext
}
