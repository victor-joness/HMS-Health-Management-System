import { Receptionist } from "../../../core/entities/Receptionist";

export class ReceptionistMapper {
  public static fromReceptionistToDB(receptionist: Receptionist): Receptionist {
    return receptionist;
  }

  public static fromDBtoReceptionist(receptionist: any): Receptionist {
    return new Receptionist(
      receptionist.Id,
      receptionist.UserId,
      receptionist.Address,
      receptionist.JobTitle,
      receptionist.WorkScheduleDetails,
      receptionist.EmergencyAvailability,
      receptionist.Notes,
      receptionist.DeletionDate,
      receptionist.ModifiedDate,
      receptionist.CreationDate,
    );
  }
}
