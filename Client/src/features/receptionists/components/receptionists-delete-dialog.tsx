'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Receptionist } from '@/entities/Receptionist'
import { useDispatch } from 'react-redux'
import { deleteReceptionist } from '@/redux/ReceptionistsSlice'
import { AppDispatch } from '@/redux/store'

interface DeleteDialogProps {
  currentRow?: Receptionist
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReceptionistsDeleteDialog({ currentRow, open, onOpenChange }: DeleteDialogProps) {
  const [value, setValue] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    if (!currentRow?.Id || value.trim() !== currentRow?.UserInfo?.Name) return

    dispatch(deleteReceptionist(currentRow.Id))
    onOpenChange(false)
    toast({
      title: 'Recepcionista excluído com sucesso',
      description: `${currentRow.UserInfo?.Name} foi removido do sistema.`
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow?.UserInfo?.Name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle className='mr-1 inline-block stroke-destructive' size={18} />
          Deletar Recepcionista
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Tem certeza de que deseja excluir{' '}
            <span className='font-bold'>{currentRow?.UserInfo?.Name}</span>?
            <br />
            Esta ação não pode ser desfeita.
          </p>

          <Label className='my-2'>
            Nome:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Digite o nome para confirmar a exclusão'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Aviso!</AlertTitle>
            <AlertDescription>
              Tenha cuidado, esta operação não pode ser revertida.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Deletar'
      destructive
    />
  )
}
