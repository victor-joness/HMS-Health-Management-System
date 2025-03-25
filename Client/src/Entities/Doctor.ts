import { CertificationEnum, Gender, SpecialtyEnum } from '../utils/Enum'
import { DepartmentEnum } from '../utils/Enum'
import { UserInfo } from './UserInfo'

export interface Doctor {
  UserInfo: UserInfo | null
  Id: number | null
  Name: string
  Password: string
  Email: string
  Img: string
  PhoneNumber: string
  Age: number
  Gender: Gender
  Role: 'doctor'
  CreatedAt: Date 
  UpdatedAt: Date 
  Speciality: SpecialtyEnum | ''
  MedicalLicenseNumber: string
  YearsOfExperience: number 
  Department: DepartmentEnum | ''
  PatientsAssigned: {
    patientId: string
    patientName: string
    patientEmail: string
  }[]
  WorkScheduleDetails: {
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
    Sunday: string
  }
  Certifications: CertificationEnum[]
  ResearchPublications: {
    title: string
    publicationDate: string
    journalName: string
  }[]
  SupervisingNurses: string[]
  EmergencyAvailability: boolean
  Notes: string | null
  Address: string
  DeletionDate: string | null
  ModifiedDate: string | null
  CreationDate: string
}
