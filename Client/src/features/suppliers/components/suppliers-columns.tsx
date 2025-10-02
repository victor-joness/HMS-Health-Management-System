import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconDotsVertical, IconEdit, IconTrash, IconEye, IconStar } from '@tabler/icons-react'
import { Supplier } from '@/entities/Supplier'
import { t } from 'i18next'

interface SuppliersColumnsProps {
  onEdit?: (supplier: Supplier) => void
  onDelete?: (supplier: Supplier) => void
  onView?: (supplier: Supplier) => void
}

export const suppliersColumns = ({ onEdit, onDelete, onView }: SuppliersColumnsProps = {}): ColumnDef<Supplier>[] => [
  {
    accessorKey: 'name',
    header: t('Pages.Suppliers.Name'),
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'contactPerson',
    header: 'Pessoa de Contato',
    cell: ({ row }) => <span className="text-sm">{row.getValue('contactPerson')}</span>,
  },
  {
    accessorKey: 'email',
    header: t('Pages.Suppliers.Email'),
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue('email')}</span>,
  },
  {
    accessorKey: 'phone',
    header: t('Pages.Suppliers.Phone'),
    cell: ({ row }) => <span className="text-sm">{row.getValue('phone')}</span>,
  },
  {
    accessorKey: 'category',
    header: t('Pages.Suppliers.Category'),
    cell: ({ row }) => {
      const category = row.getValue('category') as string
      return <Badge variant="secondary">{t(`Pages.Suppliers.Categories.${category}`)}</Badge>
    },
  },
  {
    accessorKey: 'rating',
    header: t('Pages.Suppliers.Rating'),
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number
      return (
        <div className="flex items-center gap-1">
          <IconStar className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: t('Pages.Suppliers.Status'),
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
        case 'Suspended':
          variant = 'destructive'
          break
      }
      
      return <Badge variant={variant}>{t(`Pages.Suppliers.Statuses.${status}`)}</Badge>
    },
  },
  {
    accessorKey: 'city',
    header: t('Pages.Suppliers.City'),
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue('city')}</span>,
  },
  {
    accessorKey: 'state',
    header: t('Pages.Suppliers.State'),
    cell: ({ row }) => <span className="text-sm">{row.getValue('state')}</span>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const supplier = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onView && (
              <DropdownMenuItem onClick={() => onView(supplier)}>
                <IconEye className="mr-2 h-4 w-4" />
                {t('Common.View')}
              </DropdownMenuItem>
            )}
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(supplier)}>
                <IconEdit className="mr-2 h-4 w-4" />
                {t('Common.Edit')}
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem className="text-red-600" onClick={() => onDelete(supplier)}>
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