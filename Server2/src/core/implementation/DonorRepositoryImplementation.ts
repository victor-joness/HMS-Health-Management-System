import { donorTable } from "../../infrastructure/database/schemas/donorTable";
import { DonorMapper } from "../../shared/utils/mapper/DonorMapper";
import { Donor } from "../entities/Donor";
import { DonorRepository } from "../repositories/DonorRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class DonorRepositoryImplementation
  extends BaseRepositoryImplementation<Donor>
  implements DonorRepository
{
  constructor() {
    super(donorTable, {
      fromEntityToDB: DonorMapper.fromDonorToDB,
      fromDBToEntity: DonorMapper.fromDBtoDonor,
    });
  }
}
