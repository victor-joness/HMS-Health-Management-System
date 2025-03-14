import { Nurse } from "../entities/Nurse";
import { BaseRepository } from "./BaseRepository";

export interface NurseRepository extends BaseRepository<Nurse> {
    getNurseByLicenseNumber(licenseNumber: string): Promise<Nurse | null>;
}