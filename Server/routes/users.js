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

db.connect();

//GET ALL USERS
router.get("/", async (req , res) => {
    try {
        db.query("SELECT * FROM users", (err, result) => {
            const users = result;
            res.status(200).send(users);
        });
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;