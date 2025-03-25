import { pgTable, serial, varchar, integer, boolean, text } from "drizzle-orm/pg-core";
import { usersTable } from "./usersTable";

export const humanResourcesEmployeeTable = pgTable("human_resources_employees", {
  Id: serial("id").primaryKey(),
  UserId: integer("user_id")
        .notNull()
        .references(() => usersTable.Id),
  WorkScheduleDetails: text("work_schedule_details").notNull(),
  Address: varchar("address").notNull(),
  Notes: varchar("notes"),
  DeletionDate: varchar("deletion_date"),
  ModifiedDate: varchar("modified_date"),
  CreationDate: varchar("creation_date").notNull(),
});