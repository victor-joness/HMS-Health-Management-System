import { createFileRoute } from '@tanstack/react-router'
import { useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import { UserRoleEnum } from '@/utils/Enum'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import ComingSoon from '@/components/coming-soon'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/help-center/')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = true
  const auth: any = useSelector((state: any) => state.auth)
  const roleName = UserRoleEnum[auth.Role]

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        {/* <AppSidebar role={roleName} /> */}
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
          <ComingSoon />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
