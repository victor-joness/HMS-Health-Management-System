import { useState, useEffect } from 'react'
import { t } from 'i18next'
import { Laboratory } from '@/entities/Laboratory'
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

interface LaboratoryActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Laboratory | null
}

export function LaboratoryActionDialog({
  open,
  onOpenChange,
  currentRow,
}: LaboratoryActionDialogProps) {
                const [formData, setFormData] = useState<Partial<Laboratory>>({
                name: '',
                description: '',
                category: 'Blood',
                type: 'Basic',
                price: 0,
                duration: 0,
                deliveryTime: 24,
                preparationInstructions: '',
                normalValues: '',
                equipment: '',
                status: 'Active',
                facilityId: '',
              })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
                    if (currentRow) {
                  setFormData({
                    name: currentRow.name,
                    description: currentRow.description,
                    category: currentRow.category,
                    type: currentRow.type,
                    price: currentRow.price,
                    duration: currentRow.duration,
                    deliveryTime: currentRow.deliveryTime,
                    preparationInstructions: currentRow.preparationInstructions,
                    normalValues: currentRow.normalValues,
                    equipment: currentRow.equipment,
                    status: currentRow.status,
                    facilityId: currentRow.facilityId,
                  })
                } else {
                  setFormData({
                    name: '',
                    description: '',
                    category: 'Blood',
                    type: 'Basic',
                    price: 0,
                    duration: 0,
                    deliveryTime: 24,
                    preparationInstructions: '',
                    normalValues: '',
                    equipment: '',
                    status: 'Active',
                    facilityId: '',
                  })
                }
    setErrors({})
  }, [currentRow, open])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = t('Pages.Laboratory.ValidationErrors.NameRequired')
    }

    if (!formData.description?.trim()) {
      newErrors.description = t('Pages.Laboratory.ValidationErrors.DescriptionRequired')
    }

    if (!formData.category) {
      newErrors.category = t('Pages.Laboratory.ValidationErrors.CategoryRequired')
    }

    if (!formData.type) {
      newErrors.type = t('Pages.Laboratory.ValidationErrors.TypeRequired')
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = t('Pages.Laboratory.ValidationErrors.PriceRequired')
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = t('Pages.Laboratory.ValidationErrors.DurationRequired')
    }

                    if (!formData.deliveryTime || formData.deliveryTime <= 0) {
                  newErrors.deliveryTime = t('Pages.Laboratory.ValidationErrors.DeliveryTimeRequired')
                }

                if (!formData.facilityId) {
                  newErrors.facilityId = t('Pages.Laboratory.ValidationErrors.FacilityRequired')
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
      // Aqui você implementaria a lógica para salvar no backend
      const laboratoryData = {
        ...formData,
        id: currentRow?.id || Date.now().toString(),
        createdAt: currentRow?.createdAt || new Date(),
        updatedAt: new Date(),
      }

      if (currentRow) {
        // Atualizar exame existente
        toast.success(t('Pages.Laboratory.UpdateSuccess'))
      } else {
        // Criar novo exame
        toast.success(t('Pages.Laboratory.CreateSuccess'))
      }

      onOpenChange(false)
    } catch (error) {
      toast.error(
        currentRow
          ? t('Pages.Laboratory.UpdateError')
          : t('Pages.Laboratory.CreateError')
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {currentRow
              ? t('Pages.Laboratory.EditExam')
              : t('Pages.Laboratory.AddNewExam')}
          </DialogTitle>
          <DialogDescription>
            {currentRow
              ? t('Pages.Laboratory.UpdateExam')
              : t('Pages.Laboratory.CreateExam')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('Pages.Laboratory.Name')}</Label>
              <Input
                id="name"
                placeholder={t('Pages.Laboratory.NamePlaceholder')}
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
              <Label htmlFor="category">{t('Pages.Laboratory.Category')}</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as Laboratory['category'] })
                }
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Laboratory.CategoryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(t('Pages.Laboratory.Categories', { returnObjects: true }) as Record<string, string>).map((category) => (
                    <SelectItem key={category} value={category}>
                      {t(`Pages.Laboratory.Categories.${category}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('Pages.Laboratory.Description')}</Label>
            <Textarea
              id="description"
              placeholder={t('Pages.Laboratory.DescriptionPlaceholder')}
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">{t('Pages.Laboratory.Type.Title')}</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as Laboratory['type'] })
                }
              >
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Laboratory.TypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(t('Pages.Laboratory.Type', { returnObjects: true }) as Record<string, string>).map((type) => (
                    <SelectItem key={type} value={type}>
                      {t(`Pages.Laboratory.Type.${type}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t('Common.Status')}</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as Laboratory['status'] })
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
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t('Pages.Laboratory.Price')}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder={t('Pages.Laboratory.PricePlaceholder')}
                value={formData.price || ''}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                }
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">{t('Pages.Laboratory.Duration')}</Label>
              <Input
                id="duration"
                type="number"
                placeholder={t('Pages.Laboratory.DurationPlaceholder')}
                value={formData.duration || ''}
                onChange={(e) =>
                  setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })
                }
                className={errors.duration ? 'border-red-500' : ''}
              />
              {errors.duration && (
                <p className="text-sm text-red-500">{errors.duration}</p>
              )}
            </div>

                                    <div className="space-y-2">
                          <Label htmlFor="deliveryTime">
                            {t('Pages.Laboratory.DeliveryTime')}
                          </Label>
                          <Input
                            id="deliveryTime"
                            type="number"
                            min="1"
                            placeholder={t('Pages.Laboratory.DeliveryTimePlaceholder')}
                            value={formData.deliveryTime || ''}
                            onChange={(e) =>
                              setFormData({ ...formData, deliveryTime: parseInt(e.target.value) || 0 })
                            }
                            className={errors.deliveryTime ? 'border-red-500' : ''}
                          />
                          {errors.deliveryTime && (
                            <p className="text-sm text-red-500">{errors.deliveryTime}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="facilityId">{t('Pages.Laboratory.Facility')}</Label>
                        <Select
                          value={formData.facilityId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, facilityId: value })
                          }
                        >
                          <SelectTrigger className={errors.facilityId ? 'border-red-500' : ''}>
                            <SelectValue placeholder={t('Pages.Laboratory.FacilityPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Laboratório Central</SelectItem>
                            <SelectItem value="2">Laboratório Especializado</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.facilityId && (
                          <p className="text-sm text-red-500">{errors.facilityId}</p>
                        )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preparationInstructions">
              {t('Pages.Laboratory.PreparationInstructions')}
            </Label>
            <Textarea
              id="preparationInstructions"
              placeholder={t('Pages.Laboratory.PreparationInstructionsPlaceholder')}
              value={formData.preparationInstructions || ''}
              onChange={(e) =>
                setFormData({ ...formData, preparationInstructions: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="normalValues">{t('Pages.Laboratory.NormalValues')}</Label>
            <Textarea
              id="normalValues"
              placeholder={t('Pages.Laboratory.NormalValuesPlaceholder')}
              value={formData.normalValues || ''}
              onChange={(e) =>
                setFormData({ ...formData, normalValues: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipment">{t('Pages.Laboratory.Equipment')}</Label>
            <Input
              id="equipment"
              placeholder={t('Pages.Laboratory.EquipmentPlaceholder')}
              value={formData.equipment || ''}
              onChange={(e) =>
                setFormData({ ...formData, equipment: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('Common.Cancel')}
            </Button>
            <Button type="submit">
              {t('Pages.Laboratory.Save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 