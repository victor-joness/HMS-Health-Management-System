const { auth, isUser, isAdmin } = require("../middleware/auth");
const mysql = require("mysql2");

const router = require("express").Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
});

db.connect();

// GET SAIDAS DE BOLSAS
router.get("/getBolsasSaidas", async (req, res) => {
  try {
    db.query("SELECT * FROM saidasbolsas", (err, result) => {
      const saidas = result;
      res.status(200).send(saidas);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//GET ALL bolsas
router.get("/getBolsas", async (req, res) => {
  try {
    db.query("SELECT * FROM bancodesangue", (err, result) => {
      const banco = result;
      res.status(200).send(banco);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//GET ALL Doadores
router.get("/getDoadores", async (req, res) => {
  try {
    db.query("SELECT * FROM doadores", (err, result) => {
      const doadores = result;
      res.status(200).send(doadores);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//CREATE DOADOR
router.post("/", async (req, res) => {
  const {
    doadorName,
    doadorIdade,
    doadorNumero,
    doadorRG,
    doadorEmail,
    doadorSangue,
    doadorGenero,
    doadorAniversario,
    doadorEndereco,
    doadorDetalhes,
    doadorQTD,
    doadorData
  } = req.body;

  try {
    db.query(
      "SELECT * FROM doadores WHERE doadorEmail = ?",
      [doadorEmail],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length == 0) {
          db.query(
            "INSERT INTO doadores (doadorName, doadorIdade, doadorNumero,doadorRG, doadorEmail, doadorSangue, doadorGenero,doadorAniversario, doadorEndereco, doadorDetalhes, doadorQTD, doadorData) VALUE (?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              doadorName,
              doadorIdade,
              doadorNumero,
              doadorRG,
              doadorEmail,
              doadorSangue,
              doadorGenero,
              doadorAniversario,
              doadorEndereco,
              doadorDetalhes,
              doadorQTD,
              doadorData
            ],
            (error, response) => {
              if (error) {
                res.send(error);
              }
              res.send({
                msg: "Doador cadastrado com sucesso",
                doador: {
                  doadorName: doadorName,
                  doadorIdade: doadorIdade,
                  doadorNumero: doadorNumero,
                  doadorRG: doadorRG,
                  doadorEmail: doadorEmail,
                  doadorSangue: doadorSangue,
                  doadorGenero: doadorGenero,
                  doadorAniversario: doadorAniversario,
                  doadorEndereco: doadorEndereco,
                  doadorDetalhes: doadorDetalhes,
                  doadorQTD: doadorQTD,
                  doadorData: doadorData
                },
              });
            }
          );
        } else {
          res.send({ msg: "Doador já cadastrado" });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//CREATE DOADOR
router.post("/bolsaSaidaCreate", async (req, res) => {
  const formatDate = (input) => {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  const { pacienteBolsas, grupoBolsas, qtdBolsas, valorBolsas, dataBolsas } =
    req.body;

  try {
    db.query(
      "INSERT INTO saidasbolsas (pacienteBolsas, grupoBolsas, qtdBolsas,valorBolsas, dataBolsas) VALUE (?,?,?,?,?)",
      [
        pacienteBolsas,
        grupoBolsas,
        qtdBolsas,
        valorBolsas,
        formatDate(dataBolsas),
      ],
      (error, response) => {
        if (error) {
          res.send(error);
        }

        db.query(
          "SELECT * FROM bancodesangue WHERE id = ?",
          [0],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              let populacaoArr = Object.entries(result[0]);

              for (let i = 0; i < populacaoArr.length; i++) {
                if (populacaoArr[i][0] == grupoBolsas) {
                  populacaoArr[i][1] = parseInt(
                    populacaoArr[i][1] - parseInt(qtdBolsas)
                  );
                }
              }

              if (result.length > 0) {
                db.query(
                  "UPDATE bancodesangue SET `A+` = ?, `A-` = ?, `B+` = ?, `B-` = ?, `AB+` = ?, `AB-` = ?, `O+` = ?, `O-` = ? WHERE (`id` = '0')",
                  [
                    populacaoArr[1][1],
                    populacaoArr[2][1],
                    populacaoArr[3][1],
                    populacaoArr[4][1],
                    populacaoArr[5][1],
                    populacaoArr[6][1],
                    populacaoArr[7][1],
                    populacaoArr[8][1],
                  ],

                  (err, result) => {
                    if (err) {
                      res.send(err);
                    }
                  }
                );
              }

              res.send({
                msg: "Retirada de bolsa com sucesso",
                retirada: {
                  pacienteBolsas: pacienteBolsas,
                  grupoBolsas: grupoBolsas,
                  qtdBolsas: qtdBolsas,
                  valorBolsas: valorBolsas,
                  dataBolsas: formatDate(dataBolsas),
                },
              });
            }
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.put("/doacao", async (req, res) => {
  const {
    doadorId,
    doadorName,
    doadorIdade,
    doadorNumero,
    doadorRG,
    doadorEmail,
    doadorSangue,
    doadorGenero,
    doadorAniversario,
    doadorEndereco,
    doadorDetalhes,
    doadorQTD,
    doadorData
  } = req.body;

  try {
    db.query(
      "SELECT * FROM doadores WHERE id = ?",
      [doadorId],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length > 0) {
          const qtd = parseInt(result[0].doadorQTD) + parseInt(doadorQTD);

          const sangue = result[0].doadorSangue;
          db.query(
            "UPDATE doadores SET doadorQTD = ? WHERE id = ?",
            [qtd, doadorId],
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                db.query(
                  "SELECT * FROM bancodesangue WHERE id = ?",
                  [0],
                  (err, result) => {
                    if (err) {
                      res.send(err);
                    }

                    let populacaoArr = Object.entries(result[0]);

                    for (let i = 0; i < populacaoArr.length; i++) {
                      if (populacaoArr[i][0] == sangue) {
                        populacaoArr[i][1] = parseInt(
                          populacaoArr[i][1] + parseInt(doadorQTD)
                        );
                      }
                    }
                    if (result.length > 0) {
                      db.query(
                        "UPDATE bancodesangue SET `A+` = ?, `A-` = ?, `B+` = ?, `B-` = ?, `AB+` = ?, `AB-` = ?, `O+` = ?, `O-` = ? WHERE (`id` = '0')",
                        [
                          populacaoArr[1][1],
                          populacaoArr[2][1],
                          populacaoArr[3][1],
                          populacaoArr[4][1],
                          populacaoArr[5][1],
                          populacaoArr[6][1],
                          populacaoArr[7][1],
                          populacaoArr[8][1],
                        ],

                        (err, result) => {
                          if (err) {
                            res.send(err);
                          } else {
                            res.send({
                              msg: "Doacao feita com sucesso",
                              doador: {
                                doadorName: doadorName,
                                doadorIdade: doadorIdade,
                                doadorNumero: doadorNumero,
                                doadorRG: doadorRG,
                                doadorEmail: doadorEmail,
                                doadorSangue: doadorSangue,
                                doadorGenero: doadorGenero,
                                doadorAniversario: doadorAniversario,
                                doadorEndereco: doadorEndereco,
                                doadorDetalhes: doadorDetalhes,
                                doadorQTD: qtd,
                                doadorData: doadorData
                              },
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );

          console.log("tetse");
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

/* update doutor */
router.put("/:id", async (req, res) => {
  const id = req.body.doadorId;
  const {
    doadorName,
    doadorIdade,
    doadorNumero,
    doadorRG,
    doadorEmail,
    doadorSangue,
    doadorGenero,
    doadorAniversario,
    doadorEndereco,
    doadorDetalhes,
    doadorQTD,
    doadorData
  } = req.body;

  try {
    db.query("SELECT * FROM doadores WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query(
          "UPDATE doadores SET doadorName = ?, doadorIdade = ? ,doadorNumero = ?, doadorRG = ?, doadorEmail = ?, doadorSangue = ?, doadorGenero = ?, doadorAniversario = ?, doadorEndereco = ?, doadorDetalhes = ? , doadorQTD = ?, doadorData = ?, WHERE id = ?",
          [
            doadorName,
            doadorIdade,
            doadorNumero,
            doadorRG,
            doadorEmail,
            doadorSangue,
            doadorGenero,
            doadorAniversario,
            doadorEndereco,
            doadorDetalhes,
            doadorQTD,
            doadorData,
            id,
          ],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send({
                msg: "mudaça feita com sucesso",
                doador: {
                  doadorName: doadorName,
                  doadorIdade: doadorIdade,
                  doadorNumero: doadorNumero,
                  doadorRG: doadorRG,
                  doadorEmail: doadorEmail,
                  doadorSangue: doadorSangue,
                  doadorGenero: doadorGenero,
                  doadorAniversario: doadorAniversario,
                  doadorEndereco: doadorEndereco,
                  doadorDetalhes: doadorDetalhes,
                  doadorQTD: doadorQTD,
                  doadorData: doadorData
                },
              });
            }
          }
        );
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

/* delete doador */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM doadores WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query("DELETE FROM doadores WHERE id = ?", [id], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ msg: "Doador deletado com Sucesso" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;