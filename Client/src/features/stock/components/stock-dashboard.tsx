import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconPackage, IconAlertTriangle, IconClock } from '@tabler/icons-react'
import { Stock } from '@/entities/Stock'
import { t } from 'i18next'

interface StockDashboardProps {
  stockItems: Stock[]
}

export function StockDashboard({ stockItems }: StockDashboardProps) {
  const totalItems = stockItems.length
  const lowStockItems = stockItems.filter(item => item.quantity <= item.minQuantity).length
  const expiredItems = stockItems.filter(item => {
    if (!item.expiryDate) return false
    const expiryDate = new Date(item.expiryDate)
    const today = new Date()
    return expiryDate < today
  }).length
  const totalValue = stockItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('Pages.Stock.TotalItems')}</CardTitle>
          <IconPackage className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">
            Itens cadastrados no sistema
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('Pages.Stock.LowStockItems')}</CardTitle>
          <IconAlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
          <p className="text-xs text-muted-foreground">
            Itens com estoque baixo
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('Pages.Stock.ExpiredItems')}</CardTitle>
          <IconClock className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{expiredItems}</div>
          <p className="text-xs text-muted-foreground">
            Itens expirados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('Pages.Stock.TotalValue')}</CardTitle>
          <IconClock className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">R$ {totalValue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Valor total em estoque
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 