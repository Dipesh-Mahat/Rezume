import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { ClassicTemplate } from "@/components/resume-templates/classic-template";
import { ProfessionalTemplate } from "@/components/resume-templates/professional-template";
import { CreativeTemplate } from "@/components/resume-templates/creative-template";
import { MinimalistTemplate } from "@/components/resume-templates/minimalist-template";
import { ExecutiveTemplate } from "@/components/resume-templates/executive-template";
import { useToast } from "@/hooks/use-toast";

interface ResumePreviewProps {
  resumeData: any;
  updateTemplate?: (template: string) => void;
}

const templates = [
  { id: "modern", name: "Modern", component: ModernTemplate },
  { id: "classic", name: "Classic", component: ClassicTemplate },
  { id: "professional", name: "Professional", component: ProfessionalTemplate },
  { id: "creative", name: "Creative", component: CreativeTemplate },
  { id: "minimalist", name: "Minimalist", component: MinimalistTemplate },
  { id: "executive", name: "Executive", component: ExecutiveTemplate },
];

export function ResumePreview({ resumeData, updateTemplate }: ResumePreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData?.template || "modern");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Get the resume HTML content
      const resumeElement = document.getElementById('resume-content');
      if (!resumeElement) {
        throw new Error('Resume content not found');
      }

      const response = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          html: `
            <html>
              <head>
                <style>
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    line-height: 1.4;
                    color: #1f2937;
                    margin: 0;
                    padding: 20px;
                  }
                  .resume-preview { max-width: none; }
                  .resume-preview h1 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
                  .resume-preview h2 { font-size: 16px; font-weight: 600; border-bottom: 2px solid #4f46e5; padding-bottom: 4px; margin-bottom: 12px; margin-top: 16px; }
                  .resume-preview h3 { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
                  .resume-preview .contact-info { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-bottom: 20px; }
                  .resume-preview .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
                  .resume-preview .skill-tag { background: #f3f4f6; padding: 4px 12px; border-radius: 16px; font-size: 12px; }
                  .resume-preview .experience-item { margin-bottom: 16px; }
                  .resume-preview .experience-header { display: flex; justify-content: between; align-items: flex-start; margin-bottom: 8px; }
                  .resume-preview .experience-date { font-size: 12px; color: #6b7280; }
                  .resume-preview ul { margin: 8px 0; padding-left: 20px; }
                  .resume-preview li { margin-bottom: 4px; }
                </style>
              </head>
              <body>
                ${resumeElement.outerHTML}
              </body>
            </html>
          `
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${resumeData?.personalInfo?.fullName || 'resume'}_resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "PDF Downloaded",
          description: "Your resume has been successfully exported to PDF.",
        });
      } else {
        throw new Error('PDF export failed');
      }
    } catch (error) {
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
        <h3 className="text-lg font-semibold text-gray-900" data-testid="preview-title">
          Live Preview
        </h3>
        <div className="flex space-x-2">
          <Select value={selectedTemplate} onValueChange={(value) => {
            setSelectedTemplate(value);
            updateTemplate?.(value);
          }}>
            <SelectTrigger className="w-40 lg:w-48" data-testid="select-template">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={exportToPDF}
            disabled={isExporting}
            className="bg-accent hover:bg-accent/90"
            data-testid="button-export-pdf"
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
          <SelectedTemplateComponent resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
