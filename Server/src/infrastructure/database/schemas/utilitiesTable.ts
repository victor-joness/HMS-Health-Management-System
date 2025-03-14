import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const utilitiesTable = pgTable("utilities", {
  id: serial("id").primaryKey(), // Chave primária
  name: varchar("name", { length: 255 }).notNull(), // Nome do item
  type: varchar("type", { length: 100 }).notNull(), // Tipo do item
  status: varchar("status", { length: 50 }).notNull(), // Status do item
  location: varchar("location", { length: 255 }).notNull(), // Localização do item
  quantity: integer("quantity").notNull(), // Quantidade do item
  deletion_date: varchar("deletion_date"), // Data de exclusão
  modified_date: varchar("modified_date"), // Data de modificação
  creation_date: varchar("creation_date").notNull(), // Data de criação
  last_maintenance: varchar("last_maintenance"), // Última manutenção
  next_maintenance: varchar("next_maintenance"), // Próxima manutenção
  observations: varchar("observations", { length: 500 }), // Observações
});
