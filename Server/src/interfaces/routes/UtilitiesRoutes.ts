import { Router } from "express";
import { UtilitiesController } from "../controllers/UtilitiesController";
import { UtilitiesService } from "../../core/services/UtilitiesService";
import { LoggingService } from "../../core/services/LoggingService";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { UtilitiesRepositoryImplementation } from "../../core/implementation/UtilitiesRepositoryImplementation";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { RedisCache } from "../../infrastructure/cache/RedisCache";

const router = Router();
const cacheService = new RedisCache();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);
const utilityRepository = new UtilitiesRepositoryImplementation();
const utilitiesService = new UtilitiesService(utilityRepository, cacheService);
const utilitiesController = new UtilitiesController(utilitiesService, loggingService);

//#region Swagger Documentation

/**
 * @swagger
 * tags:
 *   name: Utilities
 *   description: Endpoints para gerenciar utilitários.
 *
 * /api/utilities:
 *   get:
 *     summary: Obter todas as utilidades
 *     tags: [Utilities]
 *     responses:
 *       200:
 *         description: Lista de utilidades encontrada com sucesso.
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
 *                   type:
 *                     type: string
 *                   status:
 *                     type: string
 *                   location:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *       404:
 *         description: Não foi possível buscar as utilidades.
 *
 *   post:
 *     summary: Criar uma nova utilidade
 *     tags: [Utilities]
 *     requestBody:
 *       description: Dados da utilidade a ser criada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *               location:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Utilidade criada com sucesso.
 *       400:
 *         description: Requisição inválida.
 *
 * /api/utilities/{id}:
 *   get:
 *     summary: Obter informações de uma utilidade por ID
 *     tags: [Utilities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da utilidade
 *     responses:
 *       200:
 *         description: Informações da utilidade retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 status:
 *                   type: string
 *                 location:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *       404:
 *         description: Utilidade não encontrada.
 *
 *   put:
 *     summary: Atualizar informações de uma utilidade
 *     tags: [Utilities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da utilidade
 *     requestBody:
 *       description: Dados da utilidade a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *               location:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Utilidade atualizada com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Utilidade não encontrada.
 *
 *   delete:
 *     summary: Deletar uma utilidade
 *     tags: [Utilities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da utilidade
 *     responses:
 *       200:
 *         description: Utilidade deletada com sucesso.
 *       404:
 *         description: Não foi possível deletar a utilidade.
 *
 * /api/utilities/type/{type}:
 *   get:
 *     summary: Obter utilidades por tipo
 *     tags: [Utilities]
 *     parameters:
 *       - name: type
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de utilidade
 *     responses:
 *       200:
 *         description: Lista de utilidades filtrada por tipo.
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
 *                   type:
 *                     type: string
 *                   status:
 *                     type: string
 *                   location:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *       404:
 *         description: Nenhuma utilidade encontrada para o tipo especificado.
 *
 * /api/utilities/health:
 *   get:
 *     summary: Verificar o status do sistema
 *     tags: [Utilities]
 *     responses:
 *       200:
 *         description: Status do sistema retornado com sucesso.
 *
 * /api/utilities/stats:
 *   get:
 *     summary: Obter estatísticas do sistema
 *     tags: [Utilities]
 *     responses:
 *       200:
 *         description: Estatísticas do sistema retornadas com sucesso.
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
    router.get("/health", (req, res) => utilitiesController.getSystemHealth(req, res));
    router.get("/stats", (req, res) => utilitiesController.getSystemStats(req, res));
    router.post("/", (req, res) => utilitiesController.createUtility(req, res));
    router.get("/", (req, res) => utilitiesController.getUtilities(req, res));
    router.get("/:id", (req, res) => utilitiesController.getUtilityById(req, res));
    router.put("/:id", (req, res) => utilitiesController.updateUtility(req, res));
    router.delete("/:id", (req, res) => utilitiesController.deleteUtility(req, res));
    router.get("/type/:type", (req, res) => utilitiesController.getUtilitiesByType(req, res));
}else{
    router.get("/health", isAdmin, (req, res) => utilitiesController.getSystemHealth(req, res));
    router.get("/stats", isAdmin,(req, res) => utilitiesController.getSystemStats(req, res));
    router.post("/", isAdmin,(req, res) => utilitiesController.createUtility(req, res));
    router.get("/", isAdmin,(req, res) => utilitiesController.getUtilities(req, res));
    router.get("/:id", isAdmin,(req, res) => utilitiesController.getUtilityById(req, res));
    router.put("/:id", isAdmin,(req, res) => utilitiesController.updateUtility(req, res));
    router.delete("/:id", isAdmin,(req, res) => utilitiesController.deleteUtility(req, res));
    router.get("/type/:type", isAdmin,(req, res) => utilitiesController.getUtilitiesByType(req, res));
}

export default router;