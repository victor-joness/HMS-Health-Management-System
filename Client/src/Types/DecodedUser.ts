import { JwtPayload } from "jwt-decode";
import { UserRole } from "../Utils/Enum";

export interface DecodedUser extends JwtPayload {
  name: string;
  email: string;
  id: string;
  role: UserRole;
  img: string;
  age: string;
  PhoneNumber: string;
  PhoneEmergency: string;
}
