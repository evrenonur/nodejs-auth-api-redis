import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import sequelize from './config/database.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});

const PORT = process.env.PORT || 3000;

// Database bağlantısı ve sunucuyu başlatma
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Sunucu ${PORT} portunda çalışıyor`);
    });
});

export default app; 