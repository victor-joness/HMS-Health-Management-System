import { IdentificationType, PatientAtendimentTypeEnum } from "@/utils/Enum";
import { MedicalHistory } from "./MedicalHistory";
import { Report } from "./Report";
import { UserInfo } from "./UserInfo";

export interface Patient {
  Id: number;
  UserInfo: UserInfo | null;
  Medications: string[];
  EmergencyContact: string;
  InsuranceDetailsId: number;
  MedicalHistory: MedicalHistory[];
  PreferredDoctorId: number;
  LastVisitDate: string;
  CovidVaccinationStatus: boolean;
  Disabilities: string[];
  OrganDonor: boolean;
  AdditionalNotes: string | null;
  WorkInfo: string;
  Report: Report;
  IdentificationNumber: string;
  IdentificationType: IdentificationType;
  PatientAtendimentType: PatientAtendimentTypeEnum;
  Address: string;
  DeletionDate: string | null
  ModifiedDate: string | null
  CreationDate: string
}
