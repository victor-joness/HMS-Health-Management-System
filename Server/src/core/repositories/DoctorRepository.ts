import { Doctor } from "../entities/Doctor";
import { BaseRepository } from "./BaseRepository";

export interface DoctorRepository extends BaseRepository<Doctor> {
    getDoctorByLicenseNumber(medical_license_number: string) : Promise<Doctor | null>;
}
