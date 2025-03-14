import { Patient } from "../../../core/entities/Patient";

export class PatientMapper {
  public static fromPatientToDB(patient: Patient): Patient {
    return patient;
  }

  public static fromDBtoPatient(patient: any): Patient {
    return new Patient(
      patient.id,
      patient.UserId,
      patient.address,
      patient.medications,
      patient.emergency_contacts,
      patient.insurance_details,
      patient.medical_history,
      patient.preferred_doctor,
      patient.last_visit_date,
      patient.covid_vaccination_status,
      patient.disabilities,
      patient.organ_donor,
      patient.additional_notes,
      patient.work_info,
      patient.report,
      patient.identification,
      patient.deletion_date,
      patient.modified_date,
      patient.creation_date
    );
  }
}
