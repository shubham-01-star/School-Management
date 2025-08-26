import express from 'express';
import schoolRoutes from './routes/schoolRoutes';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api', schoolRoutes);

// global error fallback 
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ code: 'INTERNAL', message: 'Internal server error' });
});

export default app;
