import { Utilities } from "../entities/Utility";
import { BaseRepository } from "./BaseRepository";

export interface UtilitiesRepository extends BaseRepository<Utilities> {
    getByType(type: string): Promise<Utilities[]>;
}