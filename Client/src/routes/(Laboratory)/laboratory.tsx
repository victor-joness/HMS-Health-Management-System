import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(Laboratory)/laboratory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(Laboratory)/laboratory"!</div>
}
