import { IconFlask } from '@tabler/icons-react'
import { Auth } from '@/entities/Auth'
import { t } from 'i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { RecordButtons } from '@/components/medical-records/RecordButtons'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import LaboratoryPage from '@/features/laboratory/index'

interface LaboratoryAdminProps {
  auth: Auth
}

export default function Laboratory_admin({
  auth,
}: LaboratoryAdminProps) {
  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.Laboratory.Overview')}
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
            {t('Pages.Laboratory.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>{t('Pages.Laboratory.Download')}</Button>
            <RecordButtons />
          </div>
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>
                {t('Pages.Laboratory.Overview')}
              </TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                {t('Pages.Laboratory.Analytics')}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Laboratory.Total')}
                  </CardTitle>
                  <IconFlask />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>5</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Laboratory.ActiveExams')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Laboratory.TotalCategories')}
                  </CardTitle>
                  <IconFlask />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>4</div>
                  <p className='text-xs text-muted-foreground'>
                    Categorias disponíveis
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Laboratory.AvgPricePerExam')}
                  </CardTitle>
                  <IconFlask />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>R$ 204,00</div>
                  <p className='text-xs text-muted-foreground'>
                    Preço médio
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Tempo Médio
                  </CardTitle>
                  <IconFlask />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>48 min</div>
                  <p className='text-xs text-muted-foreground'>
                    Duração média
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>

      <LaboratoryPage />
    </>
  )
} 