import { HumanResourcesEmployee } from "../../../core/entities/HumanResourcesEmployee";

export class HumanResourcesEmployeeMapper {
  public static fromHumanResourcesEmployeeToDB(
    employee: HumanResourcesEmployee
  ): HumanResourcesEmployee {
    return employee;
  }

  public static fromDBtoHumanResourcesEmployee(
    employee: any
  ): HumanResourcesEmployee {
    return new HumanResourcesEmployee(
      employee.Id,
      employee.UserId,
      employee.Address,
      employee.WorkScheduleDetails,
      employee.Notes,
      employee.DeletionDate,
      employee.ModifiedDate,
      employee.CreationDate
    );
  }
}
