import { Link } from '@tanstack/react-router'
import ViteLogo from '@/assets/vite.svg'
import { UserAuthForm } from './components/user-auth-form'
import Logo from '@/assets/LOGO.png'
import useCacheUser from '@/hooks/useCacheUser'
import { t } from 'i18next'

export default function SignIn2() {
  useCacheUser({ redirectIfAuthenticated: '/dashboard' });

  return (
    <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <img src={Logo} alt="Logo do hospital" className='mr-5 bg-white p-2 rounded-lg'/>
          {t("Login.HospitalName")}
        </div>

        <img
          src={ViteLogo}
          className='relative m-auto'
          width={301}
          height={60}
          alt='Vite'
        />

        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
            &ldquo;{t("Login.Description")}&ldquo;
            </p>
            <footer className='text-sm'>{t("Login.Author")}</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>{t("Login.Login")}</h1>
            <p className='text-base text-muted-foreground'>
              {t("Login.FormDescription")}<br />
              {t("Login.FormDescription2")}
            </p>
          </div>
          <UserAuthForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            {t("Login.FormPolitics")}{' '}
            <a
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              {t("Login.Terms")}
            </a>{' '}
            e{' '}
            <a
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              {t("Login.Privacy")}
            </a>
            .
          </p>
          <p className='text-sm text-center text-muted-foreground '>
            {t("Login.FormRegister")}<br />{' '}
            <Link
              to='/register'
              className='underline underline-offset-4 hover:text-primary text-primary'
            >
              {t("Login.Register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
