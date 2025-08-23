import { type Resume, type InsertResume } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getResume(id: string): Promise<Resume | undefined>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: string, resume: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private resumes: Map<string, Resume>;

  constructor() {
    this.resumes = new Map();
  }

  async getResume(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = randomUUID();
    const resume: Resume = { 
      ...insertResume, 
      id,
      template: insertResume.template || "modern",
      personalInfo: {
        ...insertResume.personalInfo,
        linkedin: typeof insertResume.personalInfo.linkedin === 'string' ? insertResume.personalInfo.linkedin : undefined
      },
      education: Array.isArray(insertResume.education) ? insertResume.education as any[] : [],
      experience: Array.isArray(insertResume.experience) ? insertResume.experience as any[] : [],
      skills: Array.isArray(insertResume.skills) ? insertResume.skills as any[] : [],
      aiApiKey: insertResume.aiApiKey || null
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async updateResume(id: string, resumeUpdate: Partial<InsertResume>): Promise<Resume | undefined> {
    const existing = this.resumes.get(id);
    if (!existing) return undefined;
    
    const updated: Resume = { 
      ...existing, 
      ...resumeUpdate,
      personalInfo: resumeUpdate.personalInfo ? {
        ...existing.personalInfo,
        ...resumeUpdate.personalInfo,
        linkedin: typeof resumeUpdate.personalInfo.linkedin === 'string' ? resumeUpdate.personalInfo.linkedin : existing.personalInfo.linkedin
      } : existing.personalInfo,
      education: resumeUpdate.education ? (Array.isArray(resumeUpdate.education) ? resumeUpdate.education as any[] : existing.education) : existing.education,
      experience: resumeUpdate.experience ? (Array.isArray(resumeUpdate.experience) ? resumeUpdate.experience as any[] : existing.experience) : existing.experience,
      skills: resumeUpdate.skills ? (Array.isArray(resumeUpdate.skills) ? resumeUpdate.skills as any[] : existing.skills) : existing.skills
    };
    this.resumes.set(id, updated);
    return updated;
  }

  async deleteResume(id: string): Promise<boolean> {
    return this.resumes.delete(id);
  }
}

export const storage = new MemStorage();
