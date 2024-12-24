import { BaseEntity } from "./BaseEntity";

export class PatientsAssigned extends BaseEntity {
  constructor(
    public Id: number,
    public DoctorId: number,
    public NurseId: number,
    public PatientId: number,
    public PatientName: string,
    public RoomNumber: string,
    public DeletionDate: string | null,
    public ModifiedDate: string | null,
    public CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.DoctorId = DoctorId;
    this.NurseId = NurseId;
    this.PatientId = PatientId;
    this.PatientName = PatientName;
    this.RoomNumber = RoomNumber;
  }
}
