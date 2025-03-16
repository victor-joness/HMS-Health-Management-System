import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

const databaseConfig = {
  maxConnections: 20,
  connectionTimeout: 30000,
  retryAttempts: 3,
  ssl: process.env.NODE_ENV === "PROD",
  debug: process.env.NODE_ENV !== "PROD",
}

const prodConfig = {
  host: process.env.HOST_DOCKER,
  port: 5432,
  database: process.env.DATABASE_DOCKER,
  user: process.env.USER_DOCKER,
  password: process.env.SENHA_DOCKER,
  ...databaseConfig
};

const devConfig = {
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.SENHA,
  ...databaseConfig
};

let sql;

try {
  sql = postgres(process.env.NODE_ENV === "PROD" ? prodConfig : devConfig);
} catch (error) {
  throw new Error(`Erro ao conectar com o banco. Error: ${error}`);
}

export const db = drizzle(sql);