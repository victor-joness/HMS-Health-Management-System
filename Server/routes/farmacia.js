import { Router } from "express";
import mysql from "mysql2";

const router = Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "erp-hospitalar",
});

db.connect();

//GET ALL remedios
router.get("/getFarmacias", async (req, res) => {
  try {
    db.query("SELECT * FROM farmacia", (err, result) => {
      const farmacia = result;
      res.status(200).send(farmacia);
    });
  } catch (error) {
    console.log(error);
  }
});

//CREATE remedio
router.post("/", async (req, res) => {
  const {
    farmaciaNome,
    farmaciaTipo,
    farmaciaValor,
    farmaciaQuantidade,
    farmaciaValidade,
    farmaciaLaboratorio,
    farmaciaDetalhes,
  } = req.body;

  try {
    db.query(
      "INSERT INTO farmacia (farmaciaNome, farmaciaTipo, farmaciaValor, farmaciaQuantidade, farmaciaValidade, farmaciaLaboratorio, farmaciaDetalhes) VALUE (?,?,?,?,?,?,?)",
      [
        farmaciaNome,
        farmaciaTipo,
        farmaciaValor,
        farmaciaQuantidade,
        farmaciaValidade,
        farmaciaLaboratorio,
        farmaciaDetalhes,
      ],
      (error, response) => {
        if (error) {
          console.log(error);
          res.send(error);
        }
        res.send({
          msg: "Remédio cadastrado com sucesso",
          farmacia: {
            farmaciaNome: farmaciaNome,
            farmaciaTipo: farmaciaTipo,
            farmaciaValor: farmaciaValor,
            farmaciaQuantidade: farmaciaQuantidade,
            farmaciaValidade: farmaciaValidade,
            farmaciaLaboratorio: farmaciaLaboratorio,
            farmaciaDetalhes: farmaciaDetalhes,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

/* update remedio */
router.put("/:id", async (req, res) => {
  const {
    farmaciaId,
    farmaciaNome,
    farmaciaTipo,
    farmaciaValor,
    farmaciaQuantidade,
    farmaciaValidade,
    farmaciaLaboratorio,
    farmaciaDetalhes,
  } = req.body;

  try {
    db.query(
      "SELECT * FROM farmacia WHERE id = ?",
      [farmaciaId],
      (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result.length > 0) {
          db.query(
            "UPDATE farmacia SET farmaciaNome = ?, farmaciaTipo = ? ,farmaciaValor = ?, farmaciaQuantidade = ?, farmaciaValidade = ?, farmaciaLaboratorio = ?, farmaciaDetalhes = ? WHERE id = ?",
            [
              farmaciaNome,
              farmaciaTipo,
              farmaciaValor,
              farmaciaQuantidade,
              farmaciaValidade,
              farmaciaLaboratorio,
              farmaciaDetalhes,
              farmaciaId,
            ],
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                res.send({
                  msg: "mudaça feita com sucesso",
                  farmacia: {
                    farmaciaNome: farmaciaNome,
                    farmaciaTipo: farmaciaTipo,
                    farmaciaValor: farmaciaValor,
                    farmaciaQuantidade: farmaciaQuantidade,
                    farmaciaValidade: farmaciaValidade,
                    farmaciaLaboratorio: farmaciaLaboratorio,
                    farmaciaDetalhes: farmaciaDetalhes,
                    farmaciaId: farmaciaId,
                  },
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

/* delete remedio */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.query("SELECT * FROM farmacia WHERE id = ?", [id], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        db.query("DELETE FROM farmacia WHERE id = ?", [id], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ msg: "Remédio deletada com Sucesso" });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
