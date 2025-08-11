import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { prometheusMiddleware, getMetrics } from './config/prometheus.js';
import register from './config/prometheus.js';
import cors from 'cors';

dotenv.config();
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();

app.use(cors());
app.use(express.json());

app.use(prometheusMiddleware);

app.use('/api/auth', authRoutes);

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await getMetrics());
  } catch (error) {
    res.status(500).end(error);
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Prometheus metrics available at /metrics`);
    console.log(`🏥 Health check available at /health`);
  });
}

export default app;
