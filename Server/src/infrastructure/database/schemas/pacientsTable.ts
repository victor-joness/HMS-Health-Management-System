import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  date,
  text
} from "drizzle-orm/pg-core";

export const pacientsTable = pgTable("pacients", {
  Id: serial("id").primaryKey(), // Chave primária
  UserId: integer("user_id").notNull(), // Chave estrangeira para o usuário
  // Campos específicos de Pacient
  AddressId: integer("address_id").notNull(), // Endereço
  Medications: text("medications").array().notNull(), // Lista de medicações
  EmergencyContacts: text("emergency_contacts").notNull(), // Contatos de emergência em JSON
  InsuranceDetailsId: integer("insurance_details_id"), // Chave estrangeira para os detalhes do seguro
  MedicalHistory: text("medical_history").notNull(), // Histórico médico em JSON
  PreferredDoctorId: varchar("preferred_doctor_id"), // Médico preferido
  LastVisitDate: date("last_visit_date"), // Data da última visita
  CovidVaccinationStatus: boolean("covid_vaccination_status").notNull(), // Status de vacinação
  Disabilities: text("disabilities").array().notNull(), // Lista de deficiências
  OrganDonor: boolean("organ_donor").notNull(), // Status de doador de órgãos
  AdditionalNotes: text("additional_notes"), // Notas adicionais
  WorkInfo: text("work_info"), // Informações de trabalho em JSON (pode ser nulo)
  Report: text("report").notNull(), // Relatórios médicos em JSON
  Identification: text("identification"), // Identificação (pode ser nulo)
});
