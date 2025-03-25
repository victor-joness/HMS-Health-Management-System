import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Medicines } from '@/entities/Medicines'
import { createMedicine } from '@/redux/PharmacySlice'
import { AppDispatch } from '@/redux/store'
import { t } from 'i18next'
import { NumericFormat } from 'react-number-format'
import { useDispatch } from 'react-redux'
import { MedicinesTypeEnum } from '@/utils/Enum'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'

const formSchema = z.object({
  Name: z.string().min(3, { message: 'O nome é obrigatório.' }),
  Description: z.string().optional(),
  type: z.nativeEnum(MedicinesTypeEnum, {
    errorMap: () => ({ message: 'Selecione um tipo.' }),
  }),
  manufacturer: z.string().min(1, { message: 'O fabricante é obrigatório.' }),
  batch_number: z
    .string()
    .min(1, { message: 'O número do lote é obrigatório.' }),
  quantity_in_stock: z
    .number({ invalid_type_error: 'A quantidade deve ser um número.' })
    .min(0, { message: 'A quantidade deve ser zero ou maior.' }),
  price_per_unit: z
    .number({ invalid_type_error: 'O preço deve ser um número.' })
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'O preço deve ser um número positivo.',
    }),
  expiry_date: z
    .string()
    .min(1, { message: 'A data de validade é obrigatória.' }),
  storage_instructions: z.string().optional(),
})

type MedicineForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Medicines
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MedicinesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const isEdit = !!currentRow

  const form = useForm<MedicineForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          Name: '',
          Description: '',
          type: undefined,
          manufacturer: '',
          batch_number: '',
          quantity_in_stock: 0,
          price_per_unit: 0,
          expiry_date: '',
          storage_instructions: '',
        },
  })

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (values: MedicineForm) => {
    try {
      const newMedicine: Medicines = {
        Id: null,
        Name: values.Name,
        Description: values.Description || '',
        type: values.type,
        manufacturer: values.manufacturer,
        batch_number: values.batch_number,
        quantity_in_stock: values.quantity_in_stock,
        price_per_unit: values.price_per_unit,
        expiry_date: values.expiry_date,
        storage_instructions: values.storage_instructions || '',
        DeletionDate: null,
        ModifiedDate: null,
        CreationDate: new Date().toISOString(),
      }

      dispatch(createMedicine(newMedicine))
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.log('Erro ao criar medicamento', error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            {isEdit
              ? t('Pages.Medicine.EditMedicine')
              : t('Pages.Medicine.AddNewMedicine')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('Pages.Medicine.UpdateMedicine')
              : t('Pages.Medicine.CreateMedicine')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='medicine-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.MedicineName')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Medicine.MedicineNamePlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.Description')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Pages.Medicine.DescriptionPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.Type.Title')}</FormLabel>
                    <SelectDropdown
                      defaultValue=''
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Medicine.TypePlaceholder')}
                      items={Object.values(MedicinesTypeEnum)
                        .filter((medType) => typeof medType === 'string')
                        .map((medType) => ({
                          label: t(`Pages.Medicine.Type.${medType}`),
                          value: medType,
                        }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='manufacturer'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.Manufacturer')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Medicine.ManufacturerPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='batch_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.BatchNumber')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Medicine.BatchNumberPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='quantity_in_stock'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.QuantityInStock')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t(
                          'Pages.Medicine.QuantityInStockPlaceholder'
                        )}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='price_per_unit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.PricePerUnit')}</FormLabel>
                    <FormControl>
                      <NumericFormat
                        {...field}
                        customInput={Input}
                        isAllowed={({ floatValue }) =>
                          floatValue === undefined || floatValue >= 0
                        }
                        decimalSeparator=','
                        thousandSeparator='.'
                        decimalScale={2}
                        fixedDecimalScale
                        placeholder={t(
                          'Pages.Medicine.PricePerUnitPlaceholder'
                        )}
                        onValueChange={({ floatValue }) => {
                          field.onChange(floatValue)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='expiry_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Medicine.ExpiryDate')}</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        placeholder={t('Pages.Medicine.ExpiryDatePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='storage_instructions'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Medicine.StorageInstructions')}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t(
                          'Pages.Medicine.StorageInstructionsPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button
            type='submit'
            form='medicine-form'
            onClick={(e) => {
              e.preventDefault()
              form.handleSubmit(onSubmit)()
            }}
          >
            {t('Common.Save')}
          </Button>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            {t('Common.Cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
