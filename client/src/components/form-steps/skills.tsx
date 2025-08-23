import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, type Skill } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";

const skillsListSchema = z.object({
  skills: z.array(skillSchema.extend({
    id: z.string()
  }))
});

type SkillsList = z.infer<typeof skillsListSchema>;

const skillCategories = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Tools & Technologies",
  "Databases",
  "Cloud Platforms",
  "Soft Skills",
  "Certifications",
  "Languages",
  "Other"
];

const skillLevels: Array<{ value: Skill['level'], label: string }> = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

interface SkillsStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export function SkillsStep({ data, updateData }: SkillsStepProps) {
  const form = useForm<SkillsList>({
    resolver: zodResolver(skillsListSchema),
    defaultValues: {
      skills: data?.skills?.length > 0 ? data.skills : [
        { 
          id: crypto.randomUUID(),
          name: "",
          category: "",
          level: "intermediate"
        }
      ],
    },
  });

  // Update form when data changes
  useEffect(() => {
    if (data?.skills) {
      form.reset({
        skills: data.skills.length > 0 ? data.skills : [
          { 
            id: crypto.randomUUID(),
            name: "",
            category: "",
            level: "intermediate"
          }
        ],
      });
    }
  }, [data, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const handleSubmit = (values: SkillsList) => {
    updateData({
      skills: values.skills,
    });
  };

  // Auto-save on field changes
  const handleFieldChange = () => {
    const values = form.getValues();
    updateData({
      skills: values.skills,
    });
  };

  const addSkill = () => {
    append({
      id: crypto.randomUUID(),
      name: "",
      category: "",
      level: "intermediate"
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900" data-testid="skills-step-title">
          Skills
        </h3>
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          onClick={addSkill}
          data-testid="button-add-skill"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">
                    Skill {index + 1}
                  </CardTitle>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      data-testid={`button-remove-skill-${index}`}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name={`skills.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., JavaScript, Project Management, Adobe Photoshop" 
                          {...field} 
                          data-testid={`input-skill-name-${index}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.category`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid={`select-skill-category-${index}`}>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {skillCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`skills.${index}.level`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proficiency Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid={`select-skill-level-${index}`}>
                              <SelectValue placeholder="Select proficiency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {skillLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
