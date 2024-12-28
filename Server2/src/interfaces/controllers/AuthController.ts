import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { LoggingService } from "../../core/services/LoggingService";
import { AuthService } from "../../core/services/AuthService";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { CreateError } from "../../shared/errors/CreateError";

export class AuthController {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService
  ) {}

  async login(req: Request, res: Response) {
    const { Email, Password } = req.body;
    try {
      const response = await this.authService.login(Email, Password);
      sendResponse(res, "ok", 200, "Logado com sucesso", response);
    } catch (error: any) {
      if (error instanceof NotFoundError)
        sendResponse(res, "error", 404, error.message, null);

      if (error instanceof Error)
        sendResponse(res, "error", 401, error.message, null);

      this.loggingService.log("error", error.message, { error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const response = await this.authService.register(req.body);

      sendResponse(res, "ok", 201, "Usuário registrado com sucesso", response);
    } catch (error) {
      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      }

      if (error instanceof Error)
        sendResponse(res, "error", 500, error.message, null);

      this.loggingService.log("error", "Erro ao registrar usuário", { error });
    }
  }

  // Método de recuperação de senha
  /* async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const response = await this.authService.forgotPassword(email);

      sendResponse(
        res,
        "ok",
        200,
        "Token de recuperação enviado com sucesso",
        response
      );
    } catch (error) {
      sendResponse(
        res,
        "error",
        500,
        "Erro ao enviar token de recuperação",
        null
      );
      this.loggingService.log("error", "Erro ao enviar token de recuperação", {
        error,
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { token, password } = req.body;
    try {
      const response = await this.authService.resetPassword(token, password);

      sendResponse(res, "ok", 200, "Senha alterada com sucesso", response);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao alterar a senha", null);
      this.loggingService.log("error", "Erro ao alterar a senha", { error });
    }
  }

  async changePassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;
    try {
      const response = await this.authService.changePassword(
        oldPassword,
        newPassword
      );
      sendResponse(res, "ok", 200, "Senha alterada com sucesso", response);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao alterar a senha", null);
      this.loggingService.log("error", "Erro ao alterar a senha", { error });
    }
  } */
}
