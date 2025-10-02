import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/table/entity-Table'
import { IconPlus } from '@tabler/icons-react'
import { Supplier, SupplierFilters } from '@/entities/Supplier'
import { t } from 'i18next'
import { toast } from 'react-toastify'
import { suppliersColumns } from './components/suppliers-columns'
import { SuppliersActionDialog } from './components/suppliers-action-dialog'
import { SuppliersFilters } from './components/suppliers-filters'
import { SuppliersDashboard } from './components/suppliers-dashboard'

// Mock data for suppliers
const mockSuppliersData: Supplier[] = [
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
  {
    id: 4,
    name: 'Laboratórios Unidos',
    contactPerson: 'Ana Oliveira',
    email: 'ana@laboratorios.com',
    phone: '(11) 66666-6666',
    address: 'Rua Consolação, 321',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01302-001',
    country: 'Brasil',
    cnpj: '44.555.666/0001-77',
    category: 'Laboratory',
    rating: 4.7,
    status: 'Active',
    paymentTerms: '30 dias',
    notes: 'Especialista em exames laboratoriais',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 5,
    name: 'Tecnologia Médica Avançada',
    contactPerson: 'Carlos Mendes',
    email: 'carlos@tecnologia.com',
    phone: '(11) 55555-5555',
    address: 'Av. Brigadeiro Faria Lima, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01452-002',
    country: 'Brasil',
    cnpj: '77.888.999/0001-11',
    category: 'Technology',
    rating: 4.9,
    status: 'Active',
    paymentTerms: '60 dias',
    notes: 'Tecnologia de ponta para hospitais',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 6,
    name: 'Fornecedor Suspenso Ltda',
    contactPerson: 'Roberto Silva',
    email: 'roberto@suspenso.com',
    phone: '(11) 44444-4444',
    address: 'Rua das Palmeiras, 555',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    country: 'Brasil',
    cnpj: '22.333.444/0001-55',
    category: 'Other',
    rating: 2.1,
    status: 'Suspended',
    paymentTerms: '30 dias',
    notes: 'Fornecedor com problemas de qualidade',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
]

export function SuppliersPage() {
  const [suppliersData, setSuppliersData] = useState<Supplier[]>(mockSuppliersData)
  const [filters, setFilters] = useState<SupplierFilters>({})
  const [currentRow, setCurrentRow] = useState<Supplier | null>(null)
  const [dialogOpen, setDialogOpen] = useState<'add' | 'edit' | null>(null)

  const filteredData = useMemo(() => {
    return suppliersData.filter((supplier) => {
      if (filters.name && !supplier.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false
      }
      if (filters.category && supplier.category !== filters.category) {
        return false
      }
      if (filters.status && supplier.status !== filters.status) {
        return false
      }
      if (filters.city && !supplier.city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false
      }
      if (filters.state && !supplier.state.toLowerCase().includes(filters.state.toLowerCase())) {
        return false
      }
      if (filters.rating && supplier.rating < filters.rating) {
        return false
      }
      return true
    })
  }, [suppliersData, filters])

  const handleSaveSupplier = (supplier: Supplier) => {
    if (currentRow) {
      setSuppliersData(prev => prev.map(item => item.id === supplier.id ? supplier : item))
      toast.success('Fornecedor atualizado com sucesso!')
    } else {
      setSuppliersData(prev => [...prev, supplier])
      toast.success('Fornecedor adicionado com sucesso!')
    }
  }

  const handleDeleteSupplier = (supplier: Supplier) => {
    setSuppliersData(prev => prev.filter(item => item.id !== supplier.id))
    toast.success('Fornecedor excluído com sucesso!')
  }

  const handleEditSupplier = (supplier: Supplier) => {
    setCurrentRow(supplier)
    setDialogOpen('edit')
  }

  const handleAddSupplier = () => {
    setCurrentRow(null)
    setDialogOpen('add')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('Pages.Suppliers.Title')}</h1>
          <p className="text-muted-foreground">{t('Pages.Suppliers.Description')}</p>
        </div>
        <Button onClick={handleAddSupplier}>
          <IconPlus className="mr-2 h-4 w-4" />
          {t('Pages.Suppliers.AddSupplier')}
        </Button>
      </div>

      <SuppliersDashboard suppliers={suppliersData} />

      <Card>
        <CardHeader>
          <CardTitle>{t('Pages.Suppliers.SupplierList')}</CardTitle>
          <CardDescription>
            Gerencie todos os fornecedores do hospital
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SuppliersFilters
            filters={filters}
            onFiltersChange={setFilters}
          />
          <DataTable
            columns={suppliersColumns({
              onEdit: handleEditSupplier,
              onDelete: handleDeleteSupplier,
            })}
            data={filteredData}
          />
        </CardContent>
      </Card>

      <SuppliersActionDialog
        open={dialogOpen !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogOpen(null)
            setCurrentRow(null)
          }
        }}
        currentRow={currentRow}
        onSave={handleSaveSupplier}
      />
    </div>
  )
} 