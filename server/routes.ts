import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeSchema } from "@shared/schema";
import puppeteer from "puppeteer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

// Simple in-memory user storage (replace with proper database in production)
const users = new Map();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth middleware
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password, fullName } = req.body;
      
      if (users.has(email)) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: randomUUID(),
        email,
        fullName,
        plan: 'free',
        createdAt: new Date().toISOString()
      };

      users.set(email, { ...user, password: hashedPassword });
      
      const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const userData = users.get(email);
      if (!userData) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, userData.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const { password: _, ...user } = userData;
      const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "Failed to sign in" });
    }
  });

  app.get("/api/auth/verify", authenticateToken, async (req: any, res) => {
    try {
      const userData = users.get(req.user.email);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...user } = userData;
      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Failed to verify token" });
    }
  });

  // Payment routes (mock implementation)
  app.post("/api/payments/create-checkout", authenticateToken, async (req: any, res) => {
    try {
      // Mock Stripe checkout - in production, integrate with actual Stripe
      const { priceId, plan } = req.body;
      
      // Simulate successful payment for demo
      const userData = users.get(req.user.email);
      if (userData) {
        userData.plan = 'premium';
        users.set(req.user.email, userData);
      }

      res.json({ 
        checkoutUrl: `/payment-success?plan=${plan}`,
        success: true 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  // Resume routes (protected)
  app.post("/api/resumes", async (req, res) => {
    try {
      const resumeData = insertResumeSchema.parse(req.body);
      const resume = await storage.createResume(resumeData);
      res.json(resume);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid resume data", error: error.message });
    }
  });

  // Get resume by ID
  app.get("/api/resumes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const resume = await storage.getResume(id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resume" });
    }
  });

  // Update resume
  app.patch("/api/resumes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const resume = await storage.updateResume(id, updates);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      res.json(resume);
    } catch (error: any) {
      res.status(400).json({ message: "Failed to update resume", error: error.message });
    }
  });

  // PDF Export endpoint
  app.post("/api/export/pdf", async (req, res) => {
    try {
      const { html } = req.body;
      
      if (!html) {
        return res.status(400).json({ message: "HTML content is required" });
      }

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in'
        },
        printBackground: true
      });
      
      await browser.close();
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(pdfBuffer);
    } catch (error: any) {
      res.status(500).json({ message: "PDF export failed", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
