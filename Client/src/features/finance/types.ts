export interface Payment {
  id: string
  number: string
  date: Date
  dueDate: Date
  amount: number
  status: 'pending' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled' | 'refunded'
  type: 'consultation' | 'procedure' | 'exam' | 'surgery' | 'medication' | 'hospitalization' | 'other'
  method: string
  category: string
  description: string
  patient?: {
    id: string
    name: string
  }
  attachments: any[]
  createdAt: Date
  updatedAt: Date
}

export interface PaymentFilters {
  search?: string
  status?: Payment['status']
  type?: Payment['type']
  method?: string
  category?: string
}

export interface PaymentStats {
  total: number
  pending: number
  paid: number
  overdue: number
  totalAmount: number
  pendingAmount: number
  overdueAmount: number
} 