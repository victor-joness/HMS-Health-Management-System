import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { Doctor } from '../../../entities/Doctor'
import { createDoctor } from '@/redux/DoctorsSlice'
import { AppDispatch, RootState } from '@/redux/store'

const formSchema = z.object({
  Name: z.string().min(3, { message: 'O nome é obrigatório.' }),
  Email: z
    .string()
    .min(1, { message: 'O e-mail é obrigatório.' })
    .email({ message: 'O e-mail é obrigatório.' }),
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
  Medical_License_Number: z
    .string()
    .min(1, { message: 'O CRM é obrigatório.' }),
  Phone_Number: z.string().min(1, { message: 'O telefone é obrigatório.' }),
  Phone_Emergency: z.string(),

  Specialty: z.nativeEnum(SpecialtyEnum, {
    errorMap: () => ({ message: 'Especialidade é necessária.' }),
  }),
  Certification: z.nativeEnum(CertificationEnum, {
    errorMap: () => ({ message: 'Certificação é obrigatória.' }),
  }),
  Qualifications: z.string(),
  Years_of_Experience: z
    .number()
    .min(1, { message: 'Anos de experiência é obrigatória.' }),
  Department: z.nativeEnum(DepartmentEnum, {
    errorMap: () => ({ message: 'Departamento é obrigatório.' }),
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

  Notas: z.string(),

  Address: z.string().min(1, { message: 'O endereço é obrigatório.' }),
  City: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  State: z.string().min(1, { message: 'O estado é obrigatório.' }),
  Zip: z.string().min(1, { message: 'O CEP é obrigatório.' }),
  Country: z.string().min(1, { message: 'O país é obrigatório.' }),
  isEdit: z.boolean().default(false),
})

type DoctorForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Doctor
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DoctorsActionDialog({ currentRow, open, onOpenChange }: Props) {
  const HospitalId = useSelector((state: RootState) => state.auth.HospitalInfo.Id);

  const isEdit = !!currentRow
  const form = useForm<DoctorForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          Name: currentRow.Name,
          Email: currentRow.Email,
          Password: '',
          Img: currentRow.Img || '',
          Age: currentRow.Age,
          Gender: currentRow.Gender as Gender,
          Medical_License_Number: currentRow.MedicalLicenseNumber,
          Phone_Number: currentRow.PhoneNumber,
          Specialty: currentRow.Speciality as SpecialtyEnum,
          Certification: currentRow.Certifications[0] as CertificationEnum,
          Years_of_Experience: currentRow.YearsOfExperience,
          Department: currentRow.Department as DepartmentEnum,
          Work_schedule_details: currentRow.WorkScheduleDetails,
          Notas: currentRow.Notes,
          Address: currentRow.Address,
          City: '',
          State: '',
          Zip: '',
          Country: '',
          isEdit: true,
        }
      : {
          Name: '',
          Email: '',
          Password: '',
          Img: '',
          Age: 18,
          Gender: undefined,
          Medical_License_Number: '',
          Phone_Number: '',
          Phone_Emergency: '',
          isEdit: false,

          Specialty: undefined,
          Certification: undefined,
          Qualifications: '',
          Years_of_Experience: undefined,
          Department: undefined,

          Work_schedule_details: {
            Monday: '00:00 - 00:00',
            Tuesday: '00:00 - 00:00',
            Wednesday: '00:00 - 00:00',
            Thursday: '00:00 - 00:00',
            Friday: '00:00 - 00:00',
            Saturday: '00:00 - 00:00',
            Sunday: '00:00 - 00:00',
          },

          Notas: '',

          Address: '',
          City: '',
          State: '',
          Zip: '',
          Country: '',
        },
  })

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = async (values: DoctorForm) => {
    try {
      let newDoctor: any = {
        Id: null,
        Name: values.Name,
        Password: values.Password,
        Email: values.Email,
        PhoneNumber: values.Phone_Number,
        Img: values.Img,
        Age: values.Age,
        Role: 'doctor',
        Gender: values.Gender,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Speciality: values.Specialty,
        MedicalLicenseNumber: values.Medical_License_Number,
        YearsOfExperience: values.Years_of_Experience,
        Department: values.Department,
        PatientsAssigned: [],
        WorkScheduleDetails: {
          Monday: values.Work_schedule_details.Monday,
          Tuesday: values.Work_schedule_details.Tuesday,
          Wednesday: values.Work_schedule_details.Wednesday,
          Thursday: values.Work_schedule_details.Thursday,
          Friday: values.Work_schedule_details.Friday,
          Saturday: values.Work_schedule_details.Saturday,
          Sunday: values.Work_schedule_details.Sunday,
        },
        Certifications: [values.Certification],
        ResearchPublications: [],
        SupervisingNurses: [],
        EmergencyAvailability: false,
        Notes: values.Notas,
        Address: values.Address + ' ' + values.City + ' ' + values.Country + ' ' + values.State + ' ' + values.Zip,
        DeletionDate: null,
        ModifiedDate: null,
        CreationDate: new Date().toISOString(),
        UserInfo: null,
        HospitalId: HospitalId
      }

      dispatch(createDoctor(newDoctor))
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.log('Erro ao criar médico', error)
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
              ? t('Pages.Doctor.EditDoctor')
              : t('Pages.Doctor.AddNewDoctor')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('Pages.Doctor.UpdateDoctor')
              : t('Pages.Doctor.CreateDoctor')}{' '}
            <br />
            {t('Pages.Doctor.ModalConfirmation')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              {/* Name */}
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.NamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name='Email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.EmailPlaceholder')}
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
                    <FormLabel>{t('Pages.Doctor.Password')}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t('Pages.Doctor.PasswordPlaceholder')}
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
                    <FormLabel>{t('Pages.Doctor.Img')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.ImgPlaceholder')}
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
                    <FormLabel>{t('Pages.Doctor.Age')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Pages.Doctor.AgePlaceholder')}
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
                    <FormLabel>{t('Pages.Doctor.Gender')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Doctor.GenderPlaceholder')}
                      items={[
                        {
                          label: t('Pages.Doctor.GenderOptions.Masculine'),
                          value: 'MASCULINO',
                        },
                        {
                          label: t('Pages.Doctor.GenderOptions.Feminine'),
                          value: 'FEMININO',
                        },
                        {
                          label: t('Pages.Doctor.GenderOptions.Other'),
                          value: 'OUTRO',
                        },
                      ]}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Medical License Number */}
              <FormField
                control={form.control}
                name='Medical_License_Number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('Pages.Doctor.MedicalLicenseNumber')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Doctor.MedicalLicenseNumberPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Phone Number */}
              <FormField
                control={form.control}
                name='Phone_Number'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Phone')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.PhonePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Specialty */}
              <FormField
                control={form.control}
                name='Specialty'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Specialty')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Doctor.SpecialtyPlaceholder')}
                      items={Object.values(SpecialtyEnum).map((specialty) => ({
                        label: t(`Especiality.${specialty}`),
                        value: specialty,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Certification */}
              <FormField
                control={form.control}
                name='Certification'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Certification')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Doctor.CertificationPlaceholder')}
                      items={Object.values(CertificationEnum).map((cert) => ({
                        label: t(`Pages.Doctor.Certifications.${cert}`),
                        value: cert,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Qualifications */}
              <FormField
                control={form.control}
                name='Qualifications'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Qualifications')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Doctor.QualificationsPlaceholder'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Years of Experience */}
              <FormField
                control={form.control}
                name='Years_of_Experience'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.YearsOfExperience')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t(
                          'Pages.Doctor.YearsOfExperiencePlaceholder'
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
              {/* Department */}
              <FormField
                control={form.control}
                name='Department'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Departament')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Doctor.DepartamentPlaceholder')}
                      items={Object.values(DepartmentEnum).map(
                        (department) => ({
                          label: t(`Departament.${department}`),
                          value: department,
                        })
                      )}
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
                                    {t('Pages.Doctor.WorkSchedule.Start')}
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
                                    {t('Pages.Doctor.WorkSchedule.End')}
                                  </label>
                                  <Input
                                    type='time'
                                    placeholder={t(
                                      'Pages.Doctor.WorkSchedule.EndPlaceholder',
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
                    <FormLabel>{t('Pages.Doctor.Notes')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.NotesPlaceholder')}
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
                name='City'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Doctor.Address.City')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.Address.CityPlaceholder')}
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
                    <FormLabel>{t('Pages.Doctor.Address.State')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Doctor.Address.StatePlaceholder')}
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
                    <FormLabel>{t('Pages.Doctor.Address.ZipCode')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Doctor.Address.ZipCodePlaceholder'
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
                    <FormLabel>{t('Pages.Doctor.Address.Country')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Doctor.Address.CountryPlaceholder'
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
            form='user-form'
            onClick={(e) => {
              e.preventDefault()

              form.handleSubmit(
                (data) => {
                  onSubmit(data)
                },
                (errors) => {
                  console.log(errors);
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
