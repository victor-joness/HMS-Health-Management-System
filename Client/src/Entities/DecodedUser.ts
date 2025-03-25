import { JwtPayload } from "jwt-decode";
import { UserRoleEnum } from "../utils/Enum";
import { HospitalInfo } from "./HospitalInfo";

export interface DecodedUser extends JwtPayload {
  Id: number;
  Name: string;
  Email: string;
  Role: UserRoleEnum;
  Img: string;
  Age: string;
  PhoneNumber: string;
  PhoneEmergency: string;
  HospitalInfo: HospitalInfo,
}
