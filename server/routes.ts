import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerUser, loginUser } from "./auth";
import { log } from "./index";
import { authLimiter, signupLimiter, paymentLimiter, generalLimiter } from "./rateLimit";
import { csrfMiddleware, generateCsrfToken } from "./csrf";

// Extend Express Request to include session
declare global {
  namespace Express {
    interface Request {
      session?: { userId: string; destroy?: (callback: (err?: Error) => void) => void };
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Apply general rate limiter to all /api routes
  app.use("/api", generalLimiter);

  // SECURITY: Apply CSRF protection to state-changing requests
  app.use("/api", csrfMiddleware);

  // CSRF Token Endpoint
  app.post("/api/csrf-token", (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const token = generateCsrfToken(req.session.userId);
    res.json({ csrfToken: token });
  });

  // Authentication Routes
  app.post("/api/auth/signup", signupLimiter, async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await registerUser(storage, name, email, password);

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      res.json(result.user);
    } catch (error) {
      log(`Signup error: ${error}`, "auth");
      res.status(500).json({ error: "Signup failed" });
    }
  });

  app.post("/api/auth/login", authLimiter, async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }

      const result = await loginUser(storage, email, password);

      if (!result.success) {
        return res.status(401).json({ error: result.error });
      }

      // Set secure session (in production, use proper session management)
      req.session = { userId: result.user!.id };

      res.json(result.user);
    } catch (error) {
      log(`Login error: ${error}`, "auth");
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session?.destroy?.((err?: Error) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        hasPaid: user.hasPaid,
      });
    } catch (error) {
      log(`Get user error: ${error}`, "auth");
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.post("/api/payment/complete", paymentLimiter, async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.updateUserPaymentStatus(req.session.userId, true);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ success: true, hasPaid: user.hasPaid });
    } catch (error) {
      log(`Payment error: ${error}`, "payment");
      res.status(500).json({ error: "Payment processing failed" });
    }
  });

  return httpServer;
}
