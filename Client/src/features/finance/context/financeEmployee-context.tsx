import { FinanceEmployee } from '@/entities/FinanceEmployee'
import { createContext } from 'react'
import React from 'react'

export type FinanceEmployeeDialogType = 'add' | 'edit' | 'delete' | null

interface FinanceEmployeesContextType {
  open: FinanceEmployeeDialogType
  setOpen: (type: FinanceEmployeeDialogType) => void
  currentRow: FinanceEmployee | null
  setCurrentRow: (financeEmployee: FinanceEmployee | null) => void
}

export const FinanceEmployeesContext = createContext<FinanceEmployeesContextType>({
  open: null,
  setOpen: () => {},
  currentRow: null,
  setCurrentRow: () => {},
})

export default function FinanceEmployeesContextProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: FinanceEmployeesContextType
}) {
  return (
    <FinanceEmployeesContext.Provider value={value}>
      {children}
    </FinanceEmployeesContext.Provider>
  )
}

export const useFinanceEmployeesContext = () => {
  const financeEmployeesContext = React.useContext(FinanceEmployeesContext)

  if (!financeEmployeesContext) {
    throw new Error(
      'useFinanceEmployeesContext has to be used within <FinanceEmployeesContext.Provider>'
    )
  }

  return financeEmployeesContext
}
