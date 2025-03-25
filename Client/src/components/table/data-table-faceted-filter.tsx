import { useEffect, useState } from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { t } from 'i18next'

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: boolean | null
  }[]
}

export function DataTableFacetedFilter<TData, TValue>({ column, title, options }: DataTableFacetedFilterProps<TData, TValue>) {
  const [selectedValue, setSelectedValue] = useState<boolean | null>(null)
  const filteredCount = column?.getFacetedUniqueValues()?.get(selectedValue) ?? 0

  useEffect(() => {
    const filterValue = column?.getFilterValue() as boolean | null
    setSelectedValue(filterValue ?? null)
  }, [column?.getFilterValue()])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <PlusCircledIcon className='h-4 w-4' />
          {title}
          {selectedValue !== null && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal'
              >
                {options.find((opt) => opt.value === selectedValue)?.label} (
                {filteredCount})
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandList>
            <CommandEmpty>{t("Common.NoResult")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValue === option.value
                const count =
                  column?.getFacetedUniqueValues()?.get(option.value) ?? 0

                return (
                  <CommandItem
                    key={String(option.value)}
                    onSelect={() => {
                      const newValue = isSelected ? null : option.value
                      setSelectedValue(newValue)
                      column?.setFilterValue(newValue)
                    }}
                  >
                    <div
                      className={cn(
                        'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className='h-4 w-4' />
                    </div>
                    <span>
                      {option.label} ({count})
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValue !== null && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValue(null)
                      column?.setFilterValue(undefined)
                    }}
                    className='justify-center text-center'
                  >
                    {t("Common.ClearFilter")}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
