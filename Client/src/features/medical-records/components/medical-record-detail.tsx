import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  FileText, 
  User, 
  Stethoscope, 
  Activity, 
  Pill, 
  TestTube, 
  Camera, 
  Clipboard, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  Printer
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { MedicalRecord } from '@/entities/MedicalRecord'
import { t } from 'i18next'
import { toast } from 'react-toastify'

interface MedicalRecordDetailProps {
  record: MedicalRecord
}

export function MedicalRecordDetail({ record }: MedicalRecordDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

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

  const getTestStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluído':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'Em Andamento':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Solicitado':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case 'Cancelado':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const handlePrint = () => {
    window.print()
    toast.success('Imprimindo prontuário...')
  }

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Prontuário salvo com sucesso')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{record.patientName}</h1>
            <p className="text-muted-foreground">Prontuário #{record.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          {isEditing ? (
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getStatusColor(record.status)}>
              {t(`Pages.MedicalRecords.Statuses.${record.status}`)}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prioridade</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getPriorityColor(record.priority)}>
              {t(`Pages.MedicalRecords.Priorities.${record.priority}`)}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{record.department}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Médico Responsável</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{record.doctorName}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="vitals">Sinais Vitais</TabsTrigger>
          <TabsTrigger value="treatment">Tratamento</TabsTrigger>
          <TabsTrigger value="progress">Evolução</TabsTrigger>
          <TabsTrigger value="tests">Exames</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescrições</TabsTrigger>
          <TabsTrigger value="nursing">Enfermagem</TabsTrigger>
          {record.discharge && <TabsTrigger value="discharge">Alta</TabsTrigger>}
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informações do Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Queixa Principal</h4>
                  <p className="text-sm text-muted-foreground">{record.chiefComplaint}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Doença Atual</h4>
                  <p className="text-sm text-muted-foreground">{record.currentIllness}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Histórico Médico</h4>
                  <p className="text-sm text-muted-foreground">{record.pastMedicalHistory}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Histórico Familiar</h4>
                  <p className="text-sm text-muted-foreground">{record.familyHistory}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Histórico Social</h4>
                  <p className="text-sm text-muted-foreground">{record.socialHistory}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Avaliação e Diagnóstico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Avaliação</h4>
                  <p className="text-sm text-muted-foreground">{record.assessment}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Diagnóstico</h4>
                  <div className="flex flex-wrap gap-1">
                    {record.diagnosis.map((diag, index) => (
                      <Badge key={index} variant="secondary">
                        {diag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Diagnóstico Diferencial</h4>
                  <div className="flex flex-wrap gap-1">
                    {record.differentialDiagnosis.map((diag, index) => (
                      <Badge key={index} variant="outline">
                        {diag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sinais Vitais */}
        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Sinais Vitais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <h4 className="font-semibold">Pressão Arterial</h4>
                  <p className="text-2xl font-bold">{record.vitalSigns.bloodPressure}</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Freq. Cardíaca</h4>
                  <p className="text-2xl font-bold">{record.vitalSigns.heartRate} bpm</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Temperatura</h4>
                  <p className="text-2xl font-bold">{record.vitalSigns.temperature}°C</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Freq. Respiratória</h4>
                  <p className="text-2xl font-bold">{record.vitalSigns.respiratoryRate} rpm</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Saturação O2</h4>
                  <p className="text-2xl font-bold">{record.vitalSigns.oxygenSaturation}%</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Peso</h4>
                  <p className="text-2xl font-bold">{record.vitalSigns.weight} kg</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">Altura</h4>
                  <p className="text-2xl font-bold">{record.vitalSigns.height} cm</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">IMC</h4>
                  <p className="text-2xl font-bold">
                    {((record.vitalSigns.weight / Math.pow(record.vitalSigns.height / 100, 2)).toFixed(1))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tratamento */}
        <TabsContent value="treatment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="h-5 w-5 mr-2" />
                  Medicamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {record.treatmentPlan.medications.map((med, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{med.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Dosagem:</strong> {med.dosage}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Frequência:</strong> {med.frequency}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Duração:</strong> {med.duration}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Instruções:</strong> {med.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clipboard className="h-5 w-5 mr-2" />
                  Procedimentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {record.treatmentPlan.procedures.map((proc, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{proc.name}</h4>
                      <p className="text-sm text-muted-foreground">{proc.description}</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Data:</strong> {new Date(proc.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Médico:</strong> {proc.doctor}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendações e Retorno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Recomendações</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {record.treatmentPlan.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{rec}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Retorno</h4>
                  <p className="text-sm text-muted-foreground">{record.treatmentPlan.followUp}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evolução */}
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notas de Evolução</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {record.progressNotes.map((note, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{note.doctor}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(note.date).toLocaleDateString('pt-BR')} às {note.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{note.note}</p>
                    {note.vitalSigns && (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                        <div>PA: {note.vitalSigns.bloodPressure}</div>
                        <div>FC: {note.vitalSigns.heartRate} bpm</div>
                        <div>T: {note.vitalSigns.temperature}°C</div>
                        <div>FR: {note.vitalSigns.respiratoryRate} rpm</div>
                        <div>O2: {note.vitalSigns.oxygenSaturation}%</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exames */}
        <TabsContent value="tests" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TestTube className="h-5 w-5 mr-2" />
                  Exames Laboratoriais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {record.laboratoryTests.map((test, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{test.name}</h4>
                        {getTestStatusIcon(test.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Data:</strong> {new Date(test.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Resultado:</strong> {test.results}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Status:</strong> {test.status}
                      </p>
                      {test.notes && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Observações:</strong> {test.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Exames de Imagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {record.imagingTests.map((test, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{test.type}</h4>
                        {getTestStatusIcon(test.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Data:</strong> {new Date(test.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Resultado:</strong> {test.results}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Status:</strong> {test.status}
                      </p>
                      {test.notes && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Observações:</strong> {test.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prescrições */}
        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescrições</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {record.prescriptions.map((prescription, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">Prescrição #{prescription.id}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(prescription.date).toLocaleDateString('pt-BR')} - {prescription.doctor}
                        </p>
                      </div>
                      <Badge variant={prescription.status === 'Ativa' ? 'default' : 'secondary'}>
                        {prescription.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {prescription.medications.map((med, medIndex) => (
                        <div key={medIndex} className="border-l-4 border-blue-500 pl-4">
                          <h5 className="font-medium">{med.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            {med.dosage} - {med.frequency} - {med.duration}
                          </p>
                          <p className="text-sm text-muted-foreground">{med.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notas de Enfermagem */}
        <TabsContent value="nursing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notas de Enfermagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {record.nursingNotes.map((note, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{note.nurse}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(note.date).toLocaleDateString('pt-BR')} às {note.time}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{note.note}</p>
                    {note.vitalSigns && (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                        <div>PA: {note.vitalSigns.bloodPressure}</div>
                        <div>FC: {note.vitalSigns.heartRate} bpm</div>
                        <div>T: {note.vitalSigns.temperature}°C</div>
                        <div>FR: {note.vitalSigns.respiratoryRate} rpm</div>
                        <div>O2: {note.vitalSigns.oxygenSaturation}%</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alta */}
        {record.discharge && (
          <TabsContent value="discharge" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alta Médica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Data da Alta</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(record.discharge.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Médico Responsável</h4>
                      <p className="text-sm text-muted-foreground">{record.discharge.doctor}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Diagnóstico Final</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {record.discharge.diagnosis.map((diag, index) => (
                        <Badge key={index} variant="secondary">
                          {diag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Tratamento</h4>
                    <p className="text-sm text-muted-foreground">{record.discharge.treatment}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Medicamentos</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {record.discharge.medications.map((med, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{med}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Retorno</h4>
                    <p className="text-sm text-muted-foreground">{record.discharge.followUp}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Instruções</h4>
                    <p className="text-sm text-muted-foreground">{record.discharge.instructions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
} 