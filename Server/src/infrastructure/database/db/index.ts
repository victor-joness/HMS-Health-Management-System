import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const databaseConfig = {
  maxConnections: 20,
  connectionTimeout: 30000,
  retryAttempts: 3,
  ssl: process.env.NODE_ENV === "PROD",
  debug: process.env.NODE_ENV !== "PROD",
}

const prodConfig = {
  host: "postgres",
  port: 5432,
  database: "HMS",
  user: "victorjones",
  password: "15062002",
  ...databaseConfig
};

const devConfig = {
  host: "127.0.0.1",
  port: 5432,
  database: "HMSLOCAL",
  user: "victorjones",
  password: "15062002",
  ...databaseConfig
};

let sql;

try {
  sql = postgres(process.env.NODE_ENV === "PROD" ? prodConfig : devConfig);
} catch (error) {
  throw new Error(`Erro ao conectar com o banco. Error: ${error}`);
}

export const db = drizzle(sql);