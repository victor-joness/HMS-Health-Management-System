import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { UserServices } from "../../core/services/UserServices";
import { LoggingService } from "../../core/services/LoggingService";
import { CreateError } from "../../shared/errors/CreateError";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export class UserController {
  constructor(
    private UserServices: UserServices,
    private LoggingService: LoggingService
  ) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.UserServices.getAllUsers();
      sendResponse(res, "ok", 200, "Usuários encontrados com sucesso", users);
    } catch (error) {
      this.LoggingService.log("error", "Erro ao buscar usuários", {
        error,
        method: "User/getAllUsers",
      });
      sendResponse(res, "error", 500, "Erro ao buscar usuários", null);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.UserServices.createUser(req.body);
      sendResponse(res, "ok", 201, "Usuário criado com sucesso", user);
    } catch (error) {
      this.LoggingService.log("error", "Erro ao criar usuário", {
        error,
        body: req.body,
        method: "User/createUser",
      });

      if (error instanceof CreateError) {
        sendResponse(res, "error", 400, error.message, null);
        return;
      }

      sendResponse(res, "error", 500, "Erro interno ao criar usuário", null);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.UserServices.deleteUser(userId);
      sendResponse(res, "ok", 200, "Usuário deletado com sucesso", user);
    } catch (error) {
      this.LoggingService.log("error", "Erro ao deletar usuário", {
        error,
        params: req.params,
        method: "User/deleteUser",
      });

      if (error instanceof NotFoundError) {
        sendResponse(res, "error", 404, "Usuário não encontrado", null);
        return;
      }

      sendResponse(res, "error", 500, "Erro ao deletar usuário", null);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.UserServices.updateUser(req.body);
      sendResponse(res, "ok", 200, "Usuário atualizado com sucesso", user);
    } catch (error) {
      this.LoggingService.log("error", "Erro ao atualizar usuário", {
        error,
        body: req.body,
        method: "User/updateUser",
      });

      if (error instanceof NotFoundError) {
        sendResponse(res, "error", 404, "Usuário não encontrado", null);
        return;
      }

      sendResponse(res, "error", 500, "Erro ao atualizar usuário", null);
    }
  }
}