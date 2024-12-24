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
}
