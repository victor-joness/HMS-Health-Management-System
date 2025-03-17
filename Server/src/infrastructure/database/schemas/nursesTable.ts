import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  date,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersTable";

export const nursesTable = pgTable("nurses", {
  Id: serial("id").primaryKey(),
  UserId: integer("user_id")
      .notNull()
      .references(() => usersTable.Id),
  Qualifications: varchar("qualifications"),
  YearsOfExperience: integer("years_of_experience").notNull(),
  Department: varchar("department").notNull(),
  WorkScheduleDetails: text("work_schedule_details").notNull(),
  SupervisingDoctor: varchar("supervisor"),
  Specialization: varchar("specialization"),
  NursingLicenseNumber: varchar("nursing_license_number"),
  EmergencyAvailability: boolean("emergency_availability"),
  Notes: text("notes"),
  Certifications: text("certifications").array().notNull(),
  Address: varchar("address").notNull(),
  PatientsAssigned: text("patients_assigned"),
  Creation_date: date("creation_date").defaultNow().notNull(),
  Modified_date: date("modified_date").defaultNow().notNull(),
  Deletion_date: date("deletion_date"),
});
