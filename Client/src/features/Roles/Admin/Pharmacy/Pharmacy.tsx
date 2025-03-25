import { IconPill } from '@tabler/icons-react'
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
import Pharmacies from '@/features/pharmacies/index'
import Medicines from '@/features/medicines/index'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

interface PharmacyAdminProps {
  auth: Auth
}

export default function Pharmacy({ auth }: PharmacyAdminProps) {
  const farmacias = useSelector((state: RootState) => state.pharmacies.pharmacies)
  const medicamentos = useSelector((state: RootState) => state.pharmacies.medicines)

  return (
    <>
      <Header sticky>
        <h2 className={`text-sm font-medium transition-colors hover:text-primary`}>
          {t('Pages.Pharmacy.Overview')}
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
            {t('Pages.Pharmacy.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>{t('Pages.Pharmacy.Download')}</Button>
          </div>
        </div>
        <Tabs orientation='vertical' defaultValue='overview' className='space-y-4'>
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>{t('Pages.Pharmacy.Overview')}</TabsTrigger>
              <TabsTrigger value='farmacies'>{t('Pages.Pharmacy.Farmacies')}</TabsTrigger>
              <TabsTrigger value='medicines'>{t('Pages.Medicine.Title')}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Pharmacy.TotalPharmacies')}
                  </CardTitle>
                  <IconPill />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{farmacias.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Pharmacy.ActivePharmacies')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Pharmacy.TotalMedicines')}
                  </CardTitle>
                  <IconPill />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{medicamentos.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Pharmacy.AllMedicines')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Pharmacy.PharmaciesWithMedicines')}
                  </CardTitle>
                  <IconPill />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {farmacias.filter(f => f.medicines.length > 0).length}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Pharmacy.PharmaciesWithMedicinesText')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Pharmacy.MedicinesPerPharmacy')}
                  </CardTitle>
                  <IconPill />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {Math.floor(medicamentos.length / farmacias.length)}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {t('Pages.Pharmacy.AvgMedicinesPerPharmacy')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value='farmacies' className='space-y-4'>
            <Pharmacies />
          </TabsContent>

          <TabsContent value='medicines' className='space-y-4'>
            <Medicines />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
