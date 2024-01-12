const express = require("express");
const bcrypt = require("bcrypt");
const genAuthToken = require("../Utils/genAuthToken");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //Usando a dbConnection do middleware
    const [result] = await req.dbConnection.query("SELECT * FROM users WHERE email = ?", [email]);

    if (result.length > 0) {
      const match = await bcrypt.compare(password, result[0].password);

      if (match) {
        res.status(200).send({
          msg: "Usuário logado!",
          user: {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            token: genAuthToken({
              id: result[0].id,
              name: result[0].name,
              email: result[0].email,
              isAdmin: result[0].isAdmin,
              isDoutor: result[0].isDoutor,
              isEnfermeira: result[0].isEnfermeira,
              isPaciente: result[0].isPaciente,
              Img: result[0].Img,
            }),
          },
        });
      } else {
        res.status(404).send({ msg: "Senha incorreta!" });
      }
    } else {
      res.status(404).send({ msg: "Usuário não registrado!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
});

module.exports = router;
