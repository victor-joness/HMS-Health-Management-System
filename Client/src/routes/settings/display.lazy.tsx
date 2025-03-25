import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsDisplay from '@/features/settings/display'

export const Route = createLazyFileRoute('/settings/display')({
  component: SettingsDisplay,
})
