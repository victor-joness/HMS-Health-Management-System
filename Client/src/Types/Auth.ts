import { UserRole } from "../Utils/Enum";

export interface Auth {
    token: string | null;
    name: string;
    email: string;
    id: string;
    role: UserRole | null;
    Img: string;
    Age: string;
    PhoneNumber: string;
    PhoneEmergency: string;
    registerStatus: string;
    registerError: string;
    loginStatus: string;
    loginError: string;
    userLoaded: boolean;
}

export { UserRole };
