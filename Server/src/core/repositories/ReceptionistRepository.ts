import { Receptionist } from "../entities/Receptionist";
import { BaseRepository } from "./BaseRepository";

export interface ReceptionistRepository extends BaseRepository<Receptionist> {
    getByEmail(email: string): Promise<Receptionist | null>;
}
