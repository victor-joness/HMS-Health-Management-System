import { IconEye, IconDownload, IconFilter, IconSearch, IconAlertTriangle, IconShield, IconUser, IconActivity, IconEyeOff, IconEyeCheck } from '@tabler/icons-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AuditLog {
  id: string
  timestamp: Date
  user: string
  action: string
  resource: string
  ipAddress: string
  userAgent: string
  status: 'Success' | 'Failed' | 'Warning' | 'Info'
  details: string
  category: 'System' | 'User' | 'Security' | 'Data'
}

interface AuditsAdminProps {
  auth: Auth
}

// Mock data for audit logs
const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: new Date('2024-01-15T11:30:00'),
    user: 'admin@hospital.com',
    action: 'Login',
    resource: 'Authentication',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Success',
    details: 'Login bem-sucedido',
    category: 'Security',
  },
  {
    id: '2',
    timestamp: new Date('2024-01-15T11:25:00'),
    user: 'doctor.silva@hospital.com',
    action: 'View Patient Record',
    resource: 'Patient/12345',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'Success',
    details: 'Visualização do prontuário do paciente João Silva',
    category: 'User',
  },
  {
    id: '3',
    timestamp: new Date('2024-01-15T11:20:00'),
    user: 'unknown@external.com',
    action: 'Failed Login',
    resource: 'Authentication',
    ipAddress: '203.0.113.50',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Failed',
    details: 'Tentativa de login com credenciais inválidas',
    category: 'Security',
  },
  {
    id: '4',
    timestamp: new Date('2024-01-15T11:15:00'),
    user: 'nurse.santos@hospital.com',
    action: 'Update Patient Data',
    resource: 'Patient/12345/Vitals',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X)',
    status: 'Success',
    details: 'Atualização dos sinais vitais do paciente',
    category: 'User',
  },
  {
    id: '5',
    timestamp: new Date('2024-01-15T11:10:00'),
    user: 'system@hospital.com',
    action: 'Database Backup',
    resource: 'Database/Backup',
    ipAddress: '127.0.0.1',
    userAgent: 'System/BackupService',
    status: 'Success',
    details: 'Backup automático do banco de dados concluído',
    category: 'System',
  },
  {
    id: '6',
    timestamp: new Date('2024-01-15T11:05:00'),
    user: 'admin@hospital.com',
    action: 'Delete User',
    resource: 'User/789',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Success',
    details: 'Usuário removido do sistema',
    category: 'System',
  },
  {
    id: '7',
    timestamp: new Date('2024-01-15T11:00:00'),
    user: 'pharmacy@hospital.com',
    action: 'Access Denied',
    resource: 'Patient/12345/Records',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Failed',
    details: 'Tentativa de acesso não autorizado a prontuário',
    category: 'Security',
  },
  {
    id: '8',
    timestamp: new Date('2024-01-15T10:55:00'),
    user: 'lab.tech@hospital.com',
    action: 'Upload Results',
    resource: 'Laboratory/Results',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Success',
    details: 'Upload de resultados de exames laboratoriais',
    category: 'Data',
  },
]

