import { BaseEntity } from "./BaseEntity";

export class UpcomingAppointments extends BaseEntity {
  constructor(
    public Id: number,
    public Date: string,
    public DoctorName: string,
    public Reason: string,
    public Position: string,
    public CompanyName: string,
    public SUSNumber: string,
    public RG: string,

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.Date = Date;
    this.DoctorName = DoctorName;
    this.Reason = Reason;
    this.Position = Position;
    this.CompanyName = CompanyName;
    this.SUSNumber = SUSNumber;
    this.RG = RG;
  }
}
