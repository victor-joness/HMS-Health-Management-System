import { HumanResourcesEmployeeRepository } from "../repositories/HumanResourcesEmployeeRepository";
import { HumanResourcesEmployee } from "../entities/HumanResourcesEmployee";
import { humanResourcesEmployeeTable } from "../../infrastructure/database/schemas/HumanResourcesEmployeeTable";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";
import { HumanResourcesEmployeeMapper } from "../../shared/utils/mapper/HumanResourcesEmployeeMapper";

export class HumanResourcesEmployeeRepositoryImplementation
  extends BaseRepositoryImplementation<HumanResourcesEmployee>
  implements HumanResourcesEmployeeRepository
{
  constructor() {
    super(humanResourcesEmployeeTable, {
      fromEntityToDB: HumanResourcesEmployeeMapper.fromHumanResourcesEmployeeToDB,
      fromDBToEntity: HumanResourcesEmployeeMapper.fromDBtoHumanResourcesEmployee,
    });
  }
}
