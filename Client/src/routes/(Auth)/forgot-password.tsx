import { createFileRoute } from '@tanstack/react-router'
import ForgotPassword from '@/features/auth/forgot-password'

export const Route = createFileRoute('/(Auth)/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <>
        <ForgotPassword></ForgotPassword>
      </>
    </div>
  )
}
