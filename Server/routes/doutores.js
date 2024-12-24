import { Router } from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2";

const router = Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
});

const saltRounds = 10;

db.connect();

//GET ALL Doutores
router.get("/getDoutores", async (req, res) => {
  try {
    db.query("SELECT * FROM doutores", (err, result) => {
      const doutores = result;
      res.status(200).send(doutores);
    });
  } catch (error) {
    console.log(error);
  }
});

//CREATE DOUTOR
router.post("/", async (req, res) => {
  const {
    doutorName,
    doutorIdade,
    doutorNumero,
    doutorEmail,
    doutorSangue,
    doutorGenero,
    doutorAniversario,
    doutorEndereco,
    doutorEducacao,
    doutorDepartamento,
    docID,
    doutorPassword,
    doutorDetalhes,
    doutorImg,
  } = req.body;

  try {
    db.query(
      "SELECT * FROM doutores WHERE doutorEmail = ?",
      [doutorEmail],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length == 0) {
          bcrypt.hash(doutorPassword, saltRounds, (err, hash) => {
            db.query(
              "INSERT INTO doutores (doutorName, doutorIdade, doutorNumero, doutorEmail, doutorSangue, doutorGenero,doutorAniversario, doutorEndereco, doutorEducacao, doutorDepartamento, docID, doutorPassword, doutorDetalhes, doutorImg) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                doutorName,
                doutorIdade,
                doutorNumero,
                doutorEmail,
                doutorSangue,
                doutorGenero,
                doutorAniversario,
                doutorEndereco,
                doutorEducacao,
                doutorDepartamento,
                docID,
                hash,
                doutorDetalhes,
                doutorImg,
              ],
              (error, response) => {
                if (error) {
                  res.send(error);
                }
                res.send({
                  msg: "Doutor cadastrado com sucesso",
                  doutor: {
                    doutorName: doutorName,
                    doutorIdade: doutorIdade,
                    doutorNumero: doutorNumero,
                    doutorEmail: doutorEmail,
                    doutorSangue: doutorSangue,
                    doutorGenero: doutorGenero,
                    doutorAniversario: doutorAniversario,
                    doutorEndereco: doutorEndereco,
                    doutorEducacao: doutorEducacao,
                    doutorDepartamento: doutorDepartamento,
                    docID: docID,
                    doutorPassword: hash,
                    doutorDetalhes: doutorDetalhes,
                    doutorImg: doutorImg,
                  },
                });
              }
            );
          });
        } else {
          res.send({ msg: "Doutor já cadastrado" });
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
    doutorId,
    doutorName,
    doutorIdade,
    doutorNumero,
    doutorEmail,
    doutorSangue,
    doutorGenero,
    doutorAniversario,
    doutorEndereco,
    doutorEducacao,
    doutorDepartamento,
    docID,
    doutorPassword,
    doutorDetalhes,
  } = req.body;

  try {
    db.query(
      "SELECT * FROM doutores WHERE id = ?",
      [doutorId],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length > 0) {
          bcrypt.hash(doutorPassword, saltRounds, (err, hash) => {
            db.query(
              "UPDATE doutores SET doutorName = ?, doutorIdade = ? ,doutorNumero = ?, doutorEmail = ?, doutorSangue = ?, doutorGenero = ?, doutorAniversario = ?, doutorEndereco = ?, doutorEducacao = ?, doutorDepartamento = ? , doutorPassword = ?, doutorDetalhes = ? WHERE id = ?",
              [
                doutorName,
                doutorIdade,
                doutorNumero,
                doutorEmail,
                doutorSangue,
                doutorGenero,
                doutorAniversario,
                doutorEndereco,
                doutorEducacao,
                doutorDepartamento,
                hash,
                doutorDetalhes,
                doutorId,
              ],
              (err, result) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send({
                    msg: "mudaça feita com sucesso",
                    doutor: {
                      doutorName: doutorName,
                      doutorIdade: doutorIdade,
                      doutorNumero: doutorNumero,
                      doutorEmail: doutorEmail,
                      doutorSangue: doutorSangue,
                      doutorGenero: doutorGenero,
                      doutorAniversario: doutorAniversario,
                      doutorEndereco: doutorEndereco,
                      doutorEducacao: doutorEducacao,
                      doutorDepartamento: doutorDepartamento,
                      docID: docID,
                      doutorPassword: hash,
                      doutorDetalhes: doutorDetalhes,
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

/* delete doutor */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM doutores WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query("DELETE FROM doutores WHERE id = ?", [id], (err, result) => {
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
});

//INSERT DOUTOR IN USERS
router.post("/insert", async (req, res) => {
  const name = req.body.doutorName;
  const email = req.body.doutorEmail;
  const password = req.body.doutorPassword;
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
        bcrypt.hash(password, saltRounds, (err, hash) => {
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
                msg: "Doutor cadastrado com sucesso em users",
              });
            }
          );
        });
      } else {
        res.send({ msg: "Doutor já cadastrado em users" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;