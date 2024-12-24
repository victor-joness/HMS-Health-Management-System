import {
  integer,
  boolean,
  timestamp,
  varchar,
  pgTable,
} from "drizzle-orm/pg-core";

export const bedsTable = pgTable("bed", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  isAvailable: boolean("is_available").notNull(),
  deletionDate: timestamp("deletion_date"),
  modifiedDate: timestamp("modified_date"),
  creationDate: timestamp("creation_date").defaultNow().notNull(),
});