const columns = [
  {
    accessorKey: 'timestamp',
    header: t('Pages.Audits.Timestamp'),
    cell: ({ row }: any) => {
      const date = row.getValue('timestamp') as Date
      return date.toLocaleString('pt-BR')
    },
  },
  {
    accessorKey: 'user',
    header: t('Pages.Audits.User'),
  },
  {
    accessorKey: 'action',
    header: t('Pages.Audits.Action'),
  },
  {
    accessorKey: 'resource',
    header: t('Pages.Audits.Resource'),
  },
  {
    accessorKey: 'ipAddress',
    header: t('Pages.Audits.IPAddress'),
  },
  {
    accessorKey: 'status',
    header: t('Pages.Audits.Status'),
    cell: ({ row }: any) => {
      const status = row.getValue('status')
      const statusMap = {
        Success: { variant: 'default' as const, label: 'Sucesso' },
        Failed: { variant: 'destructive' as const, label: 'Falhou' },
        Warning: { variant: 'secondary' as const, label: 'Aviso' },
        Info: { variant: 'outline' as const, label: 'Info' },
      }
      const statusInfo = statusMap[status as keyof typeof statusMap]
      return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }: any) => {
      const category = row.getValue('category')
      const categoryMap = {
        System: { variant: 'default' as const, label: 'Sistema' },
        User: { variant: 'secondary' as const, label: 'Usuário' },
        Security: { variant: 'destructive' as const, label: 'Segurança' },
        Data: { variant: 'outline' as const, label: 'Dados' },
      }
      const categoryInfo = categoryMap[category as keyof typeof categoryMap]
      return <Badge variant={categoryInfo.variant}>{categoryInfo.label}</Badge>
    },
  },
  {
    id: 'actions',
    header: t('Pages.Audits.Actions'),
    cell: ({ row }: any) => {
      const log = row.original
      return (
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleViewLog(log)}
            title="Visualizar detalhes"
          >
            <IconEye className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export default function Audits_admin({
  auth,
}: AuditsAdminProps) {
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [viewLogOpen, setViewLogOpen] = useState(false)

  const systemLogs = auditLogs.filter(log => log.category === 'System')
  const userActivities = auditLogs.filter(log => log.category === 'User')
  const securityEvents = auditLogs.filter(log => log.category === 'Security')
  const dataChanges = auditLogs.filter(log => log.category === 'Data')

  const failedLogins = auditLogs.filter(log => log.action === 'Failed Login' || log.action === 'Login' && log.status === 'Failed')
  const recentActivities = auditLogs.slice(0, 10)

  const handleViewLog = (log: AuditLog) => {
    setSelectedLog(log)
    setViewLogOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success':
        return <IconEyeCheck className="h-4 w-4 text-green-500" />
      case 'Failed':
        return <IconEyeOff className="h-4 w-4 text-red-500" />
      case 'Warning':
        return <IconAlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <IconEye className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.Audits.Overview')}
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
            {t('Pages.Audits.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>
              <IconDownload className="mr-2 h-4 w-4" />
              {t('Pages.Audits.Download')}
            </Button>
            <RecordButtons />
          </div>
        </div>

        <div className='mb-4'>
          <p className='text-muted-foreground'>
            {t('Pages.Audits.Description')}
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
                {t('Pages.Audits.Overview')}
              </TabsTrigger>
              <TabsTrigger value='system'>
                {t('Pages.Audits.SystemLogs')} ({systemLogs.length})
              </TabsTrigger>
              <TabsTrigger value='user'>
                {t('Pages.Audits.UserActivities')} ({userActivities.length})
              </TabsTrigger>
              <TabsTrigger value='security'>
                {t('Pages.Audits.SecurityEvents')} ({securityEvents.length})
              </TabsTrigger>
              <TabsTrigger value='data'>
                {t('Pages.Audits.DataChanges')} ({dataChanges.length})
              </TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                {t('Pages.Audits.Analytics')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Audits.TotalLogs')}
                  </CardTitle>
                  <IconActivity />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{auditLogs.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Logs totais
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Audits.RecentActivities')}
                  </CardTitle>
                  <IconUser />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{recentActivities.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Atividades recentes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Audits.FailedLogins')}
                  </CardTitle>
                  <IconAlertTriangle />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{failedLogins.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Tentativas falhadas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Eventos de Segurança
                  </CardTitle>
                  <IconShield />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{securityEvents.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Alertas de segurança
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Logs de Auditoria Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={recentActivities} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='system' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.Audits.SystemLogs')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={systemLogs} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='user' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.Audits.UserActivities')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={userActivities} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='security' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.Audits.SecurityEvents')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={securityEvents} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='data' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.Audits.DataChanges')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={dataChanges} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>

      {/* View Log Dialog */}
      <Dialog open={viewLogOpen} onOpenChange={setViewLogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getStatusIcon(selectedLog?.status || '')}
              Detalhes do Log de Auditoria
            </DialogTitle>
            <DialogDescription>
              Visualize os detalhes completos deste evento de auditoria
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">ID do Log</label>
                  <p className="text-sm text-muted-foreground">{selectedLog.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Data/Hora</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedLog.timestamp.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Usuário</label>
                  <p className="text-sm text-muted-foreground">{selectedLog.user}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Ação</label>
                  <p className="text-sm text-muted-foreground">{selectedLog.action}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Recurso</label>
                  <p className="text-sm text-muted-foreground">{selectedLog.resource}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Categoria</label>
                  <Badge variant="outline">{selectedLog.category}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Endereço IP</label>
                  <p className="text-sm text-muted-foreground">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge 
                    variant={selectedLog.status === 'Success' ? 'default' : 
                           selectedLog.status === 'Failed' ? 'destructive' : 
                           selectedLog.status === 'Warning' ? 'secondary' : 'outline'}
                  >
                    {selectedLog.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">User Agent</label>
                <p className="text-sm text-muted-foreground break-all">{selectedLog.userAgent}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Detalhes</label>
                <p className="text-sm text-muted-foreground">{selectedLog.details}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 