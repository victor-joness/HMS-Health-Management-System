import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SearchProvider } from '@/context/search-context'
import { Auth } from '@/entities/Auth'
import NotFoundError from '@/features/errors/not-found-error'
import ReleaseAccess_admin from '@/features/Roles/Admin/Access/ReleaseAccess'
import useCacheUser from '@/hooks/useCacheUser'
import { cn } from '@/lib/utils'
import { UserRoleEnum } from '@/utils/Enum'
import { createFileRoute } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export const Route = createFileRoute('/(Access)/release-access')({
  component: RouteComponent,
})

function RouteComponent() {
  useCacheUser({ redirectIfNotAuthenticated: '/login' })

  const auth: Auth = useSelector((state: any) => state.auth)
  const roleName = UserRoleEnum[auth.Role]

  const renderReleaseAccess = () => {
    switch (roleName) {
      case 'ADMIN':
        return <ReleaseAccess_admin auth={auth} />
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
          {renderReleaseAccess()}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
} 