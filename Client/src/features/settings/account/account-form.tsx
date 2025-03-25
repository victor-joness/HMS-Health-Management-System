import { z } from 'zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { t } from 'i18next'


const languages = [
  { label: t("Settings.Account.Language.Options.English"), value: 'en' },
  { label: t("Settings.Account.Language.Options.French"), value: 'fr' },
  { label: t("Settings.Account.Language.Options.German"), value: 'de' },
  { label: t("Settings.Account.Language.Options.Spanish"), value: 'es' },
  { label: t("Settings.Account.Language.Options.Portuguese"), value: 'pt' },
  { label: t("Settings.Account.Language.Options.Russian"), value: 'ru' },
  { label: t("Settings.Account.Language.Options.Japanese"), value: 'ja' },
  { label: t("Settings.Account.Language.Options.Korean"), value: 'ko' },
  { label: t("Settings.Account.Language.Options.Chinese"), value: 'zh' },
] as const

const accountFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: t("Settings.Account.AccountValidation.MinLengthError"),
    })
    .max(30, {
      message: t("Settings.Account.AccountValidation.MaxLengthError"),
    }),
  dob: z.date({
    required_error: t("Settings.Account.AccountValidation.DobRequired"),
  }),
  language: z.string({
    required_error: t("Settings.Account.AccountValidation.LanguageRequired"),
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  name: '',
}

export function AccountForm() {
  const {t, i18n: {changeLanguage, language}} = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = (value: string) => {
    changeLanguage(value);
    setCurrentLanguage(value);
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    handleChangeLanguage(data.language);

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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Settings.Account.Name.Label')}</FormLabel>
              <FormControl>
                <Input placeholder={t("Settings.Account.Name.Placeholder")} {...field} />
              </FormControl>
              <FormDescription>
                {t('Settings.Account.Name.Description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('Settings.Account.Dob.Label')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'MMM d, yyyy')
                      ) : (
                        <span>{t('Settings.Account.Dob.Placeholder')}</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('Settings.Account.Dob.Description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('Settings.Account.Language.Label')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : t('Settings.Account.Language.Placeholder')}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder={t("Settings.Account.Language.SeachPlaceholder")} />
                    <CommandEmpty>{t("Settings.Account.Language.Empty")}</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t('Settings.Account.Language.Description')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{t('Settings.Account.SubmitButton.Label')}</Button>
      </form>
    </Form>
  )
}
