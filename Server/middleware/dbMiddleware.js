const db = require("../db.Connection");

const dbMiddleware = async (req, res, next) => {
  try {
    const connection = await db.getConnection();
    req.dbConnection = connection;
    next();
  } catch (error) {
    console.error("Erro ao obter conexão do banco de dados:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

module.exports = dbMiddleware;
