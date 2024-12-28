import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Auth, UserRole } from '@/types/Auth'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import NotFoundError from '@/features/errors/not-found-error'
import Dashboard_Admin from '../../features/Roles/Admin/Dashboard/Dashboard'
import Dashboard_Doctor from '../../features/Roles/Doctor/Dashboard/Dashboard'
import Dashboard_Nurse from '../../features/Roles/Nurse/Dashboard/Dashboard'
import Dashboard_Patient from '../../features/Roles/Patient/Dashboard/Dashboard'

export const Route = createFileRoute('/(Dashboard)/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const auth: Auth = useSelector((state: any) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth?.Role) {
      navigate('/login')
    }
  }, [auth, navigate])

  const renderDashboard = () => {
    const roleName = UserRole[auth.Role]

    switch (roleName) {
      case 'ADMIN':
        return <Dashboard_Admin auth={auth} />
      case 'DOUTOR':
        return <Dashboard_Doctor auth={auth} />
      case 'ENFERMEIRA':
        return <Dashboard_Nurse auth={auth} />
      case 'PACIENTE':
        return <Dashboard_Patient auth={auth} />
      default:
        return <NotFoundError />
    }
  }

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
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
          {renderDashboard()}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
