import { pgTable, serial, varchar, integer, boolean, text } from "drizzle-orm/pg-core";
import { usersTable } from "./usersTable";

export const receptionistsTable = pgTable("receptionists", {
  Id: serial("id").primaryKey(), // Chave primária
  UserId: integer("user_id")
        .notNull()
        .references(() => usersTable.Id),
  JobTitle: varchar("jobtitle").notNull(), // Cargo do recepcionista
  WorkScheduleDetails: text("work_schedule_details").notNull(), // Horário de trabalho
  EmergencyAvailability: boolean("emergency_availability"),
  Address: varchar("address").notNull(), // Endereço
  Notes: varchar("notes"), // Observações opcionais
  DeletionDate: varchar("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: varchar("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: varchar("creation_date").notNull(), // Data de criação com valor padrão atual
});