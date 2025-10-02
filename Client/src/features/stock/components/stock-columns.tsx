import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconDotsVertical, IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import { Stock } from '@/entities/Stock'
import { t } from 'i18next'

interface StockColumnsProps {
  onEdit?: (stock: Stock) => void
  onDelete?: (stock: Stock) => void
  onView?: (stock: Stock) => void
}

export const stockColumns = ({ onEdit, onDelete, onView }: StockColumnsProps = {}): ColumnDef<Stock>[] => [
  {
    accessorKey: 'name',
    header: t('Pages.Stock.Name'),
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'category',
    header: t('Pages.Stock.Category'),
    cell: ({ row }) => {
      const category = row.getValue('category') as string
      return <Badge variant="secondary">{t(`Pages.Stock.Categories.${category}`)}</Badge>
    },
  },
  {
    accessorKey: 'type',
    header: t('Pages.Stock.Type'),
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return <Badge variant="outline">{t(`Pages.Stock.Types.${type}`)}</Badge>
    },
  },
  {
    accessorKey: 'quantity',
    header: t('Pages.Stock.Quantity'),
    cell: ({ row }) => {
      const quantity = row.getValue('quantity') as number
      const minQuantity = row.original.minQuantity
      const unit = row.original.unit
      
      let color = 'text-green-600'
      if (quantity <= minQuantity) {
        color = 'text-red-600'
      } else if (quantity <= minQuantity * 1.5) {
        color = 'text-yellow-600'
      }
      
      return <span className={`font-medium ${color}`}>{quantity} {t(`Pages.Stock.Units.${unit}`)}</span>
    },
  },
  {
    accessorKey: 'price',
    header: t('Pages.Stock.Price'),
    cell: ({ row }) => {
      const price = row.getValue('price') as number
      return <span className="font-medium">R$ {price.toFixed(2)}</span>
    },
  },
  {
    accessorKey: 'location',
    header: t('Pages.Stock.Location'),
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue('location')}</span>,
  },
  {
    accessorKey: 'status',
    header: t('Pages.Stock.Status'),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default'
      
      switch (status) {
        case 'Active':
          variant = 'default'
          break
        case 'Inactive':
          variant = 'secondary'
          break
        case 'Expired':
          variant = 'destructive'
          break
        case 'LowStock':
          variant = 'outline'
          break
      }
      
      return <Badge variant={variant}>{t(`Pages.Stock.Statuses.${status}`)}</Badge>
    },
  },
  {
    accessorKey: 'expiryDate',
    header: t('Pages.Stock.ExpiryDate'),
    cell: ({ row }) => {
      const expiryDate = row.getValue('expiryDate') as string
      if (!expiryDate) return <span className="text-sm text-muted-foreground">-</span>
      
      const date = new Date(expiryDate)
      const today = new Date()
      const daysUntilExpiry = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      
      let color = 'text-green-600'
      if (daysUntilExpiry < 0) {
        color = 'text-red-600'
      } else if (daysUntilExpiry <= 30) {
        color = 'text-yellow-600'
      }
      
      return <span className={`text-sm ${color}`}>{date.toLocaleDateString('pt-BR')}</span>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const stock = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onView && (
              <DropdownMenuItem onClick={() => onView(stock)}>
                <IconEye className="mr-2 h-4 w-4" />
                {t('Common.View')}
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(stock)}>
                <IconEdit className="mr-2 h-4 w-4" />
                {t('Common.Edit')}
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(stock)}>
                <IconTrash className="mr-2 h-4 w-4" />
                {t('Common.Delete')}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 