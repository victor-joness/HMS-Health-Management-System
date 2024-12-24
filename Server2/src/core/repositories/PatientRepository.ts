import { Patient } from "../entities/Patient";
import { BaseRepository } from "./BaseRepository";

export interface PatientRepository extends BaseRepository<Patient> {}
