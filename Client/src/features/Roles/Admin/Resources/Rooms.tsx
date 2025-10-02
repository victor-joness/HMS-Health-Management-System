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
import { RoomDialog } from '@/features/resources/components/room-dialog'
import { Room, ResourceFilters } from '@/features/resources/types'

interface RoomsAdminProps {
  auth: Auth
}

// Mock data - Replace with API calls
const mockRooms: Room[] = [
  {
    id: '1',
    number: '101',
    type: 'private',
    status: 'available',
    capacity: 1,
    currentOccupancy: 0,
    floor: 1,
    description: 'Private room with bathroom',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function RoomsAdmin({ auth }: RoomsAdminProps) {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [filters, setFilters] = useState<ResourceFilters>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const handleAddRoom = () => {
    setSelectedRoom(null)
    setIsDialogOpen(true)
  }

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room)
    setIsDialogOpen(true)
  }

  const handleSaveRoom = async (room: Room) => {
    if (selectedRoom) {
      // Update existing room
      setRooms(rooms.map((r) => (r.id === room.id ? room : r)))
    } else {
      // Add new room
      setRooms([...rooms, room])
    }
    setIsDialogOpen(false)
  }

  const handleDeleteRoom = async (roomId: string) => {
    setRooms(rooms.filter((r) => r.id !== roomId))
  }

  const handleFilterChange = (key: keyof ResourceFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined })
  }

  const filteredRooms = rooms.filter((room) => {
    if (filters.type && room.type !== filters.type) return false
    if (filters.status && room.status !== filters.status) return false
    if (
      filters.search &&
      !room.number.toLowerCase().includes(filters.search.toLowerCase()) &&
      !room.description?.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('Resources.Rooms.Title')}
        </h2>
        <div className="flex items-center space-x-2">
          <Button onClick={handleAddRoom}>
            <Plus className="mr-2 h-4 w-4" />
            {t('Resources.Rooms.AddRoom')}
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
            <SelectValue placeholder={t('Resources.Rooms.SelectType')} />
          </SelectTrigger>
          <SelectContent>
            {['private', 'shared', 'intensive_care', 'surgery', 'emergency'].map(
              (type) => (
                <SelectItem key={type} value={type}>
                  {t(`Resources.Rooms.Types.${type}`)}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('Resources.Rooms.SelectStatus')} />
          </SelectTrigger>
          <SelectContent>
            {['available', 'occupied', 'maintenance', 'cleaning'].map((status) => (
              <SelectItem key={status} value={status}>
                {t(`Resources.Rooms.Status.${status}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Resources.Rooms.Number')}</TableHead>
              <TableHead>{t('Resources.Rooms.Type')}</TableHead>
              <TableHead>{t('Resources.Rooms.Status')}</TableHead>
              <TableHead>{t('Resources.Rooms.Capacity')}</TableHead>
              <TableHead>{t('Resources.Rooms.CurrentOccupancy')}</TableHead>
              <TableHead>{t('Resources.Rooms.Floor')}</TableHead>
              <TableHead className="text-right">{t('Common.Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.number}</TableCell>
                <TableCell>{t(`Resources.Rooms.Types.${room.type}`)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      room.status === 'available'
                        ? 'outline'
                        : room.status === 'occupied'
                        ? 'default'
                        : room.status === 'maintenance'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {t(`Resources.Rooms.Status.${room.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.currentOccupancy}</TableCell>
                <TableCell>{room.floor}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditRoom(room)}>
                        {t('Common.Edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteRoom(room.id)}>
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

      <RoomDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        room={selectedRoom}
        onSave={handleSaveRoom}
      />
    </div>
  )
} 