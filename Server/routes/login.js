import { Router } from "express";
import bcrypt from "bcrypt";
import { genAuthToken } from "../Utils/genAuthToken";
import { sendResponse } from "../Utils/ResponseContainer.js";
import { mapUserToCamelCase } from "../Utils/FunctionsHelpers.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [result] = await req.dbConnection.query(
      "CALL GetUserByEmail(?)",
      [email]
    );

    if (result[0].length === 0) {
      return sendResponse(res, "error", 404, "Usuário não registrado!", null);
    }

    const user = result[0][0];

    const match = await bcrypt.compare(password, user.PassWord);
    if (!match) {
      return sendResponse(res, "error", 401, "Senha incorreta!", null);
    }

    const token = genAuthToken(mapUserToCamelCase(user));
    
    return sendResponse(res, "success", 200, "Usuário logado com sucesso!", {
      id: user.Id,
      name: user.Name,
      email: user.Email,
      token,
    });
  } catch (error) {
    return sendResponse(res, "error", 500, "Erro interno do servidor.", null);
  }
});

export default router;