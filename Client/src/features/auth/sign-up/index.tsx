import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { SignUpForm } from './components/sign-up-form'
import useCacheUser from '@/hooks/useCacheUser'
import { t } from 'i18next'

export default function SignUp() {
  useCacheUser({ redirectIfAuthenticated: '/dashboard' });

  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='mb-2 flex flex-col space-y-2 text-left'>
          <h1 className='text-lg font-semibold tracking-tight'>
            {t("Register.Title")}
          </h1>
          <p className='text-sm text-muted-foreground'>
            {t("Register.Description")}<br />
            {t("Register.AlreadyHaveAccount")}{' '}
            <Link
              to='/login'
              className='underline underline-offset-4 hover:text-primary text-primary'
            >
              {t("Register.Login")}
            </Link>
          </p>
        </div>
        <SignUpForm />
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          {t("Register.AcceptTerms")}{' '}
          <a
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            {t("Register.Terms")}
          </a>{' '}
          e{' '}
          <a
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            {t("Register.Privacy")}
          </a>
          .
        </p>
      </Card>
    </AuthLayout>
  )
}
