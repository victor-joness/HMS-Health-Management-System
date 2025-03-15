import { pgTable, serial, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const humanResourcesEmployeeTable = pgTable("human_resources_employees", {
  Id: serial("id").primaryKey(), // Chave primária
  FullName: varchar("fullname").notNull(), // Nome completo do funcionário
  Email: varchar("email").notNull(), // Endereço de e-mail
  PhoneNumber: varchar("phonenumber").notNull(), // Número de telefone
  Address: varchar("address").notNull(), // Endereço do funcionário
  City: varchar("city").notNull(), // Cidade onde o funcionário reside
  State: varchar("state").notNull(), // Estado onde o funcionário reside
  ZipCode: varchar("zipcode").notNull(), // CEP do endereço do funcionário
  Gender: varchar("gender").notNull(), // Gênero do funcionário
  Birthday: varchar("birthday").notNull(), // Data de nascimento
  IdentificationNumber: varchar("identification_number").notNull(), // Número de identificação
  JobTitle: varchar("jobtitle").notNull(), // Cargo do funcionário
  Department: varchar("department").notNull(), // Departamento do funcionário
  WorkingHours: varchar("working_hours").notNull(), // Horário de trabalho
  IsActive: boolean("is_active").notNull().default(true), // Indica se o funcionário está ativo
  Notes: varchar("notes"), // Observações opcionais
  DeletionDate: varchar("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: varchar("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: varchar("creation_date").notNull(), // Data de criação com valor padrão atual
});
