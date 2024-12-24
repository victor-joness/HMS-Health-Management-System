import { Surgery } from "../entities/Surgery";
import { SurgeryRepository } from "../repositories/SurgeryRepository";

export class SurgeryService {
  constructor(private surgeryRepository: SurgeryRepository) {}

  async getAllSurgerys(): Promise<Surgery[]> {
    return this.surgeryRepository.getAll();
  }

  async createSurgery(surgery: Surgery): Promise<Surgery> {
    return this.surgeryRepository.create(surgery);
  }

  async getSurgeryById(id: number): Promise<Surgery | null> {
    return this.surgeryRepository.getById(id);
  }

  async updateSurgery(surgery: Surgery): Promise<Surgery> {
    return this.surgeryRepository.update(surgery);
  }

  async deleteSurgery(id: number): Promise<void> {
    return this.surgeryRepository.delete(id);
  }
}
