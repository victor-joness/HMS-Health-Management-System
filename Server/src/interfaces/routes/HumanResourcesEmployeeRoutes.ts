import { Router } from "express";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { HumanResourcesEmployeeController } from "../controllers/humanResourcesEmployeeController";
import { HumanResourcesEmployeeRepositoryImplementation } from "../../core/implementation/HumanResourcesEmployeeRepositoryImplementation";
import { HumanResourcesEmployeeService } from "../../core/services/HumanResourcesEmployeeServices";
import { LoggingService } from "../../core/services/LoggingService";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { RedisCache } from "../../infrastructure/cache/RedisCache";

const router = Router();
const cacheService = new RedisCache();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const humanResourcesEmployeeRepository = new HumanResourcesEmployeeRepositoryImplementation();
const humanResourcesEmployeeService = new HumanResourcesEmployeeService(humanResourcesEmployeeRepository, cacheService);
const humanResourcesEmployeeController = new HumanResourcesEmployeeController(
  humanResourcesEmployeeService,
  loggingService
);

//#region Swagger Docs

/**
 * @swagger
 * tags:
 *   name: HumanResourcesEmployees
 *   description: Endpoints para gerenciar funcionários do RH.
 *
 * /api/human-resources-employees:
 *   get:
 *     summary: Obter todos os funcionários do RH
 *     tags: [HumanResourcesEmployees]
 *     responses:
 *       200:
 *         description: Lista de funcionários do RH encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único do funcionário do RH
 *                   name:
 *                     type: string
 *                     description: Nome do funcionário do RH
 *                   email:
 *                     type: string
 *                     description: Email do funcionário do RH
 *                   position:
 *                     type: string
 *                     description: Cargo do funcionário do RH
 *                   department:
 *                     type: string
 *                     description: Departamento do funcionário do RH
 *       404:
 *         description: Não foi possível buscar os funcionários do RH.
 *   post:
 *     summary: Criar um novo funcionário do RH
 *     tags: [HumanResourcesEmployees]
 *     requestBody:
 *       description: Dados do funcionário do RH a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do funcionário do RH
 *               email:
 *                 type: string
 *                 description: Email do funcionário do RH
 *               position:
 *                 type: string
 *                 description: Cargo do funcionário do RH
 *               department:
 *                 type: string
 *                 description: Departamento do funcionário do RH
 *     responses:
 *       201:
 *         description: Funcionário do RH criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do funcionário do RH
 *                 name:
 *                   type: string
 *                   description: Nome do funcionário do RH
 *                 email:
 *                   type: string
 *                   description: Email do funcionário do RH
 *                 position:
 *                   type: string
 *                   description: Cargo do funcionário do RH
 *                 department:
 *                   type: string
 *                   description: Departamento do funcionário do RH
 *       404:
 *         description: Não foi possível criar o funcionário do RH.
 *
 * /api/human-resources-employees/{id}:
 *   get:
 *     summary: Obter informações de um funcionário do RH por ID
 *     tags: [HumanResourcesEmployees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário do RH
 *     responses:
 *       200:
 *         description: Informações do funcionário do RH retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do funcionário do RH
 *                 name:
 *                   type: string
 *                   description: Nome do funcionário do RH
 *                 email:
 *                   type: string
 *                   description: Email do funcionário do RH
 *                 position:
 *                   type: string
 *                   description: Cargo do funcionário do RH
 *                 department:
 *                   type: string
 *                   description: Departamento do funcionário do RH
 *       404:
 *         description: Funcionário do RH não encontrado.
 *   put:
 *     summary: Atualizar informações de um funcionário do RH
 *     tags: [HumanResourcesEmployees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário do RH
 *     requestBody:
 *       description: Dados do funcionário do RH a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do funcionário do RH
 *               email:
 *                 type: string
 *                 description: Email do funcionário do RH
 *               position:
 *                 type: string
 *                 description: Cargo do funcionário do RH
 *               department:
 *                 type: string
 *                 description: Departamento do funcionário do RH
 *     responses:
 *       200:
 *         description: Funcionário do RH atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único do funcionário do RH
 *                 name:
 *                   type: string
 *                   description: Nome do funcionário do RH
 *                 email:
 *                   type: string
 *                   description: Email do funcionário do RH
 *                 position:
 *                   type: string
 *                   description: Cargo do funcionário do RH
 *                 department:
 *                   type: string
 *                   description: Departamento do funcionário do RH
 *       404:
 *         description: Não foi possível atualizar o funcionário do RH.
 *   delete:
 *     summary: Deletar um funcionário do RH
 *     tags: [HumanResourcesEmployees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário do RH
 *     responses:
 *       200:
 *         description: Funcionário do RH deletado com sucesso.
 *       404:
 *         description: Não foi possível deletar o funcionário do RH.
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) => humanResourcesEmployeeController.getAllHumanResourcesEmployees(req, res));
  router.post("/", (req, res) => humanResourcesEmployeeController.createHumanResourcesEmployee(req, res));
  router.put("/:id", (req, res) => humanResourcesEmployeeController.updateHumanResourcesEmployee(req, res));
  router.delete("/:id", (req, res) => humanResourcesEmployeeController.deleteHumanResourcesEmployee(req, res));
  router.get("/:id", (req, res) => humanResourcesEmployeeController.getHumanResourcesEmployeeById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => humanResourcesEmployeeController.getAllHumanResourcesEmployees(req, res));
  router.post("/", isAdmin, (req, res) => humanResourcesEmployeeController.createHumanResourcesEmployee(req, res));
  router.put("/:id", isAdmin, (req, res) => humanResourcesEmployeeController.updateHumanResourcesEmployee(req, res));
  router.delete("/:id", isAdmin, (req, res) => humanResourcesEmployeeController.deleteHumanResourcesEmployee(req, res));
  router.get("/:id", isAdmin, (req, res) => humanResourcesEmployeeController.getHumanResourcesEmployeeById(req, res));
}

export default router;
