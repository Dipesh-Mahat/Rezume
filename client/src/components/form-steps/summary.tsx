import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Target, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AIService } from "@/lib/ai-service";

const summarySchema = z.object({
  summary: z.string().min(50, "Summary should be at least 50 characters").max(500, "Summary should be no more than 500 characters"),
  jobDescription: z.string().optional(),
});

type SummaryData = z.infer<typeof summarySchema>;

interface SummaryStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export function SummaryStep({ data, updateData }: SummaryStepProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [showJobDescription, setShowJobDescription] = useState(false);
  const { toast } = useToast();

  const form = useForm<SummaryData>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: data?.summary || "",
      jobDescription: "",
    },
  });

  // Update form when data changes
  useEffect(() => {
    if (data?.summary !== undefined) {
      form.reset({
        summary: data.summary || "",
        jobDescription: "",
      });
    }
  }, [data, form]);

  const handleSubmit = (values: SummaryData) => {
    updateData({
      summary: values.summary,
    });
  };

  // Auto-save on field changes
  const handleFieldChange = (field: string, value: string) => {
    form.setValue(field as any, value);
    if (field === 'summary') {
      updateData({
        summary: value,
      });
    }
  };

  const enhanceGrammar = async () => {
    const apiKey = data?.aiApiKey;
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key in the first step to use AI enhancement.",
        variant: "destructive",
      });
      return;
    }

    const summary = form.getValues("summary");
    if (!summary.trim()) {
      toast({
        title: "Summary Required",
        description: "Please add a summary before enhancing.",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    try {
      const result = await AIService.improveGrammar(summary, apiKey);
      if (result.correctedText) {
        form.setValue("summary", result.correctedText);
        toast({
          title: "Grammar Improved",
          description: "Your summary has been enhanced with AI.",
        });
      } else {
        throw new Error('Enhancement failed');
      }
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Unable to improve grammar. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const tailorResume = async () => {
    const apiKey = data?.aiApiKey;
    const jobDescription = form.getValues("jobDescription");
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key in the first step to use AI enhancement.",
        variant: "destructive",
      });
      return;
    }

    if (!jobDescription?.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please paste a job description to tailor your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsTailoring(true);
    try {
      const result = await AIService.tailorResume(data, jobDescription, apiKey);
      if (result.improvements?.summary) {
        form.setValue("summary", result.improvements.summary);
      }
      toast({
        title: "Resume Tailored",
        description: "Your resume has been optimized for this job.",
      });
    } catch (error) {
      toast({
        title: "Tailoring Failed",
        description: "Unable to tailor resume. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsTailoring(false);
    }
  };

  const watchedSummary = form.watch("summary");
  const charCount = watchedSummary?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4" data-testid="summary-step-title">
          Professional Summary
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    About Me / Professional Summary
                    <span className="text-sm text-gray-500 ml-2">
                      ({charCount}/500 characters)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a compelling summary that highlights your experience, key skills, and career objectives. Focus on what makes you unique and valuable to potential employers..."
                      rows={6}
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange('summary', e.target.value);
                      }}
                      data-testid="textarea-summary"
                      className={`resize-none ${
                        charCount > 500 ? 'border-red-300' : 
                        charCount >= 50 ? 'border-green-300' : ''
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                  {charCount < 50 && charCount > 0 && (
                    <p className="text-sm text-amber-600">
                      Summary should be at least 50 characters for better impact.
                    </p>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* AI Enhancement Section */}
      {data?.aiApiKey && (
        <div className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
                AI Enhancement Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-3">
                <Button 
                  type="button"
                  onClick={enhanceGrammar}
                  disabled={isEnhancing || !watchedSummary?.trim()}
                  className="flex-1"
                  data-testid="button-enhance-grammar"
                >
                  {isEnhancing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Improve Grammar
                    </>
                  )}
                </Button>

                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowJobDescription(!showJobDescription)}
                  data-testid="button-toggle-job-description"
                >
                  <Target className="mr-2 h-4 w-4" />
                  Tailor for Job
                </Button>
              </div>

              {showJobDescription && (
                <div className="space-y-3 pt-4 border-t border-blue-200">
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Paste the job description here to get tailored suggestions..."
                            rows={4}
                            {...field} 
                            data-testid="textarea-job-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="button"
                    onClick={tailorResume}
                    disabled={isTailoring || !form.watch("jobDescription")?.trim()}
                    className="w-full"
                    data-testid="button-tailor-resume"
                  >
                    {isTailoring ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        Tailoring Resume...
                      </>
                    ) : (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        Tailor My Resume
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Writing Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with your years of experience and key expertise</li>
          <li>• Include 2-3 of your most impressive achievements</li>
          <li>• Mention specific skills relevant to your target role</li>
          <li>• End with your career goals or what you're seeking</li>
          <li>• Keep it concise but impactful (50-150 words ideal)</li>
        </ul>
      </div>
    </div>
  );
}
