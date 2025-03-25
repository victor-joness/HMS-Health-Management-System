import { IconUser } from '@tabler/icons-react' // Usando um ícone genérico para o recepcionista
import { Auth } from '@/entities/Auth'
import { t } from 'i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import Receptionists from '@/features/receptionists'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface ReceptionistAdminProps {
  auth: Auth
}

export default function Receptionist({ auth }: ReceptionistAdminProps) {
  const receptionists = useSelector((state: RootState) => state.receptionists.receptionists)

  return (
    <>
      <Header sticky>
        <h2 className={`text-sm font-medium transition-colors hover:text-primary`}>
          {t('Pages.Receptionist.Overview')}
        </h2>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown auth={auth} />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('Pages.Receptionist.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>{t('Pages.Receptionist.Download')}</Button>
          </div>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>{t('Pages.Receptionist.Overview')}</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                {t('Pages.Receptionist.Analytics')}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Receptionist.Total')}
                  </CardTitle>
                  <IconUser />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{receptionists.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Receptionist.ActiveReceptionists')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>

      <Receptionists />
    </>
  )
}
