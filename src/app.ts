import express from 'express';
import cors from 'cors';
import auditsRoutes from './routes/audits.routes.js';

const app = express();

// =========================
// Middlewares
// =========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Health Check
// =========================
app.get('/api/health', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'Backend funcionando correctamente 🚀'
    });
});

// =========================
// API Routes
// =========================
app.use('/api/audits', auditsRoutes);

export default app;