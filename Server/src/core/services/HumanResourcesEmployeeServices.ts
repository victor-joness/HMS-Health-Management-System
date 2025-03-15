import { HumanResourcesEmployeeRepository } from "../repositories/HumanResourcesEmployeeRepository";
import { HumanResourcesEmployee } from "../entities/HumanResourcesEmployee";

export class HumanResourcesEmployeeService {
  constructor(private humanResourcesEmployeeRepository: HumanResourcesEmployeeRepository) {}

  async getAllHumanResourcesEmployees(): Promise<HumanResourcesEmployee[]> {
    return this.humanResourcesEmployeeRepository.getAll();
  }

  async createHumanResourcesEmployee(employee: HumanResourcesEmployee): Promise<HumanResourcesEmployee> {
    return this.humanResourcesEmployeeRepository.create(employee);
  }

  async getHumanResourcesEmployeeById(id: number): Promise<HumanResourcesEmployee | null> {
    return this.humanResourcesEmployeeRepository.getById(id);
  }

  async updateHumanResourcesEmployee(employee: HumanResourcesEmployee): Promise<HumanResourcesEmployee> {
    return this.humanResourcesEmployeeRepository.update(employee);
  }

  async deleteHumanResourcesEmployee(id: number): Promise<void> {
    return this.humanResourcesEmployeeRepository.delete(id);
  }
}
