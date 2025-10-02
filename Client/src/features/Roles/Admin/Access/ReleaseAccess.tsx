import { IconLockAccess, IconCheck, IconX, IconEye, IconDownload } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import { Auth } from '@/entities/Auth'
import { t } from 'i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { RecordButtons } from '@/components/medical-records/RecordButtons'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { useState } from 'react'

interface AccessRequest {
  id: string
  userName: string
  userEmail: string
  requestReason: string
  requestDate: Date
  status: 'Pending' | 'Approved' | 'Rejected'
  requestedRole: string
  department: string
  urgency: 'Low' | 'Medium' | 'High'
}

interface ReleaseAccessAdminProps {
  auth: Auth
}

// Mock data for access requests
const mockAccessRequests: AccessRequest[] = [
  {
    id: '1',
    userName: 'João Silva',
    userEmail: 'joao.silva@hospital.com',
    requestReason: 'Acesso necessário para gerenciar pacientes da unidade de cardiologia',
    requestDate: new Date('2024-01-15'),
    status: 'Pending',
    requestedRole: 'Nurse',
    department: 'Cardiology',
    urgency: 'Medium',
  },
  {
    id: '2',
    userName: 'Maria Santos',
    userEmail: 'maria.santos@hospital.com',
    requestReason: 'Acesso administrativo para gestão de recursos humanos',
    requestDate: new Date('2024-01-14'),
    status: 'Approved',
    requestedRole: 'Admin',
    department: 'HR',
    urgency: 'High',
  },
  {
    id: '3',
    userName: 'Pedro Costa',
    userEmail: 'pedro.costa@hospital.com',
    requestReason: 'Acesso limitado para visualização de relatórios financeiros',
    requestDate: new Date('2024-01-13'),
    status: 'Rejected',
    requestedRole: 'Finance',
    department: 'Finance',
    urgency: 'Low',
  },
  {
    id: '4',
    userName: 'Ana Oliveira',
    userEmail: 'ana.oliveira@hospital.com',
    requestReason: 'Acesso para gerenciamento de estoque farmacêutico',
    requestDate: new Date('2024-01-12'),
    status: 'Pending',
    requestedRole: 'Pharmacy',
    department: 'Pharmacy',
    urgency: 'High',
  },
  {
    id: '5',
    userName: 'Carlos Ferreira',
    userEmail: 'carlos.ferreira@hospital.com',
    requestReason: 'Acesso para coordenação de emergências',
    requestDate: new Date('2024-01-11'),
    status: 'Approved',
    requestedRole: 'Doctor',
    department: 'Emergency',
    urgency: 'High',
  },
]

const columns = [
  {
    accessorKey: 'userName',
    header: t('Pages.ReleaseAccess.UserInfo'),
  },
  {
    accessorKey: 'userEmail',
    header: 'Email',
  },
  {
    accessorKey: 'requestedRole',
    header: 'Função Solicitada',
  },
  {
    accessorKey: 'department',
    header: 'Departamento',
  },
  {
    accessorKey: 'urgency',
    header: 'Urgência',
    cell: ({ row }: any) => {
      const urgency = row.getValue('urgency')
      const urgencyMap = {
        Low: { variant: 'secondary' as const, label: 'Baixa' },
        Medium: { variant: 'default' as const, label: 'Média' },
        High: { variant: 'destructive' as const, label: 'Alta' },
      }
      const urgencyInfo = urgencyMap[urgency as keyof typeof urgencyMap]
      return <Badge variant={urgencyInfo.variant}>{urgencyInfo.label}</Badge>
    },
  },
  {
    accessorKey: 'status',
    header: t('Pages.ReleaseAccess.Status'),
    cell: ({ row }: any) => {
      const status = row.getValue('status')
      const statusMap = {
        Pending: { variant: 'secondary' as const, label: 'Pendente' },
        Approved: { variant: 'default' as const, label: 'Aprovado' },
        Rejected: { variant: 'destructive' as const, label: 'Rejeitado' },
      }
      const statusInfo = statusMap[status as keyof typeof statusMap]
      return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    },
  },
  {
    accessorKey: 'requestDate',
    header: t('Pages.ReleaseAccess.RequestDate'),
    cell: ({ row }: any) => {
      const date = row.getValue('requestDate') as Date
      return date.toLocaleDateString('pt-BR')
    },
  },
  {
    id: 'actions',
    header: t('Pages.ReleaseAccess.Actions'),
    cell: ({ row }: any) => {
      const request = row.original
      return (
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewRequest(request)}
            title="Visualizar detalhes"
          >
            <IconEye className="h-4 w-4" />
          </Button>
          {request.status === 'Pending' && (
            <>
              <Button 
                size="sm" 
                variant="default"
                onClick={() => handleApproveRequest(request)}
                title="Aprovar acesso"
              >
                <IconCheck className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleRejectRequest(request)}
                title="Rejeitar acesso"
              >
                <IconX className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )
    },
  },
]

