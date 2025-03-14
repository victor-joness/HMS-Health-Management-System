import { LoggingService } from "../../core/services/LoggingService";
import { UtilitiesService } from "../../core/services/UtilitiesService";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";

export class UtilitiesController {
  constructor(
    private UtilitiesService: UtilitiesService,
    private LoggingService: LoggingService
  ) {}

  async getSystemHealth(req: Request, res: Response) {
    try {
      const health = await this.UtilitiesService.checkHealth();
      sendResponse(res, "ok", 200, "Sistema está saudável.", health);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao verificar saúde do sistema.", null);
    }
  }

  async getSystemStats(req: Request, res: Response) {
    try {
      const stats = await this.UtilitiesService.getStats();
      sendResponse(res, "ok", 200, "Estatísticas do sistema retornadas com sucesso.", stats);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar estatísticas do sistema.", null);
    }
  }

  async createUtility(req: Request, res: Response) {
    try {
      let utilityReq = req.body;
      const utility = await this.UtilitiesService.createUtility(utilityReq);
      sendResponse(res, "ok", 201, "Utilitário criado com sucesso.", utility);
    } catch (error) {
      sendResponse(res, "error", 400, "Erro ao criar utilitário.", null);
    }
  }

  async getUtilities(req: Request, res: Response) {
    try {
      const utilities = await this.UtilitiesService.getAllUtilities();
      sendResponse(res, "ok", 200, "Utilitários retornados com sucesso.", utilities);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar utilitários.", null);
    }
  }

  async getUtilityById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const utility = await this.UtilitiesService.getUtilityById(parseInt(id));
      if (!utility) {
        sendResponse(res, "error", 404, "Utilitário não encontrado.", null);
      }
      sendResponse(res, "ok", 200, "Utilitário retornado com sucesso.", utility);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao buscar utilitário.", null);
    }
  }

  async updateUtility(req: Request, res: Response) {
    try {
      const updatedUtility = await this.UtilitiesService.updateUtility(req.body);
      if (!updatedUtility) {
        sendResponse(res, "error", 404, "Utilitário não encontrado.", null);
      }
      sendResponse(res, "ok", 200, "Utilitário atualizado com sucesso.", updatedUtility);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao atualizar utilitário.", null);
    }
  }

  async deleteUtility(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const deleted = await this.UtilitiesService.deleteUtility(parseInt(id));
      sendResponse(res, "ok", 200, "Utilitário deletado com sucesso.", null);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao deletar utilitário.", null);
    }
  }

  async getUtilitiesByType(req: Request, res: Response) {
    try {
      let type = req.params.type;
      const utilities = await this.UtilitiesService.getUtilitiesByType(type);
      sendResponse(res, "ok", 200, "Utilitários retornados com sucesso.", utilities);
    } catch (error) {
      sendResponse(res, "error", 404, "Nenhuma utilidade encontrada para o tipo especificado.", null);
    }
  }
}