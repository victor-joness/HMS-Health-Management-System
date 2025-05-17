import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FinanceEmployee } from '@/entities/FinanceEmployee'
import { createFinance } from '@/redux/FinanceSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Gender } from '@/utils/Enum'
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
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'

const formSchema = z.object({
  Name: z.string().min(3, { message: 'O nome é obrigatório.' }),
  Email: z.string().min(1, { message: 'O e-mail é obrigatório.' }).email(),
  Password: z
    .string()
    .min(7, 'A senha tem que ter pelo menos 7 caracteres')
    .transform((pwd) => pwd.trim()),
  Img: z.string().url({ message: 'Insira uma URL válida para a imagem.' }),
  Age: z
    .number()
    .min(18, { message: 'A idade mínima é 18 anos' })
    .max(70, { message: 'A idade máxima é 70 anos.' }),
  Gender: z.nativeEnum(Gender, {
    required_error: 'O sexo é obrigatório.',
  }),
  PhoneNumber: z.string().min(1, { message: 'O telefone é obrigatório.' }),
  Address: z.string().min(1, { message: 'O endereço é obrigatório.' }),
  City: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  State: z.string().min(1, { message: 'O estado é obrigatório.' }),
  Zip: z.string().min(1, { message: 'O CEP é obrigatório.' }),
  Country: z.string().min(1, { message: 'O país é obrigatório.' }),
  Work_schedule_details: z.object({
    Monday: z.string().optional().default('00:00 - 00:00'),
    Tuesday: z.string().optional().default('00:00 - 00:00'),
    Wednesday: z.string().optional().default('00:00 - 00:00'),
    Thursday: z.string().optional().default('00:00 - 00:00'),
    Friday: z.string().optional().default('00:00 - 00:00'),
    Saturday: z.string().optional().default('00:00 - 00:00'),
    Sunday: z.string().optional().default('00:00 - 00:00'),
  }),
  Notas: z.string(),
  isEdit: z.boolean().default(false),
})

type FinanceEmployeeForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: FinanceEmployee
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FinanceEmployeeActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const HospitalId = useSelector(
    (state: RootState) => state.auth.HospitalInfo.Id
  )
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm<FinanceEmployeeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ? {} : {},
  })

  const onSubmit = async (values: FinanceEmployeeForm) => {
    console.log(values)

    try {
      let newFinanceEmployee: any = {
        Name: values.Name,
        Email: values.Email,
        Password: values.Password,
        Img: values.Img,
        Age: values.Age,
        Gender: values.Gender,
        PhoneNumber: values.PhoneNumber,
        Address:
          values.Address +
          ' ' +
          values.City +
          ' ' +
          values.Country +
          ' ' +
          values.State +
          ' ' +
          values.Zip,
        WorkScheduleDetails: {
          Monday: values.Work_schedule_details.Monday,
          Tuesday: values.Work_schedule_details.Tuesday,
          Wednesday: values.Work_schedule_details.Wednesday,
          Thursday: values.Work_schedule_details.Thursday,
          Friday: values.Work_schedule_details.Friday,
          Saturday: values.Work_schedule_details.Saturday,
          Sunday: values.Work_schedule_details.Sunday,
        },
        Notes: values.Notas,
        DeletionDate: null,
        ModifiedDate: null,
        CreationDate: new Date().toISOString(),
        UserInfo: null,
        HospitalId: HospitalId,
      }

      dispatch(createFinance(newFinanceEmployee))
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating finance employee:', error)
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
            {currentRow
              ? t('Pages.FinanceEmployee.EditFinanceEmployee')
              : t('Pages.FinanceEmployee.AddNewFinanceEmployee')}
          </DialogTitle>
          <DialogDescription>
            {currentRow
              ? t('Pages.FinanceEmployee.UpdateFinanceEmployee')
              : t('Pages.FinanceEmployee.CreateFinanceEmployee')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='finance-employee-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.FinanceEmployee.Name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.FinanceEmployee.NamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.FinanceEmployee.Email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.EmailPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name='Password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.FinanceEmployee.Password')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t(
                          'Pages.FinanceEmployee.PasswordPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Image URL */}
              <FormField
                control={form.control}
                name='Img'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.FinanceEmployee.Img')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.FinanceEmployee.ImgPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Age */}
              <FormField
                control={form.control}
                name='Age'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.FinanceEmployee.Age')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Pages.FinanceEmployee.AgePlaceholder')}
                        {...field}
                        value={field.value || ''}
                        onChange={(item) =>
                          field.onChange(parseInt(item.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender */}
              <FormField
                control={form.control}
                name='Gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.FinanceEmployee.Gender')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.FinanceEmployee.GenderPlaceholder')}
                      items={[
                        {
                          label: t(
                            'Pages.FinanceEmployee.GenderOptions.Masculine'
                          ),
                          value: 'MASCULINO',
                        },
                        {
                          label: t(
                            'Pages.FinanceEmployee.GenderOptions.Feminine'
                          ),
                          value: 'FEMININO',
                        },
                        {
                          label: t('Pages.FinanceEmployee.GenderOptions.Other'),
                          value: 'OUTRO',
                        },
                      ]}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='PhoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.FinanceEmployee.PhoneNumber')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.PhoneNumberPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Horários de trabalho</FormLabel>
                <div className='work-schedule-container'>
                  {[
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ].map((day) => (
                    <FormField
                      key={day}
                      control={form.control}
                      name={
                        `Work_schedule_details.${day}` as keyof FinanceEmployeeForm
                      }
                      render={({ field }) => {
                        const handleTimeChange = (
                          e: React.ChangeEvent<HTMLInputElement>,
                          type: 'start' | 'end'
                        ) => {
                          const currentSchedule = field.value || '00:00 - 00:00'
                          const [start, end] = (
                            typeof currentSchedule === 'string'
                              ? currentSchedule
                              : '00:00 - 00:00'
                          ).split(' - ')

                          const newValue =
                            type === 'start'
                              ? `${e.target.value} - ${end}`
                              : `${start} - ${e.target.value}`

                          field.onChange(newValue)
                        }

                        const [startTime, endTime] = (
                          field.value || '00:00 - 00:00'
                        )
                          .toString()
                          .split(' - ')

                        return (
                          <FormItem>
                            <FormLabel>{t(`Days.${day}`)}</FormLabel>
                            <FormControl>
                              <div className='flex gap-10 space-x-4'>
                                {/* Entrada */}
                                <div className='flex flex-col gap-2'>
                                  <label>
                                    {t(
                                      'Pages.FinanceEmployee.WorkSchedule.Start'
                                    )}
                                  </label>
                                  <Input
                                    type='time'
                                    placeholder={`Horário de entrada para ${day}`}
                                    value={startTime || '00:00'} // Garante valor inicial
                                    onChange={(e) =>
                                      handleTimeChange(e, 'start')
                                    }
                                    className='w-full'
                                  />
                                </div>
                                {/* Saída */}
                                <div className='flex flex-col gap-2'>
                                  <label>
                                    {t(
                                      'Pages.FinanceEmployee.WorkSchedule.End'
                                    )}
                                  </label>
                                  <Input
                                    type='time'
                                    placeholder={t(
                                      'Pages.FinanceEmployee.WorkSchedule.EndPlaceholder',
                                      { dia: day }
                                    )}
                                    value={endTime || '00:00'} // Garante valor inicial
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
                  ))}
                </div>
              </FormItem>

              <FormField
                control={form.control}
                name='Notas'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.FinanceEmployee.Notes')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.NotesPlaceholder'
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
                name='Address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.FinanceEmployee.Address.Title')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.AddressPlaceholder'
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
                name='City'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.FinanceEmployee.Address.City')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.Address.CityPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* State */}
              <FormField
                control={form.control}
                name='State'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.FinanceEmployee.Address.State')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.Address.StatePlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Zip */}
              <FormField
                control={form.control}
                name='Zip'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.FinanceEmployee.Address.ZipCode')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.Address.ZipCodePlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Country */}
              <FormField
                control={form.control}
                name='Country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.FinanceEmployee.Address.Country')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.FinanceEmployee.Address.CountryPlaceholder'
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
            form='nurse-form'
            onClick={(e) => {
              e.preventDefault()

              form.handleSubmit(
                (data) => {
                  onSubmit(data)
                },
                (errors) => {
                  console.log(errors)
                }
              )()
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
