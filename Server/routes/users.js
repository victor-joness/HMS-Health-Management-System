const router = require("express").Router();
const dbMiddleware = require("../middleware/dbMiddleware");

// Rota protegida pelo middleware de conexão com o banco de dados
router.use(dbMiddleware);

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const [users, fields] = await req.dbConnection.query("SELECT * FROM users");
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar usuários");
  } finally {
     // O mysql2/promise cuidará automaticamente da liberação da conexão para o pool.
  }
});

module.exports = router;