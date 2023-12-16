const bcript = require("bcrypt");
const express = require("express");
const genAuthToken = require("../Utils/genAuthToken");
const mysql = require("mysql2");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
});

const saltRounds = 10;

db.connect();

router.post("/", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const isDoutor = req.body.isDoutor;
  const isEnfermeira = req.body.isEnfermeira;
  const isPaciente = req.body.isPaciente;
  const Img = req.body.Img;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    
    if (result.length == 0) {
      bcript.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO users (name, email, password, isAdmin, isDoutor, isEnfermeira,isPaciente, Img) VALUE (?,?,?,?,?,?,?,?)",
          [name, email, hash, isAdmin, isDoutor, isEnfermeira, isPaciente, Img],
          (error, response) => {
            if (err) {
              res.send(err);
            }
            res.send({
              msg: "Usuário cadastrado com sucesso",
              user: {
                id: response.insertId,
                name: name,
                email: email,
                isAdmin: isAdmin,
                isDoutor: isDoutor,
                isEnfermeira: isEnfermeira,
                isPaciente: isPaciente,
                Img: Img
              }, 
              token: genAuthToken({
                id: response.insertId,
                name: name,
                email: email,
                isAdmin: isAdmin,
                isDoutor: isDoutor,
                isEnfermeira: isEnfermeira,
                isPaciente: isPaciente,
                Img: Img
              })
            });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

module.exports = router;