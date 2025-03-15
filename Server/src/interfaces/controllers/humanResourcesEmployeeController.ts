import { Request, Response } from "express";
import { HumanResourcesEmployeeService } from "../../core/services/HumanResourcesEmployeeServices";
import { LoggingService } from "../../core/services/LoggingService";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";

export class HumanResourcesEmployeeController {
  constructor(
    private humanResourcesEmployeeService: HumanResourcesEmployeeService,
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
      const employee = await this.humanResourcesEmployeeService.createHumanResourcesEmployee(req.body);
      sendResponse(res, "ok", 201, "Funcionário do RH criado com sucesso", employee);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao criar funcionário do RH", null);
      this.loggingService.log("error", "Erro ao criar funcionário do RH", {
        error,
        body: req.body,
        method: "HumanResourcesEmployee/createEmployee",
        status: 404,
      });
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
