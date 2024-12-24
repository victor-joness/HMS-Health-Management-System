import { DoctorServices } from "../../core/services/DoctorServices";
import { LoggingService } from "../../core/services/LoggingService";
import { CreateError } from "../../shared/errors/CreateError";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { Request, Response } from "express";

export class DoctorController {
  constructor(
    private DoctorServices: DoctorServices,
    private LoggingService: LoggingService
  ) {}

  async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const doctors = await this.DoctorServices.getAllDoctors();
      sendResponse(res, "ok", 200, "Sucesso", doctors);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar médicos", null);
    }
  }

  async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.DoctorServices.createDoctor(req.body);
      sendResponse(res, "ok", 201, "Médico criado com sucesso", doctor);
    } catch (error) {
      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      } else {
        sendResponse(res, "error", 404, "Erro ao criar médico", null);
      }
      this.LoggingService.log("error", "Erro ao criar médico", {
        error,
        body: req.body,
        method: "Doctor/createDoctor",
        status: 404,
      });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.DoctorServices.deleteDoctor(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Médico deletado com sucesso", doctor);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar médico", null);
      this.LoggingService.log("error", "Erro ao deletar médico", {
        error,
        body: req.body,
        method: "Doctor/deleteDoctor",
        status: 404,
      });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.DoctorServices.updateDoctor(req.body);
      sendResponse(res, "ok", 200, "Médico atualizado com sucesso", doctor);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar médico", null);
      this.LoggingService.log("error", "Erro ao atualizar médico", {
        error,
        body: req.body,
        method: "Doctor/updateDoctor",
        status: 404,
      });
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.DoctorServices.getDoctorById(parseInt(req.params.id));
      sendResponse(res, "ok", 200, "Sucesso", doctor);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar médico", null);
    }
  }
}
