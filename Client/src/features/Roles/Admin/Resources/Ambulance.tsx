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
import { AmbulanceDialog } from '@/features/resources/components/ambulance-dialog'
import { Ambulance, ResourceFilters } from '@/features/resources/types'

interface AmbulanceAdminProps {
  auth: Auth
}

// Mock data - Replace with API calls
const mockAmbulances: Ambulance[] = [
  {
    id: '1',
    plate: 'ABC-1234',
    type: 'basic',
    status: 'available',
    model: 'Fiat Ducato',
    year: 2023,
    lastMaintenance: new Date('2024-02-01'),
    nextMaintenance: new Date('2024-05-01'),
    description: 'Basic life support ambulance',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function AmbulanceAdmin({ auth }: AmbulanceAdminProps) {
  const [ambulances, setAmbulances] = useState<Ambulance[]>(mockAmbulances)
  const [filters, setFilters] = useState<ResourceFilters>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null)

  const handleAddAmbulance = () => {
    setSelectedAmbulance(null)
    setIsDialogOpen(true)
  }

  const handleEditAmbulance = (ambulance: Ambulance) => {
    setSelectedAmbulance(ambulance)
    setIsDialogOpen(true)
  }

  const handleSaveAmbulance = async (ambulance: Ambulance) => {
    if (selectedAmbulance) {
      // Update existing ambulance
      setAmbulances(ambulances.map((a) => (a.id === ambulance.id ? ambulance : a)))
    } else {
      // Add new ambulance
      setAmbulances([...ambulances, ambulance])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteAmbulance = async (ambulanceId: string) => {
    setAmbulances(ambulances.filter((a) => a.id !== ambulanceId))
  }

  const handleFilterChange = (key: keyof ResourceFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined })
  }

  const filteredAmbulances = ambulances.filter((ambulance) => {
    if (filters.type && ambulance.type !== filters.type) return false
    if (filters.status && ambulance.status !== filters.status) return false
    if (
      filters.search &&
      !ambulance.plate.toLowerCase().includes(filters.search.toLowerCase()) &&
      !ambulance.model.toLowerCase().includes(filters.search.toLowerCase()) &&
      !ambulance.description?.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('Resources.Ambulance.Title')}
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={handleAddAmbulance}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Resources.Ambulance.AddAmbulance')}
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
            <SelectValue placeholder={t('Resources.Ambulance.SelectType')} />
          </SelectTrigger>
          <SelectContent>
            {['basic', 'advanced', 'intensive_care'].map((type) => (
              <SelectItem key={type} value={type}>
                {t(`Resources.Ambulance.Types.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('Resources.Ambulance.SelectStatus')} />
          </SelectTrigger>
          <SelectContent>
            {['available', 'on_call', 'maintenance', 'out_of_service'].map(
              (status) => (
                <SelectItem key={status} value={status}>
                  {t(`Resources.Ambulance.Status.${status}`)}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Resources.Ambulance.Plate')}</TableHead>
              <TableHead>{t('Resources.Ambulance.Model')}</TableHead>
              <TableHead>{t('Resources.Ambulance.Type')}</TableHead>
              <TableHead>{t('Resources.Ambulance.Status')}</TableHead>
              <TableHead>{t('Resources.Ambulance.Year')}</TableHead>
              <TableHead>{t('Resources.Ambulance.NextMaintenance')}</TableHead>
              <TableHead className="text-right">{t('Common.Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAmbulances.map((ambulance) => (
              <TableRow key={ambulance.id}>
                <TableCell>{ambulance.plate}</TableCell>
                <TableCell>{ambulance.model}</TableCell>
                <TableCell>
                  {t(`Resources.Ambulance.Types.${ambulance.type}`)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ambulance.status === 'available'
                        ? 'outline'
                        : ambulance.status === 'on_call'
                        ? 'default'
                        : ambulance.status === 'maintenance'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {t(`Resources.Ambulance.Status.${ambulance.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>{ambulance.year}</TableCell>
                <TableCell>
                  {ambulance.nextMaintenance
                    ? new Date(ambulance.nextMaintenance).toLocaleDateString()
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
                        onClick={() => handleEditAmbulance(ambulance)}
                      >
                        {t('Common.Edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteAmbulance(ambulance.id)}
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

      <AmbulanceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        ambulance={selectedAmbulance}
        onSave={handleSaveAmbulance}
      />
    </div>
  )
} 