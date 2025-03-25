import { useEffect, useState } from 'react'
import { IconPill } from '@tabler/icons-react'
import { Pharmacy } from '@/entities/Pharmacy'
import {Medicines} from '@/entities/Medicines'
import { getAllPharmacies, getMedicinesByPharmacy } from '@/redux/PharmacySlice'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/table/entity-Table'
import { pharmaciesColumns} from '../pharmacies/components/pharmacies-columns'
import { PharmacyActionDialog } from './components/pharmacies-action-dialog'
import { PharmaciesDeleteDialog } from './components/pharmacies-delete-dialog'
import PharmaciesContextProvider, { PharmacyDialogType } from './context/pharmacy-context'
import { AppDispatch, RootState } from '@/redux/store'

export default function Pharmacies() {
  const [currentRow, setCurrentRow] = useState<Pharmacy | null>(null)
  const [open, setOpen] = useDialogState<PharmacyDialogType>(null)
  const [medicines, setMedicines] = useState<Medicines[]>([])

  const pharmacies = useSelector((state: RootState) => state.pharmacies.pharmacies)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllPharmacies())
  }, [dispatch])

  useEffect(() => {
    if (currentRow) {
      dispatch(getMedicinesByPharmacy(currentRow.Id))
        .then((action) => {
          if (getMedicinesByPharmacy.fulfilled.match(action)) {
            setMedicines(action.payload)
          }
        })
    }
  }, [dispatch, currentRow])

  return (
    <PharmaciesContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.Pharmacy.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.Pharmacy.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.Pharmacy.AddPharmacy')}</span> <IconPill size={18} />
            </Button>
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable<Pharmacy> 
            data={pharmacies} 
            columns={pharmaciesColumns} 
            onRowClick={(pharmacy) => setCurrentRow(pharmacy)} 
          />
        </div>

        {currentRow && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">{t('Pages.Medicine.ListTitle')} - {currentRow.name}</h3>
            <DataTable<Medicines> 
              data={medicines} 
              columns={[
                { accessorKey: 'name', header: t('Pages.Medicine.Name') },
                { accessorKey: 'dosage', header: t('Pages.Medicine.Dosage') },
                { accessorKey: 'quantity', header: t('Pages.Medicine.Quantity') },
              ]} 
            />
          </div>
        )}
      </Main>

      <PharmacyActionDialog
        key='pharmacy-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)}
      />

      {currentRow && (
        <>
          <PharmacyActionDialog
            key={`pharmacy-edit-${currentRow.Id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'edit' : null)
              if (!isOpen) setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />

          <PharmaciesDeleteDialog
            key={`pharmacy-delete-${currentRow.Id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'delete' : null)
              if (!isOpen) setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </PharmaciesContextProvider>
  )
}
