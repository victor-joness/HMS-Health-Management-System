import { PatientRepository } from "../repositories/PatientRepository";
import { Patient } from "../entities/Patient";

export class PatientService {
    constructor (private patientRepository: PatientRepository) {}

    async getAllPatients(): Promise<Patient[]> {
        return this.patientRepository.getAll();
    }

    async createPatient(patient: Patient): Promise<Patient> {
        return this.patientRepository.create(patient);
    }

    async getPatientById(id: number): Promise<Patient | null> {
        return this.patientRepository.getById(id);
    }

    async updatePatient(patient: Patient): Promise<Patient> {
        return this.patientRepository.update(patient);
    }

    async deletePatient(id: number): Promise<void> {
        return this.patientRepository.delete(id);
    }
}