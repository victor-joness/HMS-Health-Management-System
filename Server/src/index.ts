import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import routes from "./interfaces/routes/index";
import multer from "multer";
import { setupSwagger } from "./infrastructure/external-services/SwaggerService";
import { MetricsService } from './infrastructure/monitoring/MetricsService';
import { register } from 'prom-client';

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Muitas requisições deste IP, tente novamente em 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10,
  message: 'Limite de uploads excedido, tente novamente em 1 hora',
});

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/', limiter);

setupSwagger(app);

/* // Middleware de monitoramento
app.use(monitoringMiddleware); */

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    // Permitir apenas imagens
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Apenas imagens são permitidas!'));
    }
  }
});

app.post("/api/upload", 
  uploadLimiter,
  upload.single("file"), 
  (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: 'Nenhum arquivo enviado' });
        return;
      }
      res.status(200).json({ filename: file.filename });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar upload' });
    }
    next();
});

app.use("/api", routes);

app.get('/metrics', async (req, res) => {
  const metrics = await MetricsService.getInstance().getMetrics();
  res.set('Content-Type', register.contentType);
  res.send(metrics);
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api/docs`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Aplicação continua executando
});
