import app from './app';
import 'reflect-metadata';
import { AppDataSource } from './ormconfig';
import * as dotenv from 'dotenv';

const PORT = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at https://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
