import { Bed } from "../entities/Bed";
import { BedRepository } from "../repositories/BedRepository";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class BedService {
  constructor(
    private bedRepository: BedRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllBeds(): Promise<Bed[]> {
    const cacheKey = "getAllBeds";
    const cachedBeds = await this.CacheService.get(cacheKey);

    if (cachedBeds) {
      try {
        const parsedData = JSON.parse(cachedBeds.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Bed[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const beds = await this.bedRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(beds));
    return beds;
  }

  async createBed(bed: Bed): Promise<Bed> {
    const createdBed = await this.bedRepository.create(bed);
    await this.CacheService.delete("getAllBeds");
    return createdBed;
  }

  async getBedById(id: number): Promise<Bed | null> {
    const cacheKey = `getBedById:${id}`;
    const cachedBed = await this.CacheService.get(cacheKey);

    if (cachedBed) {
      try {
        const parsedData = JSON.parse(cachedBed.toString());
        return parsedData as Bed;
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const bed = await this.bedRepository.getById(id);
    if (bed) {
      await this.CacheService.set(cacheKey, JSON.stringify(bed));
    }
    return bed;
  }

  async updateBed(bed: Bed): Promise<Bed> {
    const updatedBed = await this.bedRepository.update(bed);
    await this.CacheService.delete("getAllBeds");
    await this.CacheService.delete(`getBedById:${bed.Id}`);
    return updatedBed;
  }

  async deleteBed(id: number): Promise<void> {
    await this.bedRepository.delete(id);
    await this.CacheService.delete("getAllBeds");
    await this.CacheService.delete(`getBedById:${id}`);
  }
}
