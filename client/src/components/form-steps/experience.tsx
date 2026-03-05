import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, type Experience } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { AIService } from "@/lib/ai-service";

const experienceListSchema = z.object({
  experience: z.array(experienceSchema.extend({
    id: z.string()
  }))
});

type ExperienceList = z.infer<typeof experienceListSchema>;

interface ExperienceStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export function ExperienceStep({ data, updateData }: ExperienceStepProps) {
  const [enhancingIndex, setEnhancingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<ExperienceList>({
    resolver: zodResolver(experienceListSchema),
    defaultValues: {
      experience: data?.experience?.length > 0 ? data.experience : [
        { 
          id: crypto.randomUUID(),
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          achievements: []
        }
      ],
    },
  });

  // Update form when data changes
  useEffect(() => {
    if (data?.experience) {
      form.reset({
        experience: data.experience.length > 0 ? data.experience : [
          { 
            id: crypto.randomUUID(),
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            achievements: []
          }
        ],
      });
    }
  }, [data, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const handleSubmit = (values: ExperienceList) => {
    updateData({
      experience: values.experience,
    });
  };

  // Auto-save on field changes
  const handleFieldChange = () => {
    const values = form.getValues();
    updateData({
      experience: values.experience,
    });
  };

  const addExperience = () => {
    append({
      id: crypto.randomUUID(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: []
    });
    setTimeout(handleFieldChange, 100);
  };

  const enhanceDescription = async (index: number) => {
    const apiKey = data?.aiApiKey;
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key in the first step to use AI enhancement.",
        variant: "destructive",
      });
      return;
    }

    const description = form.getValues(`experience.${index}.description`);
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please add a job description before enhancing.",
        variant: "destructive",
      });
      return;
    }

    setEnhancingIndex(index);
    try {
      const result = await AIService.enhanceDescription(description, apiKey);
      if (result.improvedDescription) {
        form.setValue(`experience.${index}.description`, result.improvedDescription);
        toast({
          title: "Description Enhanced",
          description: "Your job description has been improved with AI.",
        });
      } else {
        throw new Error('Enhancement failed');
      }
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Unable to enhance description. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setEnhancingIndex(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900" data-testid="experience-step-title">
          Work Experience
        </h3>
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          onClick={addExperience}
          data-testid="button-add-experience"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">
                    Experience {index + 1}
                  </CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      data-testid={`button-remove-experience-${index}`}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Senior Software Engineer" 
                            {...field} 
                            data-testid={`input-job-title-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., TechCorp Inc." 
                            {...field} 
                            data-testid={`input-company-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month"
                            {...field} 
                            data-testid={`input-start-date-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month"
                            disabled={form.watch(`experience.${index}.current`)}
                            {...field} 
                            data-testid={`input-end-date-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`experience.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid={`checkbox-current-${index}`}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Job Description</FormLabel>
                        {data?.aiApiKey && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => enhanceDescription(index)}
                            disabled={enhancingIndex === index}
                            data-testid={`button-enhance-description-${index}`}
                          >
                            {enhancingIndex === index ? (
                              <>
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin mr-2" />
                                Enhancing...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Enhance with AI
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your responsibilities and achievements..."
                          rows={4}
                          {...field} 
                          data-testid={`textarea-description-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </form>
      </Form>
    </div>
  );
}
