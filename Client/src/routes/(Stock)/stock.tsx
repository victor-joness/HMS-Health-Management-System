import { createFileRoute } from '@tanstack/react-router'
import { Stock_admin } from '@/features/Roles/Admin/Stock/Stock_admin'

export const Route = createFileRoute('/(Stock)/stock')({
  component: Stock_admin,
})
