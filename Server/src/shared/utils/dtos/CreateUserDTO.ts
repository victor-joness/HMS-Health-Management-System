import { User } from "../../../core/entities/User";
import { Gender } from "../enum/GenderEnum";
import { UserRoleEnum } from "../enum/UserRoleEnum";

export interface CreateUserDTO extends Omit<User, "Id"> {
  Email: string;
  Password: string;
  Name: string;
  Role: UserRoleEnum;
  Gender?: Gender;
  Img?: string;
  Age?: string;
  PhoneNumber?: string;
  PhoneEmergency?: string;
} 