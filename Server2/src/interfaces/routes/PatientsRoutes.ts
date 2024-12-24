import { Router } from "express";
import { isAdmin } from "../../interfaces/middlewares/AuthMiddleware";
import { PatientController } from "../controllers/PatientController";
import { PatientRepositoryImplementation } from "../../core/implementation/PatientRepositoryImplementation";
import { PatientService } from "../../core/services/PatientService";
import { LoggingService } from "../../core/services/LoggingService";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";

const router = Router();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const patientRepository = new PatientRepositoryImplementation();
const patientServices = new PatientService(patientRepository);
const patientController = new PatientController(
  patientServices,
  loggingService
);

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Endpoints para gerenciar pacientes.
 *
 * /api/patients:
 *   get:
 *     summary: Obter todos os pacientes
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Lista de pacientes encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único do paciente
 *                   name:
 *                     type: string
 *                     description: Nome do paciente
 *                   email:
 *                     type: string
 *                     description: Email do paciente
 *                   phone:
 *                     type: string
 *                     description: Número de telefone do paciente
 *                   address:
 *                     type: string
 *                     description: Endereço do paciente
 *       404:
 *         description: Não foi possível buscar os pacientes.
 *   post:
 *     summary: Criar um novo paciente
 *     tags: [Patients]
 *     requestBody:
 *       description: Dados do paciente a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do paciente
 *               email:
 *                 type: string
 *                 description: Email do paciente
 *               phone:
 *                 type: string
 *                 description: Número de telefone do paciente
 *               address:
 *                 type: string
 *                 description: Endereço do paciente
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do paciente
 *                 name:
 *                   type: string
 *                   description: Nome do paciente
 *                 email:
 *                   type: string
 *                   description: Email do paciente
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do paciente
 *                 address:
 *                   type: string
 *                   description: Endereço do paciente
 *       404:
 *         description: Não foi possível criar o paciente.
 *
 * /api/patients/{id}:
 *   get:
 *     summary: Obter informações de um paciente por ID
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Informações do paciente retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do paciente
 *                 name:
 *                   type: string
 *                   description: Nome do paciente
 *                 email:
 *                   type: string
 *                   description: Email do paciente
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do paciente
 *                 address:
 *                   type: string
 *                   description: Endereço do paciente
 *       404:
 *         description: Paciente não encontrado.
 *   put:
 *     summary: Atualizar informações de um paciente
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     requestBody:
 *       description: Dados do paciente a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do paciente
 *               email:
 *                 type: string
 *                 description: Email do paciente
 *               phone:
 *                 type: string
 *                 description: Número de telefone do paciente
 *               address:
 *                 type: string
 *                 description: Endereço do paciente
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do paciente
 *                 name:
 *                   type: string
 *                   description: Nome do paciente
 *                 email:
 *                   type: string
 *                   description: Email do paciente
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do paciente
 *                 address:
 *                   type: string
 *                   description: Endereço do paciente
 *       404:
 *         description: Não foi possível atualizar o paciente.
 *   delete:
 *     summary: Deletar um paciente
 *     tags: [Patients]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente deletado com sucesso.
 *       404:
 *         description: Não foi possível deletar o paciente.
 */

if (process.env.NODE_ENV !== "DEV") {
  router.get("/", (req, res) => patientController.getAll(req, res));
  router.post("/", (req, res) => patientController.createPatient(req, res));
  router.put("/:id", (req, res) => patientController.updatePatient(req, res));
  router.delete("/:id", (req, res) => patientController.deletePatient(req, res));
  router.get("/:id", (req, res) => patientController.getPatient(req, res));
} else {
  router.get("/", isAdmin, (req, res) => patientController.getAll(req, res));
  router.post("/", isAdmin, (req, res) => patientController.createPatient(req, res));
  router.put("/:id", isAdmin, (req, res) => patientController.updatePatient(req, res));
  router.delete("/:id", isAdmin, (req, res) => patientController.deletePatient(req, res));
  router.get("/:id", isAdmin, (req, res) => patientController.getPatient(req, res));
}

export default router;
