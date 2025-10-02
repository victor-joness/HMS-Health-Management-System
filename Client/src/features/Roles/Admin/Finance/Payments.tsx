import { useState } from 'react'
import { t } from 'i18next'
import { Auth } from '@/entities/Auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Plus, FileDown, FileText } from 'lucide-react'
import { PaymentDialog } from '@/features/finance/components/payment-dialog'
import type { Payment, PaymentFilters, PaymentStats } from '@/features/finance/types'

interface PaymentsAdminProps {
  auth: Auth
}

// Mock data - Replace with API calls
const mockPayments: Payment[] = [
  {
    id: '1',
    number: 'PAY-2024-001',
    date: new Date('2024-03-01'),
    dueDate: new Date('2024-03-15'),
    amount: 500.0,
    status: 'pending',
    type: 'consultation',
    method: 'credit_card',
    category: 'Medical Services',
    description: 'General consultation',
    patient: {
      id: '1',
      name: 'John Doe',
    },
    attachments: [],
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
]

const mockStats: PaymentStats = {
  total: 100,
  pending: 30,
  paid: 60,
  overdue: 10,
  totalAmount: 50000,
  pendingAmount: 15000,
  overdueAmount: 5000,
}

export default function PaymentsAdmin({ auth }: PaymentsAdminProps) {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [stats, setStats] = useState<PaymentStats>(mockStats)
  const [filters, setFilters] = useState<PaymentFilters>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  const handleAddPayment = () => {
    setSelectedPayment(null)
    setIsDialogOpen(true)
  }

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment)
    setIsDialogOpen(true)
  }

  const handleSavePayment = async (payment: Payment) => {
    if (selectedPayment) {
      // Update existing payment
      setPayments(payments.map((p) => (p.id === payment.id ? payment : p)))
    } else {
      // Add new payment
      setPayments([...payments, { ...payment, id: Date.now().toString() }])
    }
    setIsDialogOpen(false)
  }

  const handleDeletePayment = async (paymentId: string) => {
    setPayments(payments.filter((p) => p.id !== paymentId))
  }

  const handleFilterChange = (key: keyof PaymentFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined })
  }

  const handleGenerateInvoice = async (payment: Payment) => {
    // TODO: Implement invoice generation
    console.log('Generate invoice for payment:', payment.id)
  }

  const handleExportPayments = async () => {
    // TODO: Implement payments export
    console.log('Export payments')
  }

  const filteredPayments = payments.filter((payment) => {
    if (filters.status && payment.status !== filters.status) return false
    if (filters.type && payment.type !== filters.type) return false
    if (filters.method && payment.method !== filters.method) return false
    if (filters.category && payment.category !== filters.category) return false
    if (
      filters.search &&
      !payment.number.toLowerCase().includes(filters.search.toLowerCase()) &&
      !payment.patient?.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !payment.description.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>
          {t('Finance.Payments.Title')}
        </h2>
        <div className='flex items-center space-x-2'>
          <Button variant='outline' onClick={handleExportPayments}>
            <FileDown className='mr-2 h-4 w-4' />
            {t('Common.Export')}
          </Button>
          <Button onClick={handleAddPayment}>
            <Plus className='mr-2 h-4 w-4' />
            {t('Finance.Payments.AddPayment')}
          </Button>
        </div>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>{t('Common.Overview')}</TabsTrigger>
          <TabsTrigger value='list'>{t('Common.List')}</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {t('Finance.Payments.TotalPayments')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {t('Finance.Payments.PendingPayments')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stats.pending}</div>
                <p className='text-xs text-muted-foreground'>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(stats.pendingAmount)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {t('Finance.Payments.OverduePayments')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-destructive'>
                  {stats.overdue}
                </div>
                <p className='text-xs text-muted-foreground'>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(stats.overdueAmount)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {t('Finance.Payments.TotalAmount')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(stats.totalAmount)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='list' className='space-y-4'>
          <div className='flex space-x-2'>
            <Input
              placeholder={t('Common.Search')}
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className='max-w-sm'
            />
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={t('Finance.Payments.SelectStatus')} />
              </SelectTrigger>
              <SelectContent>
                {[
                  'pending',
                  'paid',
                  'partially_paid',
                  'overdue',
                  'cancelled',
                  'refunded',
                ].map((status) => (
                  <SelectItem key={status} value={status}>
                    {t(`Finance.Payments.Status.${status}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange('type', value)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={t('Finance.Payments.SelectType')} />
              </SelectTrigger>
              <SelectContent>
                {[
                  'consultation',
                  'procedure',
                  'exam',
                  'surgery',
                  'medication',
                  'hospitalization',
                  'other',
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {t(`Finance.Payments.Types.${type}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('Finance.Payments.Number')}</TableHead>
                  <TableHead>{t('Finance.Payments.Date')}</TableHead>
                  <TableHead>{t('Finance.Payments.DueDate')}</TableHead>
                  <TableHead>{t('Finance.Payments.Amount')}</TableHead>
                  <TableHead>{t('Finance.Payments.Status')}</TableHead>
                  <TableHead>{t('Finance.Payments.Type')}</TableHead>
                  <TableHead>{t('Finance.Payments.Patient')}</TableHead>
                  <TableHead className='text-right'>{t('Common.Actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.number}</TableCell>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(payment.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === 'paid'
                            ? 'outline'
                            : payment.status === 'pending'
                            ? 'default'
                            : payment.status === 'overdue'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {t(`Finance.Payments.Status.${payment.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {t(`Finance.Payments.Types.${payment.type}`)}
                    </TableCell>
                    <TableCell>{payment.patient?.name}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleEditPayment(payment)}>
                            {t('Common.Edit')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleGenerateInvoice(payment)}
                          >
                            <FileText className='mr-2 h-4 w-4' />
                            {t('Finance.Payments.GenerateInvoice')}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeletePayment(payment.id)}
                          >
                            {t('Common.Delete')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <PaymentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        payment={selectedPayment}
        onSave={handleSavePayment}
      />
    </div>
  )
} 