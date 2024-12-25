import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { DoctorRepositoryImplementation } from "../../core/implementation/DoctorRepositoryImplementation";
import { DoctorController } from "../controllers/DoctorController";
import { DoctorServices } from "../../core/services/DoctorServices";
import { isAdmin } from "../middlewares/AuthMiddleware";

const router = Router();
const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const doctorRepository = new DoctorRepositoryImplementation();
const doctorServices = new DoctorServices(doctorRepository);
const doctorController = new DoctorController(doctorServices, loggingService);

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Endpoints para gerenciar médicos.
 *
 * /api/doctors:
 *   get:
 *     summary: Obter todos os médicos
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: Lista de médicos encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   specialization:
 *                     type: string
 *       404:
 *         description: Não foi possível buscar os médicos.
 *
 *   post:
 *     summary: Criar um novo médico
 *     tags: [Doctors]
 *     requestBody:
 *       description: Dados do médico a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico criado com sucesso.
 *       404:
 *         description: Não foi possível criar o médico.
 *
 * /api/doctors/{id}:
 *   get:
 *     summary: Obter informações de um médico por ID
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Informações do médico retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 specialization:
 *                   type: string
 *       404:
 *         description: Médico não encontrado.
 *
 *   put:
 *     summary: Atualizar informações de um médico
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do médico
 *     requestBody:
 *       description: Dados do médico a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso.
 *       404:
 *         description: Não foi possível atualizar o médico.
 *
 *   delete:
 *     summary: Deletar um médico
 *     tags: [Doctors]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do médico
 *     responses:
 *       200:
 *         description: Médico deletado com sucesso.
 *       404:
 *         description: Não foi possível deletar o médico.
 */

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
