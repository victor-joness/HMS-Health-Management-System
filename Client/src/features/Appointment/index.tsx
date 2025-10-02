import { useState } from 'react'
import { Plus, Calendar as CalendarIcon, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AppointmentDialog } from '@/components/Appointments/AppointmentDialog'
import { PageHeader } from '@/components/layout/PageHeader'
import { Main } from '@/components/layout/main'

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  specialty: string
  time: string
  status: 'Agendada' | 'Em Andamento' | 'Concluída' | 'Cancelada'
}

const appointmentsData: Appointment[] = [
  {
    id: 'A001',
    patientName: 'João Silva',
    doctorName: 'Dr. Ricardo Souza',
    specialty: 'Cardiologia',
    time: '09:00',
    status: 'Agendada',
  },
  {
    id: 'A002',
    patientName: 'Maria Oliveira',
    doctorName: 'Dra. Ana Pereira',
    specialty: 'Dermatologia',
    time: '10:30',
    status: 'Em Andamento',
  },
  {
    id: 'A003',
    patientName: 'Pedro Santos',
    doctorName: 'Dr. Fernando Costa',
    specialty: 'Ortopedia',
    time: '11:15',
    status: 'Concluída',
  },
  {
    id: 'A004',
    patientName: 'Ana Costa',
    doctorName: 'Dra. Mariana Lima',
    specialty: 'Oftalmologia',
    time: '13:45',
    status: 'Cancelada',
  },
  {
    id: 'A005',
    patientName: 'Carlos Pereira',
    doctorName: 'Dr. Paulo Martins',
    specialty: 'Neurologia',
    time: '14:30',
    status: 'Agendada',
  },
  {
    id: 'A006',
    patientName: 'Juliana Almeida',
    doctorName: 'Dra. Cristina Rodrigues',
    specialty: 'Cardiologia',
    time: '15:00',
    status: 'Agendada',
  },
]

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState<string>('all')
  const [selectedView, setSelectedView] = useState<string>('day')

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Agendada':
        return 'bg-blue-100 text-blue-700'
      case 'Em Andamento':
        return 'bg-amber-100 text-amber-700'
      case 'Concluída':
        return 'bg-green-100 text-green-700'
      case 'Cancelada':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // Filtragem de consultas por médico
  const filteredAppointments = appointmentsData.filter(
    (appointment) =>
      selectedDoctor === 'all' || appointment.doctorName === selectedDoctor
  )

  const timeSlots = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ]

  return (
    <Main>
      <PageHeader
        title='Agendamento'
        description='Gerenciar consultas e agendamentos'
      >
        <AppointmentDialog />
      </PageHeader>

      <div className='grid grid-cols-12 gap-4'>
        {/* Calendário e Filtros */}
        <div className='col-span-12 lg:col-span-4 space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode='single'
                selected={selectedDate}
                onSelect={setSelectedDate}
                className='border rounded-md p-3 pointer-events-auto'
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <p className='text-sm font-medium'>Médico</p>
                <Select
                  value={selectedDoctor}
                  onValueChange={setSelectedDoctor}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Selecionar médico' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='all'>Todos os médicos</SelectItem>
                      <SelectItem value='Dr. Ricardo Souza'>
                        Dr. Ricardo Souza
                      </SelectItem>
                      <SelectItem value='Dra. Ana Pereira'>
                        Dra. Ana Pereira
                      </SelectItem>
                      <SelectItem value='Dr. Fernando Costa'>
                        Dr. Fernando Costa
                      </SelectItem>
                      <SelectItem value='Dra. Mariana Lima'>
                        Dra. Mariana Lima
                      </SelectItem>
                      <SelectItem value='Dr. Paulo Martins'>
                        Dr. Paulo Martins
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <p className='text-sm font-medium'>Visualização</p>
                <Tabs
                  defaultValue='day'
                  value={selectedView}
                  onValueChange={setSelectedView}
                  className='w-full'
                >
                  <TabsList className='grid grid-cols-3'>
                    <TabsTrigger value='day'>Dia</TabsTrigger>
                    <TabsTrigger value='week'>Semana</TabsTrigger>
                    <TabsTrigger value='month'>Mês</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agenda do dia */}
        <div className='col-span-12 lg:col-span-8'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <div>
                <CardTitle>Consultas do Dia</CardTitle>
                <p className='text-sm text-muted-foreground mt-1'>
                  {selectedDate?.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className='flex gap-2'>
                <Badge variant='outline' className='bg-blue-100 text-blue-700'>
                  {
                    filteredAppointments.filter((a) => a.status === 'Agendada')
                      .length
                  }{' '}
                  Agendadas
                </Badge>
                <Badge
                  variant='outline'
                  className='bg-green-100 text-green-700'
                >
                  {
                    filteredAppointments.filter((a) => a.status === 'Concluída')
                      .length
                  }{' '}
                  Concluídas
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-1'>
                {timeSlots.map((time, index) => {
                  const appointmentsAtTime = filteredAppointments.filter(
                    (a) => a.time === time
                  )
                  const hasAppointment = appointmentsAtTime.length > 0

                  return (
                    <div key={time}>
                      <div className='flex items-center mt-1'>
                        <div className='w-12 text-sm text-muted-foreground'>
                          {time}
                        </div>
                        <Separator className='flex-1' />
                      </div>

                      {hasAppointment ? (
                        <div className='pl-12 pr-4 py-2'>
                          {appointmentsAtTime.map((appointment) => (
                            <div
                              key={appointment.id}
                              className={`
                                mb-1 p-3 rounded-md border 
                                ${appointment.status === 'Cancelada' ? 'bg-red-50 border-red-200' : 'bg-medical-50 border-medical-200'}
                              `}
                            >
                              <div className='flex justify-between items-start'>
                                <div>
                                  <h4 className='font-medium text-sm'>
                                    {appointment.patientName}
                                  </h4>
                                  <div className='flex items-center text-xs text-muted-foreground mt-1'>
                                    <Clock className='h-3 w-3 mr-1' />
                                    <span>{appointment.time}</span>
                                    <span className='mx-1'>•</span>
                                    <User className='h-3 w-3 mr-1' />
                                    <span>{appointment.doctorName}</span>
                                  </div>
                                </div>
                                <Badge
                                  variant='outline'
                                  className={getStatusColor(appointment.status)}
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                              <p className='text-xs mt-1 text-muted-foreground'>
                                {appointment.specialty}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className='pl-12 py-2'>
                          <AppointmentDialog />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
}

export default Appointments
