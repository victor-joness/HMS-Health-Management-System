import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

const dbMiddleware = (req, res, next) => {
  req.db = sql;
  next();
};

export { sql, dbMiddleware };
