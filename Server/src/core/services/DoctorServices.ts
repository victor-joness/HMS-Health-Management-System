import { DoctorRepository } from "../repositories/DoctorRepository";
import { Doctor } from "../entities/Doctor";
import { PgTransaction } from "drizzle-orm/pg-core";
import { UserRepository } from "../repositories/UserRepository";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class DoctorServices {
  constructor(
    private DoctorRepository: DoctorRepository,
    private UserRepository: UserRepository,
    private CacheService: CacheInterface,
  ) {}

  async getAllDoctors(): Promise<Doctor[]> {
    const cacheKey = "getAllDoctors";

    const cachedDoctors = await this.CacheService.get(cacheKey);
    if (cachedDoctors) {
      try {
        const parsedData = JSON.parse(cachedDoctors.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Doctor[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

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
  
    await this.CacheService.set(cacheKey, JSON.stringify(doctorsWithUserInfo));
    
    return doctorsWithUserInfo;
  }
  
  async createDoctor(doctor: Doctor, tx: PgTransaction<any, any, any> | null): Promise<Doctor> {
    const createdDoctor = await this.DoctorRepository.create(doctor, tx);
    this.CacheService.delete("getAllDoctors");

    return createdDoctor;
  }

  async deleteDoctor(id: number): Promise<void> {
    await this.DoctorRepository.delete(id);
    this.CacheService.delete("getAllDoctors");
  }

  async updateDoctor(doctor: Doctor): Promise<Doctor> {
    const updatedDoctor = await this.DoctorRepository.update(doctor);
    this.CacheService.delete("getAllDoctors");

    return updatedDoctor;
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return this.DoctorRepository.getById(id);
  }

  async getDoctorByMedicalLicense(medical_license_number: string): Promise<Doctor | null> {
    return this.DoctorRepository.getDoctorByLicenseNumber(medical_license_number);
  }
}
