import { useState, useEffect, useCallback, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "rezume_resume_data";

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveToStorage(data: any) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable
  }
}

export function useResumeBuilder() {
  const defaultResumeData = {
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    education: [],
    experience: [],
    skills: [],
    summary: "",
    template: "modern",
    aiApiKey: "",
  };

  const [resumeData, setResumeData] = useState(() => {
    const saved = loadFromStorage();
    return saved ? { ...defaultResumeData, ...saved } : defaultResumeData;
  });

  const { toast } = useToast();

  // Debounced resume data for auto-save
  const [debouncedResumeData] = useDebounce(resumeData, 1000);
  const hasInitialData = useRef(false);

  // Auto-save to localStorage when debounced data changes
  useEffect(() => {
    if (hasInitialData.current && debouncedResumeData) {
      saveToStorage(debouncedResumeData);
    }
    if (!hasInitialData.current && (debouncedResumeData.personalInfo?.fullName || debouncedResumeData.education?.length > 0)) {
      hasInitialData.current = true;
    }
  }, [debouncedResumeData]);

  const updateResumeData = useCallback((updates: any) => {
    setResumeData((prev: any) => ({ ...prev, ...updates }));
  }, []);

  const updateTemplate = (template: string) => {
    setResumeData((prev: any) => {
      const validTemplate = template && typeof template === 'string' ? template : 'modern';
      const newData = {
        ...prev,
        template: validTemplate,
        personalInfo: prev.personalInfo || defaultResumeData.personalInfo,
        education: prev.education || [],
        experience: prev.experience || [],
        skills: prev.skills || [],
        summary: prev.summary || ""
      };
      saveToStorage(newData);
      return newData;
    });
  };

  return {
    resumeData,
    updateResumeData,
    updateTemplate,
    isLoading: false,
    isSaving: false,
  };
}
