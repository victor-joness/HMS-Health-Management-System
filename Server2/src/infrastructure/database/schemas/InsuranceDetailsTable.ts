import {
  pgTable,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const insuranceDetailsTable = pgTable("insurance_details", {
  Id: serial("id").primaryKey(), // Chave primária
  PacientId: integer("pacient_id").notNull(), // Chave estrangeira para o usuário
  // Campos básicos de InsuranceDetails
  ProviderName: varchar("provider_name").notNull(), // Nome do fornecedor
  InsuranceType: integer("insurance_type").notNull(), // Tipo de seguro
  PolicyNumber: varchar("policy_number").notNull(), // Número da poliza
  ExpirationDate: varchar("expiration_date").notNull(), // Data de validade
  DeletionDate: varchar("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: varchar("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: varchar("creation_date").notNull(), // Data de criação com valor padrão atual
});
