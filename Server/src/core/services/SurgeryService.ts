import { Surgery } from "../entities/Surgery";
import { SurgeryRepository } from "../repositories/SurgeryRepository";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class SurgeryService {
  constructor(
    private surgeryRepository: SurgeryRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllSurgeries(): Promise<Surgery[]> {
    const cacheKey = "getAllSurgeries";
    const cachedSurgeries = await this.CacheService.get(cacheKey);

    if (cachedSurgeries) {
      try {
        const parsedData = JSON.parse(cachedSurgeries.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Surgery[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const surgeries = await this.surgeryRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(surgeries));

    return surgeries;
  }

  async createSurgery(surgery: Surgery): Promise<Surgery> {
    const createdSurgery = await this.surgeryRepository.create(surgery);
    await this.CacheService.delete("getAllSurgeries");
    return createdSurgery;
  }

  async getSurgeryById(id: number): Promise<Surgery | null> {
    return this.surgeryRepository.getById(id);
  }

  async updateSurgery(surgery: Surgery): Promise<Surgery> {
    const updatedSurgery = await this.surgeryRepository.update(surgery);
    await this.CacheService.delete("getAllSurgeries");
    return updatedSurgery;
  }

  async deleteSurgery(id: number): Promise<void> {
    await this.surgeryRepository.delete(id);
    await this.CacheService.delete("getAllSurgeries");
  }
}
