import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const pharmaciesTable = pgTable("pharmacies", {
  Id: serial("id").primaryKey(), // Chave primária
  Name: varchar("name").notNull(), // Nome da farmácia
  Address: varchar("address").notNull(), // Endereço da farmácia
  Phone: varchar("phone").notNull(), // Número de telefone da farmácia
  Email: varchar("email").notNull(), // Email da farmácia
  Cnpj: varchar("cnpj").notNull(), // CNPJ da farmácia
  OpeningHours: varchar("opening_hours").notNull(), // Horário de funcionamento
  IsActive: varchar("is_active").notNull(), // Está ativa?
  DeletionDate: varchar("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: varchar("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: varchar("creation_date").notNull(), // Data de criação com valor padrão atual
});
