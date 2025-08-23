import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeSchema } from "@shared/schema";
import puppeteer from "puppeteer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new resume
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
