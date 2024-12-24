import { Donor } from "../../../core/entities/Donor";

export class DonorMapper {
  public static fromDonorToDB(Donor: Donor): Donor {
    return Donor;
  }

  public static fromDBtoDonor(Donor: any): Donor {
    return new Donor(
      Donor.Id,
      Donor.FullName,
      Donor.Email,
      Donor.PhoneNumber,
      Donor.Address,
      Donor.City,
      Donor.State,
      Donor.ZipCode,
      Donor.BloodType,
      Donor.Gender,
      Donor.Birthday,
      Donor.IdentificationNumber,
      Donor.Details,
      Donor.DonationCount,
      Donor.DonationHistory,
      Donor.LastDonationDate,
      Donor.IsActiveDonor,
      Donor.Notes,
      Donor.CreationDate,
      Donor.ModifiedDate,
      Donor.DeletionDate
    );
  }
}
