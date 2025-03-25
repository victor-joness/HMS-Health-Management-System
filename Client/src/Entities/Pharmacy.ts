import { Medicines } from "./Medicines";

export interface Pharmacy{
    Id: number | null,
    Name: string,
    Address: string,
    Phone: string,
    Email: string,
    Cnpj: string,
    OpeningHours: string,
    Medicines: Medicines[],
    IsActive: boolean,
    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
}