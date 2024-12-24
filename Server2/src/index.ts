import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./interfaces/routes/index";
import multer from "multer";
import { setupSwagger } from "./infrastructure/external-services/SwaggerService";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
setupSwagger(app);

// Rotas
app.use("/api", routes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file?.filename);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
