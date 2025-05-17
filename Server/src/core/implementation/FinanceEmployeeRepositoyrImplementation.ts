import { financeEmployeeTable } from "../../infrastructure/database/schemas/financeEmployeeTable";
import { FinanceEmployeeMapper } from "../../shared/utils/mapper/FinanceEmployeeMapper";
import { FinanceEmployee } from "../entities/FinanceEmployee";
import { FinanceEmployeeRepository } from "../repositories/FinanceEmployeeRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class FinanceEmployeeRepositoryImplementation
  extends BaseRepositoryImplementation<FinanceEmployee>
  implements FinanceEmployeeRepository
{
  constructor() {
    super(financeEmployeeTable, {
      fromEntityToDB: FinanceEmployeeMapper.fromFinanceEmployeeToDB,
      fromDBToEntity: FinanceEmployeeMapper.fromDBtoFinanceEmployee,
    });
  }
}
