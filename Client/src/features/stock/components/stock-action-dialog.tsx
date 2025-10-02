import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Stock } from '@/entities/Stock'
import { Supplier } from '@/entities/Supplier'
import { t } from 'i18next'
import { toast } from 'react-toastify'

interface StockActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Stock | null
  suppliers: Supplier[]
  onSave?: (stock: Stock) => void
}

export function StockActionDialog({ open, onOpenChange, currentRow, suppliers, onSave }: StockActionDialogProps) {
  const [formData, setFormData] = useState<Partial<Stock>>({
    name: '',
    description: '',
    category: '',
    type: '',
    quantity: 0,
    minQuantity: 0,
    maxQuantity: 0,
    unit: '',
    price: 0,
    supplierId: 0,
    location: '',
    expiryDate: null,
    batchNumber: '',
    status: 'Active',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (currentRow) {
      setFormData({
        name: currentRow.name,
        description: currentRow.description,
        category: currentRow.category,
        type: currentRow.type,
        quantity: currentRow.quantity,
        minQuantity: currentRow.minQuantity,
        maxQuantity: currentRow.maxQuantity,
        unit: currentRow.unit,
        price: currentRow.price,
        supplierId: currentRow.supplierId,
        location: currentRow.location,
        expiryDate: currentRow.expiryDate,
        batchNumber: currentRow.batchNumber,
        status: currentRow.status,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        type: '',
        quantity: 0,
        minQuantity: 0,
        maxQuantity: 0,
        unit: '',
        price: 0,
        supplierId: 0,
        location: '',
        expiryDate: null,
        batchNumber: '',
        status: 'Active',
      })
    }
    setErrors({})
  }, [currentRow, open])

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name?.trim()) {
      newErrors.name = t('Pages.Stock.ValidationErrors.NameRequired')
    }

    if (!formData.description?.trim()) {
      newErrors.description = t('Pages.Stock.ValidationErrors.DescriptionRequired')
    }

    if (!formData.category) {
      newErrors.category = t('Pages.Stock.ValidationErrors.CategoryRequired')
    }

    if (!formData.type) {
      newErrors.type = t('Pages.Stock.ValidationErrors.TypeRequired')
    }

    if (formData.quantity === undefined || formData.quantity < 0) {
      newErrors.quantity = t('Pages.Stock.ValidationErrors.QuantityPositive')
    }

    if (formData.minQuantity === undefined || formData.minQuantity < 0) {
      newErrors.minQuantity = t('Pages.Stock.ValidationErrors.MinQuantityPositive')
    }

    if (formData.maxQuantity === undefined || formData.maxQuantity < 0) {
      newErrors.maxQuantity = t('Pages.Stock.ValidationErrors.MaxQuantityPositive')
    }

    if (formData.maxQuantity && formData.minQuantity && formData.maxQuantity <= formData.minQuantity) {
      newErrors.maxQuantity = t('Pages.Stock.ValidationErrors.MaxQuantityGreaterThanMin')
    }

    if (!formData.unit) {
      newErrors.unit = t('Pages.Stock.ValidationErrors.UnitRequired')
    }

    if (formData.price === undefined || formData.price < 0) {
      newErrors.price = t('Pages.Stock.ValidationErrors.PricePositive')
    }

    if (!formData.supplierId) {
      newErrors.supplierId = t('Pages.Stock.ValidationErrors.SupplierRequired')
    }

    if (!formData.location?.trim()) {
      newErrors.location = t('Pages.Stock.ValidationErrors.LocationRequired')
    }

    if (!formData.batchNumber?.trim()) {
      newErrors.batchNumber = t('Pages.Stock.ValidationErrors.BatchNumberRequired')
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
      const stockData: Stock = {
        id: currentRow?.id || Date.now(),
        name: formData.name!,
        description: formData.description!,
        category: formData.category!,
        type: formData.type!,
        quantity: formData.quantity!,
        minQuantity: formData.minQuantity!,
        maxQuantity: formData.maxQuantity!,
        unit: formData.unit!,
        price: formData.price!,
        supplierId: formData.supplierId!,
        location: formData.location!,
        expiryDate: formData.expiryDate,
        batchNumber: formData.batchNumber!,
        status: formData.status!,
        lastUpdated: new Date().toISOString(),
        createdAt: currentRow?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      if (onSave) {
        onSave(stockData)
      }

      toast.success(currentRow ? t('Common.Success') : 'Item adicionado com sucesso!')
      onOpenChange(false)
    } catch (error) {
      toast.error(t('Common.Error'))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentRow ? t('Pages.Stock.EditStockItem') : t('Pages.Stock.AddStockItem')}</DialogTitle>
          <DialogDescription>
            {currentRow ? 'Edite as informações do item de estoque.' : 'Adicione um novo item ao estoque.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('Pages.Stock.Name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('Pages.Stock.NamePlaceholder')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t('Pages.Stock.Category')}</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Stock.CategoryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical">{t('Pages.Stock.Categories.Medical')}</SelectItem>
                  <SelectItem value="Surgical">{t('Pages.Stock.Categories.Surgical')}</SelectItem>
                  <SelectItem value="Pharmaceutical">{t('Pages.Stock.Categories.Pharmaceutical')}</SelectItem>
                  <SelectItem value="Laboratory">{t('Pages.Stock.Categories.Laboratory')}</SelectItem>
                  <SelectItem value="Equipment">{t('Pages.Stock.Categories.Equipment')}</SelectItem>
                  <SelectItem value="Consumable">{t('Pages.Stock.Categories.Consumable')}</SelectItem>
                  <SelectItem value="Other">{t('Pages.Stock.Categories.Other')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('Pages.Stock.Description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('Pages.Stock.DescriptionPlaceholder')}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">{t('Pages.Stock.Type')}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Stock.TypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medicine">{t('Pages.Stock.Types.Medicine')}</SelectItem>
                  <SelectItem value="Equipment">{t('Pages.Stock.Types.Equipment')}</SelectItem>
                  <SelectItem value="Consumable">{t('Pages.Stock.Types.Consumable')}</SelectItem>
                  <SelectItem value="Tool">{t('Pages.Stock.Types.Tool')}</SelectItem>
                  <SelectItem value="Device">{t('Pages.Stock.Types.Device')}</SelectItem>
                  <SelectItem value="Other">{t('Pages.Stock.Types.Other')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">{t('Pages.Stock.Unit')}</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className={errors.unit ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Stock.UnitPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Piece">{t('Pages.Stock.Units.Piece')}</SelectItem>
                  <SelectItem value="Box">{t('Pages.Stock.Units.Box')}</SelectItem>
                  <SelectItem value="Bottle">{t('Pages.Stock.Units.Bottle')}</SelectItem>
                  <SelectItem value="Unit">{t('Pages.Stock.Units.Unit')}</SelectItem>
                  <SelectItem value="Pack">{t('Pages.Stock.Units.Pack')}</SelectItem>
                  <SelectItem value="Meter">{t('Pages.Stock.Units.Meter')}</SelectItem>
                  <SelectItem value="Liter">{t('Pages.Stock.Units.Liter')}</SelectItem>
                  <SelectItem value="Gram">{t('Pages.Stock.Units.Gram')}</SelectItem>
                  <SelectItem value="Milliliter">{t('Pages.Stock.Units.Milliliter')}</SelectItem>
                </SelectContent>
              </Select>
              {errors.unit && <p className="text-sm text-red-500">{errors.unit}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">{t('Pages.Stock.Quantity')}</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                placeholder={t('Pages.Stock.QuantityPlaceholder')}
                className={errors.quantity ? 'border-red-500' : ''}
              />
              {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="minQuantity">{t('Pages.Stock.MinQuantity')}</Label>
              <Input
                id="minQuantity"
                type="number"
                value={formData.minQuantity}
                onChange={(e) => setFormData({ ...formData, minQuantity: Number(e.target.value) })}
                placeholder={t('Pages.Stock.MinQuantityPlaceholder')}
                className={errors.minQuantity ? 'border-red-500' : ''}
              />
              {errors.minQuantity && <p className="text-sm text-red-500">{errors.minQuantity}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxQuantity">{t('Pages.Stock.MaxQuantity')}</Label>
              <Input
                id="maxQuantity"
                type="number"
                value={formData.maxQuantity}
                onChange={(e) => setFormData({ ...formData, maxQuantity: Number(e.target.value) })}
                placeholder={t('Pages.Stock.MaxQuantityPlaceholder')}
                className={errors.maxQuantity ? 'border-red-500' : ''}
              />
              {errors.maxQuantity && <p className="text-sm text-red-500">{errors.maxQuantity}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t('Pages.Stock.Price')}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder={t('Pages.Stock.PricePlaceholder')}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierId">{t('Pages.Stock.Supplier')}</Label>
              <Select value={formData.supplierId?.toString()} onValueChange={(value) => setFormData({ ...formData, supplierId: Number(value) })}>
                <SelectTrigger className={errors.supplierId ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('Pages.Stock.SupplierPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.supplierId && <p className="text-sm text-red-500">{errors.supplierId}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">{t('Pages.Stock.Location')}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={t('Pages.Stock.LocationPlaceholder')}
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchNumber">{t('Pages.Stock.BatchNumber')}</Label>
              <Input
                id="batchNumber"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                placeholder={t('Pages.Stock.BatchNumberPlaceholder')}
                className={errors.batchNumber ? 'border-red-500' : ''}
              />
              {errors.batchNumber && <p className="text-sm text-red-500">{errors.batchNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">{t('Pages.Stock.ExpiryDate')}</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate || ''}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value || null })}
                placeholder={t('Pages.Stock.ExpiryDatePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t('Pages.Stock.Status')}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('Pages.Stock.StatusPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">{t('Pages.Stock.Statuses.Active')}</SelectItem>
                  <SelectItem value="Inactive">{t('Pages.Stock.Statuses.Inactive')}</SelectItem>
                  <SelectItem value="Expired">{t('Pages.Stock.Statuses.Expired')}</SelectItem>
                  <SelectItem value="LowStock">{t('Pages.Stock.Statuses.LowStock')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
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