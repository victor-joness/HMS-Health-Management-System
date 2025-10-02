import React from 'react'
import { IconArrowDown, IconArrowUp, IconArrowRight, IconLineScan, IconFileText, IconClock, IconUser, IconActivity } from '@tabler/icons-react'
import { Auth } from '@/entities/Auth'
import { Patient } from '@/entities/Patients'
import { Report } from '@/entities/Report'
import { t } from 'i18next'
import { Progress } from '@/components/ui/progress'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockMedicalRecords } from '@/features/medical-records/data/mock-medical-records'
import { MedicalRecord } from '@/entities/MedicalRecord'
import { useLocation } from 'react-router-dom'

type PatientProfileProps = {
  Patient: Patient
  Auth: Auth
}

const getArrowIcon = (value: Partial<Report>, IMC : number) => {
  console.log(IMC)
  if (value.HeartRate !== undefined) {
    if (value.HeartRate < 60) return <IconArrowDown color='red' />
    if (value.HeartRate < 100) return <IconArrowRight color='orange' />
    return <IconArrowUp color='green' />
  }
  if (value.BloodPressure) {
    const [sistolica, diastolica] = value.BloodPressure.split('/').map(Number)
    if (sistolica < 90 || diastolica < 60) return <IconArrowDown color='red' />
    if (sistolica < 120 && diastolica < 80)
      return <IconArrowRight color='orange' />
    return <IconArrowUp color='green' />
  }
  
  if (value.GlucoseLevel !== undefined) {
    if (value.GlucoseLevel < 70) return <IconArrowDown color='red' />
    if (value.GlucoseLevel <= 100) return <IconArrowRight color='orange' />
    return <IconArrowUp color='green' />
  }

  if(IMC !== undefined){
    if (IMC < 18.5) {
      return <IconArrowDown color="red" />;
    } else if (IMC >= 18.5 && IMC < 25.0) {
      return <IconLineScan color="red" />;
    } else if (IMC >= 25.0 && IMC < 30.0) {
      return <IconArrowUp color="red" />;
    } else {
      return <IconArrowUp color="red" />;
    }
  }
  return null
}

