import { NurseRepository } from "../repositories/NurseRepository";
import { Nurse } from "../entities/Nurse";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class NurseServices {
  constructor(
    private NurseRepository: NurseRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllNurses(): Promise<Nurse[]> {
    const cacheKey = "getAllNurses";

    const cachedNurses = await this.CacheService.get(cacheKey);

    if (cachedNurses) {
      try {
        const parsedData = JSON.parse(cachedNurses.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Nurse[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const nurses = await this.NurseRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(nurses));

    return nurses;
  }

  async createNurse(nurseDTO: any, tx?: any): Promise<Nurse> {
    const createdNurse = await this.NurseRepository.create(nurseDTO, tx);
    await this.CacheService.delete("getAllNurses");

    return createdNurse;
  }

  async deleteNurse(id: number): Promise<void> {
    await this.NurseRepository.delete(id);
    await this.CacheService.delete("getAllNurses");
  }

  async updateNurse(nurse: Nurse): Promise<Nurse> {
    const updatedNurse = await this.NurseRepository.update(nurse);
    await this.CacheService.delete("getAllNurses");

    return updatedNurse;
  }

  async getNurseById(id: number): Promise<Nurse | null> {
    return await this.NurseRepository.getById(id);
  }

  async getNurseByLicenseNumber(licenseNumber: string) {
    return await this.NurseRepository.getNurseByLicenseNumber(licenseNumber);
  }
}
