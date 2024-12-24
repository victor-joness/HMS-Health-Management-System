import { Doctor } from "../../../core/entities/Doctor";

export class DoctorMapper {
  public static fromDoctorToDB(doctor: Doctor): Doctor {
    return doctor;
  }

  public static fromDBtoDoctor(doctor: any): Doctor {
    return new Doctor(
      doctor.Id,
      doctor.UserId,
      doctor.Specialty,
      doctor.MedicalLicenseNumber,
      doctor.YearsOfExperience,
      doctor.Department,
      doctor.PatientsAssigned,
      doctor.WorkScheduleDetails,
      doctor.Certifications,
      doctor.ResearchPublications,
      doctor.SupervisingNurses,
      doctor.EmergencyAvailability,
      doctor.Notes,
      doctor.DeletionDate,
      doctor.ModifiedDate,
      doctor.CreationDate
    );
  }
}
