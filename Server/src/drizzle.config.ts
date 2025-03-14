import { defineConfig } from "drizzle-kit";
import { env } from "process";

export default defineConfig({
  schema: "./src/infrastructure/database/schemas",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://victorjones:15062002@localhost:5432/HMS"
  }
});
