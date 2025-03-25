import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { t } from 'i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export const emergencyAvailabilityOptions = [
  { label: 'Disponível', value: true },
  { label: 'Não disponível', value: false },
]

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {/* Filtro por Nome */}
        <Input
          placeholder={`${t('Pages.Doctor.FilterByName')}`}
          value={(table.getColumn('Nome')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('Nome')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />

        <div className='flex gap-x-2'>
          {table &&
            typeof table.getColumn === 'function' &&
            table
              .getAllColumns()
              .some((col) => col.id === 'Disponivel na emergência') && (
              <DataTableFacetedFilter
                column={table.getColumn('Disponivel na emergência')}
                title={t('Pages.Doctor.Emergency')}
                options={emergencyAvailabilityOptions}
              />
            )}
        </div>

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => {
              table.resetColumnFilters()
            }}
            className='h-8 px-2 lg:px-3'
          >
            {t('Common.ClearFilter')}
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
