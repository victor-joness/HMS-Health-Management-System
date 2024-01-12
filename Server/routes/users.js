const router = require("express").Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const [users, fields] = await  req.dbConnection.query("SELECT * FROM users");
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar usuários");
  } finally {
     // Vai liberar a pool automaticamente.
  }
});

module.exports = router;