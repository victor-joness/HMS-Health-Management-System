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

//GET ALL Enfermeiras
router.get("/getEnfermeiras", async (req, res) => {
  try {
    db.query("SELECT * FROM enfermeiras", (err, result) => {
      const enfermeira = result;
      res.status(200).send(enfermeira);
    });
  } catch (error) {
    console.log(error);
  }
});

//CREATE Enfermeira
router.post("/", async (req, res) => {
  const {
    EnfermeiraName,
    EnfermeiraIdade,
    EnfermeiraNumero,
    EnfermeiraEmail,
    EnfermeiraSangue,
    EnfermeiraGenero,
    EnfermeiraAniversario,
    EnfermeiraEndereco,
    EnfermeiraEducacao,
    EnfermeiraDepartamento,
    EnfermeiraID,
    EnfermeiraPassword,
    EnfermeiraDetalhes,
    EnfermeiraImg
  } = req.body;

  try {
    db.query(
      "SELECT * FROM enfermeiras WHERE enfermeiraEmail = ?",
      [EnfermeiraEmail],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length == 0) {
          bcript.hash(EnfermeiraPassword, saltRounds, (err, hash) => {
            db.query(
              "INSERT INTO enfermeiras (EnfermeiraName, EnfermeiraIdade, EnfermeiraNumero, EnfermeiraEmail, EnfermeiraSangue, EnfermeiraGenero,EnfermeiraAniversario, EnfermeiraEndereco, EnfermeiraEducacao, EnfermeiraDepartamento, EnfermeiraID, EnfermeiraPassword, EnfermeiraDetalhes, EnfermeiraImg) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                EnfermeiraName,
                EnfermeiraIdade,
                EnfermeiraNumero,
                EnfermeiraEmail,
                EnfermeiraSangue,
                EnfermeiraGenero,
                EnfermeiraAniversario,
                EnfermeiraEndereco,
                EnfermeiraEducacao,
                EnfermeiraDepartamento,
                EnfermeiraID,
                hash,
                EnfermeiraDetalhes,
                EnfermeiraImg
              ],
              (error, response) => {
                if (error) {
                  res.send(error);
                }
                res.send({
                  msg: "Enfermeira cadastrado com sucesso",
                  enfermeira: {
                    EnfermeiraName: EnfermeiraName,
                    EnfermeiraIdade: EnfermeiraIdade,
                    EnfermeiraNumero: EnfermeiraNumero,
                    EnfermeiraEmail: EnfermeiraEmail,
                    EnfermeiraSangue: EnfermeiraSangue,
                    EnfermeiraGenero: EnfermeiraGenero,
                    EnfermeiraAniversario: EnfermeiraAniversario,
                    EnfermeiraEndereco: EnfermeiraEndereco,
                    EnfermeiraEducacao: EnfermeiraEducacao,
                    EnfermeiraDepartamento: EnfermeiraDepartamento,
                    EnfermeiraID: EnfermeiraID,
                    EnfermeiraPassword: hash,
                    EnfermeiraDetalhes: EnfermeiraDetalhes,
                    EnfermeiraImg: EnfermeiraImg
                  },
                });
              }
            );
          });
        } else {
          res.send({ msg: "Enfermeira já cadastrado" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

/* update doutor */
router.put("/:id", async (req, res) => {

  const {
    EnfermeiraId,
    EnfermeiraName,
    EnfermeiraIdade,
    EnfermeiraNumero,
    EnfermeiraEmail,
    EnfermeiraSangue,
    EnfermeiraGenero,
    EnfermeiraAniversario,
    EnfermeiraEndereco,
    EnfermeiraEducacao,
    EnfermeiraDepartamento,
    EnfermeiraID,
    EnfermeiraPassword,
    EnfermeiraDetalhes,
  } = req.body;

  try {
    db.query(
      "SELECT * FROM enfermeiras WHERE id = ?",
      [EnfermeiraId],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length > 0) {
          bcript.hash(EnfermeiraPassword, saltRounds, (err, hash) => {
            db.query(
              "UPDATE enfermeiras SET EnfermeiraName = ?, EnfermeiraIdade = ? ,EnfermeiraNumero = ?, EnfermeiraEmail = ?, EnfermeiraSangue = ?, EnfermeiraGenero = ?, EnfermeiraAniversario = ?, EnfermeiraEndereco = ?, EnfermeiraEducacao = ?, EnfermeiraDepartamento = ? , EnfermeiraPassword = ?, EnfermeiraDetalhes = ? WHERE id = ?",
              [
                EnfermeiraName,
                EnfermeiraIdade,
                EnfermeiraNumero,
                EnfermeiraEmail,
                EnfermeiraSangue,
                EnfermeiraGenero,
                EnfermeiraAniversario,
                EnfermeiraEndereco,
                EnfermeiraEducacao,
                EnfermeiraDepartamento,
                hash,
                EnfermeiraDetalhes,
                EnfermeiraId,
              ],
              (err, result) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send({
                    msg: "mudaça feita com sucesso",
                    Enfermeira: {
                      EnfermeiraName: EnfermeiraName,
                      EnfermeiraIdade: EnfermeiraIdade,
                      EnfermeiraNumero: EnfermeiraNumero,
                      EnfermeiraEmail: EnfermeiraEmail,
                      EnfermeiraSangue: EnfermeiraSangue,
                      EnfermeiraGenero: EnfermeiraGenero,
                      EnfermeiraAniversario: EnfermeiraAniversario,
                      EnfermeiraEndereco: EnfermeiraEndereco,
                      EnfermeiraEducacao: EnfermeiraEducacao,
                      EnfermeiraDepartamento: EnfermeiraDepartamento,
                      EnfermeiraID: EnfermeiraID,
                      EnfermeiraPassword: hash,
                      EnfermeiraDetalhes: EnfermeiraDetalhes,
                    },
                  });
                }
              }
            );
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

/* delete enfermeira */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM enfermeiras WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query(
          "DELETE FROM enfermeiras WHERE id = ?",
          [id],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send({ msg: "Enfermeira deletada com Sucesso" });
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//CREATE ENFERMEIRA IN USERS
router.post("/insert", async (req, res) => {
  const name = req.body.EnfermeiraName;
  const email = req.body.EnfermeiraEmail;
  const password = req.body.EnfermeiraPassword;
  const isAdmin = req.body.isAdmin;
  const isDoutor = req.body.isDoutor;
  const isEnfermeira = req.body.isEnfermeira;
  const isPaciente = req.body.isPaciente;
  const Img = req.body.Img;

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length == 0) {
        bcript.hash(password, saltRounds, (err, hash) => {
          db.query(
            "INSERT INTO users (name, email, password, isAdmin, isDoutor, isEnfermeira,isPaciente, Img) VALUE (?,?,?,?,?,?,?,?)",
            [
              name,
              email,
              hash,
              isAdmin,
              isDoutor,
              isEnfermeira,
              isPaciente,
              Img,
            ],
            (error, response) => {
              if (error) {
                res.send(error);
              }
              res.send({
                msg: "Enfermeira cadastrado com sucesso em users",
              });
            }
          );
        });
      } else {
        res.send({ msg: "Enfermeira já cadastrado em users" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;