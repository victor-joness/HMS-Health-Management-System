import { Donor } from "../entities/Donor";
import { DonorRepository } from "../repositories/DonorRepository";

export class DonorService {
  constructor(private DonorRepository: DonorRepository) {}

  async getAllDonors(): Promise<Donor[]> {
    return this.DonorRepository.getAll();
  }

  async createDonor(donor: Donor): Promise<Donor> {
    return this.DonorRepository.create(donor);
  }

  async getDonorById(id: number): Promise<Donor | null> {
    return this.DonorRepository.getById(id);
  }

  async updateDonor(donor: Donor): Promise<Donor> {
    return this.DonorRepository.update(donor);
  }

  async deleteDonor(id: number): Promise<void> {
    return this.DonorRepository.delete(id);
  }
}
