import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconUsersGroup,
  IconStethoscope,
  IconNurse,
  IconBuildingSkyscraper,
  IconCalendarMonth,
  IconFlask,
  IconMedicineSyrup,
  IconBrandCashapp,
  IconSos,
  IconBed,
  IconAmbulance,
  IconTax,
  IconReceiptDollar,
  IconEyeClosed,
  IconFileText,
  IconBlocks,
  IconPlug,
  IconAssembly,
  IconEye,
  IconMessage,
  IconHours24,
  IconColorFilter,
} from '@tabler/icons-react'
import { t } from 'i18next'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [],
  navGroups: [
    {
      title: t('Sidebar.Title.Common'),
      items: [
        {
          title: t('Sidebar.Dashboard'),
          url: '/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          title: t('Sidebar.Department'),
          url: '/departament',
          icon: IconBuildingSkyscraper,
          items: [
            {
              title: t('Sidebar.Emergency'),
              url: '/emergency',
              icon: IconSos,
            },
            {
              title: t('Sidebar.Surgery'),
              url: '/surgery',
              icon: IconBed,
            },
            {
              title: t('Sidebar.Attendance'),
              url: '/attendance',
              icon: IconAmbulance,
            },
            {
              title: t('Sidebar.Oncology'),
              url: '/oncology',
              icon: IconColorFilter,
            },
            {
              title: t('Sidebar.Services'),
              url: '/services',
              icon: IconHours24,
            },
          ],
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: IconPackages,
        },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
        {
          title: t('Sidebar.Patients'),
          url: '/patients',
          icon: IconUsersGroup,
        },
        {
          title: t('Sidebar.Calendar'),
          url: '/calendar',
          icon: IconCalendarMonth,
        },
        {
          title: t('Sidebar.Title.Payments'),
          icon: IconTax,
          items: [
            {
              title: t('Sidebar.Payments'),
              url: '/payments',
              icon: IconTax,
            },
            {
              title: t('Sidebar.Receipts'),
              url: '/receipts',
              icon: IconReceiptDollar,
            },
            {
              title: t('Sidebar.Revenues-expenses'),
              url: '/revenues-expenses',
              icon: IconBrandCashapp,
            },
          ],
        },
        {
          title: t('Sidebar.Title.Facilities'),
          icon: IconBrowserCheck,
          items: [
            {
              title: t('Sidebar.Rooms'),
              url: '/rooms',
              icon: IconBed,
            },
            {
              title: t('Sidebar.Equipments'),
              url: '/equipments',
              icon: IconTool,
            },
            {
              title: t('Sidebar.Ambulances'),
              url: '/ambulance',
              icon: IconAmbulance,
            },
          ],
        },
        {
          title: t('Sidebar.Title.Stock'),
          icon: IconBlocks,
          items: [
            {
              title: t('Sidebar.Stock'),
              url: '/stock',
              icon: IconBuildingSkyscraper,
            },
            {
              title: t('Sidebar.Suppliers'),
              url: '/suppliers',
              icon: IconUsers,
            },
          ],
        },
        {
          title: t('Sidebar.Chats'),
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        }
      ],
    },
    {
      title: t('Sidebar.Title.Team'),
      items: [
        {
          title: t('Sidebar.Doctor'),
          url: '/doctor',
          icon: IconStethoscope,
        },
        {
          title: t('Sidebar.Nurse'),
          url: '/nurse',
          icon: IconNurse,
        },
        {
          title: t('Sidebar.Pharmacy'),
          url: '/pharmacy',
          icon: IconMedicineSyrup,
        },
        {
          title: t('Sidebar.Laboratory'),
          url: '/laboratory',
          icon: IconFlask,
        },
        {
          title: t('Sidebar.Receptionist'),
          url: '/receptionist',
          icon: IconUserCog,
        },
        {
          title: t('Sidebar.RH'),
          url: '/rh',
          icon: IconUsers,
        },
        {
          title: t('Sidebar.Finance'),
          url: '/finance',
          icon: IconBrandCashapp,
        },
        {
          title: t('Sidebar.HealthPlans'),
          url: '/health-plans',
          icon: IconReceiptDollar,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: t('Sidebar.Title.Others'),
      items: [
        {
          title: t('Sidebar.Title.Settings'),
          icon: IconSettings,
          items: [
            {
              title: t('Sidebar.Profile'),
              url: '/settings/profile',
              icon: IconUserCog,
            },
            {
              title: t('Sidebar.Account'),
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: t('Sidebar.Appearance'),
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: t('Sidebar.Notifications'),
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: t('Sidebar.Display'),
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: t('Sidebar.Title.Access'),
          icon: IconAssembly,
          items: [
            {
              title: t('Sidebar.ReleaseAccess'),
              url: '/release-access',
              icon: IconLockAccess,
            },
            {
              title: t('Sidebar.PrivacyPolicy'),
              url: '/privacy-policy',
              icon: IconEyeClosed,
            },
            {
              title: t('Sidebar.TermsAndConditions'),
              url: '/terms-and-conditions',
              icon: IconFileText,
            },
            {
              title: t('Sidebar.Integrations'),
              url: '/integrations',
              icon: IconPlug,
            },
            {
              title: t('Sidebar.Audits'),
              url: '/audits',
              icon: IconEye,
            },
          ],
        },
        {
          title: t('Sidebar.Feedback'),
          url: '/feedback',
          icon: IconMessage,
        },
        {
          title: t('Sidebar.HelpCenter'),
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
