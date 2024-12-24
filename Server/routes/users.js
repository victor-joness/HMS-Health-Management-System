import { Router } from 'express';
import { sendResponse } from '../Utils/ResponseContainer.js';
import { mapUserToCamelCase } from '../Utils/FunctionsHelpers.js';
import { sql } from '../middleware/dbMiddleware.js';

const router = Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const result = await sql`SELECT * FROM users;`;

    const users = result.map(mapUserToCamelCase);

    sendResponse(res, "ok", 200, "sucesso", users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    sendResponse(res, "error", 500, "Erro ao buscar usuários", null);
  }
});

export default router;