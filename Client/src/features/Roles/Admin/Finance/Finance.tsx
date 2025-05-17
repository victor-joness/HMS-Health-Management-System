import { IconBriefcase } from '@tabler/icons-react'
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
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import FinanceList from '@/features/finance'
import TransactionList from '@/features/finance/transaction'

interface FinanceAdminProps {
  auth: Auth
}

export default function FinanceAdmin({ auth }: FinanceAdminProps) {
  const financeEmployees = useSelector((state: RootState) => state.finances.financesEmployee);

  return (
    <>
      <Header sticky>
        <h2 className='text-sm font-medium transition-colors hover:text-primary'>
          {t('Pages.FinanceEmployee.Overview')}
        </h2>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown auth={auth} />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('Pages.FinanceEmployee.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>{t('Pages.FinanceEmployee.Download')}</Button>
          </div>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>
                {t('Pages.FinanceEmployee.Overview')}
              </TabsTrigger>
              <TabsTrigger value='reports'>
                {t('Pages.FinanceEmployee.Transactions')}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.FinanceEmployee.TotalEmployees')}
                  </CardTitle>
                  <IconBriefcase />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{financeEmployees.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.FinanceEmployee.EmployeeCount')}
                  </p>
                </CardContent>
              </Card>
            </div>
            <FinanceList />
          </TabsContent>

          <TabsContent value='reports' className='space-y-4'>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Transaction.IncomeDay')}
                  </CardTitle>
                  <IconBriefcase />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{financeEmployees.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Transaction.IncomeDayCount')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Transaction.IncomeMonth')}
                  </CardTitle>
                  <IconBriefcase />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{financeEmployees.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Transaction.IncomeMonthCount')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Transaction.IncomeTotal')}
                  </CardTitle>
                  <IconBriefcase />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{financeEmployees.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Transaction.IncomeTotalCount')}
                  </p>
                </CardContent>
              </Card>
            </div>
            <TransactionList />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
