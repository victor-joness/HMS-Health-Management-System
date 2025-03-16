import { ReceptionistRepository } from "../repositories/ReceptionistRepository";
import { Receptionist } from "../entities/Receptionist";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class ReceptionistService {
  constructor(
    private receptionistRepository: ReceptionistRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllReceptionists(): Promise<Receptionist[]> {
    const cacheKey = "getAllReceptionists";
    const cachedReceptionists = await this.CacheService.get(cacheKey);

    if (cachedReceptionists) {
      try {
        const parsedData = JSON.parse(cachedReceptionists.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Receptionist[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const receptionists = await this.receptionistRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(receptionists));

    return receptionists;
  }

  async createReceptionist(receptionist: Receptionist): Promise<Receptionist> {
    const createdReceptionist = await this.receptionistRepository.create(receptionist);
    await this.CacheService.delete("getAllReceptionists");
    return createdReceptionist;
  }

  async getReceptionistById(id: number): Promise<Receptionist | null> {
    return this.receptionistRepository.getById(id);
  }

  async updateReceptionist(receptionist: Receptionist): Promise<Receptionist> {
    const updatedReceptionist = await this.receptionistRepository.update(receptionist);
    await this.CacheService.delete("getAllReceptionists");
    return updatedReceptionist;
  }

  async deleteReceptionist(id: number): Promise<void> {
    await this.receptionistRepository.delete(id);
    await this.CacheService.delete("getAllReceptionists");
  }
}
