import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, AlertTriangle } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/error-boundary";

interface ResumePreviewProps {
  resumeData: any;
  updateTemplate?: (template: string) => void;
}

const templates = [
  { id: "modern", name: "Modern", component: ModernTemplate },
  { id: "classic", name: "Classic", component: ClassicTemplate },
  { id: "professional", name: "Professional", component: ProfessionalTemplate },
  { id: "creative", name: "Creative Designer", component: CreativeTemplate },
  { id: "minimalist", name: "Clean Minimalist", component: MinimalistTemplate },
  { id: "executive", name: "Executive Traditional", component: ExecutiveTemplate },
  { id: "modern-pro", name: "Modern Pro", component: ModernProTemplate },
  { id: "creative-bold", name: "Creative Bold", component: CreativeBoldTemplate },
  { id: "executive-elite", name: "Executive Elite", component: ExecutiveEliteTemplate },
  { id: "tech", name: "Tech Innovator", component: TechTemplate },
  { id: "healthcare", name: "Healthcare Pro", component: HealthcareTemplate },
  { id: "marketing", name: "Marketing Pro", component: MarketingTemplate },
  { id: "teacher", name: "Education Elite", component: TeacherTemplate },
  { id: "finance", name: "Finance Pro", component: FinanceTemplate },
];

export function ResumePreview({ resumeData, updateTemplate }: ResumePreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData?.template || "modern");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    updateTemplate?.(templateId);
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const resumeElement = document.getElementById('resume-content');
      if (!resumeElement) {
        throw new Error('Resume content not found');
      }

      // Dynamic import of html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin: 0,
        filename: `${resumeData?.personalInfo?.fullName || 'resume'}_resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(resumeElement).save();
      
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been successfully exported to PDF.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "Unable to export PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Preview Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Live Preview
        </h3>
        <div className="flex space-x-2">
          <Button 
            onClick={exportToPDF}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ aspectRatio: '8.5/11' }}>
        <div id="resume-content" className="resume-preview p-4 lg:p-8 h-full overflow-y-auto">
          <ErrorBoundary fallback={({ error, resetError }) => (
            <div className="p-4 text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-900">Template Error</h3>
              <p className="text-red-600 mb-4">Unable to render this template with the current data.</p>
              <Button onClick={() => {
                resetError();
                setSelectedTemplate("modern");
              }} variant="outline">
                Switch to Modern Template
              </Button>
            </div>
          )}>
            {(() => {
              try {
                const safeResumeData = {
                  ...resumeData,
                  personalInfo: resumeData?.personalInfo || {
                    fullName: "Your Name",
                    title: "Your Title",
                    email: "email@example.com",
                    phone: "(555) 123-4567",
                    location: "Your Location"
                  },
                  education: resumeData?.education || [],
                  experience: resumeData?.experience || [],
                  skills: resumeData?.skills || [],
                  summary: resumeData?.summary || ""
                };
                
                return <SelectedTemplateComponent resumeData={safeResumeData} />;
              } catch (error) {
                console.error("Error rendering template:", error);
                return (
                  <div className="p-4 text-center">
                    <p className="text-red-600 mb-2">Template rendering error</p>
                    <Button onClick={() => setSelectedTemplate("modern")} size="sm">
                      Switch to Default Template
                    </Button>
                  </div>
                );
              }
            })()}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
