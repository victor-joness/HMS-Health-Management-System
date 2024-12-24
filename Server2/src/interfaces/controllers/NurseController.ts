import { Request, Response } from "express";
import { NurseServices } from "../../core/services/NurseServices";
import { LoggingService } from "../../core/services/LoggingService";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { CreateError } from "../../shared/errors/CreateError";

export class NurseController {
  constructor(
    private nurseServices: NurseServices,
    private LoggingService: LoggingService
  ) {}
  async getAllNurses(req: Request, res: Response): Promise<void> {
    try {
      const nurses = await this.nurseServices.getAllNurses();
      sendResponse(res, "ok", 200, "Sucesso", nurses);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar enfermeiros", null);
    }
  }

  async getNurseById(req: Request, res: Response): Promise<void> {
    try {
      const nurse = await this.nurseServices.getNurseById(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Sucesso", nurse);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar enfermeiro", null);
    }
  }

  async createNurse(req: Request, res: Response): Promise<void> {
    try {
      const nurse = await this.nurseServices.createNurse(req.body);
      sendResponse(res, "ok", 200, "Enfermeiro criado com sucesso", nurse);
    } catch (error) {
      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      } else {
        sendResponse(res, "error", 404, "Erro ao criar enfermeiro", null);
      }
      this.LoggingService.log("error", "Erro ao criar enfermeiro", {
        error,
        body: req.body,
        method: "Nurse/createNurse",
        status: 404,
      });
    }
  }

  async updateNurse(req: Request, res: Response): Promise<void> {
    try {
      const nurse = await this.nurseServices.updateNurse(req.body);
      sendResponse(res, "ok", 200, "Enfermeiro atualizado com sucesso", nurse);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar enfermeiro", null);
    }
  }

  async deleteNurse(req: Request, res: Response): Promise<void> {
    try {
      const nurse = await this.nurseServices.deleteNurse(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Enfermeiro deletado com sucesso", nurse);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar enfermeiro", null);
    }
  }
}
