import { HospitalsRepository } from "../repositories/HospitalsRepository";

export class HospitalsServices {
  constructor(private hospitalsRepository: HospitalsRepository) {}

  async getAllHospitals() {
    return await this.hospitalsRepository.getAll();
  }

  async createHospital(hospital: any) {
    return await this.hospitalsRepository.create(hospital);
  }

  async deleteHospital(id: number) {
    return await this.hospitalsRepository.delete(id);
  }

  async updateHospital(hospital: any) {
    return await this.hospitalsRepository.update(hospital);
  }

  async getHospitalById(id: number) {
    return await this.hospitalsRepository.getById(id);
  }
}
