import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import * as dotenv from 'dotenv';

dotenv.config();
export const ormConfig = {
  type: 'mysql',
  host: '127.0.0.1',
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/**/**.entity.ts"],
  synchronize: true,
  cli: {
    entitiesDir: "src/entity"
  }
} as TypeOrmModuleOptions
