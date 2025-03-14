import {
    pgTable,
    serial,
    varchar,
    integer,
    boolean,
    date,
    text
  } from "drizzle-orm/pg-core";
  
  export const donorTable = pgTable("donors", {
    id: serial("id").primaryKey(), // Chave primária
    full_name: varchar("full_name", { length: 255 }).notNull(), // Nome completo
    email: varchar("email", { length: 255 }).notNull().unique(), // Email único
    phone_number: varchar("phone_number", { length: 20 }).notNull(), // Número de telefone
    address: text("address").notNull(), // Endereço completo
    city: varchar("city", { length: 100 }).notNull(), // Cidade
    state: varchar("state", { length: 100 }).notNull(), // Estado
    zip_code: varchar("zip_code", { length: 20 }).notNull(), // Código postal
    blood_type: varchar("blood_type", { length: 3 }).notNull(), // Tipo sanguíneo (ex.: A+, O-)
    gender: varchar("gender", { length: 20 }).notNull(), // Gênero
    birthday: date("birthday").notNull(), // Data de nascimento
    identification_number: varchar("identification_number", { length: 50 }).notNull().unique(), // Número de identificação oficial
    details: text("details"), // Detalhes adicionais ou observações
    donation_count: integer("donation_count").default(0).notNull(), // Contagem de doações realizadas
    last_donation_date: date("last_donation_date"), // Data da última doação
    is_active_donor: boolean("is_active_donor").default(true).notNull(), // Status ativo do doador
    notes: text("notes"), // Notas ou observações
    creation_date: date("creation_date").defaultNow().notNull(), // Data de criação
    modified_date: date("modified_date").defaultNow().notNull(), // Data de modificação
    deletion_date: date("deletion_date"), // Data de exclusão
  });