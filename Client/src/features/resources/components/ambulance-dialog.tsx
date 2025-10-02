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
import { Ambulance } from '../types'

interface AmbulanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ambulance: Ambulance | null
  onSave: (ambulance: Ambulance) => void
}

export function AmbulanceDialog({
  open,
  onOpenChange,
  ambulance,
  onSave,
}: AmbulanceDialogProps) {
  const [formData, setFormData] = useState<Partial<Ambulance>>(
    ambulance || {
      type: 'basic',
      status: 'available',
      year: new Date().getFullYear(),
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: ambulance?.id || Date.now().toString(),
      createdAt: ambulance?.createdAt || new Date(),
      updatedAt: new Date(),
      ...formData,
    } as Ambulance)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {ambulance
              ? t('Resources.Ambulance.EditAmbulance')
              : t('Resources.Ambulance.AddAmbulance')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder={t('Resources.Ambulance.Plate')}
            value={formData.plate || ''}
            onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
            required
          />
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value as Ambulance['type'] })
            }
          >
            <SelectTrigger>
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
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as Ambulance['status'] })
            }
          >
            <SelectTrigger>
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
          <Input
            placeholder={t('Resources.Ambulance.Model')}
            value={formData.model || ''}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder={t('Resources.Ambulance.Year')}
            value={formData.year || ''}
            onChange={(e) =>
              setFormData({ ...formData, year: parseInt(e.target.value) })
            }
            required
            min={1900}
            max={new Date().getFullYear() + 1}
          />
          <Input
            type="datetime-local"
            placeholder={t('Resources.Ambulance.LastMaintenance')}
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
            placeholder={t('Resources.Ambulance.NextMaintenance')}
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
            placeholder={t('Resources.Ambulance.Description')}
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