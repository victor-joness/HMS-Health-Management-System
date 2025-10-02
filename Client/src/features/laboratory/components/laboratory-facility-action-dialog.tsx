import { useState, useEffect } from 'react'
import { t } from 'i18next'
import { LaboratoryFacility } from '@/entities/Laboratory'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'

interface LaboratoryFacilityActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: LaboratoryFacility | null
  onSave?: (facility: LaboratoryFacility) => void
}

export function LaboratoryFacilityActionDialog({
  open,
  onOpenChange,
  currentRow,
  onSave,
}: LaboratoryFacilityActionDialogProps) {
  const [formData, setFormData] = useState<Partial<LaboratoryFacility>>({
    name: '',
    address: '',
    phone: '',
    email: '',
    cnpj: '',
    specialties: [],
    status: 'Active',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (currentRow) {
      setFormData({
        name: currentRow.name,
        address: currentRow.address,
        phone: currentRow.phone,
        email: currentRow.email,
        cnpj: currentRow.cnpj,
        specialties: currentRow.specialties,
        status: currentRow.status,
      })
    } else {
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        cnpj: '',
        specialties: [],
        status: 'Active',
      })
    }
    setErrors({})
  }, [currentRow, open])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = t('Pages.LaboratoryFacility.ValidationErrors.NameRequired')
    }

    if (!formData.address?.trim()) {
      newErrors.address = t('Pages.LaboratoryFacility.ValidationErrors.AddressRequired')
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = t('Pages.LaboratoryFacility.ValidationErrors.PhoneRequired')
    }

    if (!formData.email?.trim()) {
      newErrors.email = t('Pages.LaboratoryFacility.ValidationErrors.EmailRequired')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('Pages.LaboratoryFacility.ValidationErrors.EmailInvalid')
    }

    if (!formData.cnpj?.trim()) {
      newErrors.cnpj = t('Pages.LaboratoryFacility.ValidationErrors.CNPJRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const facilityData: LaboratoryFacility = {
        ...formData,
        id: currentRow?.id || Date.now().toString(),
        createdAt: currentRow?.createdAt || new Date(),
        updatedAt: new Date(),
      } as LaboratoryFacility

      // Call the onSave callback if provided
      if (onSave) {
        onSave(facilityData)
      }

      if (currentRow) {
        // Atualizar laboratório existente
        toast.success(t('Pages.LaboratoryFacility.UpdateSuccess'))
      } else {
        // Criar novo laboratório
        toast.success(t('Pages.LaboratoryFacility.CreateSuccess'))
      }

      onOpenChange(false)
    } catch (error) {
      toast.error(
        currentRow
          ? t('Pages.LaboratoryFacility.UpdateError')
          : t('Pages.LaboratoryFacility.CreateError')
      )
    }
  }

  const handleSpecialtiesChange = (value: string) => {
    const specialties = value.split(',').map(s => s.trim()).filter(s => s.length > 0)
    setFormData({ ...formData, specialties })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {currentRow
              ? t('Pages.LaboratoryFacility.EditFacility')
              : t('Pages.LaboratoryFacility.AddNewFacility')}
          </DialogTitle>
          <DialogDescription>
            {currentRow
              ? t('Pages.LaboratoryFacility.UpdateFacility')
              : t('Pages.LaboratoryFacility.CreateFacility')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('Pages.LaboratoryFacility.Name')}</Label>
            <Input
              id="name"
              placeholder={t('Pages.LaboratoryFacility.NamePlaceholder')}
              value={formData.name || ''}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t('Pages.LaboratoryFacility.Address')}</Label>
            <Textarea
              id="address"
              placeholder={t('Pages.LaboratoryFacility.AddressPlaceholder')}
              value={formData.address || ''}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t('Pages.LaboratoryFacility.Phone')}</Label>
              <Input
                id="phone"
                placeholder={t('Pages.LaboratoryFacility.PhonePlaceholder')}
                value={formData.phone || ''}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('Pages.LaboratoryFacility.Email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('Pages.LaboratoryFacility.EmailPlaceholder')}
                value={formData.email || ''}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">{t('Pages.LaboratoryFacility.CNPJ')}</Label>
            <Input
              id="cnpj"
              placeholder={t('Pages.LaboratoryFacility.CNPJPlaceholder')}
              value={formData.cnpj || ''}
              onChange={(e) =>
                setFormData({ ...formData, cnpj: e.target.value })
              }
              className={errors.cnpj ? 'border-red-500' : ''}
            />
            {errors.cnpj && (
              <p className="text-sm text-red-500">{errors.cnpj}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties">{t('Pages.LaboratoryFacility.Specialties')}</Label>
            <Input
              id="specialties"
              placeholder={t('Pages.LaboratoryFacility.SpecialtiesPlaceholder')}
              value={formData.specialties?.join(', ') || ''}
              onChange={(e) => handleSpecialtiesChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t('Common.Status')}</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as LaboratoryFacility['status'] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(t('Pages.Laboratory.Status', { returnObjects: true }) as Record<string, string>).map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`Pages.Laboratory.Status.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('Common.Cancel')}
            </Button>
            <Button type="submit">
              {t('Pages.LaboratoryFacility.Save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 