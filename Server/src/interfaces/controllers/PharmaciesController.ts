import { LoggingService } from "../../core/services/LoggingService";
import { PharmaciesServices } from "../../core/services/PharmaciesService";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";

export class PharmaciesController {
  constructor(
    private pharmaciesServices: PharmaciesServices,
    private loggingService: LoggingService
  ) {}

  async getAllPharmacies(req: Request, res: Response): Promise<void> {
    try {
      const pharmacies = await this.pharmaciesServices.getAllPharmacies();
      sendResponse(
        res,
        "ok",
        200,
        "Farmácias encontradas com sucesso",
        pharmacies
      );
    } catch (error) {
      this.loggingService.log("error", "Erro ao buscar farmacias", { error });
      sendResponse(res, "error", 500, "Erro ao obter farmácias");
    }
  }

  async createPharmacy(req: Request, res: Response): Promise<void> {
    try {
      const pharmacy = req.body;
      const createdPharmacy = await this.pharmaciesServices.createPharmacy(
        pharmacy
      );
      sendResponse(
        res,
        "ok",
        201,
        "Farmácia criada com sucesso",
        createdPharmacy
      );
    } catch (error) {
      this.loggingService.log("Error", " Error ao criar farmacia", { error });
      sendResponse(res, "error", 500, "Erro ao criar farmácia");
    }
  }

  async deletePharmacy(req: Request, res: Response): Promise<void> {
    try {
      const pharmacyId = parseInt(req.params.id);
      await this.pharmaciesServices.deletePharmacy(pharmacyId);
      sendResponse(res, "ok", 200, "Farmácia excluída com sucesso");
    } catch (error) {
      this.loggingService.log("Error", "Error ao deletar farmacia", { error });
      sendResponse(res, "error", 500, "Erro ao excluir farmácia");
    }
  }

  async updatePharmacy(req: Request, res: Response): Promise<void> {
    try {
      const pharmacyId = parseInt(req.params.id);
      const updatedPharmacy = req.body;
      await this.pharmaciesServices.updatePharmacy(updatedPharmacy);
      sendResponse(res, "ok", 200, "Farmácia atualizada com sucesso");
    } catch (error) {
      this.loggingService.log("error", "Erro ao atualizar farmácia", { error });
      sendResponse(res, "error", 500, "Erro ao atualizar farmácia");
    }
  }

  async getPharmacyById(req: Request, res: Response): Promise<void> {
    try {
      const pharmacyId = parseInt(req.params.id);
      const pharmacy = await this.pharmaciesServices.getPharmacyById(
        pharmacyId
      );
      if (pharmacy) {
        sendResponse(
          res,
          "ok",
          200,
          "Farmácia encontrada com sucesso",
          pharmacy
        );
      } else {
        sendResponse(res, "error", 404, "Farmácia não encontrada");
      }
    } catch (error) {
      this.loggingService.log("error", "Erro ao obter farmácia", { error });
      sendResponse(res, "error", 500, "Erro ao obter farmácia");
    }
  }

  async getPharmacyByCnpj(req: Request, res: Response): Promise<void> {
    try {
      const cnpj = req.params.cnpj;
      const pharmacy = await this.pharmaciesServices.getPharmacyByCnpj(cnpj);
      if (pharmacy) {
        sendResponse(
          res,
          "ok",
          200,
          "Farmácia encontrada com sucesso",
          pharmacy
        );
      } else {
        sendResponse(res, "error", 404, "Farmácia não encontrada");
      }
    } catch (error) {
      this.loggingService.log("error", "Erro ao obter farmácia por CNPJ", {
        error,
      });
      sendResponse(res, "error", 500, "Erro ao obter farmácia");
    }
  }
}
