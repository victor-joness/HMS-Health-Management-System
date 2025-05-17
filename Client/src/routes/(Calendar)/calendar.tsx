import Cookies from 'js-cookie'
import { createFileRoute } from '@tanstack/react-router'
import { Auth } from '@/entities/Auth'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { UserRoleEnum } from '@/utils/Enum'
import { SearchProvider } from '@/context/search-context'
import useCacheUser from '@/hooks/useCacheUser'
import { SidebarProvider } from '@/components/ui/sidebar'
import EventCalendar from '@/components/calendar/Calendar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import CalendarComponent from '@/components/calendar/Calendar'

export const Route = createFileRoute('/(Calendar)/calendar')({
  component: RouteComponent,
})

const schedule = [
  {
    id: 1,
    title: 'Morning Meeting',
    subtitle: 'Team Sync',
    description: 'Discuss project updates and tasks',
    startTime: '09:00',
    endTime: '10:00',
    isAllDay: false,
    color: 'cornflowerblue',
  },
  {
    id: 2,
    title: 'Lunch Break',
    subtitle: '',
    description: 'Time to relax and have lunch',
    startTime: '12:00',
    endTime: '13:00',
    isAllDay: false,
    color: 'mediumseagreen',
  },
  {
    id: 3,
    title: 'Client Call',
    subtitle: 'Project Discussion',
    description: 'Call with client to discuss project requirements',
    startTime: '15:00',
    endTime: '16:00',
    isAllDay: false,
    color: 'indianred',
  },
  {
    id: 4,
    title: 'All Day Event',
    subtitle: '',
    description: 'An event that lasts all day',
    startTime: null,
    endTime: null,
    isAllDay: true,
    color: 'mediumpurple',
  },
  {
    id: 5,
    title: 'Afternoon Workshop',
    subtitle: 'Skill Development',
    description: 'Workshop on new technology trends',
    startTime: '14:00',
    endTime: '15:30',
    isAllDay: false,
    color: 'goldenrod',
  },
  {
    id: 6,
    title: 'Evening Yoga',
    subtitle: '',
    description: 'Relaxing yoga session',
    startTime: '18:00',
    endTime: '19:00',
    isAllDay: false,
    color: 'lightcoral',
  },
  {
    id: 7,
    title: 'Dinner with Friends',
    subtitle: '',
    description: 'Dinner at the new restaurant in town',
    startTime: '20:00',
    endTime: '22:00',
    isAllDay: false,
    color: 'darkorange',
  },
]

function RouteComponent() {
  useCacheUser({ redirectIfNotAuthenticated: '/login' })
  const auth: Auth = useSelector((state: any) => state.auth)
  const roleName = UserRoleEnum[auth.Role]

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
          <CalendarComponent></CalendarComponent>
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
