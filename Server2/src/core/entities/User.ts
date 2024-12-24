import { Gender } from "../../shared/utils/enum/GenderEnum";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { BaseEntity } from "./BaseEntity";

export class User extends BaseEntity {
  constructor(
    public Id: number,
    public Name: string,
    public Email: string,
    public Password: string,
    public Role: UserRoleEnum,
    public Img?: number,
    public Gender?: Gender,
    public Age?: string | null,
    public PhoneNumber?: string | null,
    public PhoneEmergency?: string | null,

    DeletionDate?: string | null,
    ModifiedDate?: string | null,
    CreationDate?: string
  ) {
    super(
      (DeletionDate = null),
      (ModifiedDate = null),
      (CreationDate = new Date().toISOString())
    );

    this.Id = Id;
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Role = Role;
    this.Img = Img;
    this.Gender = Gender;
    this.Age = Age;
    this.PhoneNumber = PhoneNumber;
    this.PhoneEmergency = PhoneEmergency;
  }
}
