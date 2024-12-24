import { Router } from "express";
import mysql from "mysql2";
import { sendResponse } from "../Utils/ResponseContainer.js";

const router = Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
});

db.connect();

// GET ALL Camas
router.get("/getCamas", async (req, res) => {
  try {
    db.query("CALL GetAllCamas()", (err, result) => {
      if (err) {
        return sendResponse(res, "error", 500, "Erro ao buscar camas", null);
      }
      sendResponse(
        res,
        "success",
        200,
        "Camas recuperadas com sucesso",
        result[0]
      );
    });
  } catch (error) {
    sendResponse(res, "error", 500, "Erro interno do servidor", null);
  }
});

// CREATE Cama
router.post("/", async (req, res) => {
  const { Numero, Quarto, Status, Nivel, Valor, Detalhes } = req.body;

  try {
    db.query(
      "CALL CreateCama(?, ?, ?, ?, ?, ?)",
      [Numero, Quarto, Status, Nivel, Valor, Detalhes],
      (error) => {
        if (error) {
          console.error(error);
          return sendResponse(
            res,
            "error",
            500,
            "Erro ao cadastrar cama",
            null
          );
        }
        sendResponse(res, "success", 201, "Cama cadastrada com sucesso", {
          Numero,
          Quarto,
          Status,
          Nivel,
          Valor,
          Detalhes,
        });
      }
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, "error", 500, "Erro interno do servidor", null);
  }
});

// UPDATE Cama
router.put("/:id", async (req, res) => {
  const { Numero, Quarto, Status, Nivel, Valor, Detalhes } = req.body;
  const Id = req.params.id;

  try {
    db.query(
      "CALL UpdateCama(?, ?, ?, ?, ?, ?, ?)",
      [Id, Numero, Quarto, Status, Nivel, Valor, Detalhes],
      (err) => {
        if (err) {
          console.error(err);
          return sendResponse(
            res,
            "error",
            500,
            "Erro ao atualizar cama",
            null
          );
        }
        sendResponse(res, "success", 200, "Cama atualizada com sucesso", {
          Id,
          Numero,
          Quarto,
          Status,
          Nivel,
          Valor,
          Detalhes,
        });
      }
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, "error", 500, "Erro interno do servidor", null);
  }
});

// DELETE Cama
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    db.query("CALL DeleteCama(?)", [id], (err) => {
      if (err) {
        console.error(err);
        return sendResponse(res, "error", 500, "Erro ao deletar cama", null);
      }
      sendResponse(res, "success", 200, "Cama deletada com sucesso", null);
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, "error", 500, "Erro interno do servidor", null);
  }
});

export default router;