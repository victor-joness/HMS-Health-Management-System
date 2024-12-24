import { DonationRecord } from "../entities/DonationRecord";
import { DonationRecordRepository } from "../repositories/DonationRecordRepository";

export class DonationRecordService {
  constructor(private donationRecordRepository: DonationRecordRepository) {}

  async getAllDonationRecords(): Promise<DonationRecord[]> {
    return await this.donationRecordRepository.getAll();
  }

  async createDonationRecord(
    donationRecord: DonationRecord
  ): Promise<DonationRecord> {
    return await this.donationRecordRepository.create(donationRecord);
  }

  async deleteDonationRecord(id: number): Promise<void> {
    return await this.donationRecordRepository.delete(id);
  }

  async updateDonationRecord(
    donationRecord: DonationRecord
  ): Promise<DonationRecord> {
    return await this.donationRecordRepository.update(donationRecord);
  }

  async getDonationRecordById(id: number): Promise<DonationRecord | null> {
    return await this.donationRecordRepository.getById(id);
  }
}
