import { HospitalsServices } from "../../core/services/HospitalsService";
import { LoggingService } from "../../core/services/LoggingService";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { date } from "drizzle-orm/mysql-core";

export class HospitalsController {
  constructor(
    private hospitalsServices: HospitalsServices,
    private loggingService: LoggingService
  ) {}

  async getAllHospitals(req: Request, res: Response) {
    try {
      const hospitals = await this.hospitalsServices.getAllHospitals();
      sendResponse(res, "ok", 200, "Hospitais retornados com sucesso.", hospitals);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar hospitais.", null);
    }
  }

  async getHospitalById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const hospital = await this.hospitalsServices.getHospitalById(parseInt(id));
      if (!hospital) {
        sendResponse(res, "error", 404, "Hospital não encontrado.", null);
      }
      sendResponse(res, "ok", 200, "Hospital retornado com sucesso.", hospital);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar hospital.", null);
    }
  }

  async createHospital(req: Request, res: Response) {
    try {
      let hospitalReq = req.body;
      hospitalReq.CreationDate = new Date().toISOString();
      const hospital = await this.hospitalsServices.createHospital(hospitalReq);
      sendResponse(res, "ok", 201, "Hospital criado com sucesso.", hospital);
    } catch (error) {
      sendResponse(res, "error", 400, "Erro ao criar hospital.", null);
    }
  }

  async updateHospital(req: Request, res: Response) {
    try {
      const updatedHospital = await this.hospitalsServices.updateHospital(req.body);
      if (!updatedHospital) {
        sendResponse(res, "error", 404, "Hospital não encontrado.", null);
      }
      sendResponse(res, "ok", 200, "Hospital atualizado com sucesso.", updatedHospital);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao atualizar hospital.", null);
    }
  }

  async deleteHospital(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const deleted = await this.hospitalsServices.deleteHospital(parseInt(id));
      sendResponse(res, "ok", 200, "Hospital deletado com sucesso.", null);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao deletar hospital.", null);
    }
  }
}
