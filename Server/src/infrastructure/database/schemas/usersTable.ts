import { pgTable, serial, varchar, integer, date } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  Id: serial("id").primaryKey(), // Chave primária
  Name: varchar("name").notNull(), // Nome do usuário
  Email: varchar("email").notNull(), // Email
  Password: varchar("password").notNull(), // Senha
  Role: integer("role").notNull(), // Enum de função do usuário
  Img: varchar("img"), // Imagem do usuário
  Gender: varchar("gender"),
  Age: varchar("age"), // Idade como string
  PhoneNumber: varchar("phone_number"), // Número de telefone
  PhoneEmergency: varchar("phone_emergency"), // Telefone de emergência
  DeletionDate: date("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: date("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: date("creation_date").defaultNow().notNull(), // Data de criação com valor padrão atual
});
