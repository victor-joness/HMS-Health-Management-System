import { Utilities } from "../../../core/entities/Utility";

export class UtilitiesMapper {
  public static fromUtilitiesToDB(utilities: Utilities): Utilities {
    return utilities;
  }

  public static fromDBtoUtilities(utilites: any): Utilities {
    return new Utilities(
      utilites.Id,
      utilites.Name,
      utilites.Type,
      utilites.Status,
      utilites.Location,
      utilites.Quantity,
      utilites.DeletionDate,
      utilites.ModifiedDate,
      utilites.CreationDate,
      utilites.lastMaintenance,
      utilites.nextMaintenance,
      utilites.observations
    );
  }
}