export default function ReleaseAccess_admin({
  auth,
}: ReleaseAccessAdminProps) {
  const [requests, setRequests] = useState<AccessRequest[]>(mockAccessRequests)

  const pendingRequests = requests.filter(req => req.status === 'Pending')
  const approvedRequests = requests.filter(req => req.status === 'Approved')
  const rejectedRequests = requests.filter(req => req.status === 'Rejected')

  const avgProcessingTime = 2.5 // days

  const handleApproveRequest = (request: AccessRequest) => {
    setRequests(prev => 
      prev.map(item => 
        item.id === request.id 
          ? { ...item, status: 'Approved' as const }
          : item
      )
    )
    toast.success(`Acesso aprovado para ${request.userName}`)
  }

  const handleRejectRequest = (request: AccessRequest) => {
    setRequests(prev => 
      prev.map(item => 
        item.id === request.id 
          ? { ...item, status: 'Rejected' as const }
          : item
      )
    )
    toast.error(`Acesso rejeitado para ${request.userName}`)
  }

  const handleViewRequest = (request: AccessRequest) => {
    // Here you would open a detailed view dialog
    console.log('View request details:', request)
  }

  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.ReleaseAccess.Overview')}
        </h2>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown auth={auth} />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('Pages.ReleaseAccess.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>
              <IconDownload className="mr-2 h-4 w-4" />
              {t('Pages.ReleaseAccess.Download')}
            </Button>
            <RecordButtons />
          </div>
        </div>

        <div className='mb-4'>
          <p className='text-muted-foreground'>
            {t('Pages.ReleaseAccess.Description')}
          </p>
        </div>

        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>
                {t('Pages.ReleaseAccess.Overview')}
              </TabsTrigger>
              <TabsTrigger value='pending'>
                {t('Pages.ReleaseAccess.PendingRequests')} ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value='approved'>
                {t('Pages.ReleaseAccess.ApprovedRequests')} ({approvedRequests.length})
              </TabsTrigger>
              <TabsTrigger value='rejected'>
                {t('Pages.ReleaseAccess.RejectedRequests')} ({rejectedRequests.length})
              </TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                {t('Pages.ReleaseAccess.Analytics')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.ReleaseAccess.TotalRequests')}
                  </CardTitle>
                  <IconLockAccess />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{requests.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Solicitações totais
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.ReleaseAccess.NewRequests')}
                  </CardTitle>
                  <IconLockAccess />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{pendingRequests.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Aguardando aprovação
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.ReleaseAccess.ProcessingTime')}
                  </CardTitle>
                  <IconLockAccess />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{avgProcessingTime} dias</div>
                  <p className='text-xs text-muted-foreground'>
                    Tempo médio
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Taxa de Aprovação
                  </CardTitle>
                  <IconLockAccess />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {Math.round((approvedRequests.length / requests.length) * 100)}%
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Solicitações aprovadas
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.ReleaseAccess.RecentActivities')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={requests.slice(0, 5)} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='pending' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.ReleaseAccess.PendingRequests')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={pendingRequests} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='approved' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.ReleaseAccess.ApprovedRequests')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={approvedRequests} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='rejected' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.ReleaseAccess.RejectedRequests')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={rejectedRequests} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
} 