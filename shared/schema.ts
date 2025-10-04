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
  "communication_tower",
  "energy_generator",
  "mineral_drill",
  "protection_module"
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
  protectionBonus: z.number().default(0),
  isSmall: z.boolean().default(false),
  connectedBuildingIds: z.array(z.string()).default([]),
});

export type Building = z.infer<typeof buildingSchema>;

// Resource system
export interface ResourceProduction {
  energy: number;
  food: number;
  minerals: number;
  water: number;
}

export const BUILDING_RESOURCES: Record<BuildingType, { produces: ResourceProduction; consumes: ResourceProduction }> = {
  house: {
    produces: { energy: 0, food: 0, minerals: 0, water: 0 },
    consumes: { energy: 2, food: 1, minerals: 0, water: 1 },
  },
  food_station: {
    produces: { energy: 0, food: 5, minerals: 0, water: 0 },
    consumes: { energy: 2, food: 0, minerals: 0, water: 1 },
  },
  water_drill: {
    produces: { energy: 0, food: 0, minerals: 0, water: 10 },
    consumes: { energy: 3, food: 0, minerals: 0, water: 0 },
  },
  waste_management: {
    produces: { energy: 0, food: 0, minerals: 0, water: 0 },
    consumes: { energy: 1, food: 0, minerals: 0, water: 0 },
  },
  communication_tower: {
    produces: { energy: 0, food: 0, minerals: 0, water: 0 },
    consumes: { energy: 2, food: 0, minerals: 0, water: 0 },
  },
  energy_generator: {
    produces: { energy: 10, food: 0, minerals: 0, water: 0 },
    consumes: { energy: 0, food: 0, minerals: 1, water: 0 },
  },
  mineral_drill: {
    produces: { energy: 0, food: 0, minerals: 8, water: 0 },
    consumes: { energy: 2, food: 0, minerals: 0, water: 0 },
  },
  protection_module: {
    produces: { energy: 0, food: 0, minerals: 0, water: 0 },
    consumes: { energy: 0, food: 0, minerals: 0, water: 0 },
  },
};

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
