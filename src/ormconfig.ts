import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { School } from './enitity/School'


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root@123',
  database: 'school_management',
  synchronize: false,
  logging: true,
  entities: [School],
});
