import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/database/db";
import { nursesTable } from "../../infrastructure/database/schemas/nursesTable";
import { NurseMapper } from "../../shared/utils/mapper/NurseMapper";
import { Nurse } from "../entities/Nurse";
import { NurseRepository } from "../repositories/NurseRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class NurseRepositoryImplementation
  extends BaseRepositoryImplementation<Nurse>
  implements NurseRepository
{
  constructor() {
    super(nursesTable, {
      fromEntityToDB: NurseMapper.fromNurseToDB,
      fromDBToEntity: NurseMapper.fromDBtoNurse,
    });
  }
  async getNurseByLicenseNumber(licenseNumber: string): Promise<Nurse | null> {
    const result = await db
      .select()
      .from(nursesTable)
      .where(sql`license_number = ${licenseNumber}`)
      .limit(1)
  
    return result.length > 0 ? this.mapper.fromDBToEntity(result[0]) : null;
  }
}
