import { IconPlug, IconCheck, IconX, IconEye, IconDownload,IconRotate} from '@tabler/icons-react'
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

interface Integration {
  id: string
  systemName: string
  connectionStatus: 'Connected' | 'Disconnected' | 'Error' | 'Pending'
  apiEndpoint: string
  authentication: 'OAuth2' | 'API Key' | 'Basic Auth' | 'Certificate'
  syncFrequency: 'Real-time' | 'Hourly' | 'Daily' | 'Weekly'
  lastSync: Date
  syncStatus: 'Success' | 'Failed' | 'In Progress' | 'Pending'
  dataTypes: string[]
  description: string
}

interface IntegrationsAdminProps {
  auth: Auth
}

// Mock data for integrations
const mockIntegrations: Integration[] = [
  {
    id: '1',
    systemName: 'Sistema de Laboratório Central',
    connectionStatus: 'Connected',
    apiEndpoint: 'https://api.labcentral.com/v1',
    authentication: 'OAuth2',
    syncFrequency: 'Real-time',
    lastSync: new Date('2024-01-15T10:30:00'),
    syncStatus: 'Success',
    dataTypes: ['Exames', 'Resultados', 'Agendamentos'],
    description: 'Integração com sistema de laboratório para sincronização de exames e resultados',
  },
  {
    id: '2',
    systemName: 'Sistema de Farmácia',
    connectionStatus: 'Connected',
    apiEndpoint: 'https://api.pharmacy.com/v2',
    authentication: 'API Key',
    syncFrequency: 'Hourly',
    lastSync: new Date('2024-01-15T09:45:00'),
    syncStatus: 'Success',
    dataTypes: ['Medicamentos', 'Estoque', 'Prescrições'],
    description: 'Integração para gerenciamento de estoque farmacêutico',
  },
  {
    id: '3',
    systemName: 'Sistema de Seguros',
    connectionStatus: 'Error',
    apiEndpoint: 'https://api.insurance.com/v1',
    authentication: 'Certificate',
    syncFrequency: 'Daily',
    lastSync: new Date('2024-01-14T15:20:00'),
    syncStatus: 'Failed',
    dataTypes: ['Autorizações', 'Coberturas', 'Reembolsos'],
    description: 'Integração para verificação de cobertura de seguros',
  },
  {
    id: '4',
    systemName: 'Sistema de Telemedicina',
    connectionStatus: 'Pending',
    apiEndpoint: 'https://api.telemedicine.com/v1',
    authentication: 'OAuth2',
    syncFrequency: 'Real-time',
    lastSync: new Date('2024-01-15T08:15:00'),
    syncStatus: 'In Progress',
    dataTypes: ['Consultas', 'Vídeos', 'Chats'],
    description: 'Integração para consultas de telemedicina',
  },
  {
    id: '5',
    systemName: 'Sistema de Pronto Socorro',
    connectionStatus: 'Connected',
    apiEndpoint: 'https://api.emergency.com/v1',
    authentication: 'Basic Auth',
    syncFrequency: 'Real-time',
    lastSync: new Date('2024-01-15T11:00:00'),
    syncStatus: 'Success',
    dataTypes: ['Emergências', 'Triagem', 'Transferências'],
    description: 'Integração para coordenação de emergências',
  },
]

