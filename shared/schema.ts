import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Building types for space habitat
export const buildingTypeSchema = z.enum([
  "house",
  "food_station",
  "water_drill",
  "waste_management",
  "communication_tower"
]);

export type BuildingType = z.infer<typeof buildingTypeSchema>;

// Position on canvas
export const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export type Position = z.infer<typeof positionSchema>;

// Building on canvas
export const buildingSchema = z.object({
  id: z.string(),
  type: buildingTypeSchema,
  position: positionSchema,
  health: z.number().min(0).max(100).default(100),
  isConnected: z.boolean().default(false),
  isDamaged: z.boolean().default(false),
});

export type Building = z.infer<typeof buildingSchema>;

// Pipe connection between buildings
export const pipeSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  isDamaged: z.boolean().default(false),
});

export type Pipe = z.infer<typeof pipeSchema>;

// Disaster scenario
export const disasterTypeSchema = z.enum([
  "dust_storm",
  "freezing_temperature",
  "radiation_event"
]);

export type DisasterType = z.infer<typeof disasterTypeSchema>;

export const disasterSchema = z.object({
  type: disasterTypeSchema,
  intensity: z.number().min(0).max(100),
  affectedBuildings: z.array(z.string()),
});

export type Disaster = z.infer<typeof disasterSchema>;
