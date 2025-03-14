import { pharmaciesTable } from "../../infrastructure/database/schemas/pharmaciesTable";
import { PharmaciesMapper } from "../../shared/utils/mapper/PharmaciesMapper";
import { Pharmacies } from "../entities/Pharmacies";
import { PharmaciesRepository } from "../repositories/PharmaciesRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class pharmaciesRepositoryImplementation
  extends BaseRepositoryImplementation<Pharmacies>
  implements PharmaciesRepository
{
  constructor() {
    super(pharmaciesTable, {
      fromEntityToDB: PharmaciesMapper.fromPharmaciesToDB,
      fromDBToEntity: PharmaciesMapper.fromDBtoPharmacies,
    });
  }
  getPharmacyByCnpj(cnpj: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  addMedicineToPharmacy(pharmacyId: string, medicineId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeMedicineFromPharmacy(pharmacyId: string, medicineId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPharmacyMedicines(pharmacyId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getPharmacyMedicine(pharmacyId: string, medicineId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getPharmacyMedicineStock(pharmacyId: string, medicineId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updatePharmacyMedicineStock(pharmacyId: string, medicineId: string, quantity: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPharmacyMedicineStocks(pharmacyId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getPharmacyMedicineStocksByMedicine(pharmacyId: string, medicineId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getPharmacyMedicineStocksByStock(pharmacyId: string, stock: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getPharmacyMedicineStocksByStockRange(pharmacyId: string, stockMin: number, stockMax: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
