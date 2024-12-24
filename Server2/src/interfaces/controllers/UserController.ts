import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { UserServices } from "../../core/services/UserServices";
import { LoggingService } from "../../core/services/LoggingService";
import { CreateError } from "../../shared/errors/CreateError";

export class UserController {
  constructor(
    private UserServices: UserServices,
    private LoggingService: LoggingService
  ) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.UserServices.getAllUsers();
      sendResponse(res, "ok", 200, "Sucesso", users);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar usuários", null);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.UserServices.createUser(req.body);
      sendResponse(res, "ok", 201, "Usuário criado com sucesso", user);
    } catch (error) {
      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      } else {
        sendResponse(res, "error", 404, "Erro ao criar usuário", null);
      }
      this.LoggingService.log("error", "Erro ao criar usuário", {
        error,
        body: req.body,
        method: "User/createUser",
        status: 404,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.UserServices.deleteUser(parseInt(req.params.id));
      sendResponse(res, "ok", 200, "Usuário deletado com sucesso", user);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar usuário", null);
      this.LoggingService.log("error", "Erro ao deletar usuário", {
        error,
        body: req.body,
        method: "User/deleteUser",
        status: 404,
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.UserServices.updateUser(req.body);
      sendResponse(res, "ok", 200, "Usuário atualizado com sucesso", user);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar usuário", null);
      this.LoggingService.log("error", "Erro ao atualizar usuário", {
        error,
        body: req.body,
        method: "User/updateUser",
        status: 404,
      });
    }
  }
}
