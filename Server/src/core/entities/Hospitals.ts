import { BaseEntity } from "./BaseEntity";

export class Hospitals extends BaseEntity {
  constructor(
    public Id: number,
    public Name: string,
    public Address: string,
    public City: string,
    public State: string,
    public PostalCode: string,
    public Country: string,
    public PhoneNumber: string,
    public Email: string,
    public Website: string,
    public IsActive: boolean,

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.Name = Name;
    this.Address = Address;
    this.City = City;
    this.State = State;
    this.PostalCode = PostalCode;
    this.Country = Country;
    this.PhoneNumber = PhoneNumber;
    this.Email = Email;
    this.Website = Website;
    this.IsActive = IsActive;
  }
}
