import { FinanceEmployee } from "../../../core/entities/FinanceEmployee";

export class FinanceEmployeeMapper {
  public static fromFinanceEmployeeToDB(financeEmployee: FinanceEmployee): FinanceEmployee {
    return financeEmployee;
  }

  public static fromDBtoFinanceEmployee(financeEmployee: any): FinanceEmployee {
    return new FinanceEmployee(
      financeEmployee.Id,
      financeEmployee.UserId,
      financeEmployee.Address,
      financeEmployee.WorkScheduleDetails,
      financeEmployee.Notes,
      financeEmployee.DeletionDate,
      financeEmployee.ModifiedDate,
      financeEmployee.CreationDate
    );
  }
}
