const bcript = require("bcrypt");
const express = require("express");
const mysql = require("mysql2");
const genAuthToken = require("../Utils/genAuthToken");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
});

const saltRounds = 10;

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
      bcript.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({
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
                Img : result[0].Img,
              }),
            },
          });
        } else {
          res.send({ msg: "Senha incorreta!" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

module.exports = router;
