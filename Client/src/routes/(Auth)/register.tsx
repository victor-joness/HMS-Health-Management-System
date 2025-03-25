import { createFileRoute } from '@tanstack/react-router'
import SignUp from '@/features/auth/sign-up'

export const Route = createFileRoute('/(Auth)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <SignUp />
      </div>
    </div>
  )
}
