import { Transaction } from '@/entities/Transaction' // Ajuste para a entidade Transaction
import { createContext } from 'react'
import React from 'react'

export type TransactionDialogType = 'add' | 'edit' | 'delete' | null

interface TransactionsContextType {
  open: TransactionDialogType
  setOpen: (type: TransactionDialogType) => void
  currentRow: Transaction | null
  setCurrentRow: (transaction: Transaction | null) => void
}

export const TransactionsContext = createContext<TransactionsContextType>({
  open: null,
  setOpen: () => {},
  currentRow: null,
  setCurrentRow: () => {},
})

export default function TransactionsContextProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: TransactionsContextType
}) {
  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactionsContext = () => {
  const transactionsContext = React.useContext(TransactionsContext)

  if (!transactionsContext) {
    throw new Error(
      'useTransactionsContext has to be used within <TransactionsContext.Provider>'
    )
  }

  return transactionsContext
}
