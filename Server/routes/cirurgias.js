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

//GET ALL Cirurgias
router.get("/getCirurgias", async (req, res) => {
  try {
    db.query("SELECT * FROM cirurgias", (err, result) => {
      const cirurgias = result;
      res.status(200).send(cirurgias);
    });
  } catch (error) {
    console.log(error);
  }
});

//CREATE Cirurgia
router.post("/", async (req, res) => {
  const {
    cirurgiaPaciente,
    cirurgiaMedico,
    cirurgiaAux1,
    cirurgiaAux2,
    cirurgiaIdade,
    cirurgiaNumero,
    cirurgiaRG,
    cirurgiaGenero,
    cirurgiaGruposanguineo,
    cirurgiaData,
    cirurgiaDetalhes,
  } = req.body;

  let cirurgiaGeneroImg = "";

  if (cirurgiaGenero == "Masculino") {
    cirurgiaGeneroImg = "masculino.png";
  } else if (cirurgiaGenero == "Feminino") {
    cirurgiaGeneroImg = "feminino.png";
  } else {
    cirurgiaGeneroImg = "semgenero.png";
  }

  try {
    db.query(
      "INSERT INTO cirurgias (cirurgiaPaciente, cirurgiaMedico, cirurgiaAux1, cirurgiaAux2, cirurgiaIdade, cirurgiaNumero,cirurgiaRG, cirurgiaGenero, cirurgiaGruposanguineo, cirurgiaData, cirurgiaDetalhes, cirurgiaEstado) VALUE (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        cirurgiaPaciente,
        cirurgiaMedico,
        cirurgiaAux1,
        cirurgiaAux2,
        cirurgiaIdade,
        cirurgiaNumero,
        cirurgiaRG,
        cirurgiaGeneroImg,
        cirurgiaGruposanguineo,
        cirurgiaData,
        cirurgiaDetalhes,
        "circulo-azul.png",
      ],
      (error, response) => {
        if (error) {
          res.send(error);
        }
        res.send({
          msg: "Cirurgia cadastrado com sucesso",
          cirurgia: {
            cirurgiaPaciente: cirurgiaPaciente,
            cirurgiaMedico: cirurgiaMedico,
            cirurgiaAux1: cirurgiaAux1,
            cirurgiaAux2: cirurgiaAux2,
            cirurgiaIdade: cirurgiaIdade,
            cirurgiaNumero: cirurgiaNumero,
            cirurgiaRG: cirurgiaRG,
            cirurgiaGenero: cirurgiaGenero,
            cirurgiaGruposanguineo: cirurgiaGruposanguineo,
            cirurgiaData: cirurgiaData,
            cirurgiaDetalhes: cirurgiaDetalhes,
            cirurgiaEstado: "Marcada",
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

/* update doutor */
/* router.put("/update/:id", async (req, res) => {
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
}); */

/* delete cirurgia */
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM cirurgias WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query(
          "UPDATE cirurgias SET cirurgiaEstado = ? WHERE id = ?",
          ["circulo-verde.jpg", id],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send({ msg: "cirurgias Realizada com Sucesso" });
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

/* delete cirurgia */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM cirurgias WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query("DELETE FROM cirurgias WHERE id = ?", [id], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ msg: "cirurgias deletada com Sucesso" });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;