export interface LaboratoryFacility {
  id: string
  name: string
  address: string
  phone: string
  email: string
  cnpj: string
  specialties: string[]
  status: 'Active' | 'Inactive' | 'Maintenance'
  createdAt: Date
  updatedAt: Date
}

export interface Laboratory {
  id: string
  name: string
  description: string
  category: 'Blood' | 'Urine' | 'Stool' | 'Tissue' | 'Imaging' | 'Cardiac' | 'Neurological' | 'Other'
  type: 'Basic' | 'Advanced' | 'Specialized' | 'Emergency'
  price: number
  duration: number // em minutos
  deliveryTime: number // tempo de entrega em horas
  preparationInstructions: string
  normalValues: string
  equipment: string
  status: 'Active' | 'Inactive' | 'Maintenance'
  facilityId: string // ID do laboratório onde o exame é realizado
  createdAt: Date
  updatedAt: Date
}

export interface LaboratoryFilters {
  search?: string
  category?: string
  type?: string
  status?: string
  facilityId?: string
  minPrice?: number
  maxPrice?: number
  minDeliveryTime?: number
  maxDeliveryTime?: number
} 