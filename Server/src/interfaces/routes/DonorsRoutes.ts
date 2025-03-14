import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { DonorRepositoryImplementation } from "../../core/implementation/DonorRepositoryImplementation";
import { DonorService } from "../../core/services/DonorService";
import { DonorsController } from "../controllers/DonorsRoutes";
import { isAdmin } from "../middlewares/AuthMiddleware";

const router = Router();
const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const donorRepository = new DonorRepositoryImplementation();
const donorServices = new DonorService(donorRepository);
const donorController = new DonorsController(donorServices, loggingService);

//#region Swagger Docs

/**
 * @swagger
 * tags:
 *   - name: Donors
 *     description: API para gerenciamento de doadores
 * /api/donors:
 *   get:
 *     summary: Retorna todos os doadores
 *     tags: [Donors]
 *     responses:
 *       200:
 *         description: Sucesso ao buscar todos os doadores
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
 *                       name:
 *                         type: string
 *                         example: João Silva
 *                       email:
 *                         type: string
 *                         example: joao.silva@example.com
 *       404:
 *         description: Erro ao buscar doadores
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
 *                   example: Erro ao buscar doadores
 */

/**
 * @swagger
 * /api/donors:
 *   post:
 *     summary: Cria um novo doador
 *     tags: [Donors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao.silva@example.com
 *     responses:
 *       201:
 *         description: Doador criado com sucesso
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
 *                   example: Doador criado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao.silva@example.com
 *       404:
 *         description: Erro ao criar doador
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
 *                   example: Erro ao criar doador
 */

/**
 * @swagger
 * /api/donors/{id}:
 *   get:
 *     summary: Retorna um doador pelo ID
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do doador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso ao buscar doador
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
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao.silva@example.com
 *       404:
 *         description: Erro ao buscar doador
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
 *                   example: Erro ao buscar doador
 */

/**
 * @swagger
 * /api/donors/{id}:
 *   put:
 *     summary: Atualiza os dados de um doador
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do doador
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao.silva@example.com
 *     responses:
 *       200:
 *         description: Doador atualizado com sucesso
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
 *                   example: Doador atualizado com sucesso
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: João Silva
 *                     email:
 *                       type: string
 *                       example: joao.silva@example.com
 *       404:
 *         description: Erro ao atualizar doador
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
 *                   example: Erro ao atualizar doador
 */

/**
 * @swagger
 * /api/donors/{id}:
 *   delete:
 *     summary: Deleta um doador pelo ID
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do doador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Doador deletado com sucesso
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
 *                   example: Doador deletado com sucesso
 *       404:
 *         description: Erro ao deletar doador
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
 *                   example: Erro ao deletar doador
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => donorController.getAllDonors(req, res));
  router.post("/", (req, res) => donorController.createDonor(req, res));
  router.put("/:id", (req, res) => donorController.updateDonor(req, res));
  router.delete("/:id", (req, res) => donorController.deleteDonor(req, res));
  router.get("/:id", (req, res) => donorController.getDonorById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => donorController.getAllDonors(req, res));
  router.post("/", isAdmin, (req, res) => donorController.createDonor(req, res));
  router.put("/:id", isAdmin, (req, res) => donorController.updateDonor(req, res));
  router.delete("/:id", isAdmin, (req, res) => donorController.deleteDonor(req, res));
  router.get("/:id", isAdmin, (req, res) => donorController.getDonorById(req, res));
}

export default router;
