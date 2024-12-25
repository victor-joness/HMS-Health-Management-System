import { Link } from '@tanstack/react-router'
import ViteLogo from '@/assets/vite.svg'
import { UserAuthForm } from './components/user-auth-form'
import Logo from '@/assets/LOGO.png'

export default function SignIn2() {
  return (
    <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <img src={Logo} alt="Logo do hospital" className='mr-5 bg-white p-2 rounded-lg'/>
          template nome do hospital
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
              &ldquo;This template has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.This template has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.This template has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className='text-sm'>John Doe</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
            <p className='text-base text-muted-foreground'>
              Digite seu e-mail e senha abaixo <br />
              para entrar na sua conta
            </p>
          </div>
          <UserAuthForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Ao clicar em login, você concorda com nossos{' '}
            <a
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Politica de Privacidade
            </a>
            .
          </p>
          <p className='text-sm text-center text-muted-foreground '>
            Ainda não possui uma conta? <br />{' '}
            <Link
              to='/register'
              className='underline underline-offset-4 hover:text-primary text-primary'
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
