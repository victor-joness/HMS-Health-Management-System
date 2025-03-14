import { Utilities } from "../entities/Utility";
import { UtilitiesRepository } from "../repositories/UtilitiesRepository";

export class UtilitiesService {
  constructor(private utilitiesRepository: UtilitiesRepository) {}

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
    return await this.utilitiesRepository.getAll();
  }

  async createUtility(utilities: Utilities) {
    return await this.utilitiesRepository.create(utilities);
  }

  async deleteUtility(id: number) {
    return await this.utilitiesRepository.delete(id);
  }

  async updateUtility(utilities: Utilities) {
    return await this.utilitiesRepository.update(utilities);
  }

  async getUtilityById(id: number) {
    return await this.utilitiesRepository.getById(id);
  }

  async getUtilitiesByType(type: string) {
    return await this.utilitiesRepository.getByType(type);
  }
}
