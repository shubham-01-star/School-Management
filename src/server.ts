import app from './app';
import 'reflect-metadata';
import { AppDataSource } from './ormconfig';

const PORT = process.env.PORT || 5000;

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
