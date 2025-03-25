import { useMemo } from 'react'
import { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function ProfileForm() {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const profileFormSchema = useMemo(() => {
    return z.object({
      username: z
        .string({
          required_error: t(
            'Settings.Profile.ProfileValidation.UsernameRequired'
          ),
        })
        .min(3, {
          message: t('Settings.Profile.ProfileValidation.UsernameMinLength'),
        })
        .max(30, {
          message: t('Settings.Profile.ProfileValidation.UsernameMaxLength'),
        }),
      email: z
        .string({
          required_error: t('Settings.Profile.ProfileValidation.EmailRequired'),
        })
        .email(),
      bio: z
        .string()
        .max(160, {
          message: t('Settings.Profile.ProfileValidation.BiographyMaxLength'),
        })
        .min(4, {
          message: t('Settings.Profile.ProfileValidation.BiographyMinLength'),
        }).optional(),  
      urls: z
        .array(
          z.object({
            value: z
              .string()
              .url({
                message: t('Settings.Profile.ProfileValidation.UrlInvalid'),
              }),
          })
        )
        .optional(),
    })
  }, [language])

  type ProfileFormValues = z.infer<typeof profileFormSchema>

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    urls: [
      { value: 'https://victor.com' },
      { value: 'http://twitter.com/victor' },
    ],
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Settings.Profile.Username')}</FormLabel>
              <FormControl>
                <Input placeholder='Victor' {...field} />
              </FormControl>
              <FormDescription>
                {t('Settings.Profile.UsernameDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Settings.Profile.Email')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t('Settings.Profile.EmailPlaceholder')}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t('Settings.Profile.EmailDescription')}{' '}
                <Link to='/' className='text-primary'>
                  {t('Settings.Profile.EmailButton')}
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Settings.Profile.Biography')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('Settings.Profile.BiographyPlaceholder')}
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t('Settings.Profile.BiographyDescription')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    {t('Settings.Profile.URL')}
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    {t('Settings.Profile.URLDescription')}
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            {t('Settings.Profile.URLButton')}
          </Button>
        </div>
        <Button style={{ marginBottom: '2rem' }} type='submit'>
          {t('Settings.Profile.ProfileButton')}
        </Button>
      </form>
    </Form>
  )
}
