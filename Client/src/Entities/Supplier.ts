export interface Supplier {
  id: number
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  cnpj: string
  category: string
  rating: number
  status: 'Active' | 'Inactive' | 'Suspended'
  paymentTerms: string
  notes: string
  createdAt: string
  updatedAt: string
}

export interface SupplierFilters {
  name?: string
  category?: string
  status?: string
  city?: string
  state?: string
  rating?: number
} 