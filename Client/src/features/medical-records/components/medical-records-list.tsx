import React, { useState, useMemo } from 'react'
import { Search, FileText, Clock, Calendar, Activity, Database, CheckCircle2, AlertCircle, User, Stethoscope, Archive } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MedicalRecord, MedicalRecordFilters } from '@/entities/MedicalRecord'
import { t } from 'i18next'

interface MedicalRecordsListProps {
  records: MedicalRecord[]
  onViewHistory?: (record: MedicalRecord) => void
  onOpenRecord?: (record: MedicalRecord) => void
  onEditRecord?: (record: MedicalRecord) => void
  onDeleteRecord?: (record: MedicalRecord) => void
  showActions?: boolean
  title?: string
  description?: string
}

export function MedicalRecordsList({
  records,
  onViewHistory,
  onOpenRecord,
  onEditRecord,
  onDeleteRecord,
  showActions = true,
  title,
  description
}: MedicalRecordsListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [filters, setFilters] = useState<MedicalRecordFilters>({})

  // Filtrar prontuários por pesquisa, tab ativo e filtros
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'active' && record.status === 'Ativo') ||
        (activeTab === 'completed' && record.status === 'Finalizado') ||
        (activeTab === 'archived' && record.status === 'Arquivado')

      const matchesFilters =
        (!filters.patientName || record.patientName.toLowerCase().includes(filters.patientName.toLowerCase())) &&
        (!filters.patientId || record.patientId.toLowerCase().includes(filters.patientId.toLowerCase())) &&
        (!filters.status || record.status === filters.status) &&
        (!filters.department || record.department === filters.department) &&
        (!filters.doctorName || record.doctorName.toLowerCase().includes(filters.doctorName.toLowerCase())) &&
        (!filters.priority || record.priority === filters.priority)

      return matchesSearch && matchesTab && matchesFilters
    })
  }, [records, searchQuery, activeTab, filters])

  const getStatusIcon = (status: MedicalRecord['status']) => {
    switch (status) {
      case 'Ativo':
        return <CheckCircle2 className='h-4 w-4 text-green-500' />
      case 'Finalizado':
        return <Archive className='h-4 w-4 text-blue-500' />
      case 'Arquivado':
        return <AlertCircle className='h-4 w-4 text-gray-500' />
      default:
        return <FileText className='h-4 w-4 text-gray-500' />
    }
  }

  const getStatusColor = (status: MedicalRecord['status']) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-700'
      case 'Finalizado':
        return 'bg-blue-100 text-blue-700'
      case 'Arquivado':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: MedicalRecord['priority']) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-red-100 text-red-700'
      case 'Alta':
        return 'bg-orange-100 text-orange-700'
      case 'Média':
        return 'bg-yellow-100 text-yellow-700'
      case 'Baixa':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className='space-y-6'>
      {title && (
        <div className='mb-6'>
          <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>
      )}

      <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Search className='h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Buscar por paciente, ID ou médico...'
            className='flex-1'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <Tabs
            defaultValue='all'
            className='w-full'
            onValueChange={(value) => {
              setActiveTab(value)
            }}
          >
            <TabsList>
              <TabsTrigger value='all'>Todos</TabsTrigger>
              <TabsTrigger value='active'>Ativos</TabsTrigger>
              <TabsTrigger value='completed'>Finalizados</TabsTrigger>
              <TabsTrigger value='archived'>Arquivados</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12'>
          <FileText className='h-12 w-12 text-muted' />
          <h3 className='mt-4 text-lg font-medium'>
            Nenhum prontuário encontrado
          </h3>
          <p className='text-muted-foreground'>
            Tente ajustar seus filtros ou criar um novo prontuário
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredRecords.map((record) => (
            <Card key={record.id} className='overflow-hidden'>
              <CardHeader className='pb-2'>
                <div className='flex justify-between'>
                  <div className='flex items-center'>
                    <Avatar className='h-8 w-8 mr-2'>
                      <AvatarFallback>
                        {record.patientName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className='text-base'>
                        {record.patientName}
                      </CardTitle>
                      <CardDescription>{record.patientId}</CardDescription>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Badge
                      variant='outline'
                      className={getStatusColor(record.status)}
                    >
                      {t(`Pages.MedicalRecords.Statuses.${record.status}`)}
                    </Badge>
                    <Badge
                      variant='outline'
                      className={getPriorityColor(record.priority)}
                    >
                      {t(`Pages.MedicalRecords.Priorities.${record.priority}`)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='pb-2'>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='flex items-center'>
                    <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                    <span>Admissão: {new Date(record.admissionDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className='flex items-center'>
                    <Activity className='mr-2 h-4 w-4 text-muted-foreground' />
                    <span>{record.department}</span>
                  </div>
                </div>
                <div className='mt-2 text-sm flex items-center'>
                  <Stethoscope className='mr-2 h-4 w-4 text-muted-foreground' />
                  <span>Médico: {record.doctorName}</span>
                </div>
                <div className='mt-2 text-sm flex items-center'>
                  <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                  <span>Atualizado: {new Date(record.lastUpdate).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
              {showActions && (
                <CardFooter className='pt-2 flex justify-between'>
                  {onViewHistory && (
                    <Button variant='outline' size='sm' className='w-full' onClick={() => onViewHistory(record)}>
                      <User className='mr-2 h-4 w-4' />
                      Ver Histórico
                    </Button>
                  )}
                  {onOpenRecord && (
                    <Button size='sm' className='w-full ml-2' onClick={() => onOpenRecord(record)}>
                      <FileText className='mr-2 h-4 w-4' />
                      Abrir Prontuário
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 