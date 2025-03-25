import { DepartmentEnum, Gender, SpecialtyEnum } from "@/utils/Enum"
import { UserInfo } from "./UserInfo"

export interface Nurse {
  UserInfo: UserInfo | null
  Id: number | null
  Name: string
  Password: string
  Email: string
  NursingLicenseNumber: string
  Qualifications: string
  Role: 'nurse'
  Department: DepartmentEnum | ''
  Specialization: SpecialtyEnum | ''
  YearsOfExperience: number
  SupervisingDoctor: number
  Img: string
  PhoneNumber: string
  Age: number
  Gender: Gender
  Certifications: string[]
  WorkScheduleDetails: {
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
    Sunday: string
  }
  EmergencyAvailability: boolean
  Notes: string
  Address: string
  DeletionDate: string | null
  ModifiedDate: string | null
  CreationDate: string
} 