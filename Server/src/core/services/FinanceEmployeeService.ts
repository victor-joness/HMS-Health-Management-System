import { FinanceEmployeeRepository } from "../repositories/FinanceEmployeeRepository";
import { FinanceEmployee } from "../entities/FinanceEmployee";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";
import { UserRepository } from "../repositories/UserRepository";

export class FinanceEmployeeService {
  constructor(
    private FinanceEmployeeRepository: FinanceEmployeeRepository,
    private UserRepository: UserRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllFinanceEmployees(): Promise<FinanceEmployee[]> {
    const cacheKey = "getAllFinanceEmployees";
    const cachedFinanceEmployees = await this.CacheService.get(cacheKey);

    if (cachedFinanceEmployees) {
      try {
        const parsedData = JSON.parse(cachedFinanceEmployees.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as FinanceEmployee[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    }

    const FinanceEmployees = await this.FinanceEmployeeRepository.getAll();

    const FinanceEmployeesWithUserInfo = await Promise.all(
      FinanceEmployees.map(async (FinanceEmployee) => {
        const userInfo = await this.UserRepository.getById(
          FinanceEmployee.UserId
        );
        if (userInfo) {
          const { Password, ...userWithoutPassword } = userInfo;
          return { ...FinanceEmployee, UserInfo: userWithoutPassword };
        }
        return FinanceEmployee;
      })
    );

    await this.CacheService.set(
      cacheKey,
      JSON.stringify(FinanceEmployeesWithUserInfo)
    );

    return FinanceEmployeesWithUserInfo;
  }

  async createFinanceEmployee(
    FinanceEmployee: FinanceEmployee,
    tx?: any
  ): Promise<FinanceEmployee> {
    const createdFinanceEmployee = await this.FinanceEmployeeRepository.create(
      FinanceEmployee,
      tx
    );
    
    await this.CacheService.delete("getAllFinanceEmployees");
    return createdFinanceEmployee;
  }

  async getFinanceEmployeeById(id: number): Promise<FinanceEmployee | null> {
    return this.FinanceEmployeeRepository.getById(id);
  }

  async updateFinanceEmployee(
    FinanceEmployee: FinanceEmployee
  ): Promise<FinanceEmployee> {
    const updatedFinanceEmployee = await this.FinanceEmployeeRepository.update(
      FinanceEmployee
    );
    await this.CacheService.delete("getAllFinanceEmployees");
    return updatedFinanceEmployee;
  }

  async deleteFinanceEmployee(id: number): Promise<void> {
    await this.FinanceEmployeeRepository.delete(id);
    await this.CacheService.delete("getAllFinanceEmployees");
  }
}
