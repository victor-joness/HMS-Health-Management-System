import { DonorService } from "../../core/services/DonorService";
import { LoggingService } from "../../core/services/LoggingService";
import { CreateError } from "../../shared/errors/CreateError";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { Request, Response } from "express";


export class DonorsController {
    constructor(
        private donorService: DonorService,
        private loggingService: LoggingService
    ) {
    }

    async getAllDonors(req: Request, res: Response): Promise<void> {
        try {
            const donors = await this.donorService.getAllDonors();
            sendResponse(res, "ok", 200, "Sucesso", donors);
        } catch (error) {
            sendResponse(res, "error", 404, "Erro ao buscar doadores", null);
            this.loggingService.log("error", "Erro ao buscar doadores", { error });
        }
    }

    async createDonor(req: Request, res: Response): Promise<void> {
        try {
            const donor = await this.donorService.createDonor(req.body);
            sendResponse(res, "ok", 201, "Doador criado com sucesso", donor);
        } catch (error) {
            if (error instanceof CreateError) {
                sendResponse(res, "error", 404, error.message, null);
                this.loggingService.log("error", "Erro ao criar doador", { error, body: req.body, method: "Donor/createDonor", status: 404 });
            } else {
                sendResponse(res, "error", 404, "Erro ao criar doador", null);
                this.loggingService.log("error", "Erro ao criar doador", { error, body: req.body, method: "Donor/createDonor", status: 404 });
            }
        }
    }

    async getDonorById(req: Request, res: Response): Promise<void> {
        try {
            const donor = await this.donorService.getDonorById(parseInt(req.params.id));
            sendResponse(res, "ok", 200, "Sucesso", donor);
        } catch (error) {
            sendResponse(res, "error", 404, "Erro ao buscar doador", null);
            this.loggingService.log("error", "Erro ao buscar doador", { error });
        }
    }

    async updateDonor(req: Request, res: Response): Promise<void> {
        try {
            const donor = await this.donorService.updateDonor(req.body);
            sendResponse(res, "ok", 200, "Doador atualizado com sucesso", donor);
        } catch (error) {
            sendResponse(res, "error", 404, "Erro ao atualizar doador", null);
            this.loggingService.log("error", "Erro ao atualizar doador", { error, body: req.body, method: "Donor/updateDonor", status: 404 });
        }
    }

    async deleteDonor(req: Request, res: Response): Promise<void> {
        try {
            const donor = await this.donorService.deleteDonor(parseInt(req.params.id));
            sendResponse(res, "ok", 200, "Doador deletado com sucesso", donor);
        } catch (error) {
            sendResponse(res, "error", 404, "Erro ao deletar doador", null);
            this.loggingService.log("error", "Erro ao deletar doador", { error, body: req.body, method: "Donor/deleteDonor", status: 404 });
        }
    }
}