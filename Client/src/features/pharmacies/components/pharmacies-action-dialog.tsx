import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pharmacy } from '@/entities/Pharmacy'
import { createPharmacy } from '@/redux/PharmacySlice'
import { AppDispatch } from '@/redux/store'
import { t } from 'i18next'
import { useDispatch } from 'react-redux'
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
  Name: z.string().min(3, { message: 'O nome da farmácia é obrigatório.' }),
  Description: z.string().optional(),
  type: z.string(),
  address: z.string().min(1, { message: 'O endereço é obrigatório.' }),
  contact_number: z
    .string()
    .min(1, { message: 'O número de contato é obrigatório.' }),
  registration_number: z
    .string()
    .min(1, { message: 'O número de registro é obrigatório.' }),
  phone: z.string().optional(),
  email: z.string().email({ message: 'O e-mail deve ser válido.' }).optional(),
  cnpj: z.string().optional(),
  opening_hours: z.string().optional(),
})

type PharmacyForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Pharmacy
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PharmacyActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const isEdit = !!currentRow

  const form = useForm<PharmacyForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          Name: '',
          Description: '',
          type: undefined,
          address: '',
          contact_number: '',
          registration_number: '',
          phone: '',
          email: '',
          cnpj: '',
          opening_hours: '',
        },
  })

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (values: PharmacyForm) => {
    try {
      const newPharmacy: Pharmacy = {
        Id: null,
        Name: values.Name,
        Description: values.Description || '',
        type: values.type,
        address: values.address,
        contact_number: values.contact_number,
        registration_number: values.registration_number,
        Phone: values.phone || '',
        Email: values.email || '',
        Cnpj: values.cnpj || '',
        OpeningHours: values.opening_hours || '',
        Medicines: [], // Assuming you want to add medicines later
        IsActive: true, // You can set the pharmacy to active by default
        DeletionDate: null,
        ModifiedDate: null,
        CreationDate: new Date().toISOString(),
      }

      dispatch(createPharmacy(newPharmacy))
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.log('Erro ao criar farmácia', error)
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
              ? t('Pages.Pharmacy.EditPharmacy')
              : t('Pages.Pharmacy.AddNewPharmacy')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('Pages.Pharmacy.UpdatePharmacy')
              : t('Pages.Pharmacy.CreatePharmacy')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='pharmacy-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Pharmacy.PharmacyName')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Pharmacy.PharmacyNamePlaceholder'
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
                    <FormLabel>{t('Pages.Pharmacy.Description')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Pages.Pharmacy.DescriptionPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Address.Title')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.AddressPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='contact_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Pharmacy.ContactNumber')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Pharmacy.ContactNumberPlaceholder'
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
                name='registration_number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Pharmacy.RegistrationNumber')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Pharmacy.RegistrationNumberPlaceholder'
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
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Pharmacy.Phone')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Pharmacy.PhonePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Pharmacy.Email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Pharmacy.EmailPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='cnpj'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Pharmacy.Cnpj')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Pharmacy.CnpjPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{t('Pages.Pharmacy.OperationHour')}</FormLabel>
                <div className='opening_hours-container'>
                  <FormField
                    control={form.control}
                    name='opening_hours'
                    render={({ field }) => {
                      const handleTimeChange = (
                        e: React.ChangeEvent<HTMLInputElement>,
                        type: 'start' | 'end'
                      ) => {
                        const currentSchedule = field.value || '00:00 - 00:00'
                        const [start, end] = currentSchedule.split(' - ')

                        const newValue =
                          type === 'start'
                            ? `${e.target.value} - ${end}`
                            : `${start} - ${e.target.value}`

                        field.onChange(newValue)
                      }

                      const [startTime, endTime] = field.value
                        ? field.value.split(' - ')
                        : ['00:00', '00:00']

                      return (
                        <FormItem>
                          <FormControl>
                            <div className='flex gap-10 space-x-4'>
                              <div className='flex flex-col gap-2'>
                                <label>
                                  {t('Pages.Doctor.WorkSchedule.Start')}
                                </label>
                                <Input
                                  type='time'
                                  value={startTime || '00:00'}
                                  onChange={(e) => handleTimeChange(e, 'start')}
                                  className='w-full'
                                />
                              </div>

                              <div className='flex flex-col gap-2'>
                                <label>
                                  {t('Pages.Doctor.WorkSchedule.End')}
                                </label>
                                <Input
                                  type='time'
                                  value={endTime || '00:00'}
                                  onChange={(e) => handleTimeChange(e, 'end')}
                                  className='w-full'
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </FormItem>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button
            type='submit'
            form='pharmacy-form'
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
