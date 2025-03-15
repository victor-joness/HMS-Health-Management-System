import { Request, Response } from "express";
import { ReceptionistService } from "../../core/services/ReceptionistServices";
import { LoggingService } from "../../core/services/LoggingService";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";

export class ReceptionistController {
  constructor(
    private ReceptionistService: ReceptionistService,
    private LoggingService: LoggingService
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const receptionists = await this.ReceptionistService.getAllReceptionists();
      sendResponse(
        res,
        "ok",
        200,
        "Recepcionistas encontrados com sucesso",
        receptionists
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar recepcionistas", null);
      this.LoggingService.log("error", "Erro ao buscar recepcionistas", { error });
    }
  }

  async createReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const receptionist = await this.ReceptionistService.createReceptionist(req.body);
      sendResponse(res, "ok", 201, "Recepcionista criado com sucesso", receptionist);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao criar recepcionista", null);
      this.LoggingService.log("error", "Erro ao criar recepcionista", {
        error,
        body: req.body,
        method: "Receptionist/createReceptionist",
        status: 404,
      });
    }
  }

  async getReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const receptionist = await this.ReceptionistService.getReceptionistById(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Recepcionista encontrado com sucesso", receptionist);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar recepcionista", null);
      this.LoggingService.log("error", "Erro ao buscar recepcionista", { error });
    }
  }

  async updateReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const receptionist = await this.ReceptionistService.updateReceptionist(req.body);
      sendResponse(res, "ok", 200, "Recepcionista atualizado com sucesso", receptionist);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar recepcionista", null);
      this.LoggingService.log("error", "Erro ao atualizar recepcionista", {
        error,
        body: req.body,
        method: "Receptionist/updateReceptionist",
        status: 404,
      });
    }
  }

  async deleteReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const receptionist = await this.ReceptionistService.deleteReceptionist(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Recepcionista deletado com sucesso", receptionist);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar recepcionista", null);
      this.LoggingService.log("error", "Erro ao deletar recepcionista", {
        error,
        body: req.body,
        method: "Receptionist/deleteReceptionist",
        status: 404,
      });
    }
  }
}
