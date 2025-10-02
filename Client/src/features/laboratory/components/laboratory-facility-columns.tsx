import { ColumnDef } from '@tanstack/react-table'
import { LaboratoryFacility } from '@/entities/Laboratory'
import { t } from 'i18next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface LaboratoryFacilityColumnsProps {
  onEdit?: (facility: LaboratoryFacility) => void
  onDelete?: (facility: LaboratoryFacility) => void
}

export const laboratoryFacilityColumns = ({ onEdit, onDelete }: LaboratoryFacilityColumnsProps = {}): ColumnDef<LaboratoryFacility>[] => [
  {
    accessorKey: 'name',
    header: t('Pages.LaboratoryFacility.Name'),
  },
  {
    accessorKey: 'address',
    header: t('Pages.LaboratoryFacility.Address'),
  },
  {
    accessorKey: 'phone',
    header: t('Pages.LaboratoryFacility.Phone'),
  },
  {
    accessorKey: 'email',
    header: t('Pages.LaboratoryFacility.Email'),
  },
  {
    accessorKey: 'cnpj',
    header: t('Pages.LaboratoryFacility.CNPJ'),
  },
  {
    accessorKey: 'specialties',
    header: 'Especialidades',
    cell: ({ row }) => {
      const specialties = row.getValue('specialties') as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: t('Common.Status'),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusMap = {
        Active: { variant: 'default' as const, label: t('Pages.Laboratory.Status.Active') },
        Inactive: { variant: 'secondary' as const, label: t('Pages.Laboratory.Status.Inactive') },
        Maintenance: { variant: 'destructive' as const, label: t('Pages.Laboratory.Status.Maintenance') },
      }
      const statusInfo = statusMap[status as keyof typeof statusMap]
      return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const facility = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(facility)}>
              <Edit className="mr-2 h-4 w-4" />
              {t('Common.Edit')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => onDelete?.(facility)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {t('Common.Delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 