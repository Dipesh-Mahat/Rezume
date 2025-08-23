import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useResumeBuilder(resumeId?: string) {
  const [resumeData, setResumeData] = useState({
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
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch existing resume if ID is provided
  const { data: existingResume, isLoading } = useQuery({
    queryKey: ["/api/resumes", resumeId],
    enabled: !!resumeId,
  });

  useEffect(() => {
    if (existingResume) {
      setResumeData(prev => ({ ...prev, ...existingResume }));
    }
  }, [existingResume]);

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
      const newData = { ...prev, template };
      updateResumeMutation.mutate(newData);
      return newData;
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
