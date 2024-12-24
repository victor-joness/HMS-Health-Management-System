import { DoctorRepository } from "../repositories/DoctorRepository";
import { Doctor } from "../entities/Doctor";

export class DoctorServices {
  constructor(private DoctorRepository: DoctorRepository) {}

  async getAllDoctors(): Promise<Doctor[]> {
    return await this.DoctorRepository.getAll();
  }

  async createDoctor(doctor: Doctor): Promise<Doctor> {
    return await this.DoctorRepository.create(doctor);
  }

  async deleteDoctor(id: number): Promise<void> {
    return await this.DoctorRepository.delete(id);
  }

  async updateDoctor(doctor: Doctor): Promise<Doctor> {
    return await this.DoctorRepository.update(doctor);
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return await this.DoctorRepository.getById(id);
  }
}
