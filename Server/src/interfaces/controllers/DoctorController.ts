import { User } from "../../core/entities/User";
import { DoctorServices } from "../../core/services/DoctorServices";
import { LoggingService } from "../../core/services/LoggingService";
import { UserServices } from "../../core/services/UserServices";
import { db } from "../../infrastructure/database/db";
import { CreateError } from "../../shared/errors/CreateError";
import { UserRoleEnum } from "../../shared/utils/enum/UserRoleEnum";
import { sendResponse } from "../../shared/utils/functions/ResponseTemplate";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const saltRounds = 10;

export class DoctorController {
  constructor(
    private DoctorServices: DoctorServices,
    private LoggingService: LoggingService,
    private UserService: UserServices
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
      const result = await db.transaction(async (tx) => {
        const { 
          Name,
          Email,
          MedicalLicenseNumber,
          Password,
          Gender,
          Img,
          Age,
          PhoneNumber,
          PhoneEmergency,
          CreationDate,
          Speciality,
          YearsOfExperience,
          Department,
          WorkScheduleDetails,
          Certifications,
          ResearchPublications,
          SupervisingNurses,
          Qualifications,
          Specialization,
          EmergencyAvailability,
          Notes,
          Address,
          HospitalId
        } = req.body;

        const [existingUser, existingDoctor] = await Promise.all([
          this.UserService.getUserByEmail(Email),
          this.DoctorServices.getDoctorByMedicalLicense(MedicalLicenseNumber),
        ]);

        if (existingUser) throw new CreateError("Email já cadastrado");
        if (existingDoctor) throw new CreateError("Medical License Number já em uso");

        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const userDTO: User = {
          Id: undefined,
          Name: Name,
          Email: Email,
          Password: hashedPassword,
          Role: UserRoleEnum.DOUTOR,
          HospitalId: HospitalId,
          Gender: Gender,
          Img: Img,
          Age: Age,
          PhoneNumber: PhoneNumber,
          PhoneEmergency: PhoneEmergency,
          DeletionDate: null,
          ModifiedDate: null,
          CreationDate: CreationDate,
        };

        const user = await this.UserService.createUser(userDTO, tx);

        const doctorDTO: any = {
          UserId: user.Id,
          Speciality: Speciality,
          MedicalLicenseNumber: MedicalLicenseNumber,
          YearsOfExperience: YearsOfExperience,
          Department: Department,
          PatientsAssigned: [],
          WorkScheduleDetails: JSON.stringify(WorkScheduleDetails),
          Certifications: Certifications,
          ResearchPublications: ResearchPublications,
          SupervisingNurses: SupervisingNurses,
          Specialization: Specialization || "",
          Qualifications: Qualifications
            ? [Qualifications]
            : [],
          EmergencyAvailability: EmergencyAvailability || false,
          Notes: Notes,
          Address: Address,
          DeletionDate: null,
          ModifiedDate: new Date().toISOString(),
          CreationDate: new Date().toISOString(),
        };

        const doctor = await this.DoctorServices.createDoctor(doctorDTO, tx);

        const { Password: _, ...userWithoutPassword } = user;
        return { ...doctor, UserInfo: userWithoutPassword };
      });

      sendResponse(res, "ok", 201, "Médico criado com sucesso", result);
    } catch (error) {
      this.LoggingService.log("error", "Erro ao criar médico", {
        error,
        body: req.body,
        method: "Doctor/createDoctor",
        status: 404,
      });

      if (error instanceof CreateError) {
        sendResponse(res, "error", 404, error.message, null);
      } else {
        sendResponse(res, "error", 404, "Erro ao criar médico", null);
      }
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctorId = parseInt(req.params.id);
      const doctor = await this.DoctorServices.getDoctorById(doctorId);

      if (!doctor) {
        sendResponse(res, "error", 404, "Médico não encontrado", null);
        return;
      }

      const updatedDoctor = await this.DoctorServices.deleteDoctor(doctorId);
      await this.UserService.deleteUser(doctor.UserId);

      sendResponse(
        res,
        "ok",
        200,
        "Médico deletado com sucesso",
        updatedDoctor
      );
    } catch (error) {
      this.LoggingService.log("error", "Erro ao deletar médico", {
        error,
        body: req.body,
        method: "Doctor/deleteDoctor",
        status: 404,
      });

      sendResponse(res, "error", 404, "Erro ao deletar médico", null);
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.DoctorServices.getDoctorById(req.body.id);

      if (!doctor) {
        sendResponse(res, "error", 404, "Médico não encontrado", null);
        return;
      }

      const updatedDoctor = await this.DoctorServices.updateDoctor(req.body);

      sendResponse(
        res,
        "ok",
        200,
        "Médico atualizado com sucesso",
        updatedDoctor
      );
    } catch (error) {
      this.LoggingService.log("error", "Erro ao atualizar médico", {
        error,
        body: req.body,
        method: "Doctor/updateDoctor",
        status: 404,
      });
      sendResponse(res, "error", 404, "Erro ao atualizar médico", null);
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<void> {
    try {
      const doctor = await this.DoctorServices.getDoctorById(req.body.id);

      if (!doctor) {
        sendResponse(res, "error", 404, "Médico não encontrado", null);
        return;
      }

      sendResponse(res, "ok", 200, "Sucesso", doctor);
    } catch (error) {
      sendResponse(res, "error", 404, "Erro ao buscar médico", null);
    }
  }
}
