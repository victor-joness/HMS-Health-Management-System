import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconLoader,
} from '@tabler/icons-react'
import { AppDispatch } from '@/main'
import { registerUser } from '@/redux/authSlice'
import { useDispatch } from 'react-redux'
import { cn } from '@/lib/utils'
import { MaskValidation } from '@/utils/MaskValidation'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z
  .object({
    Name: z.string().min(1, { message: 'Por favor insira seu nome' }),
    Email: z
      .string()
      .min(1, { message: 'Por favor insira seu email' })
      .email({ message: 'Email inválido' }),
    Password: z
      .string()
      .min(1, { message: 'Por favor insira sua senha' })
      .min(7, { message: 'Senha deve ter pelo menos 6 caracteres' }),
    ConfirmPassword: z.string(),
    Age: z.number().min(18, { message: 'Idade deve ser maior ou igual a 18' }),
    Gender: z.enum(['Masculino', 'Feminino', 'Outro'], {
      errorMap: () => ({ message: 'Selecione uma opção válida' }),
    }),
    PhoneNumber: z
      .string()
      .min(10, { message: 'Número de telefone inválido' })
      .max(15, { message: 'Número de telefone muito longo' }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: 'As senhas não coincidem',
    path: ['ConfirmPassword'],
  })

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Age: 0,
      Gender: undefined,
      PhoneNumber: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const user = {
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
      Img: 'default-img.png',
      Age: data.Age,
      Gender: data.Gender,
      PhoneNumber: data.PhoneNumber,
    }

    dispatch(registerUser(user))
      .unwrap()
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const maskedValue = MaskValidation(value, '(99) 99999-9999')
    form.setValue('PhoneNumber', maskedValue)
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value ? Number(value) : 0
    form.setValue('Age', numericValue)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='Name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ConfirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Age'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='18'
                      value={field.value || ''} // Garantir que o valor seja controlado
                      onChange={(e) => {
                        field.onChange(e)
                        handleAgeChange(e) // Chamando a função de conversão
                      }}
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
                <FormItem className='space-y-1'>
                  <FormLabel>Gênero</FormLabel>
                  <FormControl>
                    <select
                      className='block w-full rounded-md border border-input bg-background p-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                      {...field}
                    >
                      <option value=''>Selecione uma opção</option>
                      <option value='Masculino'>Masculino</option>
                      <option value='Feminino'>Feminino</option>
                      <option value='Outro'>Outro</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='PhoneNumber'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      type='tel'
                      placeholder='(88) 99999-9999'
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e)
                        handlePhoneNumberChange(e)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              {isLoading ? (
                <>
                  <IconLoader className='mr-2 h-4 w-4 animate-spin' />
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </Button>
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Ou continuar com
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandGithub className='h-4 w-4' /> GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandFacebook className='h-4 w-4' /> Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
