import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertTestDriveRequestSchema, 
  insertContactRequestSchema, 
  insertUserSchema,
  insertMotorcycleSchema,
  insertPromotionSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Motorcycles
  app.get("/api/motorcycles", async (req, res) => {
    try {
      const { category, featured } = req.query;
      
      let motorcycles;
      if (category) {
        motorcycles = await storage.getMotorcyclesByCategory(category as string);
      } else if (featured === 'true') {
        motorcycles = await storage.getFeaturedMotorcycles();
      } else {
        motorcycles = await storage.getMotorcycles();
      }
      
      res.json(motorcycles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch motorcycles" });
    }
  });

  app.get("/api/motorcycles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const motorcycle = await storage.getMotorcycle(id);
      
      if (!motorcycle) {
        return res.status(404).json({ message: "Motorcycle not found" });
      }
      
      res.json(motorcycle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch motorcycle" });
    }
  });

  app.get("/api/motorcycles/slug/:slug", async (req, res) => {
    try {
      const slug = req.params.slug;
      const motorcycle = await storage.getMotorcycleBySlug(slug);
      
      if (!motorcycle) {
        return res.status(404).json({ message: "Motorcycle not found" });
      }
      
      res.json(motorcycle);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch motorcycle" });
    }
  });

  // Test Drive Requests
  app.post("/api/test-drive", async (req, res) => {
    try {
      const validatedData = insertTestDriveRequestSchema.parse(req.body);
      const request = await storage.createTestDriveRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create test drive request" });
    }
  });

  app.get("/api/test-drive", async (req, res) => {
    try {
      const requests = await storage.getTestDriveRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch test drive requests" });
    }
  });

  // Contact Requests
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactRequestSchema.parse(req.body);
      const request = await storage.createContactRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact request" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const requests = await storage.getContactRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact requests" });
    }
  });

  // Promotions
  app.get("/api/promotions", async (req, res) => {
    try {
      const { active } = req.query;
      
      let promotions;
      if (active === 'true') {
        promotions = await storage.getActivePromotions();
      } else {
        promotions = await storage.getPromotions();
      }
      
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch promotions" });
    }
  });

  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const { category } = req.query;
      
      let services;
      if (category) {
        services = await storage.getServicesByCategory(category as string);
      } else {
        services = await storage.getServices();
      }
      
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // User registration and login
  app.post("/api/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username) || 
                          await storage.getUserByEmail(validatedData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username) || 
                   await storage.getUserByEmail(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Get current user
  app.get("/api/me", async (req, res) => {
    try {
      if (!(req as any).session?.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { password, ...userWithoutPassword } = (req as any).session.user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error getting current user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Logout
  app.post("/api/logout", async (req, res) => {
    try {
      (req as any).session.destroy((err: any) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out successfully" });
      });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  // Admin middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.session?.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  // Admin routes
  // GET /api/admin/motorcycles
  app.get("/api/admin/motorcycles", requireAdmin, async (req, res) => {
    try {
      const motorcycles = await storage.getMotorcycles();
      res.json(motorcycles);
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/admin/motorcycles
  app.post("/api/admin/motorcycles", requireAdmin, async (req, res) => {
    try {
      const result = insertMotorcycleSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      const motorcycle = await storage.createMotorcycle(result.data);
      res.json(motorcycle);
    } catch (error) {
      console.error("Error creating motorcycle:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // PUT /api/admin/motorcycles/:id
  app.put("/api/admin/motorcycles/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertMotorcycleSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      const motorcycle = await storage.updateMotorcycle(id, result.data);
      if (!motorcycle) {
        return res.status(404).json({ message: "Motorcycle not found" });
      }
      res.json(motorcycle);
    } catch (error) {
      console.error("Error updating motorcycle:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // DELETE /api/admin/motorcycles/:id
  app.delete("/api/admin/motorcycles/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteMotorcycle(id);
      if (!success) {
        return res.status(404).json({ message: "Motorcycle not found" });
      }
      res.json({ message: "Motorcycle deleted successfully" });
    } catch (error) {
      console.error("Error deleting motorcycle:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // GET /api/admin/test-drives
  app.get("/api/admin/test-drives", requireAdmin, async (req, res) => {
    try {
      const testDrives = await storage.getTestDriveRequests();
      res.json(testDrives);
    } catch (error) {
      console.error("Error fetching test drives:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // PUT /api/admin/test-drives/:id/status
  app.put("/api/admin/test-drives/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || !["pending", "approved", "rejected", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const testDrive = await storage.updateTestDriveRequestStatus(id, status);
      if (!testDrive) {
        return res.status(404).json({ message: "Test drive request not found" });
      }
      res.json(testDrive);
    } catch (error) {
      console.error("Error updating test drive status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // GET /api/admin/contacts
  app.get("/api/admin/contacts", requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContactRequests();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // POST /api/admin/promotions
  app.post("/api/admin/promotions", requireAdmin, async (req, res) => {
    try {
      const result = insertPromotionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      const promotion = await storage.createPromotion(result.data);
      res.json(promotion);
    } catch (error) {
      console.error("Error creating promotion:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // PUT /api/admin/promotions/:id
  app.put("/api/admin/promotions/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertPromotionSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      const promotion = await storage.updatePromotion(id, result.data);
      if (!promotion) {
        return res.status(404).json({ message: "Promotion not found" });
      }
      res.json(promotion);
    } catch (error) {
      console.error("Error updating promotion:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // DELETE /api/admin/promotions/:id
  app.delete("/api/admin/promotions/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePromotion(id);
      if (!success) {
        return res.status(404).json({ message: "Promotion not found" });
      }
      res.json({ message: "Promotion deleted successfully" });
    } catch (error) {
      console.error("Error deleting promotion:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
