import Cookies from 'js-cookie'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Auth } from '@/entities/Auth'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { UserRoleEnum } from '@/utils/Enum'
import { SearchProvider } from '@/context/search-context'
import useCacheUser from '@/hooks/useCacheUser'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import NotFoundError from '@/features/errors/not-found-error'
import PatientProfile from '@/features/patients/PatientProfile'

export const Route = createFileRoute('/(Patients)/patients/profile/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  useCacheUser({ redirectIfNotAuthenticated: '/login' })

  const { id } = useParams({ strict: false })
  const auth: Auth = useSelector((state: any) => state.auth)
  const roleName = UserRoleEnum[auth.Role]
    console.log(id);
  const location = useLocation()
  const paciente = location.state;

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  const renderPatient = () => {
      switch (roleName) {
        case 'ADMIN':
        case 'DOUTOR':
          return <PatientProfile Patient={paciente} Auth={auth} />
        default:
          return <NotFoundError />
      }
    }

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
          {renderPatient()}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
