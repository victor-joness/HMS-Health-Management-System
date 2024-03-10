const router = require("express").Router();

// GET ALL USERS
router.get("/getPacientes", async (req, res) => {
  try {
    const [pacientes, fields] = await req.dbConnection.query(
      "SELECT * FROM pacientes"
    );
    res.status(200).send(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os pacientes");
  } finally {
    // Vai liberar a pool automaticamente.
  }
});

router.get("/getPaciente/:id", async (req, res) => {
  try {
    const [paciente, fields] = await req.dbConnection.query(
      "SELECT * FROM pacientes WHERE pacienteID = ?",
      [req.params.id]
    );
    res.status(200).send(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar paciente");
  } finally {
    // Vai liberar a pool automaticamente.
  }
});

module.exports = router;