const columns = [
  {
    accessorKey: 'systemName',
    header: t('Pages.Integrations.SystemName'),
  },
  {
    accessorKey: 'connectionStatus',
    header: t('Pages.Integrations.ConnectionStatus'),
    cell: ({ row }: any) => {
      const status = row.getValue('connectionStatus')
      const statusMap = {
        Connected: { variant: 'default' as const, label: 'Conectado' },
        Disconnected: { variant: 'secondary' as const, label: 'Desconectado' },
        Error: { variant: 'destructive' as const, label: 'Erro' },
        Pending: { variant: 'outline' as const, label: 'Pendente' },
      }
      const statusInfo = statusMap[status as keyof typeof statusMap]
      return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    },
  },
  {
    accessorKey: 'syncStatus',
    header: t('Pages.Integrations.SyncStatus'),
    cell: ({ row }: any) => {
      const status = row.getValue('syncStatus')
      const statusMap = {
        Success: { variant: 'default' as const, label: 'Sucesso' },
        Failed: { variant: 'destructive' as const, label: 'Falhou' },
        'In Progress': { variant: 'secondary' as const, label: 'Em Progresso' },
        Pending: { variant: 'outline' as const, label: 'Pendente' },
      }
      const statusInfo = statusMap[status as keyof typeof statusMap]
      return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    },
  },
  {
    accessorKey: 'lastSync',
    header: t('Pages.Integrations.LastSync'),
    cell: ({ row }: any) => {
      const date = row.getValue('lastSync') as Date
      return date.toLocaleString('pt-BR')
    },
  },
  {
    accessorKey: 'syncFrequency',
    header: t('Pages.Integrations.SyncFrequency'),
  },
  {
    accessorKey: 'dataTypes',
    header: 'Tipos de Dados',
    cell: ({ row }: any) => {
      const dataTypes = row.getValue('dataTypes') as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {dataTypes.map((type, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: t('Pages.Integrations.Actions'),
    cell: ({ row }: any) => {
      const integration = row.original
      return (
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleConfigureIntegration(integration)}
            title="Configurar integração"
          >
            <IconEye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleRestartIntegration(integration)}
            title="Reiniciar integração"
          >
            <IconRotate className="h-4 w-4" />
          </Button>
          {integration.connectionStatus === 'Connected' ? (
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleStopIntegration(integration)}
              title="Parar integração"
            >
              <IconEye className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="default"
              onClick={() => handleStartIntegration(integration)}
              title="Iniciar integração"
            >
              <IconEye className="h-4 w-4" />
            </Button>
          )}
          <Button 
            size="sm" 
            variant="outline"
            title="Visualizar detalhes"
          >
            <IconEye className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export default function Integrations_admin({
  auth,
}: IntegrationsAdminProps) {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const connectedIntegrations = integrations.filter(integration => integration.connectionStatus === 'Connected')
  const errorIntegrations = integrations.filter(integration => integration.connectionStatus === 'Error')
  const pendingIntegrations = integrations.filter(integration => integration.connectionStatus === 'Pending')

  const totalDataTypes = integrations.reduce((total, integration) => total + integration.dataTypes.length, 0)
  const avgSyncTime = 2.5 // minutes

  const handleStartIntegration = (integration: Integration) => {
    setIntegrations(prev => 
      prev.map(item => 
        item.id === integration.id 
          ? { ...item, connectionStatus: 'Connected' as const, syncStatus: 'In Progress' as const }
          : item
      )
    )
  }

  const handleStopIntegration = (integration: Integration) => {
    setIntegrations(prev => 
      prev.map(item => 
        item.id === integration.id 
          ? { ...item, connectionStatus: 'Disconnected' as const, syncStatus: 'Pending' as const }
          : item
      )
    )
  }

  const handleRestartIntegration = (integration: Integration) => {
    setIntegrations(prev => 
      prev.map(item => 
        item.id === integration.id 
          ? { ...item, connectionStatus: 'Pending' as const, syncStatus: 'In Progress' as const, lastSync: new Date() }
          : item
      )
    )
  }

  const handleConfigureIntegration = (integration: Integration) => {
    setSelectedIntegration(integration)
    // Here you would open a configuration dialog
    console.log('Configure integration:', integration.systemName)
  }

  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.Integrations.Overview')}
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
            {t('Pages.Integrations.Title')}
          </h1>
          <div className='flex items-center space-x-2'>
            <Button>
              <IconDownload className="mr-2 h-4 w-4" />
              {t('Pages.Integrations.Download')}
            </Button>
            <RecordButtons />
          </div>
        </div>

        <div className='mb-4'>
          <p className='text-muted-foreground'>
            {t('Pages.Integrations.Description')}
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
                {t('Pages.Integrations.Overview')}
              </TabsTrigger>
              <TabsTrigger value='active'>
                {t('Pages.Integrations.ActiveIntegrations')} ({connectedIntegrations.length})
              </TabsTrigger>
              <TabsTrigger value='errors'>
                Integrações com Erro ({errorIntegrations.length})
              </TabsTrigger>
              <TabsTrigger value='pending'>
                Integrações Pendentes ({pendingIntegrations.length})
              </TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                {t('Pages.Integrations.Analytics')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Integrations.TotalIntegrations')}
                  </CardTitle>
                  <IconPlug />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{integrations.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Sistemas integrados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {t('Pages.Integrations.ConnectedSystems')}
                  </CardTitle>
                  <IconPlug />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{connectedIntegrations.length}</div>
                  <p className='text-xs text-muted-foreground'>
                    Sistemas ativos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Tipos de Dados
                  </CardTitle>
                  <IconPlug />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{totalDataTypes}</div>
                  <p className='text-xs text-muted-foreground'>
                    Dados sincronizados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Tempo Médio de Sincronização
                  </CardTitle>
                  <IconPlug />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{avgSyncTime} min</div>
                  <p className='text-xs text-muted-foreground'>
                    Tempo médio
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Status das Integrações</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={integrations} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='active' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>{t('Pages.Integrations.ActiveIntegrations')}</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={connectedIntegrations} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='errors' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Integrações com Erro</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={errorIntegrations} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='pending' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Integrações Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={pendingIntegrations} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
} 