import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const sql = postgres({
  host: "localhost",
  port: 5432,
  database: "HMS",
  user: "postgres",
  password: "15062002",
});

export const db = drizzle(sql);
