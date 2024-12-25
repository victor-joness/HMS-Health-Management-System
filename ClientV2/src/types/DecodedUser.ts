import { JwtPayload } from "jwt-decode";
import { UserRole } from "../utils/Enum";

export interface DecodedUser extends JwtPayload {
  Id: number;
  Name: string;
  Email: string;
  Role: UserRole;
  Img: string;
  Age: string;
  PhoneNumber: string;
  PhoneEmergency: string;
}
