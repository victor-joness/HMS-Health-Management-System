import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MedicalRecordsList } from '@/features/medical-records/components/medical-records-list'
import { Patient } from '@/entities/Patients'
import { MedicalRecord } from '@/entities/MedicalRecord'
import { mockMedicalRecords } from '@/features/medical-records/data/mock-medical-records'
import { t } from 'i18next'
import { toast } from 'react-toastify'

interface PatientsMedicalRecordsListProps {
  patients: Patient[]
  title?: string
  description?: string
}

// Função para converter Patient em MedicalRecord
const convertPatientToMedicalRecord = (patient: Patient): MedicalRecord => {
  // Buscar prontuário existente ou criar um mock
  const existingRecord = mockMedicalRecords.find(r => r.patientId === `P${patient.Id}`)
  
  if (existingRecord) {
    return existingRecord
  }

  // Criar prontuário mock baseado no paciente
  return {
    id: `MR${patient.Id.toString().padStart(3, '0')}`,
    patientId: `P${patient.Id}`,
    patientName: patient.UserInfo?.Name || 'Paciente',
    status: patient.Report?.PatientStatus === 'ALTA' ? 'Finalizado' : 'Ativo',
    department: 'Clínica Geral',
    doctorName: 'Dr. Responsável',
    doctorId: 'D001',
    admissionDate: patient.CreationDate,
    lastUpdate: patient.LastVisitDate,
    priority: patient.Report?.PatientStatus === 'CRITICO' ? 'Urgente' : 
              patient.Report?.PatientStatus === 'ALTA' ? 'Alta' : 
              patient.Report?.PatientStatus === 'NORMAL' ? 'Média' : 'Baixa',
    chiefComplaint: patient.Report?.Diagnosis || 'Queixa não especificada',
    currentIllness: patient.Report?.Diagnosis || 'Doença atual não especificada',
    pastMedicalHistory: patient.AdditionalNotes || 'Sem histórico médico',
    familyHistory: 'Histórico familiar não especificado',
    socialHistory: patient.WorkInfo || 'Histórico social não especificado',
    assessment: patient.Report?.Diagnosis || 'Avaliação não especificada',
    diagnosis: patient.Report?.Diagnosis ? [patient.Report.Diagnosis] : ['Diagnóstico não especificado'],
    differentialDiagnosis: ['Diagnóstico diferencial não especificado'],
    vitalSigns: {
      bloodPressure: patient.Report?.BloodPressure || '0/0',
      heartRate: patient.Report?.HeartRate || 0,
      temperature: 36.5,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: patient.Report?.Weight || 0,
      height: patient.Report?.Height || 0
    },
    treatmentPlan: {
      medications: patient.Report?.Medications?.map(med => ({
        name: med,
        dosage: 'Não especificado',
        frequency: 'Não especificado',
        duration: 'Não especificado',
        instructions: 'Não especificado'
      })) || [],
      procedures: [],
      recommendations: ['Recomendações não especificadas'],
      followUp: 'Retorno não especificado'
    },
    progressNotes: [],
    laboratoryTests: patient.Report?.Exams?.map(exam => ({
      id: `LAB${Math.random().toString(36).substr(2, 9)}`,
      name: exam,
      date: patient.CreationDate,
      results: 'Resultado não disponível',
      status: 'Concluído',
      notes: 'Exame solicitado'
    })) || [],
    imagingTests: [],
    prescriptions: [],
    nursingNotes: []
  }
}

export function PatientsMedicalRecordsList({ 
  patients, 
  title = 'Histórico de Pacientes',
  description = 'Visualize o histórico médico de todos os pacientes que passaram pelo hospital'
}: PatientsMedicalRecordsListProps) {
  const navigate = useNavigate()

  // Converter pacientes em prontuários médicos
  const medicalRecords = useMemo(() => {
    return patients.map(convertPatientToMedicalRecord)
  }, [patients])

  const handleViewHistory = (record: MedicalRecord) => {
    // Navegar para a página de histórico do paciente
    navigate(`/patients/profile/${record.patientId}`, { 
      state: { 
        patientId: record.patientId,
        patientName: record.patientName,
        medicalRecord: record
      }
    })
  }

  const handleOpenRecord = (record: MedicalRecord) => {
    // Navegar para a página de prontuário detalhado
    navigate(`/medical-records/${record.id}`, { 
      state: { 
        medicalRecord: record
      }
    })
  }

  const handleEditRecord = (record: MedicalRecord) => {
    toast.info('Funcionalidade de edição será implementada em breve')
  }

  const handleDeleteRecord = (record: MedicalRecord) => {
    toast.info('Funcionalidade de exclusão será implementada em breve')
  }

  return (
    <MedicalRecordsList
      records={medicalRecords}
      onViewHistory={handleViewHistory}
      onOpenRecord={handleOpenRecord}
      onEditRecord={handleEditRecord}
      onDeleteRecord={handleDeleteRecord}
      title={title}
      description={description}
    />
  )
} 