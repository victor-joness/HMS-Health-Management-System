const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error("Erro ao obter conexão do banco de dados:", error);
    throw error;
  }
};

module.exports = {
  getConnection,
};