import SignIn2 from '@/features/auth/sign-in/sign-in-2'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(Auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <SignIn2></SignIn2>
    </div>
  )
}
