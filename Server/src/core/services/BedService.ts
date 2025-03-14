import { Bed } from "../entities/Bed";
import { BedRepository } from "../repositories/BedRepository";

export class BedService {
  constructor(private BedRepository: BedRepository) {}

  async getAllBeds(): Promise<Bed[]> {
    return this.BedRepository.getAll();
  }

  async createBed(bed: Bed): Promise<Bed> {
    return this.BedRepository.create(bed);
  }

  async updateBed(bed: Bed): Promise<Bed> {
    return this.BedRepository.update(bed);
  }

  async deleteBed(id: number): Promise<void> {
    return this.BedRepository.delete(id);
  }

  async getBedById(id: number): Promise<Bed | null> {
    return this.BedRepository.getById(id);
  }
}
