import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Main } from '@/components/layout/main'
import { MedicalRecordsList } from './components/medical-records-list'
import { mockMedicalRecords } from './data/mock-medical-records'
import { MedicalRecord } from '@/entities/MedicalRecord'
import { t } from 'i18next'
import { toast } from 'react-toastify'

const MedicalRecords = () => {
  const [records, setRecords] = useState(mockMedicalRecords)
  const navigate = useNavigate()

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
    if (window.confirm('Tem certeza que deseja excluir este prontuário?')) {
      setRecords(records.filter(r => r.id !== record.id))
      toast.success('Prontuário excluído com sucesso')
    }
  }

  return (
    <Main>
      <MedicalRecordsList
        records={records}
        onViewHistory={handleViewHistory}
        onOpenRecord={handleOpenRecord}
        onEditRecord={handleEditRecord}
        onDeleteRecord={handleDeleteRecord}
        title={t('Pages.MedicalRecords.Title')}
        description={t('Pages.MedicalRecords.Description')}
      />
    </Main>
  )
}

export default MedicalRecords
