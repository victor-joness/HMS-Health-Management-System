import {
    pgTable,
    serial,
    varchar,
    integer,
    date,
    text
  } from "drizzle-orm/pg-core";

export const donationRecordsTable = pgTable("donation_records", {
    id: serial("id").primaryKey(), // Chave primária
    donor_id: integer("donor_id").notNull(), // Chave estrangeira para o doador
    donation_date: date("donation_date").notNull(), // Data da doação
    quantity_donated: varchar("quantity_donated", { length: 10 }).notNull(), // Quantidade doada
    donation_location: varchar("donation_location", { length: 255 }).notNull(), // Local da doação
    notes: text("notes"), // Notas
    deletion_date: date("deletion_date"), // Data de exclusão (pode ser nula)
    modified_date: date("modified_date"), // Data de modificação (pode ser nula)
    creation_date: date("creation_date").notNull(), // Data de criação com valor padrão atual
  });