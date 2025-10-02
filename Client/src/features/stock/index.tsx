import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/table/entity-Table'
import { IconPlus } from '@tabler/icons-react'
import { Stock, StockFilters } from '@/entities/Stock'
import { Supplier } from '@/entities/Supplier'
import { t } from 'i18next'
import { toast } from 'react-toastify'
import { stockColumns } from './components/stock-columns'
import { StockActionDialog } from './components/stock-action-dialog'
import { StockFilters as StockFiltersComponent } from './components/stock-filters'
import { StockDashboard } from './components/stock-dashboard'

// Mock data for suppliers
const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'Fornecedor Médico Ltda',
    contactPerson: 'João Silva',
    email: 'joao@fornecedormedico.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    country: 'Brasil',
    cnpj: '12.345.678/0001-90',
    category: 'Medical',
    rating: 4.5,
    status: 'Active',
    paymentTerms: '30 dias',
    notes: 'Fornecedor confiável',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Equipamentos Hospitalares SA',
    contactPerson: 'Maria Santos',
    email: 'maria@equipamentos.com',
    phone: '(11) 88888-8888',
    address: 'Av. Paulista, 456',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    country: 'Brasil',
    cnpj: '98.765.432/0001-10',
    category: 'Equipment',
    rating: 4.8,
    status: 'Active',
    paymentTerms: '15 dias',
    notes: 'Especialista em equipamentos',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    name: 'Farmacêutica Nacional',
    contactPerson: 'Pedro Costa',
    email: 'pedro@farmaceutica.com',
    phone: '(11) 77777-7777',
    address: 'Rua Augusta, 789',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01212-000',
    country: 'Brasil',
    cnpj: '11.222.333/0001-44',
    category: 'Pharmaceutical',
    rating: 4.2,
    status: 'Active',
    paymentTerms: '45 dias',
    notes: 'Medicamentos de qualidade',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

// Mock data for stock items
const mockStockData: Stock[] = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    description: 'Analgésico e antitérmico',
    category: 'Pharmaceutical',
    type: 'Medicine',
    quantity: 150,
    minQuantity: 50,
    maxQuantity: 500,
    unit: 'Box',
    price: 15.50,
    supplierId: 3,
    location: 'Prateleira A1',
    expiryDate: '2025-06-15',
    batchNumber: 'BATCH001',
    status: 'Active',
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Seringa 10ml',
    description: 'Seringa descartável 10ml',
    category: 'Medical',
    type: 'Consumable',
    quantity: 25,
    minQuantity: 30,
    maxQuantity: 200,
    unit: 'Unit',
    price: 2.80,
    supplierId: 1,
    location: 'Prateleira B2',
    expiryDate: '2026-03-20',
    batchNumber: 'BATCH002',
    status: 'LowStock',
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 3,
    name: 'Monitor Multiparamétrico',
    description: 'Monitor de sinais vitais',
    category: 'Equipment',
    type: 'Equipment',
    quantity: 3,
    minQuantity: 2,
    maxQuantity: 10,
    unit: 'Piece',
    price: 8500.00,
    supplierId: 2,
    location: 'Sala de Equipamentos',
    expiryDate: null,
    batchNumber: 'BATCH003',
    status: 'Active',
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 4,
    name: 'Luvas de Látex M',
    description: 'Luvas descartáveis tamanho M',
    category: 'Medical',
    type: 'Consumable',
    quantity: 0,
    minQuantity: 100,
    maxQuantity: 1000,
    unit: 'Box',
    price: 45.00,
    supplierId: 1,
    location: 'Prateleira C3',
    expiryDate: '2024-12-31',
    batchNumber: 'BATCH004',
    status: 'LowStock',
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 5,
    name: 'Ibuprofeno 400mg',
    description: 'Anti-inflamatório',
    category: 'Pharmaceutical',
    type: 'Medicine',
    quantity: 75,
    minQuantity: 50,
    maxQuantity: 300,
    unit: 'Box',
    price: 18.90,
    supplierId: 3,
    location: 'Prateleira A2',
    expiryDate: '2024-05-10',
    batchNumber: 'BATCH005',
    status: 'Expired',
    lastUpdated: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
]

export function StockPage() {
  const [stockData, setStockData] = useState<Stock[]>(mockStockData)
  const [filters, setFilters] = useState<StockFilters>({})
  const [currentRow, setCurrentRow] = useState<Stock | null>(null)
  const [dialogOpen, setDialogOpen] = useState<'add' | 'edit' | null>(null)

  const filteredData = useMemo(() => {
    return stockData.filter((item) => {
      if (filters.name && !item.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false
      }
      if (filters.category && item.category !== filters.category) {
        return false
      }
      if (filters.type && item.type !== filters.type) {
        return false
      }
      if (filters.status && item.status !== filters.status) {
        return false
      }
      if (filters.supplierId && item.supplierId !== filters.supplierId) {
        return false
      }
      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      if (filters.minQuantity && item.quantity < filters.minQuantity) {
        return false
      }
      if (filters.maxQuantity && item.quantity > filters.maxQuantity) {
        return false
      }
      return true
    })
  }, [stockData, filters])

  const handleSaveStock = (stock: Stock) => {
    if (currentRow) {
      setStockData(prev => prev.map(item => item.id === stock.id ? stock : item))
      toast.success('Item atualizado com sucesso!')
    } else {
      setStockData(prev => [...prev, stock])
      toast.success('Item adicionado com sucesso!')
    }
  }

  const handleDeleteStock = (stock: Stock) => {
    setStockData(prev => prev.filter(item => item.id !== stock.id))
    toast.success('Item excluído com sucesso!')
  }

  const handleEditStock = (stock: Stock) => {
    setCurrentRow(stock)
    setDialogOpen('edit')
  }

  const handleAddStock = () => {
    setCurrentRow(null)
    setDialogOpen('add')
  }

  const getSupplierName = (supplierId: number) => {
    const supplier = mockSuppliers.find(s => s.id === supplierId)
    return supplier?.name || 'Fornecedor não encontrado'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('Pages.Stock.Title')}</h1>
          <p className="text-muted-foreground">{t('Pages.Stock.Description')}</p>
        </div>
        <Button onClick={handleAddStock}>
          <IconPlus className="mr-2 h-4 w-4" />
          {t('Pages.Stock.AddStockItem')}
        </Button>
      </div>

      <StockDashboard stockItems={stockData} />

      <Card>
        <CardHeader>
          <CardTitle>{t('Pages.Stock.StockItems')}</CardTitle>
          <CardDescription>
            Gerencie todos os itens do estoque do hospital
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <StockFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            suppliers={mockSuppliers}
          />
          <DataTable
            columns={stockColumns({
              onEdit: handleEditStock,
              onDelete: handleDeleteStock,
            })}
            data={filteredData}
          />
        </CardContent>
      </Card>

      <StockActionDialog
        open={dialogOpen !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogOpen(null)
            setCurrentRow(null)
          }
        }}
        currentRow={currentRow}
        suppliers={mockSuppliers}
        onSave={handleSaveStock}
      />
    </div>
  )
} 