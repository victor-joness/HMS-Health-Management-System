import { useEffect, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { FinanceEmployee } from '@/entities/FinanceEmployee'
import { getAllFinances } from '@/redux/FinanceSlice'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/table/entity-Table'
import { financeEmployeeColumns } from './components/financeEmployee-columns'
import { FinanceEmployeeActionDialog } from './components/financeEmployee-action-dialog'
import { FinanceEmployeeDeleteDialog } from './components/financeEmployee-delete-dialog'
import FinanceEmployeeContextProvider, {
  type FinanceEmployeeDialogType,
} from './context/financeEmployee-context'
import { AppDispatch, RootState } from '@/redux/store'

export default function FinanceEmployeePage() {
  
  const [currentRow, setCurrentRow] = useState<FinanceEmployee | null>(null)
  const [open, setOpen] = useDialogState<FinanceEmployeeDialogType>(null)
  const financesEmployees = useSelector((state: RootState) => state.finances.financesEmployee)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllFinances())
  }, [dispatch])

  return (
    <FinanceEmployeeContextProvider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('Pages.FinanceEmployee.GridTitle')}
            </h2>
            <p className='text-muted-foreground'>
              {t('Pages.FinanceEmployee.GridDescription')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>{t('Pages.FinanceEmployee.AddEmployee')}</span>{' '}
              <IconPlus size={18} />
            </Button>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable<FinanceEmployee> data={financesEmployees} columns={financeEmployeeColumns} />
        </div>
      </Main>

      <FinanceEmployeeActionDialog
        key='finance-employee-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          setOpen(isOpen ? 'add' : null)
        }}
      />

      {currentRow && (
        <>
          <FinanceEmployeeActionDialog
            key={`finance-employee-edit-${currentRow.Id}`}
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

          <FinanceEmployeeDeleteDialog
            key={`finance-employee-delete-${currentRow.Id}`}
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
    </FinanceEmployeeContextProvider>
  )
}
