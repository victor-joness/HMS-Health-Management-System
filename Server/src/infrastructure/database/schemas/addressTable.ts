import {
  pgTable,
  serial,
  varchar
} from "drizzle-orm/pg-core";

export const addressTable = pgTable("address", {
  Id: serial("id").primaryKey(), // Chave primária
  // Campos básicos de Address
  Street: varchar("street").notNull(), // Rua
  City: varchar("city").notNull(), // Cidade
  State: varchar("state").notNull(), // Estado
  ZipCode: varchar("zip_code").notNull(), // CEP
  Country: varchar("country").notNull(), // País
});
