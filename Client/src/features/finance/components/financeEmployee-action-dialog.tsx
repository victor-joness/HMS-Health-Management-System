import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FinanceEmployee } from '@/entities/FinanceEmployee'
import { createFinance } from '@/redux/FinanceSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
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
import { Gender } from '@/utils/Enum'
import { t } from 'i18next'

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
  Notes: z.string(),
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
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm<FinanceEmployeeForm>({
      resolver: zodResolver(formSchema),
      defaultValues: currentRow
        ? {
            
          }
        : {
            
          },
    })

  const onSubmit = async (data: FinanceEmployeeForm) => {
    if (data.isEdit) {
      // Dispatch update logic here
    } else {
      dispatch(createFinance(data))
      onOpenChange(false)
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
            {currentRow ? t('Pages.FinanceEmployee.EditFinanceEmployee') : t('Pages.FinanceEmployee.AddNewFinanceEmployee')}
          </DialogTitle>
          <DialogDescription>
            {currentRow ? t('Pages.FinanceEmployee.UpdateFinanceEmployee') : t('Pages.FinanceEmployee.CreateFinanceEmployee')}
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
                        placeholder={t('Pages.FinanceEmployee.EmailPlaceholder')}
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
                    <FormLabel>{t('Pages.FinanceEmployee.PhoneNumber')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.FinanceEmployee.PhoneNumberPlaceholder')}
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
                    <FormLabel>{t('Pages.FinanceEmployee.Address')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.FinanceEmployee.AddressPlaceholder')}
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
                    <FormLabel>{t('Pages.FinanceEmployee.City')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.FinanceEmployee.CityPlaceholder')}
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
                    <FormLabel>{t('Pages.FinanceEmployee.State')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.FinanceEmployee.StatePlaceholder')}
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
                    <FormLabel>{t('Pages.FinanceEmployee.Zip')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Pages.FinanceEmployee.ZipPlaceholder')}
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
