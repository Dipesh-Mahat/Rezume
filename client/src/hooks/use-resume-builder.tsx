import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useResumeBuilder(resumeId?: string) {
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
  
  const [resumeData, setResumeData] = useState(defaultResumeData);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch existing resume if ID is provided
  const { data: existingResume, isLoading } = useQuery({
    queryKey: ["/api/resumes", resumeId],
    enabled: !!resumeId,
  });

  useEffect(() => {
    if (existingResume) {
      // Ensure we're merging in a safe way that preserves the structure
      setResumeData(prev => {
        // Cast the existingResume to the expected shape to avoid TypeScript errors
        const typedResume = existingResume as typeof defaultResumeData;
        
        const merged = { 
          ...prev, 
          ...typedResume,
          // Ensure personalInfo is properly merged and has all required fields
          personalInfo: {
            ...prev.personalInfo,
            ...(typedResume.personalInfo || {})
          }
        };
        
        // Ensure all arrays exist even if they don't in the fetched data
        merged.education = typedResume.education || [];
        merged.experience = typedResume.experience || [];
        merged.skills = typedResume.skills || [];
        
        return merged;
      });
    }
  }, [existingResume, defaultResumeData]);

  // Create new resume mutation
  const createResumeMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/resumes", data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/resumes", data.id], data);
      toast({
        title: "Resume Created",
        description: "Your resume has been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Save Failed",
        description: "Unable to save your resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update resume mutation
  const updateResumeMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!resumeId) return createResumeMutation.mutate(data);
      
      const response = await apiRequest("PATCH", `/api/resumes/${resumeId}`, data);
      return response.json();
    },
    onSuccess: (data) => {
      if (resumeId) {
        queryClient.setQueryData(["/api/resumes", resumeId], data);
      }
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "Unable to update your resume. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Debounced resume data for auto-save
  const [debouncedResumeData] = useDebounce(resumeData, 1000);
  const hasInitialData = useRef(false);

  // Auto-save when debounced data changes
  useEffect(() => {
    if (hasInitialData.current && debouncedResumeData && (debouncedResumeData.personalInfo?.fullName || debouncedResumeData.education?.length > 0 || debouncedResumeData.experience?.length > 0)) {
      updateResumeMutation.mutate(debouncedResumeData);
    }
    if (!hasInitialData.current && (debouncedResumeData.personalInfo?.fullName || debouncedResumeData.education?.length > 0)) {
      hasInitialData.current = true;
    }
  }, [debouncedResumeData, updateResumeMutation]);

  const updateResumeData = useCallback((updates: any) => {
    setResumeData(prev => ({ ...prev, ...updates }));
  }, []);

  const updateTemplate = (template: string) => {
    setResumeData(prev => {
      try {
        // Ensure we have a valid template string
        const validTemplate = template && typeof template === 'string' ? template : 'modern';
        
        // Create a new data object with the template and ensuring all required fields exist
        const newData = { 
          ...prev, 
          template: validTemplate,
          // Ensure all required fields exist
          personalInfo: prev.personalInfo || defaultResumeData.personalInfo,
          education: prev.education || [],
          experience: prev.experience || [],
          skills: prev.skills || [],
          summary: prev.summary || ""
        };
        
        // Save the changes
        updateResumeMutation.mutate(newData);
        return newData;
      } catch (error) {
        console.error('Error updating template:', error);
        toast({
          title: "Template Update Error",
          description: "Unable to update template. Using default template instead.",
          variant: "destructive",
        });
        
        // Return the previous data with the default template as fallback
        return { ...prev, template: 'modern' };
      }
    });
  };

  const createResume = () => {
    createResumeMutation.mutate(resumeData);
  };

  return {
    resumeData,
    updateResumeData,
    updateTemplate,
    createResume,
    isLoading: isLoading || createResumeMutation.isPending || updateResumeMutation.isPending,
    isSaving: updateResumeMutation.isPending,
  };
}
