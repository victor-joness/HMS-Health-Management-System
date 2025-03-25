import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Patient } from '@/entities/Patients'
import { createPatient } from '@/redux/PatientsSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  PatientAtendimentTypeEnum,
  IdentificationType,
  Gender,
} from '@/utils/Enum'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  IdentificationNumber: z
    .string()
    .min(1, { message: 'O número de identificação é obrigatório.' }),
  IdentificationType: z.nativeEnum(IdentificationType, {
    required_error: 'O tipo de identificação é obrigatório.',
  }),
  PatientAtendimentType: z.nativeEnum(PatientAtendimentTypeEnum, {
    required_error: 'O tipo de atendimento é obrigatório.',
  }),
  EmergencyContact: z
    .string()
    .min(1, { message: 'O contato de emergência é obrigatório.' }),
  MedicalHistory: z.array(z.number()).optional(),
  PreferredDoctorId: z.number().optional(),
  LastVisitDate: z.string().nullable(),
  CovidVaccinationStatus: z.boolean().optional(),
  Disabilities: z.array(z.string()).optional(),
  OrganDonor: z.boolean().optional(),
  AdditionalNotes: z.string().optional(),
  Insurance: z.string().optional(),
  Notes: z.string().optional(),
  WorkInfo: z.string(),
  Report: z.number().optional(),
  Address: z.string().min(1, { message: 'O endereço é obrigatório.' }),
  City: z.string().min(1, { message: 'A cidade é obrigatória.' }),
  State: z.string().min(1, { message: 'O estado é obrigatório.' }),
  Zip: z.string().min(1, { message: 'O CEP é obrigatório.' }),
  Country: z.string().min(1, { message: 'O país é obrigatório.' }),
  isEdit: z.boolean().default(false),
})

type PatientForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Patient
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PatientActionDialog({ currentRow, open, onOpenChange }: Props) {
  const HospitalId = useSelector(
    (state: RootState) => state.auth.HospitalInfo.Id
  )
  const isEdit = !!currentRow

  const form = useForm<PatientForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          Password: '',
          isEdit: true,
        }
      : {},
  })

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (data: any) => {
    dispatch(createPatient(data))
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
              ? t('Pages.Patient.EditPatient')
              : t('Pages.Patient.AddNewPatient')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('Pages.Patient.UpdatePatient')
              : t('Pages.Patient.CreatePatient')}{' '}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='patient-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='Name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Patient.Name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.NamePlaceholder')}
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
                    <FormLabel>{t('Pages.Patient.Email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.EmailPlaceholder')}
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
                    <FormLabel>{t('Pages.Patient.Phone')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.PhonePlaceholder')}
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
                    <FormLabel>{t('Pages.Patient.Age')}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder={t('Pages.Patient.AgePlaceholder')}
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
                name='Img'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Patient.Img')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.ImgPlaceholder')}
                        {...field}
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
                    <FormLabel>{t('Pages.Patient.Gender')}</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('Pages.Patient.GenderPlaceholder')}
                      items={[
                        {
                          label: t('Pages.Patient.GenderOptions.Masculine'),
                          value: 'MASCULINO',
                        },
                        {
                          label: t('Pages.Patient.GenderOptions.Feminine'),
                          value: 'FEMININO',
                        },
                        {
                          label: t('Pages.Patient.GenderOptions.Other'),
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
                name='Address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Patient.Address.Title')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.AddressPlaceholder')}
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
                    <FormLabel>{t('Pages.Patient.Address.City')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.Address.CityPlaceholder')}
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
                    <FormLabel>{t('Pages.Patient.Address.State')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Patient.Address.StatePlaceholder'
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
                    <FormLabel>{t('Pages.Patient.Address.Zip')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.Address.ZipPlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='MedicalHistory'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Patient.MedicalHistory')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t(
                          'Pages.Patient.MedicalHistoryPlaceholder'
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
                name='EmergencyContact'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Patient.EmergencyContact')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          'Pages.Patient.EmergencyContactPlaceholder'
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
                name='Insurance'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Patient.Insurance')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.Patient.InsurancePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='Notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Pages.Patient.Notes')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('Pages.Patient.NotesPlaceholder')}
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
      </DialogContent>
    </Dialog>
  )
}
