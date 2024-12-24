import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

import { dbMiddleware } from './middleware/dbMiddleware.js';

import users from './routes/users.js';
import doutores from './routes/doutores.js';
import enfermeiras from './routes/Enfermeira.js';
import farmacias from './routes/farmacia.js';
import register from './routes/register.js';
import login from './routes/login.js';
import doadores from './routes/doadores.js';
import cirurgia from './routes/cirurgias.js';
import cama from './routes/camas.js';
import pacientes from './routes/pacientes.js';

dotenv.config();

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/api/db', dbMiddleware);
app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/doutores', doutores);
app.use('/api/doadores', doadores);
app.use('/api/enfermeiras', enfermeiras);
app.use('/api/farmacias', farmacias);
app.use('/api/cirurgia', cirurgia);
app.use('/api/camas', cama);
app.use('/api/pacientes', pacientes);

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file?.filename);
});

app.get('/', (req, res) => {
    res.send('Welcome to the HMS-Health Management System API');
});

export default app;