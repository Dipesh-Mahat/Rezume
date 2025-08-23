import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personalInfo: json("personal_info").$type<{
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  }>().notNull(),
  education: json("education").$type<Array<{
    id: string;
    degree: string;
    school: string;
    graduationYear: string;
    gpa?: string;
  }>>().notNull(),
  experience: json("experience").$type<Array<{
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>>().notNull(),
  skills: json("skills").$type<Array<{
    id: string;
    name: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>>().notNull(),
  summary: text("summary").notNull(),
  template: varchar("template").notNull().default("modern"),
  aiApiKey: text("ai_api_key"),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
});

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;

// Individual section schemas for form validation
export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  title: z.string().min(1, "Professional title is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  linkedin: z.string().url().optional().or(z.literal("")),
});

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  school: z.string().min(1, "School name is required"),
  graduationYear: z.string().min(4, "Graduation year is required"),
  gpa: z.string().optional(),
});

export const experienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, "Job description is required"),
  achievements: z.array(z.string()).default([]),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Skill = z.infer<typeof skillSchema>;
