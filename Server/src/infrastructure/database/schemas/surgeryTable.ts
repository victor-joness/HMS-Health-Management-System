import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const surgeryTable = pgTable("surgery", {
  id: serial("id").primaryKey(),
  patient_id: integer("patient_id").notNull(),
  surgery_type: integer("surgery_type").notNull(), // Assuming you use enums as integers
  surgery_date: timestamp("surgery_date").notNull(),
  doctor_id: integer("doctor_id").notNull(),
  doctor_aux_id: integer("doctor_aux_id"),
  nurse_id: integer("nurse_id").notNull(),
  nurse_aux_id: integer("nurse_aux_id"),
  anesthesiologist_id: integer("anesthesiologist_id").notNull(),
  anesthesiologist_aux_id: integer("anesthesiologist_aux_id"),
  surgery_status: integer("surgery_status").notNull(), // Assuming you use enums as integers
  surgery_description: text("surgery_description"),
  anesthesia_type: varchar("anesthesia_type", { length: 255 }).notNull(),
  surgery_duration: integer("surgery_duration").notNull(),
  complications: text("complications"),
  follow_up_care: text("follow_up_care"),
  pre_surgery_tests: json("pre_surgery_tests").array(), // Array of strings for pre-surgery tests
  notes: text("notes"),
  patients_assigned: json("patients_assigned"),
  schedule_surgery: json("schedule_surgery"),
  schedule_anesthesia: json("schedule_anesthesia"),
  medicines: json("medicines"),
  procedure: varchar("procedure", { length: 255 }).notNull(),
  surgery_room_id: integer("surgery_room_id").notNull(),
  deletion_date: timestamp("deletion_date"),
  modified_date: timestamp("modified_date"),
  creation_date: timestamp("creation_date").notNull(),
});
