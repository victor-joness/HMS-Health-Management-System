import { BaseEntity } from "./BaseEntity";
import { Medicines } from "./Medicines";

export class Pharmacies extends BaseEntity {
  constructor(
    public Id: string,
    public Name: string,
    public Address: string,
    public Phone: string,
    public Email: string,
    public Cnpj: string,
    public OpeningHours: string,
    public Medicines: Medicines[],
    public IsActive: boolean,

    deletionDate: string | null,
    modifiedDate: string | null,
    creationDate: string
  ) {
    super(deletionDate, modifiedDate, creationDate);

    this.Id = Id;
    this.Name = Name;
    this.Address = Address;
    this.Phone = Phone;
    this.Email = Email;
    this.OpeningHours = OpeningHours;
    this.Medicines = Medicines;
    this.IsActive = IsActive;
  }
}