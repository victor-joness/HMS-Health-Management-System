import { BaseEntity } from "./BaseEntity";
import { WorkScheduleDetails } from "./commonTypes/WorkScheduleDetails";

export class HumanResourcesEmployee extends BaseEntity {
  constructor(
    public Id: number,
    public UserId: number,
    public Address: string,
    public WorkScheduleDetails: WorkScheduleDetails,
    public Notes: string | null,

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);
    this.Id = Id;
    this.UserId = UserId;
    this.Address = Address;
    this.WorkScheduleDetails = WorkScheduleDetails;
    this.Notes = Notes;
  }
}
