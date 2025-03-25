import { donorTable } from "../../infrastructure/database/schemas/donorTable";
import { hospitalsTable } from "../../infrastructure/database/schemas/hospitalsTable";
import { HospitalsMapper } from "../../shared/utils/mapper/HospitalsMapper";
import { Hospitals } from "../entities/Hospitals";
import { HospitalsRepository } from "../repositories/HospitalsRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class HospitalsRepositoryImplementation
  extends BaseRepositoryImplementation<Hospitals>
  implements HospitalsRepository
{
  constructor() {
    super(hospitalsTable, {
      fromEntityToDB: HospitalsMapper.fromHospitalsToDB,
      fromDBToEntity: HospitalsMapper.fromDBtoHospitals,
    });
  }
}
