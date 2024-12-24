import { MedicinesTypeEnum } from "../../shared/utils/enum/MedicinesTypeEnum";
import { BaseEntity } from "./BaseEntity";

export class Medicines extends BaseEntity {
  constructor(
    public Id: number,
    public Name: string,
    public Description: string,
    public type: MedicinesTypeEnum,
    public manufacturer: string,
    public batch_number: string,
    public quantity_in_stock: number,
    public price_per_unit: number,
    public expiry_date: string,
    public storage_instructions: string,

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);
    this.Id = Id;
    this.Name = Name;
    this.Description = Description;
    this.type = type;
    this.manufacturer = manufacturer;
    this.batch_number = batch_number;
    this.quantity_in_stock = quantity_in_stock;
    this.price_per_unit = price_per_unit;
    this.expiry_date = expiry_date;
    this.storage_instructions = storage_instructions;
  }
}
