import { useEffect, useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import { Receptionist } from '@/entities/Receptionist'
import { getAllReceptionists } from '@/redux/ReceptionistsSlice'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/table/entity-Table'
import { receptionistColumns } from './components/receptionists-columns'
import { ReceptionistsActionDialog } from "./components/receptionists-action-dialog"
import { ReceptionistsDeleteDialog } from './components/receptionists-delete-dialog'
import ReceptionistsContextProvider, {
  type ReceptionistsDialogType,
} from './context/receptionists-context'
import { AppDispatch, RootState } from '@/redux/store'

export default function Receptionists() {
  const [currentRow, setCurrentRow] = useState<Receptionist | null>(null) 
  const [open, setOpen] = useDialogState<ReceptionistsDialogType>(null) 

  const receptionists = useSelector((state: RootState) => state.receptionists.receptionists)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllReceptionists())
  }, [dispatch])

  return (
    <ReceptionistsContextProvider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.Receptionist.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.Receptionist.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.Receptionist.AddReceptionist')}</span>
              <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable<Receptionist> data={receptionists} columns={receptionistColumns} /> 
        </div>
      </Main> 

      <ReceptionistsActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <ReceptionistsActionDialog
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

          <ReceptionistsDeleteDialog
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
    </ReceptionistsContextProvider>
  )
}
