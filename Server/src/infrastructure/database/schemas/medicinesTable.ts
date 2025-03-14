import {
    pgTable,
    serial,
    varchar,
    integer,
    text,
    decimal,
    date
  } from "drizzle-orm/pg-core";

export const medicinesTable = pgTable("medicines", {
    Id: serial("id").primaryKey(), // Chave primária
    Name: varchar("name", { length: 255 }).notNull(), // Nome do medicamento
    Description: text("description"), // Descrição do medicamento
    type: varchar("type").notNull(), // Tipo de medicamento (Enum)
    manufacturer: varchar("manufacturer", { length: 255 }), // Fabricante
    batch_number: varchar("batch_number", { length: 100 }), // Número do lote
    quantity_in_stock: integer("quantity_in_stock").notNull().default(0), // Quantidade em estoque
    price_per_unit: decimal("price_per_unit", { precision: 10, scale: 2 }).notNull(), // Preço por unidade
    expiry_date: date("expiry_date").notNull(), // Data de validade
    storage_instructions: text("storage_instructions"), // Instruções de armazenamento
    DeletionDate: varchar("deletion_date"), // Data de exclusão lógica
    ModifiedDate: varchar("modified_date"), // Data de modificação
    CreationDate: varchar("creation_date").notNull(), // Data de criação
  });