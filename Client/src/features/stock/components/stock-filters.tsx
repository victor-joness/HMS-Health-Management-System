import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StockFilters } from '@/entities/Stock'
import { Supplier } from '@/entities/Supplier'
import { t } from 'i18next'

interface StockFiltersProps {
  filters: StockFilters
  onFiltersChange: (filters: StockFilters) => void
  suppliers: Supplier[]
}

export function StockFilters({ filters, onFiltersChange, suppliers }: StockFiltersProps) {
  const handleFilterChange = (key: keyof StockFilters, value: string | number | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name-filter">{t('Pages.Stock.Name')}</Label>
        <Input
          id="name-filter"
          placeholder={t('Common.SearchBy')}
          value={filters.name || ''}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-filter">{t('Pages.Stock.Category')}</Label>
        <Select value={filters.category || ''} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('Pages.Stock.CategoryPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as categorias</SelectItem>
            <SelectItem value="Medical">{t('Pages.Stock.Categories.Medical')}</SelectItem>
            <SelectItem value="Surgical">{t('Pages.Stock.Categories.Surgical')}</SelectItem>
            <SelectItem value="Pharmaceutical">{t('Pages.Stock.Categories.Pharmaceutical')}</SelectItem>
            <SelectItem value="Laboratory">{t('Pages.Stock.Categories.Laboratory')}</SelectItem>
            <SelectItem value="Equipment">{t('Pages.Stock.Categories.Equipment')}</SelectItem>
            <SelectItem value="Consumable">{t('Pages.Stock.Categories.Consumable')}</SelectItem>
            <SelectItem value="Other">{t('Pages.Stock.Categories.Other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type-filter">{t('Pages.Stock.Type')}</Label>
        <Select value={filters.type || ''} onValueChange={(value) => handleFilterChange('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('Pages.Stock.TypePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os tipos</SelectItem>
            <SelectItem value="Medicine">{t('Pages.Stock.Types.Medicine')}</SelectItem>
            <SelectItem value="Equipment">{t('Pages.Stock.Types.Equipment')}</SelectItem>
            <SelectItem value="Consumable">{t('Pages.Stock.Types.Consumable')}</SelectItem>
            <SelectItem value="Tool">{t('Pages.Stock.Types.Tool')}</SelectItem>
            <SelectItem value="Device">{t('Pages.Stock.Types.Device')}</SelectItem>
            <SelectItem value="Other">{t('Pages.Stock.Types.Other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status-filter">{t('Pages.Stock.Status')}</Label>
        <Select value={filters.status || ''} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('Pages.Stock.StatusPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os status</SelectItem>
            <SelectItem value="Active">{t('Pages.Stock.Statuses.Active')}</SelectItem>
            <SelectItem value="Inactive">{t('Pages.Stock.Statuses.Inactive')}</SelectItem>
            <SelectItem value="Expired">{t('Pages.Stock.Statuses.Expired')}</SelectItem>
            <SelectItem value="LowStock">{t('Pages.Stock.Statuses.LowStock')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplier-filter">{t('Pages.Stock.Supplier')}</Label>
        <Select value={filters.supplierId?.toString() || ''} onValueChange={(value) => handleFilterChange('supplierId', value ? Number(value) : undefined)}>
          <SelectTrigger>
            <SelectValue placeholder={t('Pages.Stock.SupplierPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os fornecedores</SelectItem>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier.id} value={supplier.id.toString()}>
                {supplier.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location-filter">{t('Pages.Stock.Location')}</Label>
        <Input
          id="location-filter"
          placeholder="Localização"
          value={filters.location || ''}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="min-quantity-filter">Quantidade Mínima</Label>
        <Input
          id="min-quantity-filter"
          type="number"
          placeholder="Mín"
          value={filters.minQuantity || ''}
          onChange={(e) => handleFilterChange('minQuantity', e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="max-quantity-filter">Quantidade Máxima</Label>
        <Input
          id="max-quantity-filter"
          type="number"
          placeholder="Máx"
          value={filters.maxQuantity || ''}
          onChange={(e) => handleFilterChange('maxQuantity', e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>
    </div>
  )
} 