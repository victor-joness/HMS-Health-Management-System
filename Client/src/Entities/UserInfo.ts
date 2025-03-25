import { Gender, UserRoleEnum } from "@/utils/Enum"

export interface UserInfo {
  Id: number
  Name: string
  Email: string
  Role: UserRoleEnum
  Img?: string
  Gender?: Gender
  Age?: string | null
  PhoneNumber?: string | null
  PhoneEmergency?: string | null
  DeletionDate: string | null
  ModifiedDate: string | null
  CreationDate: string
} 