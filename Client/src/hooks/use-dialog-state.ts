import { useState } from 'react'

export default function useDialogState<T extends string | boolean | null>(initialState: T) {
  return useState<T>(initialState)
} 