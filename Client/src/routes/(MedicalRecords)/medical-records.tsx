import NotFoundError from '@/features/errors/not-found-error'
import useCacheUser from '@/hooks/useCacheUser'
import { UserRoleEnum } from '@/utils/Enum'
import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

import MedicalRecords_Admin from '../../features/Roles/Admin/MedicalRecords/MedicalRecords'
import { Auth } from '@/entities/Auth'
import Cookies from 'js-cookie'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import SkipToMain from '@/components/skip-to-main'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/(MedicalRecords)/medical-records')({
  component: RouteComponent,
})

function RouteComponent() {
  useCacheUser({ redirectIfNotAuthenticated: '/login' })

  const auth: Auth = useSelector((state: any) => state.auth)
  const roleName = UserRoleEnum[auth.Role]

  const renderMedicalRecords = () => {
    switch (roleName) {
      case 'ADMIN':
        return <MedicalRecords_Admin auth={auth} />
      default:
        return <NotFoundError />
    }
  }

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar role={roleName} auth={auth} />
        <div
          id="content"
          className={cn(
            'max-w-full w-full ml-auto',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] ease-linear duration-200',
            'h-svh flex flex-col',
          )}
        >
          <Outlet />
          {renderMedicalRecords()}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
