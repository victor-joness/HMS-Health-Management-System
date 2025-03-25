import { Router } from "express";
import { HospitalsRepositoryImplementation } from "../../core/implementation/HospitalsRepositoryImplementation";
import { HospitalsServices } from "../../core/services/HospitalsService";
import { HospitalsController } from "../controllers/HospitalsController";
import { LoggingService } from "../../core/services/LoggingService";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { RedisCache } from "../../infrastructure/cache/RedisCache";

const router = Router();
const cacheService = new RedisCache();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const hospitalRepository = new HospitalsRepositoryImplementation();
const hospitalsServices = new HospitalsServices(hospitalRepository);
const hospitalsController = new HospitalsController(hospitalsServices, loggingService);

/**
 * @swagger
 * tags:
 *   - name: Hospitals
 *     description: API para gerenciar hospitais
 *
 * /api/hospitals:
 *   get:
 *     summary: Lista todos os hospitais
 *     tags: [Hospitals]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de hospitais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hospital'
 *
 *   post:
 *     summary: Cria um novo hospital
 *     tags: [Hospitals]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Nome do hospital
 *               Address:
 *                 type: string
 *                 description: Endereço do hospital
 *               City:
 *                 type: string
 *                 description: Cidade do hospital
 *               State:
 *                 type: string
 *                 description: Estado do hospital
 *               PostalCode:
 *                 type: string
 *                 description: Código postal do hospital
 *               Country:
 *                 type: string
 *                 description: País do hospital
 *               PhoneNumber:
 *                 type: string
 *                 description: Número de telefone do hospital
 *               Email:
 *                 type: string
 *                 description: E-mail do hospital
 *               Website:
 *                 type: string
 *                 description: Website do hospital
 *               IsActive:
 *                 type: boolean
 *                 description: Status de atividade do hospital
 *     responses:
 *       201:
 *         description: Hospital criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *
 * /api/hospitals/{id}:
 *   get:
 *     summary: Obtém um hospital pelo ID
 *     tags: [Hospitals]
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
 *         description: Hospital encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hospital'
 *
 *   put:
 *     summary: Atualiza um hospital existente
 *     tags: [Hospitals]
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
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Nome do hospital
 *               Address:
 *                 type: string
 *                 description: Endereço do hospital
 *               City:
 *                 type: string
 *                 description: Cidade do hospital
 *               State:
 *                 type: string
 *                 description: Estado do hospital
 *               PostalCode:
 *                 type: string
 *                 description: Código postal do hospital
 *               Country:
 *                 type: string
 *                 description: País do hospital
 *               PhoneNumber:
 *                 type: string
 *                 description: Número de telefone do hospital
 *               Email:
 *                 type: string
 *                 description: E-mail do hospital
 *               Website:
 *                 type: string
 *                 description: Website do hospital
 *               IsActive:
 *                 type: boolean
 *                 description: Status de atividade do hospital
 *     responses:
 *       200:
 *         description: Hospital atualizado com sucesso
 *
 *   delete:
 *     summary: Exclui um hospital
 *     tags: [Hospitals]
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
 *         description: Hospital excluído com sucesso
 */

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => hospitalsController.getAllHospitals(req, res));
  router.post("/", (req, res) => hospitalsController.createHospital(req, res));
  router.put("/:id", (req, res) => hospitalsController.updateHospital(req, res));
  router.delete("/:id", (req, res) => hospitalsController.deleteHospital(req, res));
  router.get("/:id", (req, res) => hospitalsController.getHospitalById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => hospitalsController.getAllHospitals(req, res));
  router.post("/", isAdmin, (req, res) => hospitalsController.createHospital(req, res));
  router.put("/:id", isAdmin, (req, res) => hospitalsController.updateHospital(req, res));
  router.delete("/:id", isAdmin, (req, res) => hospitalsController.deleteHospital(req, res));
  router.get("/:id", isAdmin, (req, res) => hospitalsController.getHospitalById(req, res));
}

export default router;
