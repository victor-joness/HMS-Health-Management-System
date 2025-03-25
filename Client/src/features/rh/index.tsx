import { useEffect, useState } from 'react'
import { IconUserPlus } from '@tabler/icons-react'
import { HumanResourcesEmployee } from '@/entities/HumanResourcesEmployee'
import { getAllHumanResourcesEmployee } from '@/redux/HumanResourcesEmployeesSlice'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/table/entity-Table'
import { humanResourcesEmployeeColumns } from './components/humanResourcesEmployee-columns'
import { HumanResourcesEmployeesActionDialog } from './components/humanResourcesEmployee-action-dialog'
import { HumanResourcesEmployeesDeleteDialog } from './components/humanResourcesEmployee-delete-dialog'
import HumanResourcesEmployeesContextProvider, {
  type HumanResourcesEmployeesDialogType,
} from './context/humanResourcesEmployee-context'
import { AppDispatch, RootState } from '@/redux/store'

export default function HumanResourcesEmployees() {
  const [currentRow, setCurrentRow] = useState<HumanResourcesEmployee | null>(null)
  const [open, setOpen] = useDialogState<HumanResourcesEmployeesDialogType>(null)

  const employees = useSelector((state: RootState) => state.humanResourcesEmployees.humanResourcesEmployees)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllHumanResourcesEmployee())
  }, [dispatch])

  return (
    <HumanResourcesEmployeesContextProvider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.HumanResourcesEmployee.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.HumanResourcesEmployee.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.HumanResourcesEmployee.AddEmployee')}</span>
              <IconUserPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable<HumanResourcesEmployee> data={employees} columns={humanResourcesEmployeeColumns} />
        </div>
      </Main>

      <HumanResourcesEmployeesActionDialog
        key='employee-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <HumanResourcesEmployeesActionDialog
            key={`employee-edit-${currentRow.Id}`}
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

          <HumanResourcesEmployeesDeleteDialog
            key={`employee-delete-${currentRow.Id}`}
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
    </HumanResourcesEmployeesContextProvider>
  )
}
