import { surgeryTable } from "../../infrastructure/database/schemas/surgeryTable";
import { SurgeryMapper } from "../../shared/utils/mapper/SurgeryMapper";
import { Surgery } from "../entities/Surgery";
import { SurgeryRepository } from "../repositories/SurgeryRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class SurgeryRepositoryImplementation
  extends BaseRepositoryImplementation<Surgery>
  implements SurgeryRepository
{
  constructor() {
    super(surgeryTable, {
      fromEntityToDB: SurgeryMapper.fromSurgeryToDB,
      fromDBToEntity: SurgeryMapper.fromDBtoSurgery,
    });
  }
}
