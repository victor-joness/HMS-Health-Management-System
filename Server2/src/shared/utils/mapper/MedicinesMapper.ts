import { Medicines } from "../../../core/entities/Medicines";

export class MedicinesMapper {
  public static fromMedicinesToDB(Medicines: Medicines): Medicines {
    return Medicines;
  }

  public static fromDBtoMedicines(Medicines: any): Medicines {
    return new Medicines(
      Medicines.Id,
      Medicines.Name,
      Medicines.Description,
      Medicines.type,
      Medicines.manufacturer,
      Medicines.batch_number,
      Medicines.quantity_in_stock,
      Medicines.price_per_unit,
      Medicines.expiry_date,
      Medicines.storage_instructions
    );
  }
}
