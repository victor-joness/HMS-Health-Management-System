import {
    pgTable,
    serial,
    varchar,
    boolean,
    date,
  } from "drizzle-orm/pg-core";
  
  export const hospitalsTable = pgTable("hospitals", {
    Id: serial("id").primaryKey(), // Chave primária
    Name: varchar("name", { length: 255 }).notNull(), // Nome do hospital
    Address: varchar("address", { length: 255 }).notNull(), // Endereço do hospital
    City: varchar("city", { length: 100 }), // Cidade onde o hospital está localizado
    State: varchar("state", { length: 100 }), // Estado onde o hospital está localizado
    PostalCode: varchar("postal_code", { length: 20 }), // Código postal
    Country: varchar("country", { length: 100 }), // País
    PhoneNumber: varchar("phone_number", { length: 20 }), // Número de telefone
    Email: varchar("email", { length: 100 }), // E-mail de contato
    Website: varchar("website", { length: 255 }), // Site do hospital
    IsActive: boolean("is_active").default(true), // Indica se o hospital está ativo ou não
    Creation_date: date("creation_date").notNull(), // Data de criação com valor padrão atual
    Modified_date: date("modified_date"), // Data de modificação (pode ser nula)
    Deletion_date: date("deletion_date") // Data de exclusão (pode ser nula)
  });
  