import { pgTable, serial, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const receptionistsTable = pgTable("receptionists", {
  Id: serial("id").primaryKey(), // Chave primária
  FullName: varchar("fullname").notNull(), // Nome completo do recepcionista
  Email: varchar("email").notNull(), // Endereço de e-mail
  PhoneNumber: varchar("phonenumber").notNull(), // Número de telefone
  Address: varchar("address").notNull(), // Endereço do recepcionista
  City: varchar("city").notNull(), // Cidade onde o recepcionista reside
  State: varchar("state").notNull(), // Estado onde o recepcionista reside
  ZipCode: varchar("zipcode").notNull(), // CEP do endereço do recepcionista
  Gender: varchar("gender").notNull(), // Gênero do recepcionista
  Birthday: varchar("birthday").notNull(), // Data de nascimento
  IdentificationNumber: varchar("identification_number").notNull(), // Número de identificação
  JobTitle: varchar("jobtitle").notNull(), // Cargo do recepcionista
  Department: varchar("department").notNull(), // Departamento do recepcionista
  WorkingHours: varchar("working_hours").notNull(), // Horário de trabalho
  IsActive: boolean("is_active").notNull().default(true), // Indica se o recepcionista está ativo
  Notes: varchar("notes"), // Observações opcionais
  DeletionDate: varchar("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: varchar("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: varchar("creation_date").notNull(), // Data de criação com valor padrão atual
});