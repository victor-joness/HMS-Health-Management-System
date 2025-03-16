import { Pharmacies } from "../entities/Pharmacies";
import { PharmaciesRepository } from "../repositories/PharmaciesRepository";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class PharmaciesServices {
  constructor(
    private PharmaciesRepository: PharmaciesRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllPharmacies(): Promise<Pharmacies[]> {
    const cacheKey = "getAllPharmacies";
    const cachedPharmacies = await this.CacheService.get(cacheKey);

    if (cachedPharmacies) {
      try {
        const parsedData = JSON.parse(cachedPharmacies.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Pharmacies[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const pharmacies = await this.PharmaciesRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(pharmacies));

    return pharmacies;
  }

  async createPharmacy(pharmacy: Pharmacies) {
    const createdPharmacy = await this.PharmaciesRepository.create(pharmacy);
    await this.CacheService.delete("getAllPharmacies");
    return createdPharmacy;
  }

  async deletePharmacy(id: number) {
    await this.PharmaciesRepository.delete(id);
    await this.CacheService.delete("getAllPharmacies");
  }

  async updatePharmacy(pharmacy: Pharmacies) {
    const updatedPharmacy = await this.PharmaciesRepository.update(pharmacy);
    await this.CacheService.delete("getAllPharmacies");
    return updatedPharmacy;
  }

  async getPharmacyById(id: number) {
    return await this.PharmaciesRepository.getById(id);
  }

  async getPharmacyByCnpj(cnpj: string) {
    return await this.PharmaciesRepository.getPharmacyByCnpj(cnpj);
  }
}
