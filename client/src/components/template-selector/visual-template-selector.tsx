import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { ClassicTemplate } from "@/components/resume-templates/classic-template";
import { ProfessionalTemplate } from "@/components/resume-templates/professional-template";
import { CreativeTemplate } from "@/components/resume-templates/creative-template";
import { MinimalistTemplate } from "@/components/resume-templates/minimalist-template";
import { ExecutiveTemplate } from "@/components/resume-templates/executive-template";
import { ModernProTemplate } from "@/components/resume-templates/modern-pro-template";
import { CreativeBoldTemplate } from "@/components/resume-templates/creative-bold-template";
import { ExecutiveEliteTemplate } from "@/components/resume-templates/executive-elite-template";
import { TechTemplate } from "@/components/resume-templates/tech-template";
import { HealthcareTemplate } from "@/components/resume-templates/healthcare-template";
import { MarketingTemplate } from "@/components/resume-templates/marketing-template";
import { TeacherTemplate } from "@/components/resume-templates/teacher-template";
import { FinanceTemplate } from "@/components/resume-templates/finance-template";

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  isPremium: boolean;
  category: 'modern' | 'classic' | 'creative' | 'executive' | 'tech' | 'healthcare' | 'marketing' | 'education' | 'finance';
  previewImage?: string;
}

// Ensure sampleResumeData is properly initialized with all required fields
const sampleResumeData = {
  personalInfo: {
    fullName: "Sarah Johnson",
    title: "Senior Software Engineer",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahjohnson"
  },
  summary: "Experienced software engineer with 8+ years developing scalable web applications. Expertise in React, Node.js, and cloud technologies. Passionate about creating user-centric solutions and leading high-performing teams.",
  experience: [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description: "Lead development of customer-facing web applications serving 1M+ users.",
      achievements: [
        "Improved application performance by 40% through optimization",
        "Led team of 5 developers in agile development process",
        "Architected microservices infrastructure reducing deployment time by 60%"
      ]
    },
    {
      title: "Software Engineer",
      company: "StartupXYZ",
      startDate: "Jun 2018",
      endDate: "Dec 2019",
      current: false,
      description: "Developed full-stack applications using modern web technologies.",
      achievements: [
        "Built responsive web applications using React and TypeScript",
        "Implemented RESTful APIs serving 50K+ daily requests",
        "Mentored junior developers and conducted code reviews"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      graduationYear: "2018",
      gpa: "3.8"
    }
  ],
  skills: [
    { name: "JavaScript", category: "programming", level: "expert" },
    { name: "React", category: "frontend", level: "expert" },
    { name: "Node.js", category: "backend", level: "advanced" },
    { name: "TypeScript", category: "programming", level: "advanced" },
    { name: "AWS", category: "cloud", level: "intermediate" },
    { name: "Docker", category: "devops", level: "intermediate" }
  ]
};


const templates: TemplateOption[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design perfect for tech roles",
    component: ModernTemplate,
    isPremium: false,
    category: 'modern'
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout ideal for corporate positions",
    component: ProfessionalTemplate,
    isPremium: false,
    category: 'classic'
  },
  {
    id: "classic",
    name: "Classic",
    description: "Timeless design that works for any industry",
    component: ClassicTemplate,
    isPremium: false,
    category: 'classic'
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple and elegant with focus on content",
    component: MinimalistTemplate,
    isPremium: true,
    category: 'modern'
  },
  {
    id: "creative",
    name: "Creative",
    description: "Eye-catching design for creative professionals",
    component: CreativeTemplate,
    isPremium: true,
    category: 'creative'
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated layout for senior positions",
    component: ExecutiveTemplate,
    isPremium: true,
    category: 'executive'
  },
  // Premium templates
  {
    id: "modern-pro",
    name: "Modern Pro",
    description: "Enhanced modern template with gradient accents and advanced styling",
    component: ModernProTemplate,
    isPremium: true,
    category: 'modern'
  },
  {
    id: "creative-bold",
    name: "Creative Bold",
    description: "Bold and vibrant design with colorful sidebar for standout applications",
    component: CreativeBoldTemplate,
    isPremium: true,
    category: 'creative'
  },
  {
    id: "executive-elite",
    name: "Executive Elite",
    description: "Premium executive template with luxury dark header and professional layout",
    component: ExecutiveEliteTemplate,
    isPremium: true,
    category: 'executive'
  },
  {
    id: "tech",
    name: "Tech Innovator",
    description: "Modern template designed for software engineers and tech professionals",
    component: TechTemplate,
    isPremium: false,
    category: 'tech'
  },
  {
    id: "marketing",
    name: "Marketing Pro",
    description: "Vibrant and creative template perfect for marketing and sales professionals",
    component: MarketingTemplate,
    isPremium: true,
    category: 'marketing'
  },
  {
    id: "teacher",
    name: "Education Elite",
    description: "Professional template tailored for educators and academic professionals",
    component: TeacherTemplate,
    isPremium: true,
    category: 'education'
  },
  {
    id: "finance",
    name: "Finance Pro",
    description: "Sophisticated template designed for finance and accounting professionals",
    component: FinanceTemplate,
    isPremium: true,
    category: 'finance'
  }
];

