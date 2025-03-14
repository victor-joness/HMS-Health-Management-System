import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { Request, Response } from "express";
import { LoggingService } from "../../core/services/LoggingService";
import { BedService } from "../../core/services/BedService";

export class BedController {
  constructor(
    private bedServices: BedService,
    private loggingService: LoggingService
  ) {}

  async getAllBeds(req: Request, res: Response): Promise<void> {
    try {
      const Beds = await this.bedServices.getAllBeds();
      sendResponse(res, "ok", 200, "Camas encontradas com sucesso", Beds);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar Camas", null);
      this.loggingService.log("error", "Erro ao buscar Camas", { error });
    }
  }

  async getBedById(req: Request, res: Response): Promise<void> {
    try {
      const Bed = await this.bedServices.getBedById(parseInt(req.params.id));
      sendResponse(res, "ok", 200, "Cama encontrada com sucesso", Bed);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar Cama", null);
      this.loggingService.log("error", "Erro ao buscar Cama", { error });
    }
  }

  async createBed(req: Request, res: Response): Promise<void> {
    try {
      const Bed = await this.bedServices.createBed(req.body);
      sendResponse(res, "ok", 201, "Cama criada com sucesso", Bed);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao criar Cama", null);
      this.loggingService.log("error", "Erro ao criar Cama", {
        error,
        body: req.body,
        method: "Bed/createBed",
        status: 404,
      });
    }
  }

  async updateBed(req: Request, res: Response): Promise<void> {
    try {
      const Bed = await this.bedServices.updateBed(req.body);
      sendResponse(res, "ok", 200, "Cama atualizada com sucesso", Bed);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar Cama", null);
      this.loggingService.log("error", "Erro ao atualizar Cama", {
        error,
        body: req.body,
        method: "Bed/updateBed",
        status: 404,
      });
    }
  }

  async deleteBed(req: Request, res: Response): Promise<void> {
    try {
      const Bed = await this.bedServices.deleteBed(parseInt(req.params.id));
      sendResponse(res, "ok", 200, "Cama deletada com sucesso", Bed);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar Cama", null);
      this.loggingService.log("error", "Erro ao deletar Cama", {
        error,
        body: req.body,
        method: "Bed/deleteBed",
        status: 404,
      });
    }
  }
}
