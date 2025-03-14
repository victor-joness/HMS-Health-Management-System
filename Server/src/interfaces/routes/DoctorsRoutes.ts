import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { DoctorRepositoryImplementation } from "../../core/implementation/DoctorRepositoryImplementation";
import { DoctorController } from "../controllers/DoctorController";
import { DoctorServices } from "../../core/services/DoctorServices";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { UserRepositoryImplementation } from "../../core/implementation/UserRepositoryImplementation";
import { UserServices } from "../../core/services/UserServices";

const router = Router();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const userRepository = new UserRepositoryImplementation();
const userService = new UserServices(userRepository);

const doctorRepository = new DoctorRepositoryImplementation();
const doctorServices = new DoctorServices(doctorRepository, userRepository);

const doctorController = new DoctorController(doctorServices, loggingService, userService);

//#region Swagger Docs

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Endpoints para gerenciar médicos.
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Lista todos os médicos
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: Lista de médicos recuperada com sucesso.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Cria um novo médico
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Médico criado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Obtém um médico pelo ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Médico encontrado com sucesso.
 *       404:
 *         description: Médico não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Atualiza um médico pelo ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Médico não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/doctors/{id}:
 *   delete:
 *     summary: Deleta um médico pelo ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Médico deletado com sucesso.
 *       404:
 *         description: Médico não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => doctorController.getAllDoctors(req, res));
  router.post("/", (req, res) => doctorController.createDoctor(req, res));
  router.put("/:id", (req, res) => doctorController.updateDoctor(req, res));
  router.delete("/:id", (req, res) => doctorController.deleteDoctor(req, res));
  router.get("/:id", (req, res) => doctorController.getDoctorById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => doctorController.getAllDoctors(req, res));
  router.post("/", isAdmin, (req, res) => doctorController.createDoctor(req, res));
  router.put("/:id", isAdmin, (req, res) => doctorController.updateDoctor(req, res));
  router.delete("/:id", isAdmin, (req, res) => doctorController.deleteDoctor(req, res));
  router.get("/:id", isAdmin, (req, res) => doctorController.getDoctorById(req, res));
}

export default router;
