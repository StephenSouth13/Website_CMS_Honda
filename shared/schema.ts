import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  role: text("role").default("user"), // 'user' or 'admin'
  createdAt: timestamp("created_at").defaultNow(),
});

export const motorcycles = pgTable("motorcycles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // 'tay-ga', 'so-san', 'con-tay'
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 12, scale: 2 }),
  engine: text("engine"),
  displacement: text("displacement"),
  fuelCapacity: text("fuel_capacity"),
  weight: text("weight"),
  description: text("description"),
  features: text("features").array(),
  colors: text("colors").array(),
  imageUrl: text("image_url"),
  imageGallery: text("image_gallery").array(),
  isNew: boolean("is_new").default(false),
  isFeatured: boolean("is_featured").default(false),
  inStock: boolean("in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const testDriveRequests = pgTable("test_drive_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  motorcycleId: integer("motorcycle_id").references(() => motorcycles.id),
  preferredDate: text("preferred_date").notNull(),
  notes: text("notes"),
  status: text("status").default("pending"), // 'pending', 'confirmed', 'completed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("new"), // 'new', 'in-progress', 'resolved'
  createdAt: timestamp("created_at").defaultNow(),
});

export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  discountAmount: decimal("discount_amount", { precision: 12, scale: 2 }),
  discountPercentage: integer("discount_percentage"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  imageUrl: text("image_url"),
  conditions: text("conditions").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }),
  duration: text("duration"),
  category: text("category").notNull(), // 'maintenance', 'repair', 'warranty'
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
  phone: true,
  role: true,
});

export const insertMotorcycleSchema = createInsertSchema(motorcycles).omit({
  id: true,
  createdAt: true,
});

export const insertTestDriveRequestSchema = createInsertSchema(testDriveRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertPromotionSchema = createInsertSchema(promotions).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Motorcycle = typeof motorcycles.$inferSelect;
export type InsertMotorcycle = z.infer<typeof insertMotorcycleSchema>;

export type TestDriveRequest = typeof testDriveRequests.$inferSelect;
export type InsertTestDriveRequest = z.infer<typeof insertTestDriveRequestSchema>;

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;

export type Promotion = typeof promotions.$inferSelect;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
