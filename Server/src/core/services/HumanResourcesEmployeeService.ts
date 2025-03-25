import { HumanResourcesEmployeeRepository } from "../repositories/HumanResourcesEmployeeRepository";
import { HumanResourcesEmployee } from "../entities/HumanResourcesEmployee";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";
import { UserRepository } from "../repositories/UserRepository";
import { PgTransaction } from "drizzle-orm/pg-core";

export class HumanResourcesEmployeeService {
  constructor(
    private humanResourcesEmployeeRepository: HumanResourcesEmployeeRepository,
    private UserRepository: UserRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllHumanResourcesEmployees(): Promise<HumanResourcesEmployee[]> {
    const cacheKey = "getAllHumanResourcesEmployees";
    const cachedEmployees = await this.CacheService.get(cacheKey);

    if (cachedEmployees) {
      try {
        const parsedData = JSON.parse(cachedEmployees.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as HumanResourcesEmployee[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const employees = await this.humanResourcesEmployeeRepository.getAll();

    const employeesWithUserInfo = await Promise.all(
      employees.map(async (employee) => {
        const userInfo = await this.UserRepository.getById(employee.UserId);
        if (userInfo) {
          const { Password, ...userWithoutPassword } = userInfo;
          return { ...employee, UserInfo: userWithoutPassword };
        }
        return employee;
      })
    );
  
    await this.CacheService.set(cacheKey, JSON.stringify(employeesWithUserInfo));
    return employeesWithUserInfo;
  }

  async createHumanResourcesEmployee(employee: HumanResourcesEmployee, tx: PgTransaction<any, any, any> | null): Promise<HumanResourcesEmployee> {
    const createdEmployee = await this.humanResourcesEmployeeRepository.create(employee, tx);
    await this.CacheService.delete("getAllHumanResourcesEmployees");
    return createdEmployee;
  }

  async getHumanResourcesEmployeeById(id: number): Promise<HumanResourcesEmployee | null> {
    const cacheKey = `getHumanResourcesEmployeeById:${id}`;
    const cachedEmployee = await this.CacheService.get(cacheKey);

    if (cachedEmployee) {
      try {
        const parsedData = JSON.parse(cachedEmployee.toString());
        return parsedData as HumanResourcesEmployee;
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const employee = await this.humanResourcesEmployeeRepository.getById(id);
    if (employee) {
      await this.CacheService.set(cacheKey, JSON.stringify(employee));
    }
    return employee;
  }

  async updateHumanResourcesEmployee(employee: HumanResourcesEmployee): Promise<HumanResourcesEmployee> {
    const updatedEmployee = await this.humanResourcesEmployeeRepository.update(employee);
    await this.CacheService.delete("getAllHumanResourcesEmployees");
    await this.CacheService.delete(`getHumanResourcesEmployeeById:${employee.Id}`);
    return updatedEmployee;
  }

  async deleteHumanResourcesEmployee(id: number): Promise<void> {
    await this.humanResourcesEmployeeRepository.delete(id);
    await this.CacheService.delete("getAllHumanResourcesEmployees");
    await this.CacheService.delete(`getHumanResourcesEmployeeById:${id}`);
  }
}
