import { MedicinesTypeEnum } from "@/utils/Enum";

export interface Medicines {
    Id: number | null,
    Name: string,
    Description: string,
    Type: MedicinesTypeEnum,
    Manufacturer: string,
    Batch_number: string,
    Quantity_in_stock: number,
    Price_per_unit: number,
    Expiry_date: string,
    Storage_instructions: string,
    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
}