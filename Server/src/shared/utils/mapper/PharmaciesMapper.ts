import { Pharmacies } from "../../../core/entities/Pharmacies";

export class PharmaciesMapper {
  public static fromPharmaciesToDB(pharmacies: Pharmacies): Pharmacies {
    return pharmacies;
  }

  public static fromDBtoPharmacies(pharmacies: any): Pharmacies {
    return new Pharmacies(
      pharmacies.Id,
      pharmacies.UserId,
      pharmacies.PharmacyName,
      pharmacies.PharmacyAddress,
      pharmacies.PharmacyPhoneNumber,
      pharmacies.PharmacyEmail,
      pharmacies.PharmacyCnpj,
      pharmacies.PharmacyHours,
      pharmacies.IsActive,
      pharmacies.DeletionDate,
      pharmacies.ModifiedDate,
      pharmacies.CreationDate
    );
  }
}
