import React, { createContext, useContext } from 'react'
import { Laboratory } from '@/entities/Laboratory'

export type LaboratoryDialogType = 'add' | 'edit' | 'delete' | null

interface LaboratoryContextType {
  open: LaboratoryDialogType
  setOpen: React.Dispatch<React.SetStateAction<LaboratoryDialogType>>
  currentRow: Laboratory | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Laboratory | null>>
}

const LaboratoryContext = createContext<LaboratoryContextType | undefined>(undefined)

interface LaboratoryContextProviderProps {
  children: React.ReactNode
  value: LaboratoryContextType
}

export function LaboratoryContextProvider({ children, value }: LaboratoryContextProviderProps) {
  return (
    <LaboratoryContext.Provider value={value}>
      {children}
    </LaboratoryContext.Provider>
  )
}

export function useLaboratoryContext() {
  const context = useContext(LaboratoryContext)
  if (context === undefined) {
    throw new Error('useLaboratoryContext must be used within a LaboratoryContextProvider')
  }
  return context
} 