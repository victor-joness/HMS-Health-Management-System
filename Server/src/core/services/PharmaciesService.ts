import { Pharmacies } from "../entities/Pharmacies";
import { PharmaciesRepository } from "../repositories/PharmaciesRepository";

export class PharmaciesServices {
  constructor(private PharmaciesRepository: PharmaciesRepository) {}

  async getAllPharmacies() {
    return await this.PharmaciesRepository.getAll();
  }

  async createPharmacy(pharmacy: Pharmacies) {
    return await this.PharmaciesRepository.create(pharmacy);
  }

  async deletePharmacy(id: number) {
    return await this.PharmaciesRepository.delete(id);
  }

  async updatePharmacy(pharmacy: any, updatedPharmacy: any) {
    return await this.PharmaciesRepository.update(pharmacy);
  }

  async getPharmacyById(id: number) {
    return await this.PharmaciesRepository.getById(id);
  }

  async getPharmacyByCnpj(cnpj: string) {
    return await this.PharmaciesRepository.getPharmacyByCnpj(cnpj);
  }
}
