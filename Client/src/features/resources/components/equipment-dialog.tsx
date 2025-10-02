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
import { Equipment } from '../types'

interface EquipmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  equipment: Equipment | null
  onSave: (equipment: Equipment) => void
}

export function EquipmentDialog({
  open,
  onOpenChange,
  equipment,
  onSave,
}: EquipmentDialogProps) {
  const [formData, setFormData] = useState<Partial<Equipment>>(
    equipment || {
      type: 'diagnostic',
      status: 'available',
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: equipment?.id || Date.now().toString(),
      createdAt: equipment?.createdAt || new Date(),
      updatedAt: new Date(),
      ...formData,
    } as Equipment)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {equipment
              ? t('Resources.Equipment.EditEquipment')
              : t('Resources.Equipment.AddEquipment')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder={t('Resources.Equipment.Name')}
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            placeholder={t('Resources.Equipment.SerialNumber')}
            value={formData.serialNumber || ''}
            onChange={(e) =>
              setFormData({ ...formData, serialNumber: e.target.value })
            }
            required
          />
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value as Equipment['type'] })
            }
          >
            <SelectTrigger>
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
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as Equipment['status'] })
            }
          >
            <SelectTrigger>
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
          <Input
            placeholder={t('Resources.Equipment.Location')}
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Input
            type="datetime-local"
            placeholder={t('Resources.Equipment.LastMaintenance')}
            value={
              formData.lastMaintenance
                ? new Date(formData.lastMaintenance).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                lastMaintenance: new Date(e.target.value),
              })
            }
          />
          <Input
            type="datetime-local"
            placeholder={t('Resources.Equipment.NextMaintenance')}
            value={
              formData.nextMaintenance
                ? new Date(formData.nextMaintenance).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                nextMaintenance: new Date(e.target.value),
              })
            }
          />
          <Input
            placeholder={t('Resources.Equipment.Description')}
            value={formData.description || ''}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
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