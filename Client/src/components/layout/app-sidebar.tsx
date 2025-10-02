import { RootState } from '@/redux/store'
import { t } from 'i18next'
import { Hospital } from 'lucide-react'
import { useSelector } from 'react-redux'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { NavUser } from '@/components/layout/nav-user'
import { TeamSwitcher } from '@/components/layout/team-switcher'
import { sidebarData } from './data/sidebar-data'

const rolePermissions: { [key: string]: string[] } = {
  ADMIN: [
    t('Sidebar.Dashboard'),
    t('Sidebar.Monitoring'),
    t('Sidebar.MedicalRecords'),
    t('Sidebar.Department'),
    t('Sidebar.Doctor'),
    t('Sidebar.Nurse'),
    t('Sidebar.Patients'),
    t('Sidebar.Emergency'),
    t('Sidebar.Rooms'),
    t('Sidebar.Ambulances'),
    t('Sidebar.Appointment'),
    t('Sidebar.Calendar'),
    t('Sidebar.Laboratory'),
    t('Sidebar.Pharmacy'),
    t('Sidebar.Receptionist'),
    t('Sidebar.Finance'),
    t('Sidebar.RH'),
    t('Sidebar.Equipments'),
    t('Sidebar.Payments'),
    t('Sidebar.Receipts'),
    t('Sidebar.ReleaseAccess'),
    t('Sidebar.PrivacyPolicy'),
    t('Sidebar.TermsAndConditions'),
    t('Sidebar.Suppliers'),
    t('Sidebar.Stock'),
    t('Sidebar.Integrations'),
    t('Sidebar.Audits'),
    t('Sidebar.Feedback'),
    t('Sidebar.HealthPlans'),
    t('Sidebar.Revenues-expenses'),
    t('Sidebar.Services'),
    t('Sidebar.Oncology'),
    t('Sidebar.Surgery'),
    t('Sidebar.Attendance'),
    t('Sidebar.Profile'),
    t('Sidebar.Account'),
    t('Sidebar.Appearance'),
    t('Sidebar.Notifications'),
    t('Sidebar.Display'),
    t('Sidebar.HelpCenter'),
    t('Sidebar.Chats'),
  ],
  PACIENTE: [
    t('Sidebar.Dashboard'),
    t('Sidebar.PrivacyPolicy'),
    t('Sidebar.TermsAndConditions'),
    '',
    t('Sidebar.Profile'),
    t('Sidebar.Account'),
    t('Sidebar.Appearance'),
    t('Sidebar.Notifications'),
    t('Sidebar.Display'),
    t('Sidebar.HelpCenter'),
    t('Sidebar.Chats'),
  ],
  DOUTOR: [
    t('Sidebar.Dashboard'),
    t('Sidebar.Calendar'),
    t('Sidebar.Patients'),
    t('Sidebar.Emergency'),
    t('Sidebar.PrivacyPolicy'),
    t('Sidebar.TermsAndConditions'),
    '',
    t('Sidebar.Department'),
    t('Sidebar.Services'),
    t('Sidebar.Surgery'),
    t('Sidebar.Attendance'),
    t('Sidebar.Profile'),
    t('Sidebar.Account'),
    t('Sidebar.Appearance'),
    t('Sidebar.Notifications'),
    t('Sidebar.Display'),
    t('Sidebar.HelpCenter'),
    t('Sidebar.Chats'),
  ],
  ENFERMEIRA: [
    t('Sidebar.Dashboard'),
    t('Sidebar.PrivacyPolicy'),
    t('Sidebar.TermsAndConditions'),
    '',
    t('Sidebar.Profile'),
    t('Sidebar.Account'),
    t('Sidebar.Appearance'),
    t('Sidebar.Notifications'),
    t('Sidebar.Display'),
    t('Sidebar.HelpCenter'),
    t('Sidebar.Chats'),
  ],
  RH: [],
  FINANCEIRO: [],
  FARMACIA: [],
  LABORATORIO: [],
  RECEPCIONISTA: [
    t('Sidebar.Dashboard'),
    t('Sidebar.Calendar'),
    t('Sidebar.Patients'),
    t('Sidebar.PrivacyPolicy'),
    t('Sidebar.TermsAndConditions'),
    '',
    t('Sidebar.Profile'),
    t('Sidebar.Account'),
    t('Sidebar.Appearance'),
    t('Sidebar.Notifications'),
    t('Sidebar.Display'),
    t('Sidebar.HelpCenter'),
    t('Sidebar.Chats'),
  ],
  VIEWER: [],
}

function getFilteredNavGroups(navGroups: any, role: string) {
  const allowedItems = rolePermissions[role] || []

  return navGroups
    .map((group: any) => ({
      ...group,
      items: group.items
        .map((item: any) => {
          if (item.items) {
            const filteredSubItems = item.items.filter((subItem: any) =>
              allowedItems.includes(subItem.title)
            )
            return filteredSubItems.length > 0
              ? { ...item, items: filteredSubItems }
              : null
          }
          return allowedItems.includes(item.title) ? item : null
        })
        .filter(Boolean),
    }))
    .filter((group: any) => group.items.length > 0)
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const hospitalInfo = useSelector((state: RootState) => state.auth.HospitalInfo);
  
  const filteredNavGroups = getFilteredNavGroups(
    sidebarData.navGroups,
    props.role ?? 'VIEWER'
  )

  sidebarData.teams = [
    {
      name: `${hospitalInfo.Name}`,
      logo: Hospital,
      plan: `${hospitalInfo.PhoneNumber}`,
    },
  ]

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {filteredNavGroups.map((group: any) => (
          <NavGroup key={group.title} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.auth} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
