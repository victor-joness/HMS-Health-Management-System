import { t } from 'i18next'
import { Laboratory } from '@/entities/Laboratory'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'react-toastify'

interface LaboratoryDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Laboratory | null
}

export function LaboratoryDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: LaboratoryDeleteDialogProps) {
  const handleDelete = async () => {
    if (!currentRow) return

    try {
      // Aqui você implementaria a lógica para deletar no backend
      // await deleteLaboratory(currentRow.id)
      
      toast.success(t('Pages.Laboratory.DeleteSuccess'))
      onOpenChange(false)
    } catch (error) {
      toast.error(t('Pages.Laboratory.DeleteError'))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Pages.Laboratory.Delete')}</DialogTitle>
          <DialogDescription>
            {t('Pages.Laboratory.DeleteConfirmation')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            {t('Pages.Laboratory.DeleteDescription')}
          </p>
          {currentRow && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-medium">{currentRow.name}</p>
              <p className="text-sm text-muted-foreground">
                {currentRow.description}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Common.Cancel')}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {t('Common.Delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 