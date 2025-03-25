import { Patient } from "../../../core/entities/Patient";

export class PatientMapper {
  public static fromPatientToDB(patient: Patient): Patient {
    return patient;
  }

  public static fromDBtoPatient(patient: any): Patient {
    return new Patient(
      patient.Id,
      patient.UserId,
      patient.Medications,
      patient.EmergencyContact,
      patient.InsuranceDetailsId,
      patient.MedicalHistory,
      patient.PreferredDoctorId,
      patient.LastVisitDate,
      patient.CovidVaccinationStatus,
      patient.Disabilities,
      patient.OrganDonor,
      patient.AdditionalNotes,
      patient.WorkInfo,
      patient.Report,
      patient.IdentificationNumber,
      patient.IdentificationType,
      patient.PatientAtendimentType,
      patient.Address,
      patient.DeletionDate,
      patient.ModifiedDate,
      patient.CreationDate
    );
  }
}
