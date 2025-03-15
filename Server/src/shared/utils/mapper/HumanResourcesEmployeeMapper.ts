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
      employee.FullName,
      employee.Email,
      employee.PhoneNumber,
      employee.Address,
      employee.City,
      employee.State,
      employee.ZipCode,
      employee.Gender,
      employee.Birthday,
      employee.JobTitle,
      employee.Department,
      employee.WorkingHours,
      employee.IsActive,
      employee.Notes,
      employee.DeletionDate,
      employee.ModifiedDate,
      employee.CreationDate
    );
  }
}
