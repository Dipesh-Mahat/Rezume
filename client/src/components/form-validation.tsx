import { z } from "zod";

// Enhanced validation schemas with better error messages
export const enhancedPersonalInfoSchema = z.object({
  fullName: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes"),
  
  title: z.string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be less than 100 characters"),
  
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  
  location: z.string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
  
  linkedin: z.string()
    .url("Please enter a valid LinkedIn URL")
    .refine(url => url.includes('linkedin.com'), "Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal(""))
});

export const enhancedEducationSchema = z.object({
  degree: z.string()
    .min(2, "Degree must be at least 2 characters")
    .max(100, "Degree must be less than 100 characters"),
  
  school: z.string()
    .min(2, "School name must be at least 2 characters")
    .max(100, "School name must be less than 100 characters"),
  
  graduationYear: z.string()
    .regex(/^(19|20)\d{2}$/, "Please enter a valid 4-digit year")
    .refine(year => {
      const currentYear = new Date().getFullYear();
      const inputYear = parseInt(year);
      return inputYear >= 1950 && inputYear <= currentYear + 10;
    }, "Please enter a realistic graduation year"),
  
  gpa: z.string()
    .regex(/^[0-4](\.[0-9]{1,2})?$/, "GPA should be between 0.0 and 4.0")
    .optional()
    .or(z.literal(""))
});

export const enhancedExperienceSchema = z.object({
  title: z.string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be less than 100 characters"),
  
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  
  startDate: z.string()
    .regex(/^\d{4}-\d{2}$/, "Please select a valid start date"),
  
  endDate: z.string()
    .regex(/^\d{4}-\d{2}$/, "Please select a valid end date")
    .optional()
    .or(z.literal("")),
  
  current: z.boolean(),
  
  description: z.string()
    .min(20, "Job description should be at least 20 characters")
    .max(1000, "Job description must be less than 1000 characters"),
  
  achievements: z.array(z.string().min(10, "Achievement should be at least 10 characters"))
    .optional()
}).refine((data) => {
  if (!data.current && !data.endDate) {
    return false;
  }
  if (data.current && data.endDate) {
    return false;
  }
  if (!data.current && data.endDate && data.startDate >= data.endDate) {
    return false;
  }
  return true;
}, {
  message: "Please provide either an end date or mark as current position",
  path: ["endDate"]
});

export const enhancedSkillSchema = z.object({
  name: z.string()
    .min(2, "Skill name must be at least 2 characters")
    .max(50, "Skill name must be less than 50 characters"),
  
  category: z.string()
    .min(2, "Category must be at least 2 characters")
    .max(50, "Category must be less than 50 characters"),
  
  level: z.enum(["beginner", "intermediate", "advanced", "expert"], {
    errorMap: () => ({ message: "Please select a valid skill level" })
  })
});

export const enhancedSummarySchema = z.object({
  summary: z.string()
    .min(50, "Professional summary should be at least 50 characters")
    .max(500, "Professional summary must be less than 500 characters")
    .refine(text => {
      const wordCount = text.trim().split(/\s+/).length;
      return wordCount >= 10;
    }, "Professional summary should contain at least 10 words")
});

// Validation helper functions
export function validateFormStep(step: string, data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  try {
    switch (step) {
      case 'personalInfo':
        enhancedPersonalInfoSchema.parse(data);
        break;
      case 'education':
        if (data.length === 0) {
          errors.push("Please add at least one education entry");
          return { isValid: false, errors };
        }
        data.forEach((edu: any, index: number) => {
          try {
            enhancedEducationSchema.parse(edu);
          } catch (e: any) {
            errors.push(`Education ${index + 1}: ${e.errors[0]?.message || 'Invalid data'}`);
          }
        });
        break;
      case 'experience':
        if (data.length === 0) {
          errors.push("Please add at least one work experience entry");
          return { isValid: false, errors };
        }
        data.forEach((exp: any, index: number) => {
          try {
            enhancedExperienceSchema.parse(exp);
          } catch (e: any) {
            errors.push(`Experience ${index + 1}: ${e.errors[0]?.message || 'Invalid data'}`);
          }
        });
        break;
      case 'skills':
        if (data.length === 0) {
          errors.push("Please add at least 3 skills to showcase your abilities");
          return { isValid: false, errors };
        }
        if (data.length < 3) {
          errors.push("Please add at least 3 skills to create a strong profile");
        }
        data.forEach((skill: any, index: number) => {
          try {
            enhancedSkillSchema.parse(skill);
          } catch (e: any) {
            errors.push(`Skill ${index + 1}: ${e.errors[0]?.message || 'Invalid data'}`);
          }
        });
        break;
      case 'summary':
        enhancedSummarySchema.parse({ summary: data });
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  } catch (e: any) {
    const zodErrors = e.errors?.map((err: any) => err.message) || ['Invalid data format'];
    return { isValid: false, errors: zodErrors };
  }
}

export function getCompletionPercentage(resumeData: any): number {
  let totalWeight = 0;
  let completedWeight = 0;

  // Personal Info (25% weight)
  const personalInfoWeight = 25;
  totalWeight += personalInfoWeight;
  if (resumeData.personalInfo?.fullName && resumeData.personalInfo?.title && 
      resumeData.personalInfo?.email && resumeData.personalInfo?.phone) {
    completedWeight += personalInfoWeight;
  }

  // Education (20% weight)  
  const educationWeight = 20;
  totalWeight += educationWeight;
  if (resumeData.education?.length > 0) {
    completedWeight += educationWeight;
  }

  // Experience (25% weight)
  const experienceWeight = 25;
  totalWeight += experienceWeight;
  if (resumeData.experience?.length > 0) {
    completedWeight += experienceWeight;
  }

  // Skills (15% weight)
  const skillsWeight = 15;
  totalWeight += skillsWeight;
  if (resumeData.skills?.length >= 3) {
    completedWeight += skillsWeight;
  }

  // Summary (15% weight)
  const summaryWeight = 15;
  totalWeight += summaryWeight;
  if (resumeData.summary && resumeData.summary.length >= 50) {
    completedWeight += summaryWeight;
  }

  return Math.round((completedWeight / totalWeight) * 100);
}