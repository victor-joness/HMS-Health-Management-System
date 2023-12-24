const { auth, isUser, isAdmin } = require("../middleware/auth");
const bcript = require("bcrypt");
const mysql = require("mysql2");

const router = require("express").Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
});

const saltRounds = 10;

db.connect();

//GET ALL Camas
router.get("/getCamas", async (req, res) => {
  try {
    db.query("SELECT * FROM camas", (err, result) => {
      const camas = result;
      res.status(200).send(camas);
    });
  } catch (error) {
    console.log(error);
  }
});

//CREATE CAMA
router.post("/", async (req, res) => {
  const {
    camaNumero,
    camaQuarto,
    camaStatus,
    camaNivel,
    camaValor,
    camaDetalhes,
  } = req.body;

  try {
    db.query(
      "INSERT INTO camas (camaNumero, camaQuarto, camaStatus, camaNivel, camaValor, camaDetalhes) VALUE (?,?,?,?,?,?)",
      [camaNumero, camaQuarto, camaStatus, camaNivel, camaValor, camaDetalhes],
      (error, response) => {
        if (error) {
            console.log(error);
          res.send(error);
        }
        res.send({
          msg: "Cama cadastrada com sucesso",
          cama: {
            camaNumero: camaNumero,
            camaQuarto: camaQuarto,
            camaStatus: camaStatus,
            camaNivel: camaNivel,
            camaValor: camaValor,
            camaDetalhes: camaDetalhes,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

/* update cama */
/* router.put("/:id", async (req, res) => {
  const {
    camaId,
    camaName,
    camaIdade,
    camaNumero,
    camaEmail,
    camaSangue,
    camaGenero,
    camaAniversario,
    camaEndereco,
    camaEducacao,
    camaDepartamento,
    docID,
    camaPassword,
    camaDetalhes,
  } = req.body;

  try {
    db.query("SELECT * FROM camas WHERE id = ?", [camaId], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        bcript.hash(camaPassword, saltRounds, (err, hash) => {
          db.query(
            "UPDATE camas SET camaName = ?, camaIdade = ? ,camaNumero = ?, camaEmail = ?, camaSangue = ?, camaGenero = ?, camaAniversario = ?, camaEndereco = ?, camaEducacao = ?, camaDepartamento = ? , camaPassword = ?, camaDetalhes = ? WHERE id = ?",
            [
              camaName,
              camaIdade,
              camaNumero,
              camaEmail,
              camaSangue,
              camaGenero,
              camaAniversario,
              camaEndereco,
              camaEducacao,
              camaDepartamento,
              hash,
              camaDetalhes,
              camaId,
            ],
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                res.send({
                  msg: "mudaça feita com sucesso",
                  cama: {
                    camaName: camaName,
                    camaIdade: camaIdade,
                    camaNumero: camaNumero,
                    camaEmail: camaEmail,
                    camaSangue: camaSangue,
                    camaGenero: camaGenero,
                    camaAniversario: camaAniversario,
                    camaEndereco: camaEndereco,
                    camaEducacao: camaEducacao,
                    camaDepartamento: camaDepartamento,
                    docID: docID,
                    camaPassword: hash,
                    camaDetalhes: camaDetalhes,
                  },
                });
              }
            }
          );
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
}); */

/* delete cama */
/* router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM camas WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query("DELETE FROM camas WHERE id = ?", [id], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ msg: "Doutor deletado com Sucesso" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}); */

module.exports = router;
