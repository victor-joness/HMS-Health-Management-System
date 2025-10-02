import { useState } from 'react'
import { t } from 'i18next'
import { Auth } from '@/entities/Auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Plus } from 'lucide-react'
import { EquipmentDialog } from '@/features/resources/components/equipment-dialog'
import { Equipment, ResourceFilters } from '@/features/resources/types'

interface EquipmentAdminProps {
  auth: Auth
}

// Mock data - Replace with API calls
const mockEquipments: Equipment[] = [
  {
    id: '1',
    name: 'X-Ray Machine',
    serialNumber: 'XR-2024-001',
    type: 'diagnostic',
    status: 'available',
    location: 'Radiology Department',
    lastMaintenance: new Date('2024-02-01'),
    nextMaintenance: new Date('2024-05-01'),
    description: 'High-performance X-ray imaging system',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function EquipmentAdmin({ auth }: EquipmentAdminProps) {
  const [equipments, setEquipments] = useState<Equipment[]>(mockEquipments)
  const [filters, setFilters] = useState<ResourceFilters>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)

  const handleAddEquipment = () => {
    setSelectedEquipment(null)
    setIsDialogOpen(true)
  }

  const handleEditEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setIsDialogOpen(true)
  }

  const handleSaveEquipment = async (equipment: Equipment) => {
    if (selectedEquipment) {
      // Update existing equipment
      setEquipments(equipments.map((e) => (e.id === equipment.id ? equipment : e)))
    } else {
      // Add new equipment
      setEquipments([...equipments, equipment])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteEquipment = async (equipmentId: string) => {
    setEquipments(equipments.filter((e) => e.id !== equipmentId))
  }

  const handleFilterChange = (key: keyof ResourceFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined })
  }

  const filteredEquipments = equipments.filter((equipment) => {
    if (filters.type && equipment.type !== filters.type) return false
    if (filters.status && equipment.status !== filters.status) return false
    if (
      filters.search &&
      !equipment.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !equipment.serialNumber.toLowerCase().includes(filters.search.toLowerCase()) &&
      !equipment.description?.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('Resources.Equipment.Title')}
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={handleAddEquipment}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Resources.Equipment.AddEquipment')}
          </Button>
        </div>
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder={t('Common.Search')}
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('Resources.Equipment.SelectType')} />
          </SelectTrigger>
          <SelectContent>
            {[
              'diagnostic',
              'therapeutic',
              'monitoring',
              'surgical',
              'laboratory',
              'other',
            ].map((type) => (
              <SelectItem key={type} value={type}>
                {t(`Resources.Equipment.Types.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('Resources.Equipment.SelectStatus')} />
          </SelectTrigger>
          <SelectContent>
            {['available', 'in_use', 'maintenance', 'broken'].map((status) => (
              <SelectItem key={status} value={status}>
                {t(`Resources.Equipment.Status.${status}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Resources.Equipment.Name')}</TableHead>
              <TableHead>{t('Resources.Equipment.SerialNumber')}</TableHead>
              <TableHead>{t('Resources.Equipment.Type')}</TableHead>
              <TableHead>{t('Resources.Equipment.Status')}</TableHead>
              <TableHead>{t('Resources.Equipment.Location')}</TableHead>
              <TableHead>{t('Resources.Equipment.NextMaintenance')}</TableHead>
              <TableHead className="text-right">{t('Common.Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipments.map((equipment) => (
              <TableRow key={equipment.id}>
                <TableCell>{equipment.name}</TableCell>
                <TableCell>{equipment.serialNumber}</TableCell>
                <TableCell>
                  {t(`Resources.Equipment.Types.${equipment.type}`)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      equipment.status === 'available'
                        ? 'outline'
                        : equipment.status === 'in_use'
                        ? 'default'
                        : equipment.status === 'maintenance'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {t(`Resources.Equipment.Status.${equipment.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>{equipment.location}</TableCell>
                <TableCell>
                  {equipment.nextMaintenance
                    ? new Date(equipment.nextMaintenance).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditEquipment(equipment)}
                      >
                        {t('Common.Edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteEquipment(equipment.id)}
                      >
                        {t('Common.Delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EquipmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        equipment={selectedEquipment}
        onSave={handleSaveEquipment}
      />
    </div>
  )
} 