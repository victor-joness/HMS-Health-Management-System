import { Donor } from "../entities/Donor";
import { DonorRepository } from "../repositories/DonorRepository";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class DonorService {
  constructor(
    private DonorRepository: DonorRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllDonors(): Promise<Donor[]> {
    const cacheKey = "getAllDonors";
    const cachedDonors = await this.CacheService.get(cacheKey);

    if (cachedDonors) {
      try {
        const parsedData = JSON.parse(cachedDonors.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Donor[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const donors = await this.DonorRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(donors));
    return donors;
  }

  async createDonor(donor: Donor): Promise<Donor> {
    const createdDonor = await this.DonorRepository.create(donor);
    await this.CacheService.delete("getAllDonors");
    return createdDonor;
  }

  async getDonorById(id: number): Promise<Donor | null> {
    return this.DonorRepository.getById(id);
  }

  async updateDonor(donor: Donor): Promise<Donor> {
    const updatedDonor = await this.DonorRepository.update(donor);
    await this.CacheService.delete("getAllDonors");
    return updatedDonor;
  }

  async deleteDonor(id: number): Promise<void> {
    await this.DonorRepository.delete(id);
    await this.CacheService.delete("getAllDonors");
  }
}
