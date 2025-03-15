import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  date,
} from "drizzle-orm/pg-core";

export const nursesTable = pgTable("nurses", {
  Id: serial("id").primaryKey(), // Chave primária
  UserId: integer("user_id").notNull(), // Chave estrangeira para o usuário
  // Campos básicos de Nurse
  Qualifications: text("qualifications").array().notNull(), // Lista de qualificações
  YearsOfExperience: integer("years_of_experience").notNull(), // Anos de experiência
  Department: varchar("department").notNull(), // Departamento
  WorkScheduleDetails: text("work_schedule_details").notNull(), // Detalhes do horário de trabalho em JSON
  Supervisor: varchar("supervisor"), // Supervisor (pode ser nulo)
  EmergencyResponseTraining: boolean("emergency_response_training").notNull(), // Treinamento de resposta de emergência
  Notes: text("notes"), // Notas
  Certifications: text("certifications").array().notNull(), // Lista de certificações
  PatientsAssigned: text("patients_assigned").notNull(), // Pacientes atribuídos em JSON
  Creation_date: date("creation_date").defaultNow().notNull(), // Data de criação
  Modified_date: date("modified_date").defaultNow().notNull(), // Data de modificação
  Deletion_date: date("deletion_date"), // Data de exclusão
});
