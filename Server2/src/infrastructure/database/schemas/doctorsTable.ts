import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const doctorsTable = pgTable("doctors", {
  Id: serial("id").primaryKey(), // Chave primária
  UserId: integer("userid").notNull(), // Chave estrangeira para o usuário
  // Campos básicos de Doctor
  Speciality: varchar("speciality").notNull(), // Especialidade
  MedicalLicenseNumber: varchar("medical_license_number").notNull(), // Número de licença médica
  YearsOfExperience: integer("years_of_experience").notNull(), // Anos de experiência
  Department: varchar("department").notNull(), // Departamento
  WorkScheduleDetails: text("work_schedule_details").notNull(), // Detalhes do horário de trabalho em JSON
  EmergencyAvailability: boolean("emergency_availability").notNull(), // Disponibilidade de emergência
  Notes: text("notes"), // Notas
  Qualifications: text("qualifications").array(), // Lista de qualificações
  Specialization: varchar("specialization").notNull(), // Especialização
  Certifications: text("certifications").array().notNull(), // Lista de certificações
  PatientsAssigned: integer("patients_assigned").array(), // Pacientes atribuídos em JSON
});
