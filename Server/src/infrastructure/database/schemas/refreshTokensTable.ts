import {
  pgTable,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const refreshTokensTable = pgTable("refresh_tokens", {
  Id: serial("id").primaryKey(), // Chave primária
  UserId: integer("user_id").notNull(), // Chave estrangeira para o usuário
  Token: varchar("token").notNull(), // Token de atualização
  ExpiresAt: varchar("expires_at").notNull(), // Data de expiração
  Revoked: integer("revoked").notNull(), // Revogado
  createdAt: varchar("created_at").notNull(), // Data de criação
  DeletionDate: varchar("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: varchar("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: varchar("creation_date").notNull(), // Data de criação com valor padrão atual
});
