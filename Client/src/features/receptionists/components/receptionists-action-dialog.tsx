import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createReceptionist } from '@/redux/ReceptionistsSlice'
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
import { Switch } from '@/components/ui/switch'
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
  Work_schedule_details: z.object({
    Monday: z.string().optional().default('00:00 - 00:00'),
    Tuesday: z.string().optional().default('00:00 - 00:00'),
    Wednesday: z.string().optional().default('00:00 - 00:00'),
    Thursday: z.string().optional().default('00:00 - 00:00'),
    Friday: z.string().optional().default('00:00 - 00:00'),
    Saturday: z.string().optional().default('00:00 - 00:00'),
    Sunday: z.string().optional().default('00:00 - 00:00'),
  }),
  PhoneNumber: z.string().min(11, { message: 'O telefone é obrigatório.' }),
  Address: z.string().min(1, { message: 'O endereço é obrigatório.' }),
  City: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  State: z.string().min(1, { message: 'O estado é obrigatório.' }),
  Zip: z.string().min(1, { message: 'O CEP é obrigatório.' }),
  Country: z.string().min(1, { message: 'O país é obrigatório.' }),
  EmergencyAvailability: z.boolean(),
  Notes: z.string(),
  isEdit: z.boolean().default(false),
})

type ReceptionistForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReceptionistsActionDialog({ open, onOpenChange }: Props) {
    const HospitalId = useSelector((state: RootState) => state.auth.HospitalInfo.Id);
  const form = useForm<ReceptionistForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: '',
      Email: '',
      Password: '',
      Img: '',
      PhoneNumber: '',
      Address: '',
      Age: 18,
      Gender: undefined,
      Work_schedule_details: {
        Monday: '00:00 - 00:00',
        Tuesday: '00:00 - 00:00',
        Wednesday: '00:00 - 00:00',
        Thursday: '00:00 - 00:00',
        Friday: '00:00 - 00:00',
        Saturday: '00:00 - 00:00',
        Sunday: '00:00 - 00:00',
      },
      City: '',
      State: '',
      Zip: '',
      Country: '',
      EmergencyAvailability: false,
      Notes: '',
      isEdit: false,
    },
  })

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (values: ReceptionistForm) => {
    try {
      const newReceptionist = {
        Id: null,
        Name: values.Name,
        Email: values.Email,
        Password: values.Password,
        Img: values.Img,
        PhoneNumber: values.PhoneNumber,
        Age: values.Age,
        Gender: values.Gender,
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
        EmergencyAvailability: values.EmergencyAvailability,
        Notes: values.Notes,
        CreationDate: new Date().toISOString(),
        HospitalId: HospitalId
      }

      dispatch(createReceptionist(newReceptionist))
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.log('Erro ao criar recepcionista', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {t('Pages.Receptionist.AddNewReceptionist')}
          </DialogTitle>
          <DialogDescription>
            {t('Pages.Receptionist.CreateReceptionist')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='receptionist-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Receptionist.Name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Receptionist.NamePlaceholder')}
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
                    <FormLabel>{t('Pages.Receptionist.Email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Receptionist.EmailPlaceholder')}
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
                    <FormLabel>{t('Pages.Receptionist.Password')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t(
                          'Pages.Receptionist.PasswordPlaceholder'
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
                    <FormLabel>{t('Pages.Receptionist.Phone')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Receptionist.PhonePlaceholder')}
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
                    <FormLabel>{t('Pages.Receptionist.Age')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Pages.Receptionist.AgePlaceholder')}
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
                    <FormLabel>{t('Pages.Receptionist.Gender')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Receptionist.GenderPlaceholder')}
                      items={[
                        {
                          label: t(
                            'Pages.Receptionist.GenderOptions.Masculine'
                          ),
                          value: 'MASCULINO',
                        },
                        {
                          label: t('Pages.Receptionist.GenderOptions.Feminine'),
                          value: 'FEMININO',
                        },
                        {
                          label: t('Pages.Receptionist.GenderOptions.Other'),
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
                name='Notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Receptionist.Notes')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Pages.Receptionist.NotesPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>
                  {t('Pages.Receptionist.WorkSchedule.Title')}
                </FormLabel>
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
                      name={`Work_schedule_details.${day}` as keyof ReceptionistForm}
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
                                    {t('Pages.Receptionist.WorkSchedule.Start')}
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
                                    {t('Pages.Receptionist.WorkSchedule.End')}
                                  </label>
                                  <Input
                                    type='time'
                                    placeholder={t(
                                      'Pages.Receptionist.WorkSchedule.EndPlaceholder',
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
                name='EmergencyAvailability'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                    <div className='space-y-0.5'>
                      <FormLabel>
                        {t('Pages.Receptionist.EmergencyAvailability')}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Receptionist.Address.Title')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Receptionist.AddressPlaceholder')}
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
                      {t('Pages.Receptionist.Address.City')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Receptionist.Address.CityPlaceholder'
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
                name='State'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Receptionist.Address.State')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Receptionist.Address.StatePlaceholder'
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
                name='Zip'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Receptionist.Address.ZipCode')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Receptionist.Address.ZipCodePlaceholder'
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
                name='Country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Receptionist.Address.Country')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Receptionist.Address.CountryPlaceholder'
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
            form='receptionist-form'
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
