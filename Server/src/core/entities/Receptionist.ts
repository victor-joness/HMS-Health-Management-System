import { BaseEntity } from "./BaseEntity";
import { WorkScheduleDetails } from "./commonTypes/WorkScheduleDetails";

export class Receptionist extends BaseEntity {
  constructor(
    public Id: number, // Identificador único do recepcionista
    public UserId: number,
    public Address: string,
    public JobTitle: string,
    public WorkScheduleDetails: WorkScheduleDetails,
    public EmergencyAvailability: boolean,
    public Notes: string | null, // Observações opcionais sobre o recepcionista

    DeletionDate: string | null, // Data de exclusão do registro, se aplicável
    ModifiedDate: string | null, // Data da última modificação
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);
    this.Id = Id;
    this.UserId = UserId;
    this.Address = Address;
    this.JobTitle = JobTitle;
    this.WorkScheduleDetails = WorkScheduleDetails;
    this.EmergencyAvailability = EmergencyAvailability;
    this.Notes = Notes;
  }
}
