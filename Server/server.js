const express = require("express");
const cors = require("cors");
require("dotenv").config();

const users = require("./routes/users");
const doutores = require("./routes/doutores");
const enfermeiras = require("./routes/Enfermeira");
const farmacias = require("./routes/farmacia");
const register = require("./routes/register");
const login = require("./routes/login");
const doadores = require("./routes/doadores");
const cirurgia = require("./routes/cirurgias");
const cama = require("./routes/camas");
const pacientes = require("./routes/pacientes");

const multer = require("multer");

const app = express();
const dbMiddleware = require("./middleware/dbMiddleware");

//MIDLEWARES
app.use(express.json());
app.use(cors());
app.use(dbMiddleware);

//ENDPOINTS
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/users", users);
app.use("/api/doutores", doutores);
app.use("/api/doadores", doadores);
app.use("/api/enfermeiras", enfermeiras);
app.use("/api/farmacias", farmacias);
app.use("/api/cirurgia", cirurgia);
app.use("/api/camas", cama);
app.use("/api/pacientes", pacientes);

//Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get("/", (req, res) => {
  res.send("Welcome the api ERP-Hospitalar");
});

module.exports = app;
