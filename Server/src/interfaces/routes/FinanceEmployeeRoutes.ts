import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { FinanceEmployeeRepositoryImplementation } from "../../core/implementation/FinanceEmployeeRepositoyrImplementation";
import { FinanceEmployeeController } from "../controllers/FinanceEmployeeController";
import { FinanceEmployeeService } from "../../core/services/FinanceEmployeeService";
import { isAdmin } from "../middlewares/AuthMiddleware";
import { UserRepositoryImplementation } from "../../core/implementation/UserRepositoryImplementation";
import { UserServices } from "../../core/services/UserServices";
import { RedisCache } from "../../infrastructure/cache/RedisCache";

const router = Router();

const cacheService = new RedisCache();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const userRepository = new UserRepositoryImplementation();
const userService = new UserServices(userRepository);

const financeEmployeeRepository = new FinanceEmployeeRepositoryImplementation();
const financeEmployeeService = new FinanceEmployeeService(
  financeEmployeeRepository,
  userRepository,
  cacheService
);

const financeEmployeeController = new FinanceEmployeeController(
  financeEmployeeService,
  loggingService,
    userService,
);

//#region Swagger Docs

/**
 * @swagger
 * tags:
 *   name: FinanceEmployees
 *   description: Endpoints para gerenciar funcionários financeiros.
 */

/**
 * @swagger
 * /api/financeEmployees:
 *   get:
 *     summary: Lista todos os funcionários financeiros
 *     tags: [FinanceEmployees]
 *     responses:
 *       200:
 *         description: Lista de funcionários retornada com sucesso.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/financeEmployees:
 *   post:
 *     summary: Cria um novo funcionário financeiro
 *     tags: [FinanceEmployees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/financeEmployees/{id}:
 *   get:
 *     summary: Obtém um funcionário financeiro pelo ID
 *     tags: [FinanceEmployees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário retornado com sucesso.
 *       404:
 *         description: Funcionário não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/financeEmployees/{id}:
 *   put:
 *     summary: Atualiza um funcionário financeiro pelo ID
 *     tags: [FinanceEmployees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso.
 *       400:
 *         description: Requisição inválida.
 *       404:
 *         description: Funcionário não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */

/**
 * @swagger
 * /api/financeEmployees/{id}:
 *   delete:
 *     summary: Deleta um funcionário financeiro pelo ID
 *     tags: [FinanceEmployees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário deletado com sucesso.
 *       404:
 *         description: Funcionário não encontrado.
 *       500:
 *         description: Erro interno no servidor.
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.get("/", (req, res) =>
    financeEmployeeController.getAllFinanceEmployees(req, res)
  );
  router.post("/", (req, res) =>
    financeEmployeeController.createFinanceEmployee(req, res)
  );
  router.put("/:id", (req, res) =>
    financeEmployeeController.updateFinanceEmployee(req, res)
  );
  router.delete("/:id", (req, res) =>
    financeEmployeeController.deleteFinanceEmployee(req, res)
  );
  router.get("/:id", (req, res) =>
    financeEmployeeController.getFinanceEmployeeById(req, res)
  );
} else {
  router.get("/", isAdmin, (req, res) =>
    financeEmployeeController.getAllFinanceEmployees(req, res)
  );
  router.post("/", isAdmin, (req, res) =>
    financeEmployeeController.createFinanceEmployee(req, res)
  );
  router.put("/:id", isAdmin, (req, res) =>
    financeEmployeeController.updateFinanceEmployee(req, res)
  );
  router.delete("/:id", isAdmin, (req, res) =>
    financeEmployeeController.deleteFinanceEmployee(req, res)
  );
  router.get("/:id", isAdmin, (req, res) =>
    financeEmployeeController.getFinanceEmployeeById(req, res)
  );
}

export default router;
