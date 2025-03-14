import { NurseRepository } from "../repositories/NurseRepository";
import { Nurse } from "../entities/Nurse";

export class NurseServices {
  constructor(private NurseRepository: NurseRepository) {}

  async getAllNurses(): Promise<Nurse[]> {
    return await this.NurseRepository.getAll();
  }

  async createNurse(nurseDTO: any, tx?: any): Promise<Nurse> {
    return await this.NurseRepository.create(nurseDTO, tx);
  }

  async deleteNurse(id: number): Promise<void> {
    return await this.NurseRepository.delete(id);
  }

  async updateNurse(nurse: Nurse): Promise<Nurse> {
    return await this.NurseRepository.update(nurse);
  }

  async getNurseById(id: number): Promise<Nurse | null> {
    return await this.NurseRepository.getById(id);
  }

  async getNurseByLicenseNumber(licenseNumber: string) {
    return await this.NurseRepository.getNurseByLicenseNumber(licenseNumber);
  }
}
