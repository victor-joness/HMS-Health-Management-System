import { ColumnDef } from '@tanstack/react-table'
import { Laboratory, LaboratoryFacility } from '@/entities/Laboratory'
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
import { useLaboratoryContext } from '../context/laboratory-context'

// Mock data for facilities - in real app this would come from context or props
const mockFacilities: LaboratoryFacility[] = [
  {
    id: '1',
    name: 'Laboratório Central',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 9999-9999',
    email: 'contato@labcentral.com',
    cnpj: '12.345.678/0001-90',
    specialties: ['Sangue', 'Urina', 'Bioquímica'],
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Laboratório Especializado',
    address: 'Av. Paulista, 1000 - Bela Vista',
    phone: '(11) 8888-8888',
    email: 'contato@labespecializado.com',
    cnpj: '98.765.432/0001-10',
    specialties: ['Imagem', 'Cardíaco', 'Neurológico'],
    status: 'Active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const getFacilityName = (facilityId: string): string => {
  const facility = mockFacilities.find(f => f.id === facilityId)
  return facility?.name || 'N/A'
}

export const laboratoryColumns: ColumnDef<Laboratory>[] = [
  {
    accessorKey: 'name',
    header: t('Pages.Laboratory.Name'),
  },
  {
    accessorKey: 'category',
    header: t('Pages.Laboratory.Category'),
    cell: ({ row }) => {
      const category = row.getValue('category') as string
      return (
        <Badge variant="secondary">
          {t(`Pages.Laboratory.Categories.${category}`)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'type',
    header: t('Pages.Laboratory.Type.Title'),
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      return (
        <Badge variant="outline">
          {t(`Pages.Laboratory.Type.${type}`)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'price',
    header: t('Pages.Laboratory.Price'),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price)
      return formatted
    },
  },
  {
    accessorKey: 'duration',
    header: t('Pages.Laboratory.Duration'),
    cell: ({ row }) => {
      const duration = row.getValue('duration') as number
      return `${duration} min`
    },
  },
                {
                accessorKey: 'deliveryTime',
                header: t('Pages.Laboratory.DeliveryTime'),
                cell: ({ row }) => {
                  const deliveryTime = row.getValue('deliveryTime') as number
                  return (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{deliveryTime}h</span>
                    </div>
                  )
                },
              },
              {
                accessorKey: 'facilityId',
                header: t('Pages.Laboratory.Facility'),
                cell: ({ row }) => {
                  const facilityId = row.getValue('facilityId') as string
                  // Aqui você buscaria o nome do laboratório pelo ID
                  const facilityName = getFacilityName(facilityId)
                  return (
                    <Badge variant="outline">
                      {facilityName || 'N/A'}
                    </Badge>
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
      const laboratory = row.original
      const { setOpen, setCurrentRow } = useLaboratoryContext()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setCurrentRow(laboratory)
                setOpen('edit')
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              {t('Common.Edit')}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setCurrentRow(laboratory)
                setOpen('delete')
              }}
              className="text-red-600"
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