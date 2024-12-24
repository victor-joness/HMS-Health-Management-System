import { Router } from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import { UserRole } from "../Utils/Enum.js";
import { sendResponse } from "../Utils/ResponseContainer.js";
import { genAuthToken } from "../Utils/genAuthToken";

const router = Router();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
};

// POST - Criar usuário
router.post("/", async (req, res) => {
  const { name, email, password, img } = req.body;
  const Img = img == "" ? "IMG-USER.png" : img;
  const role = req.body.role || UserRole.VIEWER;
  const phoneNumber = req.body.phoneNumber || null;
  const phoneEmergency = req.body.phoneEmergency || null;
  const createdUser = req.body.createdUser || 0;
  const deletionDate = req.body.deletionDate || null;
  const creationDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await connection.execute(
      "CALL InsertUser(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        hashedPassword,
        role,
        Img,
        phoneNumber,
        phoneEmergency,
        creationDate,
        createdUser,
      ]
    );
    
    const userData = {
      id: result[0][0].insertId,
      name: name,
      email: email,
      role: role,
      img: Img,
      phoneNumber: phoneNumber,
      phoneEmergency: phoneEmergency,
      creationDate: creationDate,
      createdUser: createdUser,
      deletionDate: deletionDate,
  };

    const token = genAuthToken(userData);

    sendResponse(res, "ok", 200, "sucess", {
      user: userData,
      token: token,
    });
    
  } catch (error) {
    sendResponse(
      res,
      "error",
      500,
      error.sqlMessage || "Erro ao cadastrar usuário",
      null
    );
  } finally {
    if (connection) await connection.end();
  }
});

export default router;