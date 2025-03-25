import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createHumanResourcesEmployee } from '@/redux/HumanResourcesEmployeesSlice'
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
import { Textarea } from '@/components/ui/textarea'
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'

const formSchema = z.object({
  Name: z.string().min(3, { message: 'O nome é obrigatório.' }),
  Email: z.string().min(1, { message: 'O e-mail é obrigatório.' }).email(),
  Password: z
    .string()
    .min(7, { message: 'A senha deve ter no mínimo 7 caracteres.' }),
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
  Notes: z.string(),
  isEdit: z.boolean().default(false),
})

type HumanResourcesEmployeeForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HumanResourcesEmployeesActionDialog({
  open,
  onOpenChange,
}: Props) {
  const HospitalId = useSelector((state: RootState) => state.auth.HospitalInfo.Id);

  const form = useForm<HumanResourcesEmployeeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: '',
      Email: '',
      Password: '',
      Img: '',
      Age: 18,
      Gender: undefined,
      PhoneNumber: '',
      Address: '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      Work_schedule_details: {
        Monday: '00:00 - 00:00',
        Tuesday: '00:00 - 00:00',
        Wednesday: '00:00 - 00:00',
        Thursday: '00:00 - 00:00',
        Friday: '00:00 - 00:00',
        Saturday: '00:00 - 00:00',
        Sunday: '00:00 - 00:00',
      },
      Notes: '',
    },
  })

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (values: HumanResourcesEmployeeForm) => {
    try {
      const newEmployee: any = {
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
        WorkScheduleDetails: values.Work_schedule_details,
        Notes: values.Notes,
        CreationDate: new Date().toISOString(),
        HospitalId: HospitalId
      }

      dispatch(createHumanResourcesEmployee(newEmployee))
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.log('Erro ao criar empregado', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {t('Pages.HumanResourcesEmployee.AddNewEmployee')}
          </DialogTitle>
          <DialogDescription>
            {t('Pages.HumanResourcesEmployee.CreateEmployee')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='human-resources-employee-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.HumanResourcesEmployee.Name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.NamePlaceholder'
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
                name='Email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.HumanResourcesEmployee.Email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.EmailPlaceholder'
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
                name='Password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.HumanResourcesEmployee.Password')}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.PasswordPlaceholder'
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
                name='PhoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.HumanResourcesEmployee.Phone')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.PhonePlaceholder'
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
                name='Img'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Receptionist.Img')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Receptionist.ImgPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Age'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.HumanResourcesEmployee.Age')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.AgePlaceholder'
                        )}
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

              <FormField
                control={form.control}
                name='Gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.HumanResourcesEmployee.Gender')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t(
                        'Pages.HumanResourcesEmployee.GenderPlaceholder'
                      )}
                      items={[
                        {
                          label: t(
                            'Pages.HumanResourcesEmployee.GenderOptions.Masculine'
                          ),
                          value: 'MASCULINO',
                        },
                        {
                          label: t(
                            'Pages.HumanResourcesEmployee.GenderOptions.Feminine'
                          ),
                          value: 'FEMININO',
                        },
                        {
                          label: t(
                            'Pages.HumanResourcesEmployee.GenderOptions.Other'
                          ),
                          value: 'OUTRO',
                        },
                      ]}
                    />
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
                        `Work_schedule_details.${day}` as keyof HumanResourcesEmployeeForm
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
                                      'Pages.HumanResourcesEmployee.WorkSchedule.Start'
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
                                      'Pages.HumanResourcesEmployee.WorkSchedule.End'
                                    )}
                                  </label>
                                  <Input
                                    type='time'
                                    placeholder={t(
                                      'Pages.HumanResourcesEmployee.WorkSchedule.EndPlaceholder',
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
                name='Notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.HumanResourcesEmployee.Notes')}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.NotesPlaceholder'
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
                      {t('Pages.HumanResourcesEmployee.Address.Title')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.AddressPlaceholder'
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
                      {t('Pages.HumanResourcesEmployee.Address.City')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.Address.CityPlaceholder'
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
                      {t('Pages.HumanResourcesEmployee.Address.State')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.Address.StatePlaceholder'
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
                      {t('Pages.HumanResourcesEmployee.Address.ZipCode')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.Address.ZipCodePlaceholder'
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
                      {t('Pages.HumanResourcesEmployee.Address.Country')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.HumanResourcesEmployee.Address.CountryPlaceholder'
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
            form='human-resources-employee-form'
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
