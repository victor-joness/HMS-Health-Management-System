import { Receptionist } from "../../../core/entities/Receptionist";

export class ReceptionistMapper {
  public static fromReceptionistToDB(receptionist: Receptionist): Receptionist {
    return receptionist;
  }

  public static fromDBtoReceptionist(receptionist: any): Receptionist {
    return new Receptionist(
      receptionist.DeletionDate,
      receptionist.ModifiedDate,
      receptionist.CreationDate,
      receptionist.Id,
      receptionist.FullName,
      receptionist.Email,
      receptionist.PhoneNumber,
      receptionist.Address,
      receptionist.City,
      receptionist.State,
      receptionist.ZipCode,
      receptionist.Gender,
      receptionist.Birthday,
      receptionist.IdentificationNumber,
      receptionist.JobTitle,
      receptionist.Department,
      receptionist.WorkingHours,
      receptionist.IsActive,
      receptionist.Notes
    );
  }
}
