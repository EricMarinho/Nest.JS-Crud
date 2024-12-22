import { DataSource} from 'typeorm';
import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';

config();

export const configOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT as string),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['**/*.entity.ts'],
  migrations: ['**/src/common/db/migrations/*.ts'],
  ssl: process.env.POSTGRES_SSL === 'true' ? { 
    rejectUnauthorized: true,
    ca: fs.readFileSync('./rds.pem').toString(), 
  } : undefined
};

export const configOptionsTesting: TypeOrmModuleOptions = {
    ...configOptions,
    database:  process.env.POSTGRES_DB + '_TEST',	
};

const configTypeorm = new DataSource(configOptions as any);

export default configTypeorm;