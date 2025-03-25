import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(Resources)/rooms')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(Resources)/rooms"!</div>
}
