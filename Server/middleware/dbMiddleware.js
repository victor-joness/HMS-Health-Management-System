const mysql = require("mysql2/promise");

// Configurações do banco de dados
const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Middleware de conexão com o banco de dados
const dbMiddleware = async (req, res, next) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    req.dbConnection = connection;
    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    res.status(500).send("Erro interno do servidor");
  }
};

module.exports = dbMiddleware;