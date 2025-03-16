import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { BedRepositoryImplementation } from "../../core/implementation/BedRepositoryImplementation";
import { BedService } from "../../core/services/BedService";
import { BedController } from "../controllers/BedController";
import { RedisCache } from "../../infrastructure/cache/RedisCache";

const router = Router();
const cacheService = new RedisCache();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const bedRepository = new BedRepositoryImplementation();
const bedServices = new BedService(bedRepository, cacheService);
const bedController = new BedController(bedServices, loggingService);

//#region Swagger Docs

/**
 * @swagger
 * tags:
 *   - name: Beds
 *     description: API para gerenciar leitos
 *
 * /beds:
 *   get:
 *     summary: Lista todos os leitos
 *     tags: [Beds]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de leitos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bed'
 *
 *   post:
 *     summary: Cria um novo leito
 *     tags: [Beds]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bed'
 *     responses:
 *       201:
 *         description: Leito criado com sucesso
 *
 * /beds/{id}:
 *   get:
 *     summary: Obtém um leito pelo ID
 *     tags: [Beds]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Leito encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bed'
 *
 *   put:
 *     summary: Atualiza um leito existente
 *     tags: [Beds]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bed'
 *     responses:
 *       200:
 *         description: Leito atualizado com sucesso
 *
 *   delete:
 *     summary: Exclui um leito
 *     tags: [Beds]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Leito excluído com sucesso
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => bedController.getAllBeds(req, res));
  router.post("/", (req, res) => bedController.createBed(req, res));
  router.put("/:id", (req, res) => bedController.updateBed(req, res));
  router.delete("/:id", (req, res) => bedController.deleteBed(req, res));
  router.get("/:id", (req, res) => bedController.getBedById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => bedController.getAllBeds(req, res));
  router.post("/", isAdmin, (req, res) => bedController.createBed(req, res));
  router.put("/:id", isAdmin, (req, res) => bedController.updateBed(req, res));
  router.delete("/:id", isAdmin, (req, res) => bedController.deleteBed(req, res));
  router.get("/:id", isAdmin, (req, res) => bedController.getBedById(req, res));
}

export default router;
