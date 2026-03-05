import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
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

const previewData = {
  personalInfo: {
    fullName: "Dipesh Mahat",
    title: "Full Stack Developer",
    email: "dipesh.mahat@gmail.com",
    phone: "+977 984-1234567",
    location: "Kathmandu, Nepal",
    linkedin: "linkedin.com/in/dipeshmahat"
  },
  summary: "Passionate Full Stack Developer with expertise in React, TypeScript, and Node.js. Experienced in building fast, user-friendly web applications from concept to deployment.",
  experience: [
    {
      title: "Full Stack Developer",
      company: "Freelance",
      startDate: "Jan 2023",
      endDate: "Present",
      current: true,
      description: "Built production web applications for clients using React, Node.js, and PostgreSQL.",
      achievements: [
        "Delivered 10+ production applications with 100% client satisfaction",
        "Reduced page load time by 50% through optimization",
        "Built a resume-builder SaaS tool used by 500+ users monthly"
      ]
    },
    {
      title: "Junior Web Developer",
      company: "Tech Solutions Nepal",
      startDate: "Mar 2021",
      endDate: "Dec 2022",
      current: false,
      description: "Developed responsive websites for local businesses.",
      achievements: [
        "Built 20+ responsive websites using React and JavaScript",
        "Integrated payment gateways and third-party REST APIs"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Information Technology",
      school: "Tribhuvan University",
      graduationYear: "2022",
      gpa: "3.7"
    }
  ],
  skills: [
    { name: "React", category: "frontend", level: "expert" },
    { name: "TypeScript", category: "programming", level: "advanced" },
    { name: "Node.js", category: "backend", level: "advanced" },
    { name: "Tailwind CSS", category: "frontend", level: "expert" },
    { name: "PostgreSQL", category: "database", level: "intermediate" },
    { name: "Git", category: "tools", level: "advanced" }
  ]
};

const templates = [
  { id: "modern",         name: "Modern",          description: "Clean contemporary design for tech and corporate roles",       component: ModernTemplate },
  { id: "professional",   name: "Professional",     description: "Traditional layout ideal for corporate positions",             component: ProfessionalTemplate },
  { id: "classic",        name: "Classic",          description: "Timeless design that works for any industry",                 component: ClassicTemplate },
  { id: "minimalist",     name: "Minimalist",       description: "Simple and elegant with full focus on content",               component: MinimalistTemplate },
  { id: "creative",       name: "Creative",         description: "Eye-catching sidebar design for creative professionals",      component: CreativeTemplate },
  { id: "executive",      name: "Executive",        description: "Sophisticated layout for senior-level positions",             component: ExecutiveTemplate },
  { id: "modern-pro",     name: "Modern Pro",       description: "Enhanced modern design with refined typography",              component: ModernProTemplate },
  { id: "creative-bold",  name: "Creative Bold",    description: "Bold and vibrant design for standout applications",           component: CreativeBoldTemplate },
  { id: "executive-elite",name: "Executive Elite",  description: "Luxury dark header for C-suite and executive roles",          component: ExecutiveEliteTemplate },
  { id: "tech",           name: "Tech",             description: "Developer-focused layout with skills matrix",                 component: TechTemplate },
  { id: "healthcare",     name: "Healthcare",       description: "Clinical and professional design for medical roles",          component: HealthcareTemplate },
  { id: "marketing",      name: "Marketing",        description: "Vibrant and results-driven for sales and marketing",          component: MarketingTemplate },
  { id: "teacher",        name: "Education",        description: "Warm and structured layout for educators",                    component: TeacherTemplate },
  { id: "finance",        name: "Finance",          description: "Sophisticated design for finance and accounting",             component: FinanceTemplate },
];

interface VisualTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export function VisualTemplateSelector({ selectedTemplate, onTemplateSelect }: VisualTemplateSelectorProps) {
  const initialIndex = templates.findIndex(t => t.id === selectedTemplate);
  const [index, setIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const prev = () => setIndex(i => (i === 0 ? templates.length - 1 : i - 1));
  const next = () => setIndex(i => (i === templates.length - 1 ? 0 : i + 1));

  const template = templates[index];
  const TemplateComponent = template.component;
  const isSelected = selectedTemplate === template.id;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Choose Template</h2>
        <span className="text-sm text-slate-400 tabular-nums">{index + 1} / {templates.length}</span>
      </div>

      {/* Carousel */}
      <div className="flex items-center gap-3">
        {/* Prev */}
        <button
          onClick={prev}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        {/* Preview */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Template preview box */}
          <div className="w-full rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm" style={{ height: "420px" }}>
            <div className="w-full h-full relative overflow-hidden">
              <div style={{ transform: "scale(0.48)", transformOrigin: "top left", width: "208%", height: "208%", pointerEvents: "none" }}>
                <TemplateComponent resumeData={previewData} />
              </div>
            </div>
          </div>

          {/* Template info */}
          <div className="text-center px-2">
            <h3 className="font-semibold text-slate-900 text-base">{template.name}</h3>
            <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{template.description}</p>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {templates.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? "bg-blue-600 w-4" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Use button */}
          <Button
            onClick={() => onTemplateSelect(template.id)}
            className={isSelected
              ? "w-full bg-green-600 hover:bg-green-700 text-white"
              : "w-full bg-blue-600 hover:bg-blue-700 text-white"
            }
          >
            {isSelected ? (
              <><Check className="w-4 h-4 mr-2" /> Currently Selected</>
            ) : (
              "Use This Template"
            )}
          </Button>
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
}
