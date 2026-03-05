import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, type PersonalInfo } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface PersonalInfoStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: data?.personalInfo?.fullName || "",
      title: data?.personalInfo?.title || "",
      email: data?.personalInfo?.email || "",
      phone: data?.personalInfo?.phone || "",
      location: data?.personalInfo?.location || "",
      linkedin: data?.personalInfo?.linkedin || "",
    },
  });

  useEffect(() => {
    if (data?.personalInfo) {
      form.reset({
        fullName: data.personalInfo.fullName || "",
        title: data.personalInfo.title || "",
        email: data.personalInfo.email || "",
        phone: data.personalInfo.phone || "",
        location: data.personalInfo.location || "",
        linkedin: data.personalInfo.linkedin || "",
      });
    }
  }, [data, form]);

  const handleSubmit = (values: PersonalInfo) => {
    updateData({ personalInfo: values });
  };

  const handleFieldChange = (field: string, value: string) => {
    form.setValue(field as any, value);
    const values = form.getValues();
    updateData({ personalInfo: values });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4" data-testid="step-title">
          Personal Information
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange('fullName', e.target.value);
                      }}
                      data-testid="input-fullname"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Software Engineer, Marketing Manager" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange('title', e.target.value);
                      }}
                      data-testid="input-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your.email@example.com" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange('email', e.target.value);
                        }}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="+1 (555) 123-4567" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange('phone', e.target.value);
                        }}
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="City, State" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange('location', e.target.value);
                      }}
                      data-testid="input-location"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input 
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile" 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange('linkedin', e.target.value);
                      }}
                      data-testid="input-linkedin"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

    </div>
  );
}
