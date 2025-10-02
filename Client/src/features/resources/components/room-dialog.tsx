import { useState } from 'react'
import { t } from 'i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Room } from '../types'

interface RoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  room: Room | null
  onSave: (room: Room) => void
}

export function RoomDialog({ open, onOpenChange, room, onSave }: RoomDialogProps) {
  const [formData, setFormData] = useState<Partial<Room>>(
    room || {
      type: 'private',
      status: 'available',
      capacity: 1,
      currentOccupancy: 0,
      floor: 1,
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: room?.id || Date.now().toString(),
      createdAt: room?.createdAt || new Date(),
      updatedAt: new Date(),
      ...formData,
    } as Room)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {room ? t('Resources.Rooms.EditRoom') : t('Resources.Rooms.AddRoom')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder={t('Resources.Rooms.Number')}
            value={formData.number || ''}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
          />
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as Room['type'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('Resources.Rooms.SelectType')} />
            </SelectTrigger>
            <SelectContent>
              {['private', 'shared', 'intensive_care', 'surgery', 'emergency'].map((type) => (
                <SelectItem key={type} value={type}>
                  {t(`Resources.Rooms.Types.${type}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as Room['status'] })}
          >
            <SelectTrigger>
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
          <Input
            type="number"
            placeholder={t('Resources.Rooms.Capacity')}
            value={formData.capacity || ''}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            required
            min={1}
          />
          <Input
            type="number"
            placeholder={t('Resources.Rooms.CurrentOccupancy')}
            value={formData.currentOccupancy || ''}
            onChange={(e) => setFormData({ ...formData, currentOccupancy: parseInt(e.target.value) })}
            required
            min={0}
          />
          <Input
            type="number"
            placeholder={t('Resources.Rooms.Floor')}
            value={formData.floor || ''}
            onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
            required
          />
          <Input
            placeholder={t('Resources.Rooms.Description')}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              {t('Common.Cancel')}
            </Button>
            <Button type="submit">{t('Common.Save')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 