const PatientProfile: React.FC<PatientProfileProps> = ({ Patient, Auth }) => {
  const IMC = (Patient.Report.Weight / Patient.Report.Height ** 2) * 10000
  const PRESSAO =
    (Number(Patient.Report.BloodPressure.split('/')[0]) /
      Number(Patient.Report.BloodPressure.split('/')[1])) *
    100

  const location = useLocation()
  const medicalRecord = location.state?.medicalRecord as MedicalRecord | undefined

  console.log(Patient)

  return (
    <>
      <Header sticky>
        <h2
          className={`text-sm font-medium transition-colors hover:text-primary`}
        >
          {t('Pages.Patient.Overview')}
        </h2>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown auth={Auth} />
        </div>
      </Header>

      <Main>
        <div className='flex items-center justify-center p-6'>
          <div className='bg-white shadow-lg rounded-lg w-full max-w-10xl p-6 grid-cols-3'>
            <div className='flex items-center justify-center gap-2'>
              <div className='w-1/4 flex items-center justify-center'>
                <img
                  src={`${Patient.UserInfo?.Img}`}
                  alt='Imagem do Perfil'
                  className='w-full h-full object-cover rounded-lg shadow-lg'
                />
              </div>

              <div className='w-full bg-gray-50 p-7  rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Sobre o paciente</h2>
                <p className='text-sm text-gray-600 mb-4'>
                  {Patient.AdditionalNotes}
                </p>
                <div className='grid grid-cols-3 gap-4 text-sm text-gray-700'>
                  <p>
                    <strong>Email:</strong> {Patient.UserInfo?.Email}
                  </p>
                  <p>
                    <strong>Número:</strong> {Patient.UserInfo?.PhoneNumber}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {Patient.Address}
                  </p>
                  <p>
                    <strong>Gênero:</strong> {Patient.Report.Gender}
                  </p>
                  <p>
                    <strong>Altura:</strong> {Patient.Report.Height} cm
                  </p>
                  <p>
                    <strong>Idade:</strong> {Patient.UserInfo?.Age}
                  </p>
                  <p>
                    <strong>Peso:</strong> {Patient.Report.Weight} kg
                  </p>
                  <p>
                    <strong>User ID:</strong> {Patient.UserInfo?.Id}
                  </p>
                  <p>
                    <strong>Paciente ID:</strong> {Patient.Id}
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full flex gap-6 mt-4'>
              <div className='w-3/4 bg-gray-50 p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Atachment</h2>
              </div>

              {/* Relatório */}
              <div className='w-1/4 bg-gray-50 p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Report</h2>
                {['HeartRate', 'BloodPressure', 'IMC', 'GlucoseLevel'].map(
                  (key) => (
                    <div key={key} className='mb-4'>
                      <h3 className='text-md font-semibold'>
                        {key === 'HeartRate' ? 'BPM' : key}
                      </h3>
                      <div className='flex items-center gap-4'>
                        
                        {
                          key === 'HeartRate'
                          ? Patient.Report.HeartRate
                          : key === 'BloodPressure'
                            ? PRESSAO
                            : key === 'IMC'
                              ? IMC.toFixed(0)
                              : Patient.Report.GlucoseLevel
                        }
                        <Progress
                          value={
                            key === 'HeartRate'
                              ? Patient.Report.HeartRate
                              : key === 'BloodPressure'
                                ? PRESSAO
                                : key === 'IMC'
                                  ? IMC
                                  : Patient.Report.GlucoseLevel
                          }
                          max={100}
                        />
                        {getArrowIcon({
                          [key]: Patient.Report[key as keyof Report],
                        }, IMC)}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className='w-full flex gap-6 mt-4'> 
              <div className='w-full bg-gray-50 p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-bold mb-4'>Histórico Médico</h2>
                
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="visits">Visitas</TabsTrigger>
                    <TabsTrigger value="exams">Exames</TabsTrigger>
                    <TabsTrigger value="medications">Medicamentos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <IconUser className="h-5 w-5 mr-2" />
                            Informações Básicas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">Status:</span>
                              <Badge variant={Patient.Report.PatientStatus === 'ALTA' ? 'default' : 'secondary'}>
                                {Patient.Report.PatientStatus}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Fluxo:</span>
                              <Badge variant="outline">
                                {Patient.Report.PatientFluxo}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Tipo Sanguíneo:</span>
                              <span>{Patient.Report.BloodType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Doador de Órgãos:</span>
                              <span>{Patient.OrganDonor ? 'Sim' : 'Não'}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <IconActivity className="h-5 w-5 mr-2" />
                            Condições Médicas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Alergias:</h4>
                              <div className="flex flex-wrap gap-1">
                                {Patient.Report.Allergies.map((allergy, index) => (
                                  <Badge key={index} variant="destructive">
                                    {allergy}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Doenças Crônicas:</h4>
                              <div className="flex flex-wrap gap-1">
                                {Patient.Report.ChronicDiseases.map((disease, index) => (
                                  <Badge key={index} variant="secondary">
                                    {disease}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Sintomas:</h4>
                              <div className="flex flex-wrap gap-1">
                                {Patient.Report.Symptoms.map((symptom, index) => (
                                  <Badge key={index} variant="outline">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {medicalRecord && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <IconFileText className="h-5 w-5 mr-2" />
                            Último Prontuário
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-semibold">Queixa Principal</h4>
                                <p className="text-sm text-muted-foreground">{medicalRecord.chiefComplaint}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold">Diagnóstico</h4>
                                <div className="flex flex-wrap gap-1">
                                  {medicalRecord.diagnosis.map((diag, index) => (
                                    <Badge key={index} variant="secondary">
                                      {diag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold">Tratamento</h4>
                                <p className="text-sm text-muted-foreground">{medicalRecord.treatmentPlan.recommendations.join(', ')}</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm">
                                Ver Prontuário Completo
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="visits" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Visitas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">Última Visita</h4>
                                <p className="text-sm text-muted-foreground">{Patient.LastVisitDate}</p>
                              </div>
                              <Badge variant="default">Concluída</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {Patient.Report.Diagnosis} - {Patient.Report.Treatment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="exams" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Exames Realizados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Patient.Report.Exams.map((exam, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <h4 className="font-medium">{exam}</h4>
                                <p className="text-sm text-muted-foreground">Data: {Patient.LastVisitDate}</p>
                              </div>
                              <Badge variant="default">Concluído</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="medications" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Medicamentos Prescritos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Patient.Report.Medications.map((medication, index) => (
                            <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <h4 className="font-medium">{medication}</h4>
                                <p className="text-sm text-muted-foreground">Prescrito em: {Patient.LastVisitDate}</p>
                              </div>
                              <Badge variant="outline">Ativo</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  )
}

export default PatientProfile
