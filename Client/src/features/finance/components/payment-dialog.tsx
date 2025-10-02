import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Payment } from '../types'

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: Payment | null
  onSave: (payment: Payment) => void
}

export function PaymentDialog({ open, onOpenChange, payment, onSave }: PaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {payment ? 'Edit Payment' : 'Add Payment'}
          </DialogTitle>
        </DialogHeader>
        {/* Add form fields here */}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onSave(payment || {} as Payment)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 