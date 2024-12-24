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
}
