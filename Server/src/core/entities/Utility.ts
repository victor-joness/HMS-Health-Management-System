import { BaseEntity } from "./BaseEntity";

export class Utilities extends BaseEntity {
  constructor(
    public Id: number,
    public Name: string,
    public Type: string,
    public Status: string,
    public Location: string,
    public Quantity: number,
    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string,
    public lastMaintenance?: Date,
    public nextMaintenance?: Date,
    public observations?: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.Name = Name;
    this.Type = Type;
    this.Status = Status;
    this.Location = Location;
    this.Quantity = Quantity;
    this.lastMaintenance = lastMaintenance;
    this.nextMaintenance = nextMaintenance;
    this.observations = observations;
  }
}
