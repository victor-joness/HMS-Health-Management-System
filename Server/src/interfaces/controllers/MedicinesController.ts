import { LoggingService } from "../../core/services/LoggingService";
import { MedicinesServices } from "../../core/services/MedicinesServices";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { Request, Response } from "express";

export class MedicinesController {
  constructor(
    private medicinesServices: MedicinesServices,
    private loggingService: LoggingService
  ) {}

  public async getAllMedicines(req: Request, res: Response) {
    try {
      const medicines = await this.medicinesServices.getAllMedicines();
      sendResponse(res, "ok", 200, "Sucesso", medicines);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar medicamentos", null);
      this.loggingService.log("error", "Erro ao buscar medicamentos", {
        error,
      });
    }
  }

  public async createMedicine(req: Request, res: Response) {
    try {
      const medicine = await this.medicinesServices.createMedicine(req.body);
      res.status(201).send(medicine);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao criar medicamento", null);
      this.loggingService.log("error", "Erro ao criar medicamento", { error });
    }
  }

  public async deleteMedicine(req: Request, res: Response) {
    try {
      const medicine = await this.medicinesServices.deleteMedicine(
        parseInt(req.params.id)
      );
      res.status(200).send(medicine);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao deletar medicamento", null);
      this.loggingService.log("error", "Erro ao deletar medicamento", {
        error,
      });
    }
  }

  public async updateMedicine(req: Request, res: Response) {
    try {
      const medicine = await this.medicinesServices.updateMedicine(req.body);
      res.status(200).send(medicine);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao atualizar medicamento", null);
      this.loggingService.log("error", "Erro ao atualizar medicamento", {
        error,
      });
    }
  }

  public async getMedicineById(req: Request, res: Response) {
    try {
      const medicine = await this.medicinesServices.getMedicineById(
        parseInt(req.params.id)
      );
      res.status(200).send(medicine);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar medicamento", null);
      this.loggingService.log("error", "Erro ao buscar medicamento", { error });
    }
  }
}
