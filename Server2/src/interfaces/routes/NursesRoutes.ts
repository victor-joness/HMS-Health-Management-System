import { Router } from "express";
import { NurseRepositoryImplementation } from "../../core/implementation/NurseRepositoryImplementation";
import { NurseServices } from "../../core/services/NurseServices";
import { NurseController } from "../controllers/NurseController";
import { LoggingService } from "../../core/services/LoggingService";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { isAdmin } from "../middlewares/AuthMiddleware";

const router = Router();
const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const nurseRepository = new NurseRepositoryImplementation();
const nurseServices = new NurseServices(nurseRepository);
const nurseController = new NurseController(nurseServices, loggingService);

/**
 * @swagger
 * tags:
 *   name: Nurses
 *   description: Endpoints para gerenciar enfermeiros.
 *
 * /api/nurses:
 *   get:
 *     summary: Obter todos os enfermeiros
 *     tags: [Nurses]
 *     responses:
 *       200:
 *         description: Lista de enfermeiros encontrada com sucesso.
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
 *                   department:
 *                     type: string
 *       404:
 *         description: Não foi possível buscar os enfermeiros.
 *
 *   post:
 *     summary: Criar um novo enfermeiro
 *     tags: [Nurses]
 *     requestBody:
 *       description: Dados do enfermeiro a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enfermeiro criado com sucesso.
 *       404:
 *         description: Não foi possível criar o enfermeiro.
 *
 * /api/nurses/{id}:
 *   get:
 *     summary: Obter informações de um enfermeiro por ID
 *     tags: [Nurses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do enfermeiro
 *     responses:
 *       200:
 *         description: Informações do enfermeiro retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 department:
 *                   type: string
 *       404:
 *         description: Enfermeiro não encontrado.
 *
 *   put:
 *     summary: Atualizar informações de um enfermeiro
 *     tags: [Nurses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do enfermeiro
 *     requestBody:
 *       description: Dados do enfermeiro a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enfermeiro atualizado com sucesso.
 *       404:
 *         description: Não foi possível atualizar o enfermeiro.
 *
 *   delete:
 *     summary: Deletar um enfermeiro
 *     tags: [Nurses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do enfermeiro
 *     responses:
 *       200:
 *         description: Enfermeiro deletado com sucesso.
 *       404:
 *         description: Não foi possível deletar o enfermeiro.
 */

if (process.env.NODE_ENV !== "DEV") {
  router.get("/", (req, res) => nurseController.getAllNurses(req, res));
  router.post("/", (req, res) => nurseController.createNurse(req, res));
  router.put("/:id", (req, res) => nurseController.updateNurse(req, res));
  router.delete("/:id", (req, res) => nurseController.deleteNurse(req, res));
  router.get("/:id", (req, res) => nurseController.getNurseById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => nurseController.getAllNurses(req, res));
  router.post("/", isAdmin, (req, res) => nurseController.createNurse(req, res));
  router.put("/:id", isAdmin, (req, res) => nurseController.updateNurse(req, res));
  router.delete("/:id", isAdmin, (req, res) => nurseController.deleteNurse(req, res));
  router.get("/:id", isAdmin, (req, res) => nurseController.getNurseById(req, res));
}

export default router;