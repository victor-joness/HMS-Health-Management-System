import { Nurse } from "../../../core/entities/Nurse";

export class NurseMapper {
  public static fromNurseToDB(nurse: Nurse): Nurse {
    return nurse;
  }

  public static fromDBtoNurse(nurse: any): Nurse {
    return new Nurse(
      nurse.Id,
      nurse.UserId,
      nurse.Qualifications,
      nurse.YearsOfExperience,
      nurse.NursingLicenseNumber,
      nurse.Specialization,
      nurse.Department,
      nurse.WorkScheduleDetails,
      nurse.PatientsAssigned,
      nurse.Certifications,
      nurse.Supervisor,
      nurse.EmergencyAvailability,
      nurse.Notes,
      nurse.DeletionDate,
      nurse.ModifiedDate,
      nurse.CreationDate,
    );
  }
}
