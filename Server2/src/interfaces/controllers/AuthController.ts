import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { LoggingService } from "../../core/services/LoggingService";
import { AuthService } from "../../core/services/AuthService";

export class AuthController {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService
  ) {}
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const response = await this.authService.login(email, password);

      sendResponse(res, "ok", 200, "Logado com sucesso", response);
    } catch (error) {
      sendResponse(res, "error", 500, "Erro ao logar", null);
      this.loggingService.log("error", "Erro ao logar", { error });
    }
  }

  // Método de registro
  async register(req: Request, res: Response) {
    try {
      const response = await this.authService.register(req.body);

      sendResponse(res, "ok", 201, "Usuário registrado com sucesso", response);
    } catch (error) {
      console.log(error);
      sendResponse(res, "error", 500, "Erro ao registrar usuário", null);
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
