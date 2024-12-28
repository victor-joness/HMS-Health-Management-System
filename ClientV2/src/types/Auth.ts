import { UserRole } from "../utils/Enum";

export interface Auth {
    Id: number;
    Token: string | null;
    Name: string;
    Email: string;
    Role: UserRole;
    Img: string;
    Age: string;
    PhoneNumber: string;
    PhoneEmergency: string;
    RegisterStatus: string;
    RegisterError: string;
    LoginStatus: string;
    LoginError: string;
    UserLoaded: boolean;
}

export { UserRole };
