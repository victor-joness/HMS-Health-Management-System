import { BaseEntity } from "./BaseEntity";

export class Bed extends BaseEntity {
  constructor(
    public Id: string,
    public Name: string,
    public Type: string,
    public IsAvailable: boolean,
    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.Name = Name;
    this.Type = Type;
    this.IsAvailable = IsAvailable;
  }
}
