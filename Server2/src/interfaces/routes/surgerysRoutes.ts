import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { SurgeryRepositoryImplementation } from "../../core/implementation/SurgeryRepositoryImplementation";
import { SurgeryService } from "../../core/services/SurgeryService";
import { SurgeryController } from "../controllers/SurgeryController";
import { isAdmin } from "../middlewares/AuthMiddleware";

const router = Router();
const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const surgeryRepository = new SurgeryRepositoryImplementation();
const surgeryServices = new SurgeryService(surgeryRepository);
const surgeryController = new SurgeryController(surgeryServices, loggingService);


/**
 * @swagger
 * tags:
 *   - name: Surgery
 *     description: API para gerenciamento de cirurgias
 */

/**
 * @swagger
 * /api/surgery:
 *   get:
 *     summary: Retorna todas as cirurgias
 *     tags: [Surgery]
 *     responses:
 *       200:
 *         description: Sucesso ao buscar todas as cirurgias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Sucesso
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       patient_id:
 *                         type: integer
 *                         example: 123
 *                       surgery_type:
 *                         type: string
 *                         example: Cirurgia cardíaca
 *                       surgery_date:
 *                         type: string
 *                         example: "2024-12-20T10:00:00Z"
 *                       doctor_id:
 *                         type: integer
 *                         example: 45
 *                       surgery_status:
 *                         type: string
 *                         example: Em andamento
 *       404:
 *         description: Erro ao buscar cirurgias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Erro ao buscar cirurgias
 */

/**
 * @swagger
 * /api/surgery:
 *   post:
 *     summary: Cria uma nova cirurgia
 *     tags: [Surgery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 example: 123
 *               surgery_type:
 *                 type: string
 *                 example: Cirurgia cardíaca
 *               surgery_date:
 *                 type: string
 *                 example: "2024-12-20T10:00:00Z"
 *               doctor_id:
 *                 type: integer
 *                 example: 45
 *               surgery_status:
 *                 type: string
 *                 example: Em andamento
 *     responses:
 *       201:
 *         description: Cirurgia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Cirurgia criada com sucesso
 *       404:
 *         description: Erro ao criar cirurgia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Erro ao criar cirurgia
 */

/**
 * @swagger
 * /api/surgery/{id}:
 *   get:
 *     summary: Retorna uma cirurgia pelo ID
 *     tags: [Surgery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da cirurgia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso ao buscar cirurgia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     patient_id:
 *                       type: integer
 *                       example: 123
 *                     surgery_type:
 *                       type: string
 *                       example: Cirurgia cardíaca
 *                     surgery_date:
 *                       type: string
 *                       example: "2024-12-20T10:00:00Z"
 *                     doctor_id:
 *                       type: integer
 *                       example: 45
 *                     surgery_status:
 *                       type: string
 *                       example: Em andamento
 *       404:
 *         description: Erro ao buscar cirurgia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Erro ao buscar cirurgia
 */

/**
 * @swagger
 * /api/surgery/{id}:
 *   put:
 *     summary: Atualiza os dados de uma cirurgia
 *     tags: [Surgery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da cirurgia
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 example: 123
 *               surgery_type:
 *                 type: string
 *                 example: Cirurgia cardíaca
 *               surgery_date:
 *                 type: string
 *                 example: "2024-12-20T10:00:00Z"
 *               doctor_id:
 *                 type: integer
 *                 example: 45
 *               surgery_status:
 *                 type: string
 *                 example: Em andamento
 *     responses:
 *       200:
 *         description: Cirurgia atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Cirurgia atualizada com sucesso
 *       404:
 *         description: Erro ao atualizar cirurgia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Erro ao atualizar cirurgia
 */

/**
 * @swagger
 * /api/surgery/{id}:
 *   delete:
 *     summary: Deleta uma cirurgia pelo ID
 *     tags: [Surgery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da cirurgia
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cirurgia deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Cirurgia deletada com sucesso
 *       404:
 *         description: Erro ao deletar cirurgia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Erro ao deletar cirurgia
 */
if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => surgeryController.getAllSurgerys(req, res));
  router.post("/", (req, res) => surgeryController.createSurgery(req, res));
  router.put("/:id", (req, res) => surgeryController.updateSurgery(req, res));
  router.delete("/:id", (req, res) => surgeryController.deleteSurgery(req, res));
  router.get("/:id", (req, res) => surgeryController.getSurgeryById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => surgeryController.getAllSurgerys(req, res));
  router.post("/", isAdmin, (req, res) => surgeryController.createSurgery(req, res));
  router.put("/:id", isAdmin, (req, res) => surgeryController.updateSurgery(req, res));
  router.delete("/:id", isAdmin, (req, res) => surgeryController.deleteSurgery(req, res));
  router.get("/:id", isAdmin, (req, res) => surgeryController.getSurgeryById(req, res));
}

export default router;