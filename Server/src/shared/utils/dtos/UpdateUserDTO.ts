import { UserRoleEnum } from "../enum/UserRoleEnum";

export interface UpdateUserDTO {
    Id: number;
    Name: string;
    Email?: string;
    Role?: UserRoleEnum;
    Img?: string;
    Age?: string;
    PhoneNumber?: string;
    PhoneEmergency?: string;
}