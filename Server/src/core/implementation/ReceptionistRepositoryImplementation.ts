import { ReceptionistRepository } from "../repositories/ReceptionistRepository";
import { Receptionist } from "../entities/Receptionist";
import { receptionistsTable } from "../../infrastructure/database/schemas/receptionistTable";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";
import { ReceptionistMapper } from "../../shared/utils/mapper/ReceptionistMapper";
import { db } from "../../infrastructure/database/db";
import { sql } from "drizzle-orm";

export class ReceptionistRepositoryImplementation
  extends BaseRepositoryImplementation<Receptionist>
  implements ReceptionistRepository
{
  constructor() {
    super(receptionistsTable, {
      fromEntityToDB: ReceptionistMapper.fromReceptionistToDB,
      fromDBToEntity: ReceptionistMapper.fromDBtoReceptionist,
    });
  }

  async getByEmail(email: string): Promise<Receptionist | null> {
      const result = await db
        .select()
        .from(receptionistsTable)
        .where(sql`email = ${email} AND deletion_date IS NULL`)
        .limit(1);
  
      return result.length > 0 ? ReceptionistMapper.fromDBtoReceptionist(result[0]) : null;
    }
}