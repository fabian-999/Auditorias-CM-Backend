import express from 'express';
import cors from 'cors';

const app = express();

// =========================
// Middlewares
// =========================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================
// Ruta de prueba
// =========================
app.get('/api/health', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend funcionando correctamente 🚀'
    });
});

export default app;