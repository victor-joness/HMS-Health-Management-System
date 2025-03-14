import { Pharmacies } from "../entities/Pharmacies";
import { BaseRepository } from "./BaseRepository";

export interface PharmaciesRepository extends BaseRepository<Pharmacies> {
    addMedicineToPharmacy(pharmacyId: string, medicineId: string): Promise<void>;
    removeMedicineFromPharmacy(pharmacyId: string, medicineId: string): Promise<void>;
    getPharmacyByCnpj(cnpj: string): Promise<any>;
    getPharmacyMedicines(pharmacyId: string): Promise<any>;
    getPharmacyMedicine(pharmacyId: string, medicineId: string): Promise<any>;
    getPharmacyMedicineStock(pharmacyId: string, medicineId: string): Promise<any>;
    updatePharmacyMedicineStock(pharmacyId: string, medicineId: string, quantity: number): Promise<void>;
    getPharmacyMedicineStocks(pharmacyId: string): Promise<any>;
    getPharmacyMedicineStocksByMedicine(pharmacyId: string, medicineId: string): Promise<any>;
    getPharmacyMedicineStocksByStock(pharmacyId: string, stock: number): Promise<any>;
    getPharmacyMedicineStocksByStockRange(pharmacyId: string, stockMin: number, stockMax: number): Promise<any>;
}