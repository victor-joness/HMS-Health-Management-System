import { Surgery } from "../../../core/entities/Surgery";

export class SurgeryMapper {
  public static fromSurgeryToDB(Surgery: Surgery): Surgery {
    return Surgery;
  }

  public static fromDBtoSurgery(Surgery: any): Surgery {
    return new Surgery(
      Surgery.Id,
      Surgery.PatientId,
      Surgery.SurgeryType,
      Surgery.SurgeryDate,
      Surgery.DoctorId,
      Surgery.DoctorAuxId,
      Surgery.NurseId,
      Surgery.NurseAuxId,
      Surgery.AnesthesiologistId,
      Surgery.AnesthesiologistAuxId,
      Surgery.SurgeryStatus,
      Surgery.SurgeryDescription,
      Surgery.AnesthesiaType,
      Surgery.SurgeryDuration,
      Surgery.Complications,
      Surgery.FollowUpCare,
      Surgery.PreSurgeryTests,
      Surgery.Notes,
      Surgery.PatientsAssigned,
      Surgery.ScheduleSurgery,
      Surgery.ScheduleAnesthesia,
      Surgery.Medicines,
      Surgery.Procedure,
      Surgery.SurgeryRoomId,
      Surgery.DeletionDate,
      Surgery.ModifiedDate,
      Surgery.CreationDate
    );
  }
}
