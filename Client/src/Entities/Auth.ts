import { UserRoleEnum } from "../utils/Enum";
import { HospitalInfo } from "./HospitalInfo";

export interface Auth {
    Id?: number;
    Token: string | null;
    Name: string;
    Email: string;
    Role: UserRoleEnum;
    Img: string;
    Age: string;
    PhoneNumber: string;
    PhoneEmergency: string;
    HospitalInfo: HospitalInfo;
    RegisterStatus: string;
    RegisterError: string;
    LoginStatus: string;
    LoginError: string;
    UserLoaded: boolean;
}