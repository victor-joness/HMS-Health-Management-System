import { utilitiesTable } from "../../infrastructure/database/schemas/utilitiesTable";
import { UtilitiesMapper } from "../../shared/utils/mapper/UtilitiesMapper";
import { Utilities } from "../entities/Utility";
import { UtilitiesRepository } from "../repositories/UtilitiesRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class UtilitiesRepositoryImplementation
  extends BaseRepositoryImplementation<Utilities>
  implements UtilitiesRepository
{
  constructor() {
    super(utilitiesTable, {
      fromEntityToDB: UtilitiesMapper.fromUtilitiesToDB,
      fromDBToEntity: UtilitiesMapper.fromDBtoUtilities,
    });
  }
  getByType(type: string): Promise<Utilities[]> {
    return this.table
      .select("*")
      .where("type", type)
      .then((utilities: any[]) => utilities.map(this.mapper.fromDBToEntity));
  }
}
