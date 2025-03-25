import { useEffect, useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import { Nurse } from '@/entities/Nurse'
import { getAllNurses } from '@/redux/NursesSlice'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/table/entity-Table'
import { nurseColumns } from './components/nurse-columns'
import { NursesActionDialog } from "./components/nurses-action-dialog";
import { NursesDeleteDialog } from './components/nurses-delete-dialog'
import NursesContextProvider, {
  type NursesDialogType,
} from './context/nurses-context'
import { AppDispatch, RootState } from '@/redux/store'

export default function Nurses() {
  const [currentRow, setCurrentRow] = useState<Nurse | null>(null)
  const [open, setOpen] = useDialogState<NursesDialogType>(null)

  const enfermeiros = useSelector((state: RootState) => state.nurses.nurses)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllNurses())
  }, [dispatch])

  return (
    <NursesContextProvider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.Nurse.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.Nurse.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.Nurse.AddNurse')}</span>{' '}
              <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable<Nurse> data={enfermeiros} columns={nurseColumns} />
        </div>
      </Main> 

      <NursesActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <NursesActionDialog
            key={`user-edit-${currentRow.Id}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'edit' : null)
              if (!isOpen) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            currentRow={currentRow}
          />

          <NursesDeleteDialog
            key={`user-delete-${currentRow.Id}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'delete' : null)
              if (!isOpen) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </NursesContextProvider>
  )
} 