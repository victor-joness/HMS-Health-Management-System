export interface Stock {
  id: number
  name: string
  description: string
  category: string
  type: string
  quantity: number
  minQuantity: number
  maxQuantity: number
  unit: string
  price: number
  supplierId: number
  location: string
  expiryDate: string | null
  batchNumber: string
  status: 'Active' | 'Inactive' | 'Expired' | 'LowStock'
  lastUpdated: string
  createdAt: string
  updatedAt: string
}

export interface StockFilters {
  name?: string
  category?: string
  type?: string
  status?: string
  supplierId?: number
  minQuantity?: number
  maxQuantity?: number
  location?: string
} 