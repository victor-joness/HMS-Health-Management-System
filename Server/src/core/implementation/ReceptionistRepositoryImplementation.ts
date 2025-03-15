import { ReceptionistRepository } from "../repositories/ReceptionistRepository";
import { Receptionist } from "../entities/Receptionist";
import { receptionistsTable } from "../../infrastructure/database/schemas/receptionistTable";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";
import { ReceptionistMapper } from "../../shared/utils/mapper/ReceptionistMapper";

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
}