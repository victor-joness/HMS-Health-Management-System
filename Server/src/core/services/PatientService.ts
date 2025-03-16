import { PatientRepository } from "../repositories/PatientRepository";
import { Patient } from "../entities/Patient";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class PatientService {
  constructor(
    private patientRepository: PatientRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllPatients(): Promise<Patient[]> {
    const cacheKey = "getAllPatients";
    const cachedPatients = await this.CacheService.get(cacheKey);

    if (cachedPatients) {
      try {
        const parsedData = JSON.parse(cachedPatients.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Patient[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const patients = await this.patientRepository.getAll();
    await this.CacheService.set(cacheKey, JSON.stringify(patients));
    return patients;
  }

  async createPatient(patient: Patient): Promise<Patient> {
    const createdPatient = await this.patientRepository.create(patient);
    await this.CacheService.delete("getAllPatients");
    return createdPatient;
  }

  async getPatientById(id: number): Promise<Patient | null> {
    return this.patientRepository.getById(id);
  }

  async updatePatient(patient: Patient): Promise<Patient> {
    const updatedPatient = await this.patientRepository.update(patient);
    await this.CacheService.delete("getAllPatients");
    return updatedPatient;
  }

  async deletePatient(id: number): Promise<void> {
    await this.patientRepository.delete(id);
    await this.CacheService.delete("getAllPatients");
  }
}
