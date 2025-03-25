import { BloodType } from '@/utils/Enum'
import { PatientFluxo } from '@/utils/Enum'
import { PatientStatus } from '@/utils/Enum'

export interface Report {
  Gender: string
  Weight: number
  Height: number
  BloodPressure: string
  GlucoseLevel: number
  BloodType: BloodType
  Allergies: string[]
  ChronicDiseases: string[]
  HeartRate: number
  Symptoms: string[]
  Diagnosis: string
  Treatment: string
  Exams: string[],
  Medications: string[],
  PatientStatus: PatientStatus
  PatientFluxo: PatientFluxo
}
