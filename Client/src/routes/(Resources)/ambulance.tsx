import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(Resources)/ambulance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(Resources)/ambulance"!</div>
}
