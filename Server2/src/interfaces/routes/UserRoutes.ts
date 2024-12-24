import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepositoryImplementation } from "../../core/implementation/UserRepositoryImplementation";
import { UserServices } from "../../core/services/UserServices";
import { isAdmin } from "../../interfaces/middlewares/AuthMiddleware";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";

const router = Router();

const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const userRepository = new UserRepositoryImplementation();
const userServices = new UserServices(userRepository);
const userController = new UserController(userServices, loggingService);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas a usuários
 * /api/users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Id:
 *                     type: integer
 *                     example: 1
 *                   Name:
 *                     type: string
 *                     example: John Doe
 *                   Email:
 *                     type: string
 *                     example: john@example.com
 *                   Role:
 *                     type: string
 *                     example: ADMIN
 *                   Img:
 *                     type: integer
 *                     nullable: true
 *                     example: 12345
 *                   Gender:
 *                     type: string
 *                     nullable: true
 *                     example: MALE
 *                   Age:
 *                     type: string
 *                     nullable: true
 *                     example: "30"
 *                   PhoneNumber:
 *                     type: string
 *                     nullable: true
 *                     example: "+1234567890"
 *                   PhoneEmergency:
 *                     type: string
 *                     nullable: true
 *                     example: "+0987654321"
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: John Doe
 *               Email:
 *                 type: string
 *                 example: john@example.com
 *               Password:
 *                 type: string
 *                 example: password123
 *               Role:
 *                 type: string
 *                 example: ADMIN
 *                 enum: [ADMIN, USER]
 *               Img:
 *                 type: integer
 *                 nullable: true
 *                 example: 12345
 *               Gender:
 *                 type: string
 *                 nullable: true
 *                 example: MALE
 *                 enum: [MALE, FEMALE, OTHER]
 *               Age:
 *                 type: string
 *                 nullable: true
 *                 example: "30"
 *               PhoneNumber:
 *                 type: string
 *                 nullable: true
 *                 example: "+1234567890"
 *               PhoneEmergency:
 *                 type: string
 *                 nullable: true
 *                 example: "+0987654321"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida
 * /api/users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Jane Doe
 *               Email:
 *                 type: string
 *                 example: jane@example.com
 *               Role:
 *                 type: string
 *                 example: USER
 *                 enum: [ADMIN, USER]
 *               Img:
 *                 type: integer
 *                 nullable: true
 *                 example: 54321
 *               Gender:
 *                 type: string
 *                 nullable: true
 *                 example: FEMALE
 *                 enum: [MALE, FEMALE, OTHER]
 *               Age:
 *                 type: string
 *                 nullable: true
 *                 example: "25"
 *               PhoneNumber:
 *                 type: string
 *                 nullable: true
 *                 example: "+1111111111"
 *               PhoneEmergency:
 *                 type: string
 *                 nullable: true
 *                 example: "+2222222222"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Usuário não encontrado
 */

if (process.env.NODE_ENV !== "DEV") {
  router.get("/", isAdmin, (req, res) => userController.getAllUsers(req, res));
  router.post("/", isAdmin, (req, res) => userController.createUser(req, res));
  router.delete("/:id", isAdmin, (req, res) => userController.deleteUser(req, res));
  router.put("/:id", isAdmin, (req, res) => userController.updateUser(req, res));
} else {
  router.get("/", (req, res) => userController.getAllUsers(req, res));
  router.post("/", (req, res) => userController.createUser(req, res));
  router.delete("/:id", (req, res) => userController.deleteUser(req, res));
  router.put("/:id", (req, res) => userController.updateUser(req, res));
}

export default router;
