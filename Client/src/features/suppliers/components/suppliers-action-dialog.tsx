import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Supplier } from '@/entities/Supplier'
import { t } from 'i18next'
import { toast } from 'react-toastify'

interface SuppliersActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Supplier | null
  onSave?: (supplier: Supplier) => void
}

export function SuppliersActionDialog({ open, onOpenChange, currentRow, onSave }: SuppliersActionDialogProps) {
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cnpj: '',
    category: '',
    rating: 0,
    status: 'Active',
    paymentTerms: '',
    notes: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (currentRow) {
      setFormData({
        name: currentRow.name,
        contactPerson: currentRow.contactPerson,
        email: currentRow.email,
        phone: currentRow.phone,
        address: currentRow.address,
        city: currentRow.city,
        state: currentRow.state,
        zipCode: currentRow.zipCode,
        country: currentRow.country,
        cnpj: currentRow.cnpj,
        category: currentRow.category,
        rating: currentRow.rating,
        status: currentRow.status,
        paymentTerms: currentRow.paymentTerms,
        notes: currentRow.notes,
      })
    } else {
      setFormData({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        cnpj: '',
        category: '',
        rating: 0,
        status: 'Active',
        paymentTerms: '',
        notes: '',
      })
    }
    setErrors({})
  }, [currentRow, open])

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name?.trim()) {
      newErrors.name = t('Pages.Suppliers.ValidationErrors.NameRequired')
    }

    if (!formData.contactPerson?.trim()) {
      newErrors.contactPerson = t('Pages.Suppliers.ValidationErrors.ContactPersonRequired')
    }

    if (!formData.email?.trim()) {
      newErrors.email = t('Pages.Suppliers.ValidationErrors.EmailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('Pages.Suppliers.ValidationErrors.EmailInvalid')
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = t('Pages.Suppliers.ValidationErrors.PhoneRequired')
    }

    if (!formData.address?.trim()) {
      newErrors.address = t('Pages.Suppliers.ValidationErrors.AddressRequired')
    }

    if (!formData.city?.trim()) {
      newErrors.city = t('Pages.Suppliers.ValidationErrors.CityRequired')
    }

    if (!formData.state?.trim()) {
      newErrors.state = t('Pages.Suppliers.ValidationErrors.StateRequired')
    }

    if (!formData.cnpj?.trim()) {
      newErrors.cnpj = t('Pages.Suppliers.ValidationErrors.CNPJRequired')
    } else if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj)) {
      newErrors.cnpj = t('Pages.Suppliers.ValidationErrors.CNPJInvalid')
    }

    if (!formData.category) {
      newErrors.category = t('Pages.Suppliers.ValidationErrors.CategoryRequired')
    }

    if (formData.rating === undefined || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = t('Pages.Suppliers.ValidationErrors.RatingRange')
    }

    if (!formData.status) {
      newErrors.status = t('Pages.Suppliers.ValidationErrors.StatusRequired')
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
      const supplierData: Supplier = {
        id: currentRow?.id || Date.now(),
        name: formData.name!,
        contactPerson: formData.contactPerson!,
        email: formData.email!,
        phone: formData.phone!,
        address: formData.address!,
        city: formData.city!,
        state: formData.state!,
        zipCode: formData.zipCode!,
        country: formData.country!,
        cnpj: formData.cnpj!,
        category: formData.category!,
        rating: formData.rating!,
        status: formData.status!,
        paymentTerms: formData.paymentTerms!,
        notes: formData.notes!,
        createdAt: currentRow?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      if (onSave) {
        onSave(supplierData)
      }

      toast.success(currentRow ? t('Common.Success') : 'Fornecedor adicionado com sucesso!')
      onOpenChange(false)
    } catch (error) {
      toast.error(t('Common.Error'))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{currentRow ? t('Pages.Suppliers.EditSupplier') : t('Pages.Suppliers.AddSupplier')}</DialogTitle>
          <DialogDescription>
            {currentRow ? 'Edite as informações do fornecedor.' : 'Adicione um novo fornecedor.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('Pages.Suppliers.Name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('Pages.Suppliers.NamePlaceholder')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">{t('Pages.Suppliers.ContactPerson')}</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder={t('Pages.Suppliers.ContactPersonPlaceholder')}
                className={errors.contactPerson ? 'border-red-500' : ''}
              />
              {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('Pages.Suppliers.Email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('Pages.Suppliers.EmailPlaceholder')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('Pages.Suppliers.Phone')}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t('Pages.Suppliers.PhonePlaceholder')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t('Pages.Suppliers.Address')}</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder={t('Pages.Suppliers.AddressPlaceholder')}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">{t('Pages.Suppliers.City')}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder={t('Pages.Suppliers.CityPlaceholder')}
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">{t('Pages.Suppliers.State')}</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder={t('Pages.Suppliers.StatePlaceholder')}
                className={errors.state ? 'border-red-500' : ''}
              />
              {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">{t('Pages.Suppliers.ZipCode')}</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder={t('Pages.Suppliers.ZipCodePlaceholder')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">{t('Pages.Suppliers.Country')}</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder={t('Pages.Suppliers.CountryPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">{t('Pages.Suppliers.CNPJ')}</Label>
              <Input
                id="cnpj"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                placeholder={t('Pages.Suppliers.CNPJPlaceholder')}
                className={errors.cnpj ? 'border-red-500' : ''}
              />
              {errors.cnpj && <p className="text-sm text-red-500">{errors.cnpj}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">{t('Pages.Suppliers.Category')}</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Suppliers.CategoryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical">{t('Pages.Suppliers.Categories.Medical')}</SelectItem>
                  <SelectItem value="Pharmaceutical">{t('Pages.Suppliers.Categories.Pharmaceutical')}</SelectItem>
                  <SelectItem value="Equipment">{t('Pages.Suppliers.Categories.Equipment')}</SelectItem>
                  <SelectItem value="Laboratory">{t('Pages.Suppliers.Categories.Laboratory')}</SelectItem>
                  <SelectItem value="Surgical">{t('Pages.Suppliers.Categories.Surgical')}</SelectItem>
                  <SelectItem value="Technology">{t('Pages.Suppliers.Categories.Technology')}</SelectItem>
                  <SelectItem value="Other">{t('Pages.Suppliers.Categories.Other')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">{t('Pages.Suppliers.Rating')}</Label>
              <Select value={formData.rating?.toString()} onValueChange={(value) => setFormData({ ...formData, rating: Number(value) })}>
                <SelectTrigger className={errors.rating ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Suppliers.RatingPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t('Pages.Suppliers.Status')}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
                <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Suppliers.StatusPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">{t('Pages.Suppliers.Statuses.Active')}</SelectItem>
                  <SelectItem value="Inactive">{t('Pages.Suppliers.Statuses.Inactive')}</SelectItem>
                  <SelectItem value="Suspended">{t('Pages.Suppliers.Statuses.Suspended')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentTerms">{t('Pages.Suppliers.PaymentTerms')}</Label>
            <Input
              id="paymentTerms"
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              placeholder={t('Pages.Suppliers.PaymentTermsPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('Pages.Suppliers.Notes')}</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t('Pages.Suppliers.NotesPlaceholder')}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('Common.Cancel')}
            </Button>
            <Button type="submit">
              {currentRow ? t('Common.Save') : t('Common.Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 