interface VisualTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  userPlan?: 'free' | 'premium';
  onUpgradeClick?: () => void;
}

export function VisualTemplateSelector({ 
  selectedTemplate, 
  onTemplateSelect, 
  userPlan = 'free',
  onUpgradeClick 
}: VisualTemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateOption | null>(null);
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');

  const filteredTemplates = templates.filter(template => {
    if (filter === 'free') return !template.isPremium;
    if (filter === 'premium') return template.isPremium;
    return true;
  });

  const handleTemplateClick = (template: TemplateOption) => {
    if (template.isPremium && userPlan === 'free') {
      onUpgradeClick?.();
      return;
    }
    onTemplateSelect(template.id);
  };

  const renderTemplatePreview = (template: TemplateOption) => {
    if (!template || !template.component) {
      return <div>Template not available</div>;
    }
    
    const TemplateComponent = template.component;
    // Make sure we have sample data with required fields
    const safeResumeData = {
      ...sampleResumeData,
      personalInfo: sampleResumeData.personalInfo || {
        fullName: "Sample Name",
        title: "Sample Title",
        email: "sample@example.com",
        phone: "(555) 123-4567",
        location: "Sample Location"
      }
    };
    
    try {
      return (
        <div className="w-full h-full scale-[0.25] origin-top-left transform">
          <div className="w-[800px] h-[1000px]">
            <TemplateComponent resumeData={safeResumeData} />
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error rendering template preview:", error);
      return <div>Failed to render template</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Templates
          </Button>
          <Button
            variant={filter === 'free' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('free')}
          >
            Free
          </Button>
          <Button
            variant={filter === 'premium' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('premium')}
          >
            <Crown className="w-4 h-4 mr-1" />
            Premium
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-blue-500 border-blue-500' 
                : 'hover:border-gray-300'
            } ${template.isPremium && userPlan === 'free' ? 'opacity-75' : ''}`}
            onClick={() => handleTemplateClick(template)}
          >
            <CardContent className="p-4">
              <div className="relative">
                {/* Template Preview */}
                <div className="w-full h-48 bg-gray-50 border rounded-lg overflow-hidden relative">
                  {renderTemplatePreview(template)}
                  
                  {/* Overlay for premium templates */}
                  {template.isPremium && userPlan === 'free' && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Lock className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Premium Template</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Preview Button */}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(template);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Template Info */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    {template.isPremium && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>

                {/* Selected Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>{previewTemplate?.name} Template</span>
              {previewTemplate?.isPremium && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {previewTemplate && (
              <div className="w-full border rounded-lg overflow-hidden bg-white">
                {(() => {
                  try {
                    // Make sure we have sample data with required fields
                    const safeResumeData = {
                      ...sampleResumeData,
                      personalInfo: sampleResumeData.personalInfo || {
                        fullName: "Sample Name",
                        title: "Sample Title",
                        email: "sample@example.com",
                        phone: "(555) 123-4567",
                        location: "Sample Location"
                      }
                    };
                    
                    return <previewTemplate.component resumeData={safeResumeData} />;
                  } catch (error) {
                    console.error("Error rendering template preview:", error);
                    return <div className="p-4">Failed to render template preview</div>;
                  }
                })()}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              Close
            </Button>
            {previewTemplate && (
              <Button onClick={() => {
                handleTemplateClick(previewTemplate);
                setPreviewTemplate(null);
              }}>
                {previewTemplate.isPremium && userPlan === 'free' 
                  ? 'Upgrade to Use' 
                  : 'Select Template'
                }
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
