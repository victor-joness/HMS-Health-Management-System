import { Utilities } from "../entities/Utility";
import { UtilitiesRepository } from "../repositories/UtilitiesRepository";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class UtilitiesService {
  constructor(
    private utilitiesRepository: UtilitiesRepository,
    private CacheService: CacheInterface
  ) {}

  async checkHealth() {
    return { status: "OK", message: "Service is running" };
  }

  async getStats() {
    return {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
    };
  }

  async getAllUtilities() {
    const cacheKey = "getAllUtilities";
    const cachedUtilities = await this.CacheService.get(cacheKey);

    if (cachedUtilities) {
      try {
        const parsedData = JSON.parse(cachedUtilities.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Utilities[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const utilities = await this.utilitiesRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(utilities));
    return utilities;
  }

  async createUtility(utilities: Utilities) {
    const createdUtility = await this.utilitiesRepository.create(utilities);
    await this.CacheService.delete("getAllUtilities");
    return createdUtility;
  }

  async deleteUtility(id: number) {
    await this.utilitiesRepository.delete(id);
    await this.CacheService.delete("getAllUtilities");
  }

  async updateUtility(utilities: Utilities) {
    const updatedUtility = await this.utilitiesRepository.update(utilities);
    await this.CacheService.delete("getAllUtilities");
    return updatedUtility;
  }

  async getUtilityById(id: number) {
    return await this.utilitiesRepository.getById(id);
  }

  async getUtilitiesByType(type: string) {
    return await this.utilitiesRepository.getByType(type);
  }
}
