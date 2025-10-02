import { useState } from 'react'
import { t } from 'i18next'
import { LaboratoryFilters } from '@/entities/Laboratory'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconFilter, IconX } from '@tabler/icons-react'

interface LaboratoryFiltersProps {
  filters: LaboratoryFilters
  onFiltersChange: (filters: LaboratoryFilters) => void
  onClearFilters: () => void
}

export function LaboratoryFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: LaboratoryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: keyof LaboratoryFilters, value: string | number | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <IconFilter className="h-4 w-4" />
            {t('Common.Filter')}
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="h-8"
              >
                <IconX className="h-4 w-4 mr-1" />
                {t('Common.ClearFilter')}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8"
            >
              {isExpanded ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">{t('Common.Search')}</Label>
              <Input
                id="search"
                placeholder="Buscar por nome..."
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t('Pages.Laboratory.Category')}</Label>
              <Select
                value={filters.category || ''}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  <SelectItem value="Blood">{t('Pages.Laboratory.Categories.Blood')}</SelectItem>
                  <SelectItem value="Urine">{t('Pages.Laboratory.Categories.Urine')}</SelectItem>
                  <SelectItem value="Stool">{t('Pages.Laboratory.Categories.Stool')}</SelectItem>
                  <SelectItem value="Tissue">{t('Pages.Laboratory.Categories.Tissue')}</SelectItem>
                  <SelectItem value="Imaging">{t('Pages.Laboratory.Categories.Imaging')}</SelectItem>
                  <SelectItem value="Cardiac">{t('Pages.Laboratory.Categories.Cardiac')}</SelectItem>
                  <SelectItem value="Neurological">{t('Pages.Laboratory.Categories.Neurological')}</SelectItem>
                  <SelectItem value="Other">{t('Pages.Laboratory.Categories.Other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">{t('Pages.Laboratory.Type.Title')}</Label>
              <Select
                value={filters.type || ''}
                onValueChange={(value) => handleFilterChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="Basic">{t('Pages.Laboratory.Type.Basic')}</SelectItem>
                  <SelectItem value="Advanced">{t('Pages.Laboratory.Type.Advanced')}</SelectItem>
                  <SelectItem value="Specialized">{t('Pages.Laboratory.Type.Specialized')}</SelectItem>
                  <SelectItem value="Emergency">{t('Pages.Laboratory.Type.Emergency')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t('Common.Status')}</Label>
              <Select
                value={filters.status || ''}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os status</SelectItem>
                  <SelectItem value="Active">{t('Pages.Laboratory.Status.Active')}</SelectItem>
                  <SelectItem value="Inactive">{t('Pages.Laboratory.Status.Inactive')}</SelectItem>
                  <SelectItem value="Maintenance">{t('Pages.Laboratory.Status.Maintenance')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPrice">Preço Mínimo</Label>
              <Input
                id="minPrice"
                type="number"
                step="0.01"
                placeholder="R$ 0,00"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', parseFloat(e.target.value) || undefined)}
              />
            </div>

                                    <div className="space-y-2">
                          <Label htmlFor="maxPrice">Preço Máximo</Label>
                          <Input
                            id="maxPrice"
                            type="number"
                            step="0.01"
                            placeholder="R$ 1000,00"
                            value={filters.maxPrice || ''}
                            onChange={(e) => handleFilterChange('maxPrice', parseFloat(e.target.value) || undefined)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="facilityId">{t('Pages.Laboratory.Facility')}</Label>
                          <Select
                            value={filters.facilityId || ''}
                            onValueChange={(value) => handleFilterChange('facilityId', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Todos os laboratórios" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Todos os laboratórios</SelectItem>
                              <SelectItem value="1">Laboratório Central</SelectItem>
                              <SelectItem value="2">Laboratório Especializado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="minDeliveryTime">Tempo de Entrega Mínimo</Label>
                          <Input
                            id="minDeliveryTime"
                            type="number"
                            placeholder="1h"
                            value={filters.minDeliveryTime || ''}
                            onChange={(e) => handleFilterChange('minDeliveryTime', parseInt(e.target.value) || undefined)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maxDeliveryTime">Tempo de Entrega Máximo</Label>
                          <Input
                            id="maxDeliveryTime"
                            type="number"
                            placeholder="72h"
                            value={filters.maxDeliveryTime || ''}
                            onChange={(e) => handleFilterChange('maxDeliveryTime', parseInt(e.target.value) || undefined)}
                          />
                        </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
} 