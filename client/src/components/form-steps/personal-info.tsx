import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, type PersonalInfo } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoStepProps {
  data: any;
  updateData: (updates: any) => void;
}

export function PersonalInfoStep({ data, updateData }: PersonalInfoStepProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'idle' | 'testing' | 'valid' | 'invalid'>('idle');
  const { toast } = useToast();

  const form = useForm<PersonalInfo & { aiApiKey?: string }>({
    resolver: zodResolver(personalInfoSchema.extend({
      aiApiKey: personalInfoSchema.shape.linkedin.optional()
    })),
    defaultValues: {
      fullName: data?.personalInfo?.fullName || "",
      title: data?.personalInfo?.title || "",
      email: data?.personalInfo?.email || "",
      phone: data?.personalInfo?.phone || "",
      location: data?.personalInfo?.location || "",
      linkedin: data?.personalInfo?.linkedin || "",
      aiApiKey: data?.aiApiKey || "",
    },
  });

  // Update form when data changes
  useEffect(() => {
    if (data?.personalInfo) {
      form.reset({
        fullName: data.personalInfo.fullName || "",
        title: data.personalInfo.title || "",
        email: data.personalInfo.email || "",
        phone: data.personalInfo.phone || "",
        location: data.personalInfo.location || "",
        linkedin: data.personalInfo.linkedin || "",
        aiApiKey: data.aiApiKey || "",
      });
    }
  }, [data, form]);

  const handleSubmit = (values: PersonalInfo & { aiApiKey?: string }) => {
    const { aiApiKey, ...personalInfo } = values;
    updateData({
      personalInfo,
      ...(aiApiKey && { aiApiKey }),
    });
  };

  // Auto-save on field changes
  const handleFieldChange = (field: string, value: string) => {
    form.setValue(field as any, value);
    const values = form.getValues();
    const { aiApiKey, ...personalInfo } = values;
    updateData({
      personalInfo,
      ...(aiApiKey && { aiApiKey }),
    });
  };

  const testApiKey = async () => {
    const apiKey = form.getValues("aiApiKey");
    if (!apiKey) return;

    setApiKeyStatus('testing');
    try {
      const response = await fetch('/api/ai/improve-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: "Test text for API validation.",
          apiKey
        })
      });

      if (response.ok) {
        setApiKeyStatus('valid');
        toast({
          title: "API Key Valid",
          description: "Your OpenAI API key is working correctly!",
        });
      } else {
        setApiKeyStatus('invalid');
        toast({
          title: "API Key Invalid",
          description: "Please check your OpenAI API key.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setApiKeyStatus('invalid');
      toast({
        title: "Connection Error",
        description: "Unable to validate API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  const skipAI = () => {
    form.setValue("aiApiKey", "");
    setApiKeyStatus('idle');
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

      {/* AI Enhancement Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">🤖</span>
              </div>
              <CardTitle className="text-lg">AI Enhancement</CardTitle>
            </div>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
              Optional
            </span>
          </div>
          <CardDescription>
            Add your OpenAI API key to get AI-powered resume improvements, grammar checks, and job-specific tailoring.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="sk-..."
              value={form.watch("aiApiKey")}
              onChange={(e) => {
                form.setValue("aiApiKey", e.target.value);
                handleFieldChange('aiApiKey', e.target.value);
              }}
              className={`pr-20 ${
                apiKeyStatus === 'valid' ? 'border-green-300' : 
                apiKeyStatus === 'invalid' ? 'border-red-300' : ''
              }`}
              data-testid="input-api-key"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              {apiKeyStatus === 'valid' && <Check className="h-4 w-4 text-green-500" />}
              {apiKeyStatus === 'invalid' && <X className="h-4 w-4 text-red-500" />}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="p-1"
                data-testid="button-toggle-api-key"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              type="button"
              onClick={testApiKey}
              disabled={apiKeyStatus === 'testing' || !form.watch("aiApiKey")}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              data-testid="button-test-api-key"
            >
              {apiKeyStatus === 'testing' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                  Testing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Test Key
                </>
              )}
            </Button>
            <Button 
              type="button"
              variant="secondary"
              onClick={skipAI}
              data-testid="button-skip-ai"
            >
              Skip AI Features
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
