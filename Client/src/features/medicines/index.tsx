import { useEffect, useState } from 'react'
import { IconPill } from '@tabler/icons-react'
import { Medicines } from '@/entities/Medicines'
import { getMedicinesByPharmacy } from '@/redux/PharmacySlice'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/table/entity-Table'
import { medicinesColumns } from './components/medicines-columns' // Crie esse arquivo de colunas
import { MedicinesActionDialog } from './components/medicines-action-dialog' // Ação para medicamentos
import { MedicinesDeleteDialog } from './components/medicines-delete-dialog' // Ação para deletar medicamentos
import MedicinesContextProvider, { MedicinesDialogType } from './context/medicines-context'
import { AppDispatch } from '@/redux/store'

export default function MedicinesPage() {
  const [currentRow, setCurrentRow] = useState<Medicines | null>(null)
  const [open, setOpen] = useDialogState<MedicinesDialogType>(null)
  const [medicines, setMedicines] = useState<Medicines[]>([])

  const dispatch = useDispatch<AppDispatch>()

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
    <MedicinesContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.Medicine.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.Medicine.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.Medicine.AddMedicine')}</span> <IconPill size={18} />
            </Button>
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable<Medicines>
            data={medicines}
            columns={medicinesColumns}
            onRowClick={(medicine) => setCurrentRow(medicine)} 
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

      <MedicinesActionDialog
        key='medicine-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'add' : null)}
      />

      {currentRow && (
        <>
          <MedicinesActionDialog
            key={`medicine-edit-${currentRow.Id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'edit' : null)
              if (!isOpen) setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />

          <MedicinesDeleteDialog
            key={`medicine-delete-${currentRow.Id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'delete' : null)
              if (!isOpen) setTimeout(() => setCurrentRow(null), 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </MedicinesContextProvider>
  )
}
