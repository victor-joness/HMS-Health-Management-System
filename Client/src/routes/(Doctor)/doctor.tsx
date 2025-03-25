import Cookies from 'js-cookie'
import { createFileRoute } from '@tanstack/react-router'
import { Auth } from '@/entities/Auth'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import useCacheUser from '@/hooks/useCacheUser'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import NotFoundError from '@/features/errors/not-found-error'
import Doctor_Admin from '../../features/Roles/Admin/Doctor/Doctor'
import { UserRoleEnum } from '@/utils/Enum'

export const Route = createFileRoute('/(Doctor)/doctor')({
  component: RouteComponent,
})

function RouteComponent() {
  useCacheUser({ redirectIfNotAuthenticated: '/login' })

  const auth: Auth = useSelector((state: any) => state.auth)
  const roleName = UserRoleEnum[auth.Role]

  const renderDoctor = () => {
    switch (roleName) {
      case 'ADMIN':
        return <Doctor_Admin auth={auth} />
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
          id='content'
          className={cn(
            'max-w-full w-full ml-auto',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] ease-linear duration-200',
            'h-svh flex flex-col'
          )}
        >
          <Outlet />
          {renderDoctor()}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
