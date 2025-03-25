import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(Resources)/equipments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(Resources)/equipments"!</div>
}
