import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { AuthService } from "../../core/services/AuthService";
import { AuthController } from "../controllers/AuthController";
import { isAdmin } from "../middlewares/AuthMiddleware";

const router = Router();
const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const authServices = new AuthService();
const authController = new AuthController(authServices, loggingService);

//#region Swagger Docs

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: API para autenticação de usuários
 * 
 * /api/auth/login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: usuario@example.com
 *               Password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: string
 *                   example: ok
 *                 Code:
 *                   type: integer
 *                   example: 200
 *                 Message:
 *                   type: string
 *                   example: Login realizado com sucesso
 *                 Data:
 *                   type: object
 *                   properties:
 *                     Token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: string
 *                   example: error
 *                 Code:
 *                   type: integer
 *                   example: 401
 *                 Message:
 *                   type: string
 *                   example: Email ou senha inválidos
 * 
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: João Silva
 *               Email:
 *                 type: string
 *                 example: usuario@example.com
 *               Password:
 *                 type: string
 *                 example: senha123
 *               Gender:
 *                 type: string
 *                 enum: [MALE, FEMALE]
 *                 example: MALE
 *               Age:
 *                 type: integer
 *                 example: 30
 *               PhoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: string
 *                   example: ok
 *                 Code:
 *                   type: integer
 *                   example: 201
 *                 Message:
 *                   type: string
 *                   example: Usuário registrado com sucesso
 *                 Data:
 *                   type: object
 *                   properties:
 *                     Id:
 *                       type: integer
 *                       example: 1
 *                     Name:
 *                       type: string
 *                       example: João Silva
 *                     Email:
 *                       type: string
 *                       example: usuario@example.com
 *                     Age:
 *                       type: string
 *                       example: "18"
 *                     CreationDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-27T23:57:30.189Z"
 *                     DeletionDate:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     Gender:
 *                       type: string
 *                       example: Masculino
 *                     Img:
 *                       type: string
 *                       example: "default-img.png"
 *                     ModifiedDate:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     PhoneEmergency:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     PhoneNumber:
 *                       type: string
 *                       example: "(88) 99999-9999"
 *                     Role:
 *                       type: integer
 *                       example: 3
 *       400:
 *         description: Erro ao registrar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Status:
 *                   type: string
 *                   example: error
 *                 Code:
 *                   type: integer
 *                   example: 400
 *                 Message:
 *                   type: string
 *                   example: Erro ao registrar usuário
 */

//#endregion

if (process.env.NODE_ENV === "DEV") {
  router.post("/login", (req, res) => authController.login(req, res));
  router.post("/register", (req, res) => authController.register(req, res));
} else {
  router.post("/login", isAdmin, (req, res) => authController.login(req, res));
  router.post("/register", isAdmin, (req, res) => authController.register(req, res));
}

export default router;
