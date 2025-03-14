import { Request, Response } from "express";
import { PatientService } from "../../core/services/PatientService";
import { LoggingService } from "../../core/services/LoggingService";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";

export class PatientController {
  constructor(
    private PatientServices: PatientService,
    private LoggingService: LoggingService
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const patients = await this.PatientServices.getAllPatients();
      sendResponse(
        res,
        "ok",
        200,
        "Pacientes encontrados com sucesso",
        patients
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar pacientes", null);
      this.LoggingService.log("error", "Erro ao buscar pacientes", { error });
    }
  }

  async createPatient(req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.PatientServices.createPatient(req.body);
      sendResponse(res, "ok", 201, "Paciente criado com sucesso", patient);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao criar paciente", null);
      this.LoggingService.log("error", "Erro ao criar paciente", {
        error,
        body: req.body,
        method: "Patient/createPatient",
        status: 404,
      });
    }
  }

  async getPatient(req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.PatientServices.getPatientById(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Paciente encontrado com sucesso", patient);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar paciente", null);
      this.LoggingService.log("error", "Erro ao buscar paciente", { error });
    }
  }

  async updatePatient(req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.PatientServices.updatePatient(req.body);
      sendResponse(res, "ok", 200, "Paciente atualizado com sucesso", patient);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar paciente", null);
      this.LoggingService.log("error", "Erro ao atualizar paciente", {
        error,
        body: req.body,
        method: "Patient/updatePatient",
        status: 404,
      });
    }
  }

  async deletePatient(req: Request, res: Response): Promise<void> {
    try {
      const patient = await this.PatientServices.deletePatient(
        parseInt(req.params.id)
      );
      sendResponse(res, "ok", 200, "Paciente deletado com sucesso", patient);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar paciente", null);
      this.LoggingService.log("error", "Erro ao deletar paciente", {
        error,
        body: req.body,
        method: "Patient/deletePatient",
        status: 404,
      });
    }
  }
}
