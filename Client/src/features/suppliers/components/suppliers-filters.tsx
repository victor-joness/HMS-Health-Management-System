import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SupplierFilters } from '@/entities/Supplier'
import { t } from 'i18next'

interface SuppliersFiltersProps {
  filters: SupplierFilters
  onFiltersChange: (filters: SupplierFilters) => void
}

export function SuppliersFilters({ filters, onFiltersChange }: SuppliersFiltersProps) {
  const handleFilterChange = (key: keyof SupplierFilters, value: string | number | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name-filter">{t('Pages.Suppliers.Name')}</Label>
        <Input
          id="name-filter"
          placeholder={t('Common.SearchBy')}
          value={filters.name || ''}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category-filter">{t('Pages.Suppliers.Category')}</Label>
        <Select value={filters.category || ''} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as categorias</SelectItem>
            <SelectItem value="Medical">{t('Pages.Suppliers.Categories.Medical')}</SelectItem>
            <SelectItem value="Pharmaceutical">{t('Pages.Suppliers.Categories.Pharmaceutical')}</SelectItem>
            <SelectItem value="Equipment">{t('Pages.Suppliers.Categories.Equipment')}</SelectItem>
            <SelectItem value="Laboratory">{t('Pages.Suppliers.Categories.Laboratory')}</SelectItem>
            <SelectItem value="Surgical">{t('Pages.Suppliers.Categories.Surgical')}</SelectItem>
            <SelectItem value="Technology">{t('Pages.Suppliers.Categories.Technology')}</SelectItem>
            <SelectItem value="Other">{t('Pages.Suppliers.Categories.Other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status-filter">{t('Pages.Suppliers.Status')}</Label>
        <Select value={filters.status || ''} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os status</SelectItem>
            <SelectItem value="Active">{t('Pages.Suppliers.Statuses.Active')}</SelectItem>
            <SelectItem value="Inactive">{t('Pages.Suppliers.Statuses.Inactive')}</SelectItem>
            <SelectItem value="Suspended">{t('Pages.Suppliers.Statuses.Suspended')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city-filter">{t('Pages.Suppliers.City')}</Label>
        <Input
          id="city-filter"
          placeholder="Cidade"
          value={filters.city || ''}
          onChange={(e) => handleFilterChange('city', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="state-filter">{t('Pages.Suppliers.State')}</Label>
        <Input
          id="state-filter"
          placeholder="Estado"
          value={filters.state || ''}
          onChange={(e) => handleFilterChange('state', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating-filter">{t('Pages.Suppliers.Rating')}</Label>
        <Select value={filters.rating?.toString() || ''} onValueChange={(value) => handleFilterChange('rating', value ? Number(value) : undefined)}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as avaliações" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as avaliações</SelectItem>
            <SelectItem value="5">5 estrelas</SelectItem>
            <SelectItem value="4">4+ estrelas</SelectItem>
            <SelectItem value="3">3+ estrelas</SelectItem>
            <SelectItem value="2">2+ estrelas</SelectItem>
            <SelectItem value="1">1+ estrelas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 