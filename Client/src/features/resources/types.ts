export interface Room {
  id: string
  number: string
  type: 'private' | 'shared' | 'intensive_care' | 'surgery' | 'emergency'
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning'
  capacity: number
  currentOccupancy: number
  floor: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Equipment {
  id: string
  name: string
  serialNumber: string
  type: 'diagnostic' | 'therapeutic' | 'monitoring' | 'surgical' | 'laboratory' | 'other'
  status: 'available' | 'in_use' | 'maintenance' | 'broken'
  location: string
  lastMaintenance?: Date
  nextMaintenance?: Date
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Ambulance {
  id: string
  plate: string
  type: 'basic' | 'advanced' | 'intensive_care'
  status: 'available' | 'on_call' | 'maintenance' | 'out_of_service'
  model: string
  year: number
  lastMaintenance?: Date
  nextMaintenance?: Date
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface ResourceFilters {
  search?: string
  type?: string
  status?: string
} 