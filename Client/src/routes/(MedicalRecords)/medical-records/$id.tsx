import { createFileRoute, useParams } from '@tanstack/react-router'
import { useLocation } from 'react-router-dom'
import { MedicalRecordDetail } from '@/features/medical-records/components/medical-record-detail'
import { Main } from '@/components/layout/main'
import { mockMedicalRecords } from '@/features/medical-records/data/mock-medical-records'
import { MedicalRecord } from '@/entities/MedicalRecord'
import { toast } from 'react-toastify'

export const Route = createFileRoute('/(MedicalRecords)/medical-records/$id')({
  component: MedicalRecordDetailPage,
})

function MedicalRecordDetailPage() {
  const { id } = useParams({ strict: false })
  const location = useLocation()
  
  // Tentar obter o prontuário do estado da navegação primeiro
  let record: MedicalRecord | undefined = location.state?.medicalRecord
  
  // Se não estiver no estado, buscar nos dados mock
  if (!record) {
    record = mockMedicalRecords.find(r => r.id === id)
  }
  
  if (!record) {
    toast.error('Prontuário não encontrado')
    return (
      <Main>
        <div className="flex flex-col items-center justify-center py-12">
          <h3 className="mt-4 text-lg font-medium">
            Prontuário não encontrado
          </h3>
          <p className="text-muted-foreground">
            O prontuário solicitado não foi encontrado
          </p>
        </div>
      </Main>
    )
  }

  return (
    <Main>
      <MedicalRecordDetail record={record} />
    </Main>
  )
} 