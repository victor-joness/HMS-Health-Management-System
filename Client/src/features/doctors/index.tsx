import { useEffect, useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import { Doctor } from '@/entities/Doctor'
import { getAllDoctors } from '@/redux/DoctorsSlice'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import {DataTable} from "../../components/table/entity-Table";
import { doctorColumns } from './components/doctor-columns'
import { DoctorsActionDialog } from "./components/doctors-action-dialog";
import { DoctorsDeleteDialog } from "./components/doctors-delete-dialog";
import DoctorsContextProvider, {
  type DoctorsDialogType,
} from './context/doctors-context'
import { AppDispatch, RootState } from '@/redux/store'

export default function Doctors() {
  const [currentRow, setCurrentRow] = useState<Doctor | null>(null)
  const [open, setOpen] = useDialogState<DoctorsDialogType>(null)

  const doctors = useSelector((state: RootState) => state.doctors.doctors)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllDoctors())
  }, [dispatch])

  return (
    <DoctorsContextProvider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.Doctor.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.Doctor.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.Doctor.AddDoctor')}</span>{' '}
              <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable<Doctor> data={doctors} columns={doctorColumns} />
        </div>
      </Main>

      <DoctorsActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <DoctorsActionDialog
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

          <DoctorsDeleteDialog
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
    </DoctorsContextProvider>
  )
}
