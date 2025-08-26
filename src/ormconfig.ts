import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { School } from './enitity/School';
import * as dotenv from 'dotenv';


dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [School],
});
