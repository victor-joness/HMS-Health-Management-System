import { Router } from "express";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { ReceptionistController } from "../controllers/ReceptionistController";
import { ReceptionistRepositoryImplementation } from "../../core/implementation/ReceptionistRepositoryImplementation";
import { ReceptionistService } from "../../core/services/ReceptionistServices";
import { LoggingService } from "../../core/services/LoggingService";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";

const router = Router();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const receptionistRepository = new ReceptionistRepositoryImplementation();
const receptionistService = new ReceptionistService(receptionistRepository);
const receptionistController = new ReceptionistController(
  receptionistService,
  loggingService
);

//#region Swagger Docs

/**
 * @swagger
 * tags:
 *   name: Receptionists
 *   description: Endpoints para gerenciar recepcionistas.
 *
 * /api/receptionists:
 *   get:
 *     summary: Obter todos os recepcionistas
 *     tags: [Receptionists]
 *     responses:
 *       200:
 *         description: Lista de recepcionistas encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único do recepcionista
 *                   name:
 *                     type: string
 *                     description: Nome do recepcionista
 *                   email:
 *                     type: string
 *                     description: Email do recepcionista
 *                   phone:
 *                     type: string
 *                     description: Número de telefone do recepcionista
 *                   address:
 *                     type: string
 *                     description: Endereço do recepcionista
 *       404:
 *         description: Não foi possível buscar os recepcionistas.
 *   post:
 *     summary: Criar um novo recepcionista
 *     tags: [Receptionists]
 *     requestBody:
 *       description: Dados do recepcionista a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do recepcionista
 *               email:
 *                 type: string
 *                 description: Email do recepcionista
 *               phone:
 *                 type: string
 *                 description: Número de telefone do recepcionista
 *               address:
 *                 type: string
 *                 description: Endereço do recepcionista
 *     responses:
 *       201:
 *         description: Recepcionista criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do recepcionista
 *                 name:
 *                   type: string
 *                   description: Nome do recepcionista
 *                 email:
 *                   type: string
 *                   description: Email do recepcionista
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do recepcionista
 *                 address:
 *                   type: string
 *                   description: Endereço do recepcionista
 *       404:
 *         description: Não foi possível criar o recepcionista.
 *
 * /api/receptionists/{id}:
 *   get:
 *     summary: Obter informações de um recepcionista por ID
 *     tags: [Receptionists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do recepcionista
 *     responses:
 *       200:
 *         description: Informações do recepcionista retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do recepcionista
 *                 name:
 *                   type: string
 *                   description: Nome do recepcionista
 *                 email:
 *                   type: string
 *                   description: Email do recepcionista
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do recepcionista
 *                 address:
 *                   type: string
 *                   description: Endereço do recepcionista
 *       404:
 *         description: Recepcionista não encontrado.
 *   put:
 *     summary: Atualizar informações de um recepcionista
 *     tags: [Receptionists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do recepcionista
 *     requestBody:
 *       description: Dados do recepcionista a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do recepcionista
 *               email:
 *                 type: string
 *                 description: Email do recepcionista
 *               phone:
 *                 type: string
 *                 description: Número de telefone do recepcionista
 *               address:
 *                 type: string
 *                 description: Endereço do recepcionista
 *     responses:
 *       200:
 *         description: Recepcionista atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do recepcionista
 *                 name:
 *                   type: string
 *                   description: Nome do recepcionista
 *                 email:
 *                   type: string
 *                   description: Email do recepcionista
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do recepcionista
 *                 address:
 *                   type: string
 *                   description: Endereço do recepcionista
 *       404:
 *         description: Não foi possível atualizar o recepcionista.
 *   delete:
 *     summary: Deletar um recepcionista
 *     tags: [Receptionists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do recepcionista
 *     responses:
 *       200:
 *         description: Recepcionista deletado com sucesso.
 *       404:
 *         description: Não foi possível deletar o recepcionista.
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => receptionistController.getAll(req, res));
  router.post("/", (req, res) => receptionistController.createReceptionist(req, res));
  router.put("/:id", (req, res) => receptionistController.updateReceptionist(req, res));
  router.delete("/:id", (req, res) => receptionistController.deleteReceptionist(req, res));
  router.get("/:id", (req, res) => receptionistController.getReceptionist(req, res));
} else {
  router.get("/", isAdmin, (req, res) => receptionistController.getAll(req, res));
  router.post("/", isAdmin, (req, res) => receptionistController.createReceptionist(req, res));
  router.put("/:id", isAdmin, (req, res) => receptionistController.updateReceptionist(req, res));
  router.delete("/:id", isAdmin, (req, res) => receptionistController.deleteReceptionist(req, res));
  router.get("/:id", isAdmin, (req, res) => receptionistController.getReceptionist(req, res));
}

export default router;
