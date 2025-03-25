import React from 'react'
import { Doctor } from '@/entities/Doctor'
import { createContext } from 'react'

export type DoctorsDialogType = 'add' | 'edit' | 'delete' | null

interface DoctorsContextType {
  open: DoctorsDialogType
  setOpen: (type: DoctorsDialogType) => void
  currentRow: Doctor | null
  setCurrentRow: (doctor: Doctor | null) => void
}

export const DoctorsContext = createContext<DoctorsContextType>({
  open: null,
  setOpen: () => {},
  currentRow: null,
  setCurrentRow: () => {},
})

export default function DoctorsContextProvider({ children, value }: { children: React.ReactNode, value: DoctorsContextType }) {
  return (
    <DoctorsContext.Provider value={value}>
      {children}
    </DoctorsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDoctorsContext = () => {
  const doctorsContext = React.useContext(DoctorsContext)

  if (!doctorsContext) {
    throw new Error(
      'useDoctorsContext has to be used within <DoctorsContext.Provider>'
    )
  }

  return doctorsContext
}
