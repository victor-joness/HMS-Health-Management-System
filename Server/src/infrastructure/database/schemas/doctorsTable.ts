import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  json,
  date,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersTable";

export const doctorsTable = pgTable("doctors", {
  Id: serial("id").primaryKey(), // Chave primária
  UserId: integer("userid")
    .notNull()
    .references(() => usersTable.Id), // Chave estrangeira para o usuário
  Speciality: varchar("speciality").notNull(), // Especialidade
  MedicalLicenseNumber: varchar("medical_license_number").notNull(), // Número de licença médica
  YearsOfExperience: integer("years_of_experience").notNull(), // Anos de experiência
  Department: varchar("department").notNull(), // Departamento
  WorkScheduleDetails: text("work_schedule_details").notNull(), // Detalhes do horário de trabalho (JSON armazenado como string)
  EmergencyAvailability: boolean("emergency_availability").notNull(), // Disponibilidade de emergência
  Notes: text("notes"), // Notas
  ResearchPublications: json("research_publications").default([]),
  supervisingNurses: json("supervising_nurses").default([]),
  Qualifications: text("qualifications").array().default([]), // Lista de qualificações (garantindo array por padrão)
  Specialization: varchar("specialization").notNull(), // Especialização
  Certifications: text("certifications").array().notNull().default([]), // Lista de certificações (garantindo array por padrão)
  PatientsAssigned: integer("patients_assigned").array().default([]), // Pacientes atribuídos (inteiros armazenados como array)
  Address: varchar("address").notNull(), // Endereço
  Creation_date: date("creation_date").defaultNow().notNull(), // Data de criação
  Modified_date: date("modified_date").defaultNow().notNull(), // Data de modificação
  Deletion_date: date("deletion_date"), // Data de exclusão
});
