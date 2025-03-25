import { Request, Response } from "express";
import { HumanResourcesEmployeeService } from "../../core/services/HumanResourcesEmployeeService";
import { LoggingService } from "../../core/services/LoggingService";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { UserServices } from "../../core/services/UserServices";
import { CreateError } from "../../shared/errors/CreateError";
import { db } from "../../infrastructure/database/db";
import { User } from "../../core/entities/User";
import { HashService } from "../../infrastructure/services/HashService";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";

export class HumanResourcesEmployeeController {
  constructor(
    private humanResourcesEmployeeService: HumanResourcesEmployeeService,
    private UserService: UserServices,
    private loggingService: LoggingService
  ) {}

  async getAllHumanResourcesEmployees(req: Request, res: Response): Promise<void> {
    try {
      const employees = await this.humanResourcesEmployeeService.getAllHumanResourcesEmployees();
      sendResponse(
        res,
        "ok",
        200,
        "Funcionários do RH encontrados com sucesso",
        employees
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar funcionários do RH", null);
      this.loggingService.log("error", "Erro ao buscar funcionários do RH", { error });
    }
  }

  async createHumanResourcesEmployee(req: Request, res: Response): Promise<void> {
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
              PhoneEmergency,
              CreationDate,
              Notes,
              WorkScheduleDetails,
              Address,
              HospitalId
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
              Role: UserRoleEnum.RH,
              Gender: Gender,       
              Img: Img,
              Age: Age,
              PhoneNumber: PhoneNumber,
              PhoneEmergency: PhoneEmergency,
              DeletionDate: null,
              ModifiedDate: null,
              CreationDate: CreationDate,
              HospitalId: HospitalId
            };
    
            const user = await this.UserService.createUser(userDTO, tx);
    
            const humanResourcesEmployeeDTO: any = {
              UserId: user.Id,
              JobTitle: "RH",
              Address:Address,
              WorkScheduleDetails: JSON.stringify(WorkScheduleDetails),
              Notes: Notes,
              DeletionDate: null,
              ModifiedDate: null,
              CreationDate: new Date().toISOString(),
            };
    
            const humanResourcesEmployee = await this.humanResourcesEmployeeService.createHumanResourcesEmployee(humanResourcesEmployeeDTO, tx);
    
            const { Password: _, ...userWithoutPassword } = user;
            return { ...humanResourcesEmployee, UserInfo: userWithoutPassword };
          });
    
          sendResponse(res, "ok", 201, "funcionário do RH criado com sucesso", result);
        } catch (error) {
          this.loggingService.log("error", "Erro ao criar funcionário do RH", {
            error,
            body: req.body,
            method: "HumanResourcesEmployee/createEmployee",
            status: 404,
          });
  
          if (error instanceof CreateError) {
            sendResponse(res, "error", 404, error.message, null);
          } else {
            sendResponse(res, "error", 404, "Erro ao criar funcionário do RH", null);
          }
        }
      }

  async getHumanResourcesEmployeeById(req: Request, res: Response): Promise<void> {
    try {
      const employee = await this.humanResourcesEmployeeService.getHumanResourcesEmployeeById(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Funcionário do RH encontrado com sucesso", employee);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar funcionário do RH", null);
      this.loggingService.log("error", "Erro ao buscar funcionário do RH", { error });
    }
  }

  async updateHumanResourcesEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employee = await this.humanResourcesEmployeeService.updateHumanResourcesEmployee(req.body);
      sendResponse(res, "ok", 200, "Funcionário do RH atualizado com sucesso", employee);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar funcionário do RH", null);
      this.loggingService.log("error", "Erro ao atualizar funcionário do RH", {
        error,
        body: req.body,
        method: "HumanResourcesEmployee/updateEmployee",
        status: 404,
      });
    }
  }

  async deleteHumanResourcesEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employee = await this.humanResourcesEmployeeService.deleteHumanResourcesEmployee(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Funcionário do RH deletado com sucesso", employee);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar funcionário do RH", null);
      this.loggingService.log("error", "Erro ao deletar funcionário do RH", {
        error,
        body: req.body,
        method: "HumanResourcesEmployee/deleteEmployee",
        status: 404,
      });
    }
  }
}
