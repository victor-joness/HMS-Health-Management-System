import { DonationRecord } from "../entities/DonationRecord";
import { BaseRepository } from "./BaseRepository";

export interface DonationRecordRepository
  extends BaseRepository<DonationRecord> {}
