import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@/features/settings'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SearchProvider } from '@/context/search-context'
import SkipToMain from '@/components/skip-to-main'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { UserRoleEnum } from '@/utils/Enum'
import useCacheUser from '@/hooks/useCacheUser'

export const Route = createLazyFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  useCacheUser({ redirectIfNotAuthenticated: '/login' })

  const defaultOpen = true
  const auth: any = useSelector((state: any) => state.auth)
  const roleName = UserRoleEnum[auth.Role]

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar role={roleName} auth={auth}/>
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
          <Settings auth={auth}/>
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}