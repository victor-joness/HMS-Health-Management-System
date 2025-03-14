import { Bed } from "../../../core/entities/Bed";

export class BedMapper {
  public static fromBedToDB(Bed: Bed): Bed {
    return Bed;
  }

  public static fromDBToBed(Bed: any): Bed {
    return new Bed(
      Bed.Id,
      Bed.Name,
      Bed.Type,
      Bed.IsAvailable,
      Bed.DeletionDate,
      Bed.ModifiedDate,
      Bed.CreationDate
    );
  }
}
