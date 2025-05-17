import { pgTable, serial, integer, text, jsonb, timestamp, date } from "drizzle-orm/pg-core";
import { usersTable } from "./usersTable";

export const financeEmployeeTable = pgTable("finance_employee", {
  Id: serial("id").primaryKey(),
  UserId: integer("user_id").references(() => usersTable.Id, { onDelete: "cascade" }).notNull(),
  Address: text("address").notNull(),
  WorkScheduleDetails: text("work_schedule_details").notNull(),
  Notes: text("notes"),
  DeletionDate: date("deletion_date"),
  ModifiedDate: date("modified_date"),
  CreationDate: date("creation_date").defaultNow().notNull(),
});
