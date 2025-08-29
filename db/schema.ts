import { integer, boolean, pgTable } from "drizzle-orm/pg-core";

// Whenever you update the schema
// 1. Run drizzle-kit generate to generate the migration file
// 2. Run drizzle-kit migrate to apply the migration
export const order = pgTable("order", {
  id: integer("id").primaryKey(),
  blades: integer("blades").notNull(),
  paid: boolean("paid").default(false).notNull(),
});
