import { Request, Response } from "express";
import { ReceptionistService } from "../../core/services/ReceptionistServices";
import { LoggingService } from "../../core/services/LoggingService";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { CreateError } from "../../shared/errors/CreateError";
import { db } from "../../infrastructure/database/db";
import { UserServices } from "../../core/services/UserServices";
import { HashService } from "../../infrastructure/services/HashService";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { User } from "../../core/entities/User";

export class ReceptionistController {
  constructor(
    private ReceptionistService: ReceptionistService,
    private UserService: UserServices,
    private LoggingService: LoggingService
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const receptionists =
        await this.ReceptionistService.getAllReceptionists();
      sendResponse(
        res,
        "ok",
        200,
        "Recepcionistas encontrados com sucesso",
        receptionists
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar recepcionistas", null);
      this.LoggingService.log("error", "Erro ao buscar recepcionistas", {
        error,
      });
    }
  }

  async createReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const result = await db.transaction(async (tx) => {
        const {
          Name,
          Email,
          Password,
          Gender,
          Img,
          Age,
          PhoneNumber,
          PhoneEmergency,
          CreationDate,
          EmergencyAvailability,
          Notes,
          WorkScheduleDetails,
          Address,
          HospitalId,
        } = req.body;

        const [existingUser] = await Promise.all([
          this.UserService.getUserByEmail(Email),
        ]);

        if (existingUser) throw new CreateError("Email já cadastrado");

        const userDTO: User = {
          Id: undefined,
          Name: Name,
          Email: Email,
          Password: await new HashService().hash(Password),
          Role: UserRoleEnum.RECEPCIONISTA,
          Gender: Gender,
          Img: Img,
          Age: Age,
          PhoneNumber: PhoneNumber,
          PhoneEmergency: PhoneEmergency,
          DeletionDate: null,
          ModifiedDate: null,
          CreationDate: CreationDate,
          HospitalId: HospitalId
        };

        const user = await this.UserService.createUser(userDTO, tx);

        const receptionistDTO: any = {
          UserId: user.Id,
          JobTitle: "Recepcionista",
          Address: Address,
          WorkScheduleDetails: JSON.stringify(WorkScheduleDetails),
          EmergencyAvailability: EmergencyAvailability || false,
          Notes: Notes,
          DeletionDate: null,
          ModifiedDate: null,
          CreationDate: new Date().toISOString(),
        };

        const receptionist = await this.ReceptionistService.createReceptionist(
          receptionistDTO,
          tx
        );

        const { Password: _, ...userWithoutPassword } = user;
        return { ...receptionist, UserInfo: userWithoutPassword };
      });

      sendResponse(res, "ok", 201, "Recepcionista criado com sucesso", result);
    } catch (error) {
      this.LoggingService.log("error", "Erro ao criar recepcionista", {
        error,
        body: req.body,
        method: "Receptionist/createReceptionist",
        status: 404,
      });

      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      } else {
        sendResponse(res, "error", 404, "Erro ao criar recepcionista", null);
      }
    }
  }

  async getReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const receptionist = await this.ReceptionistService.getReceptionistById(
        parseInt(req.params.id)
      );
      sendResponse(
        res,
        "ok",
        200,
        "Recepcionista encontrado com sucesso",
        receptionist
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar recepcionista", null);
      this.LoggingService.log("error", "Erro ao buscar recepcionista", {
        error,
      });
    }
  }

  async updateReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const receptionist = await this.ReceptionistService.updateReceptionist(
        req.body
      );
      sendResponse(
        res,
        "ok",
        200,
        "Recepcionista atualizado com sucesso",
        receptionist
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar recepcionista", null);
      this.LoggingService.log("error", "Erro ao atualizar recepcionista", {
        error,
        body: req.body,
        method: "Receptionist/updateReceptionist",
        status: 404,
      });
    }
  }

  async deleteReceptionist(req: Request, res: Response): Promise<void> {
    try {
      const receptionist = await this.ReceptionistService.deleteReceptionist(
        parseInt(req.params.id)
      );
      sendResponse(
        res,
        "ok",
        200,
        "Recepcionista deletado com sucesso",
        receptionist
      );
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar recepcionista", null);
      this.LoggingService.log("error", "Erro ao deletar recepcionista", {
        error,
        body: req.body,
        method: "Receptionist/deleteReceptionist",
        status: 404,
      });
    }
  }
}
