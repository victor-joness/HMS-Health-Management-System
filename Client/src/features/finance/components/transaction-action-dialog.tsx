import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTransaction,  updateTransaction} from '@/redux/FinanceSlice'
import { AppDispatch } from '@/redux/store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Transaction } from '@/entities/Transaction'
import { useDispatch } from 'react-redux'

const formSchema = z.object({
  Description: z.string().min(3, { message: 'A descrição é obrigatória.' }),
  Amount: z.number().min(0.01, { message: 'O valor deve ser maior que zero.' }),
  Type: z.enum(['Income', 'Expense'], { message: 'O tipo de transação é obrigatório.' }),
  Date: z.date().refine((val) => val <= new Date(), { message: 'A data não pode ser no futuro.' }),
  Notes: z.string().optional(),
  isEdit: z.boolean().default(false),
})

type TransactionForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Transaction
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TransactionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow || {},
  })

  const onSubmit = async (data: TransactionForm) => {
    if (data.isEdit) {
      dispatch(updateTransaction(data))
      onOpenChange(false)
    } else {
      dispatch(createTransaction(data))
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentRow ? 'Editar Transação' : 'Adicionar Transação'}
          </DialogTitle>
          <DialogDescription>
            {currentRow ? 'Atualize os dados da transação.' : 'Preencha os dados abaixo.'}
          </DialogDescription>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField name="Description">
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  {...register('Description')}
                  placeholder="Descrição da transação"
                  defaultValue={currentRow?.Description}
                />
              </FormControl>
              <FormMessage>{errors.Description?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField name="Amount">
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...register('Amount')}
                  placeholder="Valor da transação"
                  defaultValue={currentRow?.Amount}
                />
              </FormControl>
              <FormMessage>{errors.Amount?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField name="Type">
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <select {...register('Type')}>
                  <option value="Income">Receita</option>
                  <option value="Expense">Despesa</option>
                </select>
              </FormControl>
              <FormMessage>{errors.Type?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField name="Date">
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                {/* <DatePicker {...register('Date')} /> */}
              </FormControl>
              <FormMessage>{errors.Date?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField name="Notes">
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea
                  {...register('Notes')}
                  placeholder="Notas sobre a transação"
                  defaultValue={currentRow?.Notes}
                />
              </FormControl>
            </FormItem>
          </FormField>

          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {currentRow ? 'Atualizar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
