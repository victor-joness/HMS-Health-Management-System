import {
  pgTable,
  serial,
  integer,
  boolean,
  date,
  text
} from "drizzle-orm/pg-core";

export const patientsTable = pgTable("patients", {
  Id: serial("id").primaryKey(),
  UserId: integer("user_id").notNull(),
  Medications: text("medications").array(),
  EmergencyContact: text("emergency_contact").notNull(),
  InsuranceDetailsId: integer("insurance_details_id").notNull(),
  MedicalHistory: integer("medical_history_id"),
  PreferredDoctorId: integer("preferred_doctor_id"),
  LastVisitDate: date("last_visit_date"),
  CovidVaccinationStatus: boolean("covid_vaccination_status").notNull(),
  Disabilities: text("disabilities").array(),
  OrganDonor: boolean("organ_donor").notNull(),
  AdditionalNotes: text("additional_notes"),
  WorkInfo: text("work_info").notNull(),
  Report: integer("report_id"),
  IdentificationNumber: text("identification_number"),
  IdentificationType: text("identification_type"),
  PatientAtendimentType: text("patient_atendiment_type"),
  Address: text("address").notNull(),
  DeletionDate: date("deletion_date"),
  ModifiedDate: date("modified_date"),
  CreationDate: date("creation_date").notNull().defaultNow(),
});