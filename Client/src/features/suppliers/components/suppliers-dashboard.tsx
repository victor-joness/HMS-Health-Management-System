import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IconUsers, IconStar, IconBuilding, IconDollarSign } from '@tabler/icons-react'
import { Supplier } from '@/entities/Supplier'
import { t } from 'i18next'

interface SuppliersDashboardProps {
  suppliers: Supplier[]
}

export function SuppliersDashboard({ suppliers }: SuppliersDashboardProps) {
  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter(supplier => supplier.status === 'Active').length
  const topRatedSuppliers = suppliers.filter(supplier => supplier.rating >= 4.5).length
  const averageRating = suppliers.length > 0 
    ? suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length 
    : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('Pages.Suppliers.TotalSuppliers')}</CardTitle>
          <IconUsers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSuppliers}</div>
          <p className="text-xs text-muted-foreground">
            Fornecedores cadastrados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('Pages.Suppliers.ActiveSuppliers')}</CardTitle>
          <IconBuilding className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{activeSuppliers}</div>
          <p className="text-xs text-muted-foreground">
            Fornecedores ativos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('Pages.Suppliers.TopRatedSuppliers')}</CardTitle>
          <IconStar className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{topRatedSuppliers}</div>
          <p className="text-xs text-muted-foreground">
            Avaliação 4.5+ estrelas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
          <IconStar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">
            Média geral dos fornecedores
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 