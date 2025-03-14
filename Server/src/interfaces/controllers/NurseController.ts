import { Request, Response } from "express";
import { NurseServices } from "../../core/services/NurseServices";
import { LoggingService } from "../../core/services/LoggingService";
import { UserServices } from "../../core/services/UserServices";
import { db } from "../../infrastructure/database/db";
import { CreateError } from "../../shared/errors/CreateError";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { User } from "../../core/entities/User";

export class NurseController {
  constructor(
    private NurseServices: NurseServices,
    private LoggingService: LoggingService,
    private UserService: UserServices
  ) {}

  async getAllNurses(req: Request, res: Response): Promise<void> {
    try {
      const nurses = await this.NurseServices.getAllNurses();
      sendResponse(res, "ok", 200, "Sucesso", nurses);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar enfermeiros", null);
    }
  }

  async createNurse(req: Request, res: Response): Promise<void> {
    try {
      const result = await db.transaction(async (tx) => {
        const { 
          Name,
          Email,
          NursingLicenseNumber,
          Password,
          Gender,
          Img,
          Age,
          PhoneNumber,
          PhoneEmergency,
          CreationDate,
          Department,
          Specialization,
          YearsOfExperience,
          Shift,
          SupervisingDoctor,
          Certifications,
          WorkScheduleDetails,
          EmergencyAvailability,
          Notes,
          Address
        } = req.body;

        const [existingUser, existingNurse] = await Promise.all([
          this.UserService.getUserByEmail(Email),
          this.NurseServices.getNurseByLicenseNumber(NursingLicenseNumber),
        ]);

        if (existingUser) throw new CreateError("Email já cadastrado");
        if (existingNurse) throw new CreateError("Nursing License Number já em uso");

        const userDTO: User = {
          Id: undefined,
          Name,
          Email,
          Password,
          Role: UserRoleEnum.ENFERMEIRA,
          Gender,
          Img,
          Age,
          PhoneNumber,
          PhoneEmergency,
          DeletionDate: null,
          ModifiedDate: null,
          CreationDate,
        };

        const user = await this.UserService.createUser(userDTO, tx);

        const nurseDTO = {
          UserId: user.Id,
          NursingLicenseNumber,
          Department,
          Specialization,
          YearsOfExperience,
          Shift,
          SupervisingDoctor,
          Certifications,
          WorkScheduleDetails: JSON.stringify(WorkScheduleDetails),
          EmergencyAvailability: EmergencyAvailability || false,
          Notes,
          Address,
          DeletionDate: null,
          ModifiedDate: null,
          CreationDate: new Date().toISOString(),
        };

        const nurse = await this.NurseServices.createNurse(nurseDTO, tx);

        return {...nurse, userInfo: user};
      });

      sendResponse(res, "ok", 201, "Enfermeiro criado com sucesso", result);
    } catch (error) {
      this.LoggingService.log("error", "Erro ao criar enfermeiro", {
        error,
        body: req.body,
        method: "Nurse/createNurse",
        status: 404,
      });

      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      } else {
        sendResponse(res, "error", 404, "Erro ao criar enfermeiro", null);
      }
    }
  }

  async deleteNurse(req: Request, res: Response): Promise<void> {
    try {
      const nurseId = parseInt(req.params.id);
      const nurse = await this.NurseServices.getNurseById(nurseId);

      if (!nurse) {
        sendResponse(res, "error", 404, "Enfermeiro não encontrado", null);
        return;
      }

      const updatedNurse = await this.NurseServices.deleteNurse(nurseId);
      await this.UserService.deleteUser(nurse.UserId);

      sendResponse(res, "ok", 200, "Enfermeiro deletado com sucesso", updatedNurse);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao deletar enfermeiro", null);
    }
  }

  async updateNurse(req: Request, res: Response): Promise<void> {
    try {
      const nurse = await this.NurseServices.getNurseById(req.body.id);

      if (!nurse) {
        sendResponse(res, "error", 404, "Enfermeiro não encontrado", null);
        return;
      }

      const updatedNurse = await this.NurseServices.updateNurse(req.body);
      sendResponse(res, "ok", 200, "Enfermeiro atualizado com sucesso", updatedNurse);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao atualizar enfermeiro", null);
    }
  }

  async getNurseById(req: Request, res: Response): Promise<void> {
    try {
      const nurse = await this.NurseServices.getNurseById(req.body.id);

      if (!nurse) {
        sendResponse(res, "error", 404, "Enfermeiro não encontrado", null);
        return;
      }

      sendResponse(res, "ok", 200, "Sucesso", nurse);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar enfermeiro", null);
    }
  }
}
