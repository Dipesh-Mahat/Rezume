import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema, type Education } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";

const educationListSchema = z.object({
  education: z.array(educationSchema.extend({
    id: z.string()
  }))
});

type EducationList = z.infer<typeof educationListSchema>;

interface EducationStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export function EducationStep({ data, updateData }: EducationStepProps) {
  const form = useForm<EducationList>({
    resolver: zodResolver(educationListSchema),
    defaultValues: {
      education: data?.education?.length > 0 ? data.education : [
        { 
          id: crypto.randomUUID(),
          degree: "",
          school: "",
          graduationYear: "",
          gpa: ""
        }
      ],
    },
  });

  // Update form when data changes
  useEffect(() => {
    if (data?.education) {
      form.reset({
        education: data.education.length > 0 ? data.education : [
          { 
            id: crypto.randomUUID(),
            degree: "",
            school: "",
            graduationYear: "",
            gpa: ""
          }
        ],
      });
    }
  }, [data, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const handleSubmit = (values: EducationList) => {
    updateData({
      education: values.education,
    });
  };

  // Auto-save on field changes
  const handleFieldChange = () => {
    const values = form.getValues();
    updateData({
      education: values.education,
    });
  };

  const addEducation = () => {
    append({
      id: crypto.randomUUID(),
      degree: "",
      school: "",
      graduationYear: "",
      gpa: ""
    });
    setTimeout(handleFieldChange, 100);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900" data-testid="education-step-title">
          Education
        </h3>
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          onClick={addEducation}
          data-testid="button-add-education"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">
                    Education {index + 1}
                  </CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      data-testid={`button-remove-education-${index}`}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Bachelor of Science in Computer Science" 
                          {...field} 
                          data-testid={`input-degree-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.school`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School/University</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Stanford University" 
                          {...field} 
                          data-testid={`input-school-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`education.${index}.graduationYear`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 2024" 
                            {...field} 
                            data-testid={`input-graduation-year-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.gpa`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPA (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 3.8" 
                            {...field} 
                            data-testid={`input-gpa-${index}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </form>
      </Form>
    </div>
  );
}
