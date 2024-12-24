import { Router } from "express";
import { LogRepositoryImplementation } from "../../core/implementation/LogRepositoryImplementation";
import { LoggingService } from "../../core/services/LoggingService";
import { MedicinesRepositoryImplementation } from "../../core/implementation/MedicinesRepositoryImplementation";
import { MedicinesServices } from "../../core/services/MedicinesServices";
import { MedicinesController } from "../controllers/MedicinesController";
import { isAdmin } from "../middlewares/AuthMiddleware";

const router = Router();
const loggingRepository = new LogRepositoryImplementation();
const loggingService = new LoggingService(loggingRepository);

const medicinesRepository = new MedicinesRepositoryImplementation();
const medicinesServices = new MedicinesServices(medicinesRepository);
const medicinesController = new MedicinesController(
    medicinesServices,
  loggingService
);


/**
 * @swagger
 * tags:
 *   - name: Medicines
 *     description: API para gerenciamento de medicamentos
 *
 * /api/medicines:
 *   get:
 *     tags:
 *       - Medicines
 *     summary: Obter todos os medicamentos
 *     description: Retorna uma lista de todos os medicamentos cadastrados.
 *     responses:
 *       200:
 *         description: Lista de medicamentos retornada com sucesso.
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
 *                     example: Paracetamol
 *                   Description:
 *                     type: string
 *                     example: Medicamento para alívio da dor e febre.
 *                   type:
 *                     type: string
 *                     enum: [tablet, capsule, liquid, injection, ointment]
 *                     example: tablet
 *                   manufacturer:
 *                     type: string
 *                     example: Farmacêutica XYZ
 *                   batch_number:
 *                     type: string
 *                     example: BATCH12345
 *                   quantity_in_stock:
 *                     type: integer
 *                     example: 100
 *                   price_per_unit:
 *                     type: number
 *                     format: float
 *                     example: 5.99
 *                   expiry_date:
 *                     type: string
 *                     format: date
 *                     example: 2024-12-31
 *                   storage_instructions:
 *                     type: string
 *                     example: Armazenar em local fresco e seco.
 *                   DeletionDate:
 *                     type: string
 *                     format: date-time
 *                     example: null
 *                   ModifiedDate:
 *                     type: string
 *                     format: date-time
 *                     example: null
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-12-21T15:00:00Z
 *       500:
 *         description: Erro ao buscar medicamentos.
 *
 *   post:
 *     tags:
 *       - Medicines
 *     summary: Criar um novo medicamento
 *     description: Adiciona um novo medicamento ao sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: Paracetamol
 *               Description:
 *                 type: string
 *                 example: Medicamento para alívio da dor e febre.
 *               type:
 *                 type: string
 *                 enum: [tablet, capsule, liquid, injection, ointment]
 *                 example: tablet
 *               manufacturer:
 *                 type: string
 *                 example: Farmacêutica XYZ
 *               batch_number:
 *                 type: string
 *                 example: BATCH12345
 *               quantity_in_stock:
 *                 type: integer
 *                 example: 100
 *               price_per_unit:
 *                 type: number
 *                 format: float
 *                 example: 5.99
 *               expiry_date:
 *                 type: string
 *                 format: date
 *                 example: 2024-12-31
 *               storage_instructions:
 *                 type: string
 *                 example: Armazenar em local fresco e seco.
 *             required:
 *               - Name
 *               - type
 *               - quantity_in_stock
 *               - price_per_unit
 *               - expiry_date
 *     responses:
 *       201:
 *         description: Medicamento criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: integer
 *                   example: 1
 *                 Name:
 *                   type: string
 *                   example: Paracetamol
 *                 Description:
 *                   type: string
 *                   example: Medicamento para alívio da dor e febre.
 *                 type:
 *                   type: string
 *                   enum: [tablet, capsule, liquid, injection, ointment]
 *                   example: tablet
 *                 manufacturer:
 *                   type: string
 *                   example: Farmacêutica XYZ
 *                 batch_number:
 *                   type: string
 *                   example: BATCH12345
 *                 quantity_in_stock:
 *                   type: integer
 *                   example: 100
 *                 price_per_unit:
 *                   type: number
 *                   format: float
 *                   example: 5.99
 *                 expiry_date:
 *                   type: string
 *                   format: date
 *                   example: 2024-12-31
 *                 storage_instructions:
 *                   type: string
 *                   example: Armazenar em local fresco e seco.
 *                 DeletionDate:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 ModifiedDate:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *                 CreationDate:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-12-21T15:00:00Z
 *       500:
 *         description: Erro ao criar medicamento.
 *
 * /api/medicines/{id}:
 *   get:
 *     tags:
 *       - Medicines
 *     summary: Obter um medicamento por ID
 *     description: Retorna os detalhes de um medicamento específico pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do medicamento
 *     responses:
 *       200:
 *         description: Medicamento encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       404:
 *         description: Medicamento não encontrado.
 *
 *   put:
 *     tags:
 *       - Medicines
 *     summary: Atualizar um medicamento por ID
 *     description: Atualiza as informações de um medicamento específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do medicamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medicine'
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso.
 *       404:
 *         description: Medicamento não encontrado.
 *
 *   delete:
 *     tags:
 *       - Medicines
 *     summary: Excluir um medicamento por ID
 *     description: Remove um medicamento específico do sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do medicamento
 *     responses:
 *       200:
 *         description: Medicamento excluído com sucesso.
 *       404:
 *         description: Medicamento não encontrado.
 */

if (process.env.NODE_ENV !== "DEV") {
  router.get("/", (req, res) => medicinesController.getAllMedicines(req, res));
  router.post("/", (req, res) => medicinesController.createMedicine(req, res));
  router.put("/:id", (req, res) => medicinesController.updateMedicine(req, res));
  router.delete("/:id", (req, res) => medicinesController.deleteMedicine(req, res));
  router.get("/:id", (req, res) => medicinesController.getMedicineById(req, res));
} else {
  router.get("/", isAdmin, (req, res) => medicinesController.getAllMedicines(req, res));
  router.post("/", isAdmin, (req, res) => medicinesController.createMedicine(req, res));
  router.put("/:id", isAdmin, (req, res) => medicinesController.updateMedicine(req, res));
  router.delete("/:id", isAdmin, (req, res) => medicinesController.deleteMedicine(req, res));
  router.get("/:id", isAdmin, (req, res) => medicinesController.getMedicineById(req, res));
}

export default router;