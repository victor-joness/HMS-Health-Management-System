import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { Request, Response } from "express";
import { LoggingService } from "../../core/services/LoggingService";
import { SurgeryService } from "../../core/services/surgeryService";

export class SurgeryController {
  constructor(
    private surgeryServices: SurgeryService,
    private loggingService: LoggingService
  ) {}

  async getAllSurgerys(req: Request, res: Response): Promise<void> {
    try {
      const surgerys = await this.surgeryServices.getAllSurgerys();
      sendResponse(
        res,
        "ok",
        200,
        "Cirurgias encontradas com sucesso",
        surgerys
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar cirurgias", null);
      this.loggingService.log("error", "Erro ao buscar cirurgias", { error });
    }
  }

  async getSurgeryById(req: Request, res: Response): Promise<void> {
    try {
      const surgery = await this.surgeryServices.getSurgeryById(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Cirurgia encontrada com sucesso", surgery);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar cirurgia", null);
      this.loggingService.log("error", "Erro ao buscar cirurgia", { error });
    }
  }

  async createSurgery(req: Request, res: Response): Promise<void> {
    try {
      const surgery = await this.surgeryServices.createSurgery(req.body);
      sendResponse(res, "ok", 201, "Cirurgia criada com sucesso", surgery);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao criar cirurgia", null);
      this.loggingService.log("error", "Erro ao criar cirurgia", {
        error,
        body: req.body,
        method: "Surgery/createSurgery",
        status: 404,
      });
    }
  }

  async updateSurgery(req: Request, res: Response): Promise<void> {
    try {
      const surgery = await this.surgeryServices.updateSurgery(req.body);
      sendResponse(res, "ok", 200, "Cirurgia atualizada com sucesso", surgery);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar cirurgia", null);
      this.loggingService.log("error", "Erro ao atualizar cirurgia", {
        error,
        body: req.body,
        method: "Surgery/updateSurgery",
        status: 404,
      });
    }
  }

  async deleteSurgery(req: Request, res: Response): Promise<void> {
    try {
      const surgery = await this.surgeryServices.deleteSurgery(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Cirurgia deletada com sucesso", surgery);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar cirurgia", null);
      this.loggingService.log("error", "Erro ao deletar cirurgia", {
        error,
        body: req.body,
        method: "Surgery/deleteSurgery",
        status: 404,
      });
    }
  }
}
