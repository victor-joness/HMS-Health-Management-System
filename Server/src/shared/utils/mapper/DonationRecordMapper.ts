import { DonationRecord } from "../../../core/entities/DonationRecord";

export class DonationRecordMapper {
  public static fromDonationRecordToDB(
    donationRecord: DonationRecord
  ): DonationRecord {
    return donationRecord;
  }

  public static fromDBtoDonationRecord(donationRecord: any): DonationRecord {
    return new DonationRecord(
      donationRecord.Id,
      donationRecord.DonorId,
      donationRecord.DonationDate,
      donationRecord.QuantityDonated,
      donationRecord.DonationLocation,
      donationRecord.Notes,
      donationRecord.DeletionDate,
      donationRecord.ModifiedDate,
      donationRecord.CreationDate
    );
  }
}
