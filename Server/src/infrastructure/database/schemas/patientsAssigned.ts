import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const patientsAssigned = pgTable("patients_assigned", {
  Id: serial("id").primaryKey(), // Chave primária
  NurseId: integer("nurseid").notNull(), // Chave estrangeira para o usuário
  PatientId: integer("patientid").notNull(), // Chave estrangeira para o usuário
  PatientName: varchar("patientname").notNull(), // Chave estrangeira para o usuário
  RoomNumber: varchar("roomnumber").notNull(), // Chave estrangeira para o usuário
  DoctorId: integer("doctorid").notNull(), // Chave estrangeira para o usuário
  DeletionDate: varchar("deletion_date"), // Data de exclusão (pode ser nula)
  ModifiedDate: varchar("modified_date"), // Data de modificação (pode ser nula)
  CreationDate: varchar("creation_date").notNull(), // Data de criação com valor padrão atual
});
