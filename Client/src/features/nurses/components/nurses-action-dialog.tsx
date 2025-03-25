import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Nurse } from '@/entities/Nurse'
import { createNurse } from '@/redux/NursesSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  CertificationEnum,
  DepartmentEnum,
  Gender,
  SpecialtyEnum,
} from '@/utils/Enum'
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
  NursingLicenseNumber: z
    .string()
    .min(1, { message: 'O número de registro é obrigatório.' }),
  PhoneNumber: z.string().min(1, { message: 'O telefone é obrigatório.' }),
  PhoneEmergency: z.string(),
  Department: z.nativeEnum(DepartmentEnum),
  Specialization: z.nativeEnum(SpecialtyEnum, {
    errorMap: () => ({ message: 'Especialidade é necessária.' }),
  }),
  YearsOfExperience: z.number().min(1),
  SupervisingDoctor: z.number(),
  Certification: z.nativeEnum(CertificationEnum, {
    errorMap: () => ({ message: 'Certificação é obrigatória.' }),
  }),
  Qualifications: z.string(),
  Work_schedule_details: z.object({
    Monday: z.string().optional().default('00:00 - 00:00'),
    Tuesday: z.string().optional().default('00:00 - 00:00'),
    Wednesday: z.string().optional().default('00:00 - 00:00'),
    Thursday: z.string().optional().default('00:00 - 00:00'),
    Friday: z.string().optional().default('00:00 - 00:00'),
    Saturday: z.string().optional().default('00:00 - 00:00'),
    Sunday: z.string().optional().default('00:00 - 00:00'),
  }),
  EmergencyAvailability: z.boolean(),
  Notes: z.string(),

  Address: z.string().min(1, { message: 'O endereço é obrigatório.' }),
  City: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  State: z.string().min(1, { message: 'O estado é obrigatório.' }),
  Zip: z.string().min(1, { message: 'O CEP é obrigatório.' }),
  Country: z.string().min(1, { message: 'O país é obrigatório.' }),
  isEdit: z.boolean().default(false),
})

type NurseForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Nurse
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NursesActionDialog({ currentRow, open, onOpenChange }: Props) {
  const HospitalId = useSelector(
    (state: RootState) => state.auth.HospitalInfo.Id
  )
  const isEdit = !!currentRow

  const form = useForm<NurseForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          Department: currentRow.Department as DepartmentEnum,
          Specialization: currentRow.Specialization as SpecialtyEnum,
          Work_schedule_details: currentRow.WorkScheduleDetails,
          Password: '',
          isEdit: true,
        }
      : {
          Name: '',
          Email: '',
          Password: '',
          Img: '',
          Age: 18,
          Gender: undefined,
          NursingLicenseNumber: '',
          PhoneNumber: '',
          PhoneEmergency: '',
          Qualifications: '',
          Department: undefined,
          Specialization: undefined,
          YearsOfExperience: 1,
          SupervisingDoctor: 0,
          Certification: [],
          Work_schedule_details: {
            Monday: '00:00 - 00:00',
            Tuesday: '00:00 - 00:00',
            Wednesday: '00:00 - 00:00',
            Thursday: '00:00 - 00:00',
            Friday: '00:00 - 00:00',
            Saturday: '00:00 - 00:00',
            Sunday: '00:00 - 00:00',
          },
          EmergencyAvailability: false,
          Notes: '',
          Address: '',
          City: '',
          State: '',
          Zip: '',
          Country: '',
          isEdit: false,
        },
  })

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (values: NurseForm) => {
    try {
      const newNurse: any = {
        Id: null,
        UserInfo: null,
        Name: values.Name,
        Password: values.Password,
        Email: values.Email,
        NursingLicenseNumber: values.NursingLicenseNumber,
        Department: values.Department,
        Specialization: values.Specialization,
        YearsOfExperience: values.YearsOfExperience,
        SupervisingDoctor: values.SupervisingDoctor,
        PhoneNumber: values.PhoneNumber,
        Role: 'nurse',
        Img: values.Img,
        Age: values.Age,
        Gender: values.Gender,
        Certifications: [values.Certification],
        Qualifications: values.Qualifications,
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
        DeletionDate: null,
        ModifiedDate: null,
        CreationDate: new Date().toISOString(),
        HospitalId: HospitalId,
      }

      dispatch(createNurse(newNurse))
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.log('Erro ao criar enfermeiro', error)
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
            {isEdit ? t('Pages.Nurse.EditNurse') : t('Pages.Nurse.AddNewNurse')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('Pages.Nurse.UpdateNurse')
              : t('Pages.Nurse.CreateNurse')}{' '}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='nurse-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Nurse.Name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.NamePlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.EmailPlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Password')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t('Pages.Nurse.PasswordPlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Img')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.ImgPlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Age')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Pages.Nurse.AgePlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Gender')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Nurse.GenderPlaceholder')}
                      items={[
                        {
                          label: t('Pages.Nurse.GenderOptions.Masculine'),
                          value: 'MASCULINO',
                        },
                        {
                          label: t('Pages.Nurse.GenderOptions.Feminine'),
                          value: 'FEMININO',
                        },
                        {
                          label: t('Pages.Nurse.GenderOptions.Other'),
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
                name='NursingLicenseNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Nurse.LicenseNumber')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.LicenseNumberPlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Phone')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.PhonePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Department'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Nurse.Departament.Departament')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Nurse.DepartamentPlaceholder')}
                      items={Object.values(DepartmentEnum).map((dept) => ({
                        label: t(`Pages.Nurse.Departament.${dept}`),
                        value: dept,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Specialization'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Nurse.Specialization')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Nurse.SpecializationPlaceholder')}
                      items={Object.values(SpecialtyEnum).map((specialty) => ({
                        label: t(`Especiality.${specialty}`),
                        value: specialty,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='YearsOfExperience'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Nurse.YearsOfExperience')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t(
                          'Pages.Nurse.YearsOfExperiencePlaceholder'
                        )}
                        min={0}
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
                name='Certification'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Nurse.Certification')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Nurse.CertificationPlaceholder')}
                      items={Object.values(CertificationEnum).map((cert) => ({
                        label: t(`Pages.Nurse.Certifications.${cert}`),
                        value: cert,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Qualifications'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Nurse.Qualifications')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.QualificationsPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{t('Pages.Nurse.WorkSchedule.Title')}</FormLabel>
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
                      name={`Work_schedule_details.${day}` as keyof DoctorForm}
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
                                    {t('Pages.Nurse.WorkSchedule.Start')}
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
                                    {t('Pages.Nurse.WorkSchedule.End')}
                                  </label>
                                  <Input
                                    type='time'
                                    placeholder={t(
                                      'Pages.Nurse.WorkSchedule.EndPlaceholder',
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
                        {t('Pages.Nurse.EmergencyAvailability')}
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
                name='Notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Nurse.Notes')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Pages.Nurse.NotesPlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Address.Title')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.AddressPlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Address.City')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.Address.CityPlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Address.State')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Nurse.Address.StatePlaceholder')}
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
                    <FormLabel>{t('Pages.Nurse.Address.ZipCode')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Nurse.Address.ZipCodePlaceholder'
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
                    <FormLabel>{t('Pages.Nurse.Address.Country')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Nurse.Address.CountryPlaceholder'
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
