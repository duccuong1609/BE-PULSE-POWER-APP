import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Product } from './product/entities/product.entity.js';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product],
  migrations: ['src/migrations/*.ts'],
});
