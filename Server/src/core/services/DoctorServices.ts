import { DoctorRepository } from "../repositories/DoctorRepository";
import { Doctor } from "../entities/Doctor";
import { PgTransaction } from "drizzle-orm/pg-core";
import { UserRepository } from "../repositories/UserRepository";

export class DoctorServices {
  constructor(
    private DoctorRepository: DoctorRepository,
    private UserRepository: UserRepository
  ) {}

  async getAllDoctors(): Promise<Doctor[]> {
    const doctors = await this.DoctorRepository.getAll();

    const doctorsWithUserInfo = await Promise.all(
        doctors.map(async (doctor) => {
            const userInfo = await this.UserRepository.getById(doctor.UserId);

            if (userInfo) {
                const { Password, ...userWithoutPassword } = userInfo;
                return { ...doctor, userInfo: userWithoutPassword };
            }

            return doctor;
        })
    );
    
    return doctorsWithUserInfo;
  }
  
  async createDoctor(doctor: Doctor, tx: PgTransaction<any, any, any> | null): Promise<Doctor> {
    return await this.DoctorRepository.create(doctor, tx);
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

  async getDoctorByMedicalLicense(medical_license_number: string): Promise<Doctor | null> {
    return await this.DoctorRepository.getDoctorByLicenseNumber(medical_license_number);
  }
}
