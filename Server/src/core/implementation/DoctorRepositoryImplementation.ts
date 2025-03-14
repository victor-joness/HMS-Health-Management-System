import { sql } from "drizzle-orm";
import { db } from "../../infrastructure/database/db";
import { doctorsTable } from "../../infrastructure/database/schemas/doctorsTable";
import { DoctorMapper } from "../../shared/utils/mapper/DoctorMapper";
import { Doctor } from "../entities/Doctor";
import { DoctorRepository } from "../repositories/DoctorRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class DoctorRepositoryImplementation
  extends BaseRepositoryImplementation<Doctor>
  implements DoctorRepository
{
  constructor() {
    super(doctorsTable, {
      fromEntityToDB: DoctorMapper.fromDoctorToDB,
      fromDBToEntity: DoctorMapper.fromDBtoDoctor,
    });
  }
  async getDoctorByLicenseNumber(medical_license_number: string): Promise<Doctor | null> {
    const result = await db
      .select()
      .from(doctorsTable)
      .where(sql`medical_license_number = ${medical_license_number}`)
      .limit(1)
  
    return result.length > 0 ? this.mapper.fromDBToEntity(result[0]) : null;
  }
  
}
