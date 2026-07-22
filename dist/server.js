import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log('');
    console.log('🚀 Servidor iniciado correctamente');
    console.log(`📡 http://localhost:${PORT}`);
    console.log('');
});
