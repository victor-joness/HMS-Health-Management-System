const router = require("express").Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const [users] = await  req.dbConnection.query("CALL GetAllUsers();");   
    res.status(200).send(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar usuários");
  } finally {
     // Vai liberar a pool automaticamente.
  }
});

module.exports = router;