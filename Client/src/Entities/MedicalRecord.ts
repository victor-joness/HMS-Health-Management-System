export interface MedicalRecord {
  id: string
  patientId: string
  patientName: string
  status: 'Ativo' | 'Finalizado' | 'Arquivado'
  department: string
  doctorName: string
  doctorId: string
  admissionDate: string
  dischargeDate?: string
  lastUpdate: string
  priority: 'Baixa' | 'Média' | 'Alta' | 'Urgente'
  
  // Informações do Atendimento
  chiefComplaint: string
  currentIllness: string
  pastMedicalHistory: string
  familyHistory: string
  socialHistory: string
  
  // Exame Físico
  vitalSigns: {
    bloodPressure: string
    heartRate: number
    temperature: number
    respiratoryRate: number
    oxygenSaturation: number
    weight: number
    height: number
  }
  
  // Avaliação e Diagnóstico
  assessment: string
  diagnosis: string[]
  differentialDiagnosis: string[]
  
  // Plano de Tratamento
  treatmentPlan: {
    medications: Array<{
      name: string
      dosage: string
      frequency: string
      duration: string
      instructions: string
    }>
    procedures: Array<{
      name: string
      description: string
      date: string
      doctor: string
    }>
    recommendations: string[]
    followUp: string
  }
  
  // Evolução
  progressNotes: Array<{
    date: string
    time: string
    doctor: string
    note: string
    vitalSigns?: {
      bloodPressure: string
      heartRate: number
      temperature: number
      respiratoryRate: number
      oxygenSaturation: number
    }
  }>
  
  // Exames Laboratoriais
  laboratoryTests: Array<{
    id: string
    name: string
    date: string
    results: string
    status: 'Solicitado' | 'Em Andamento' | 'Concluído' | 'Cancelado'
    notes: string
  }>
  
  // Exames de Imagem
  imagingTests: Array<{
    id: string
    type: string
    date: string
    results: string
    status: 'Solicitado' | 'Em Andamento' | 'Concluído' | 'Cancelado'
    notes: string
  }>
  
  // Prescrições
  prescriptions: Array<{
    id: string
    date: string
    doctor: string
    medications: Array<{
      name: string
      dosage: string
      frequency: string
      duration: string
      instructions: string
    }>
    status: 'Ativa' | 'Suspensa' | 'Finalizada'
  }>
  
  // Notas de Enfermagem
  nursingNotes: Array<{
    date: string
    time: string
    nurse: string
    note: string
    vitalSigns?: {
      bloodPressure: string
      heartRate: number
      temperature: number
      respiratoryRate: number
      oxygenSaturation: number
    }
  }>
  
  // Alta
  discharge?: {
    date: string
    doctor: string
    diagnosis: string[]
    treatment: string
    medications: string[]
    followUp: string
    instructions: string
  }
}

export interface MedicalRecordFilters {
  patientName?: string
  patientId?: string
  status?: string
  department?: string
  doctorName?: string
  priority?: string
  admissionDateFrom?: string
  admissionDateTo?: string
} 