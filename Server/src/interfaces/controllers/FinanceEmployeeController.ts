import { FinanceEmployeeService } from "../../core/services/FinanceEmployeeService";
import { LoggingService } from "../../core/services/LoggingService";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { db } from "../../infrastructure/database/db";
import { CreateError } from "../../shared/errors/CreateError";
import { User } from "../../core/entities/User";
import { HashService } from "../../infrastructure/services/HashService";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { UserServices } from "../../core/services/UserServices";

export class FinanceEmployeeController {
  constructor(
    private financeEmployeeService: FinanceEmployeeService,
    private loggingService: LoggingService,
    private UserService: UserServices
  ) {}

  async getAllFinanceEmployees(req: Request, res: Response) {
    try {
      const employees =
        await this.financeEmployeeService.getAllFinanceEmployees();
      sendResponse(
        res,
        "ok",
        200,
        "Funcionários retornados com sucesso.",
        employees
      );
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar funcionários.", null);
    }
  }

  async getFinanceEmployeeById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const employee = await this.financeEmployeeService.getFinanceEmployeeById(
        parseInt(id)
      );
      if (!employee) {
        sendResponse(res, "error", 404, "Funcionário não encontrado.", null);
      }
      sendResponse(
        res,
        "ok",
        200,
        "Funcionário retornado com sucesso.",
        employee
      );
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar funcionário.", null);
    }
  }

  async createFinanceEmployee(req: Request, res: Response): Promise<void> {
    try {
      const result = await db.transaction(async (tx) => {
        const {
          Name,
          Email,
          Password,
          Gender,
          Img,
          Age,
          PhoneNumber,
          CreationDate,
          Notes,
          WorkScheduleDetails,
          Address,
          HospitalId,
        } = req.body;

        const [existingUser] = await Promise.all([
          this.UserService.getUserByEmail(Email),
        ]);

        if (existingUser) throw new CreateError("Email já cadastrado");

        const userDTO: User = {
          Id: undefined,
          Name: Name,
          Email: Email,
          Password: await new HashService().hash(Password),
          Role: UserRoleEnum.FINANCEIRO,
          Gender: Gender,
          Img: Img,
          Age: Age,
          PhoneNumber: PhoneNumber,
          DeletionDate: null,
          ModifiedDate: null,
          CreationDate: CreationDate,
          HospitalId: HospitalId,
        };

        const user = await this.UserService.createUser(userDTO, tx);
        
        const receptionistDTO: any = {
          UserId: user.Id,
          Address: Address,
          WorkScheduleDetails: JSON.stringify(WorkScheduleDetails),
          Notes: Notes,
          DeletionDate: null,
          ModifiedDate: null,
          CreationDate: new Date().toISOString(),
        };

        console.log("receptionistDTO", receptionistDTO);

        const financeEmployee = await this.financeEmployeeService.createFinanceEmployee(receptionistDTO, tx);

        const { Password: _, ...userWithoutPassword } = user;
        return { ...financeEmployee, UserInfo: userWithoutPassword };
      });

      sendResponse(
        res,
        "ok",
        201,
        "Funcionario do financeiro criado com sucesso",
        result
      );
    } catch (error) {
      this.loggingService.log(
        "error",
        "Erro ao criar funcionario do financeiro",
        {
          error,
          body: req.body,
          method: "financeEmployee/createFinanceEmployee",
          status: 404,
        }
      );

      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      } else {
        sendResponse(
          res,
          "error",
          404,
          "Erro ao criar funcionario do financeiro",
          null
        );
      }
    }
  }

  async updateFinanceEmployee(req: Request, res: Response) {
    try {
      const updatedEmployee =
        await this.financeEmployeeService.updateFinanceEmployee(req.body);
      if (!updatedEmployee) {
        sendResponse(res, "error", 404, "Funcionário não encontrado.", null);
      }
      sendResponse(
        res,
        "ok",
        200,
        "Funcionário atualizado com sucesso.",
        updatedEmployee
      );
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao atualizar funcionário.", null);
    }
  }

  async deleteFinanceEmployee(req: Request, res: Response) {
    try {
      let id = req.params.id;
      await this.financeEmployeeService.deleteFinanceEmployee(parseInt(id));
      sendResponse(res, "ok", 200, "Funcionário deletado com sucesso.", null);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao deletar funcionário.", null);
    }
  }
}
