import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { pharmaciesRepositoryImplementation } from "../../core/implementation/PharmaciesRepositoryImplementation";
import { PharmaciesServices } from "../../core/services/PharmaciesService";
import { PharmaciesController } from "../controllers/PharmaciesController";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { RedisCache } from "../../infrastructure/cache/RedisCache";

const router = Router();

const cacheService = new RedisCache();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const pharmaciesRepository = new pharmaciesRepositoryImplementation();
const pharmaciesServices = new PharmaciesServices(pharmaciesRepository, cacheService);
const pharmaciesController = new PharmaciesController(
  pharmaciesServices,
  loggingService
);

//#region 

/**
 * @swagger
 * tags:
 *   name: Pharmacies
 *   description: Endpoints para gerenciar farmácias.
 *
 * /api/pharmacies:
 *   get:
 *     summary: Obter todas as farmácias
 *     tags: [Pharmacies]
 *     responses:
 *       200:
 *         description: Lista de farmácias encontrada com sucesso.
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
 *                   address:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *                   cnpj:
 *                     type: string
 *                   opening_hours:
 *                     type: string
 *                   is_active:
 *                     type: string
 *       404:
 *         description: Não foi possível buscar as farmácias.
 *
 *   post:
 *     summary: Criar uma nova farmácia
 *     tags: [Pharmacies]
 *     requestBody:
 *       description: Dados da farmácia a ser criada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               opening_hours:
 *                 type: string
 *               is_active:
 *                 type: string
 *     responses:
 *       201:
 *         description: Farmácia criada com sucesso.
 *       404:
 *         description: Não foi possível criar a farmácia.
 *
 * /api/pharmacies/{id}:
 *   get:
 *     summary: Obter informações de uma farmácia por ID
 *     tags: [Pharmacies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da farmácia
 *     responses:
 *       200:
 *         description: Informações da farmácia retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cnpj:
 *                   type: string
 *                 opening_hours:
 *                   type: string
 *                 is_active:
 *                   type: string
 *       404:
 *         description: Farmácia não encontrada.
 *
 *   put:
 *     summary: Atualizar informações de uma farmácia
 *     tags: [Pharmacies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da farmácia
 *     requestBody:
 *       description: Dados da farmácia a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               opening_hours:
 *                 type: string
 *               is_active:
 *                 type: string
 *     responses:
 *       200:
 *         description: Farmácia atualizada com sucesso.
 *       404:
 *         description: Não foi possível atualizar a farmácia.
 *
 *   delete:
 *     summary: Deletar uma farmácia
 *     tags: [Pharmacies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da farmácia
 *     responses:
 *       200:
 *         description: Farmácia deletada com sucesso.
 *       404:
 *         description: Não foi possível deletar a farmácia.
 *
 * /api/pharmacies/cnpj/{cnpj}:
 *   get:
 *     summary: Obter farmácia por CNPJ
 *     tags: [Pharmacies]
 *     parameters:
 *       - name: cnpj
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: CNPJ da farmácia
 *     responses:
 *       200:
 *         description: Informações da farmácia retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cnpj:
 *                   type: string
 *                 opening_hours:
 *                   type: string
 *                 is_active:
 *                   type: string
 *       404:
 *         description: Farmácia não encontrada pelo CNPJ.
 */


//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => pharmaciesController.getAllPharmacies(req, res));
  router.post("/", (req, res) => pharmaciesController.createPharmacy(req, res));
  router.put("/:id", (req, res) => pharmaciesController.updatePharmacy(req, res));
  router.delete("/:id", (req, res) => pharmaciesController.deletePharmacy(req, res));
  router.get("/:id", (req, res) => pharmaciesController.getPharmacyById(req, res));
  router.get("/:id", (req, res) => pharmaciesController.getPharmacyByCnpj(req, res));
} else {
  router.get("/", isAdmin, (req, res) => pharmaciesController.getAllPharmacies(req, res));
  router.post("/", isAdmin, (req, res) => pharmaciesController.createPharmacy(req, res));
  router.put("/:id", isAdmin, (req, res) => pharmaciesController.updatePharmacy(req, res));
  router.delete("/:id", isAdmin, (req, res) => pharmaciesController.deletePharmacy(req, res));
  router.get("/:id", isAdmin, (req, res) => pharmaciesController.getPharmacyById(req, res));
  router.get("/:id", isAdmin, (req, res) => pharmaciesController.getPharmacyByCnpj(req, res));
}

export default router;