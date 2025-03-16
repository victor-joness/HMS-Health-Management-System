import { HumanResourcesEmployeeRepository } from "../repositories/HumanResourcesEmployeeRepository";
import { HumanResourcesEmployee } from "../entities/HumanResourcesEmployee";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";

export class HumanResourcesEmployeeService {
  constructor(
    private humanResourcesEmployeeRepository: HumanResourcesEmployeeRepository,
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
    await this.CacheService.set(cacheKey, JSON.stringify(employees));
    return employees;
  }

  async createHumanResourcesEmployee(employee: HumanResourcesEmployee): Promise<HumanResourcesEmployee> {
    const createdEmployee = await this.humanResourcesEmployeeRepository.create(employee);
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
