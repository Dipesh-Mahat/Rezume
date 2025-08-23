import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Palette } from "lucide-react";
import { ModernTemplate } from "@/components/resume-templates/modern-template";
import { ClassicTemplate } from "@/components/resume-templates/classic-template";
import { ProfessionalTemplate } from "@/components/resume-templates/professional-template";
import { CreativeTemplate } from "@/components/resume-templates/creative-template";
import { MinimalistTemplate } from "@/components/resume-templates/minimalist-template";
import { ExecutiveTemplate } from "@/components/resume-templates/executive-template";
import { ModernProTemplate } from "@/components/resume-templates/modern-pro-template";
import { CreativeBoldTemplate } from "@/components/resume-templates/creative-bold-template";
import { ExecutiveEliteTemplate } from "@/components/resume-templates/executive-elite-template";
import { VisualTemplateSelector } from "@/components/template-selector/visual-template-selector";
import { PremiumUpgradeDialog } from "@/components/premium/premium-upgrade-dialog";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ResumePreviewProps {
  resumeData: any;
  updateTemplate?: (template: string) => void;
}

const templates = [
  { id: "modern", name: "Modern", component: ModernTemplate, isPremium: false },
  { id: "classic", name: "Classic", component: ClassicTemplate, isPremium: false },
  { id: "professional", name: "Professional", component: ProfessionalTemplate, isPremium: false },
  { id: "creative", name: "Creative", component: CreativeTemplate, isPremium: true },
  { id: "minimalist", name: "Minimalist", component: MinimalistTemplate, isPremium: true },
  { id: "executive", name: "Executive", component: ExecutiveTemplate, isPremium: true },
  { id: "modern-pro", name: "Modern Pro", component: ModernProTemplate, isPremium: true },
  { id: "creative-bold", name: "Creative Bold", component: CreativeBoldTemplate, isPremium: true },
  { id: "executive-elite", name: "Executive Elite", component: ExecutiveEliteTemplate, isPremium: true },
];

export function ResumePreview({ resumeData, updateTemplate }: ResumePreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData?.template || "modern");
  const [isExporting, setIsExporting] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (template?.isPremium && user?.plan === 'free') {
      setShowUpgradeDialog(true);
      return;
    }
    
    setSelectedTemplate(templateId);
    updateTemplate?.(templateId);
    setShowTemplateSelector(false);
  };

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
          <Dialog open={showTemplateSelector} onOpenChange={setShowTemplateSelector}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Palette className="w-4 h-4 mr-2" />
                Browse Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Choose Template</DialogTitle>
              </DialogHeader>
              <VisualTemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateChange}
                userPlan={user?.plan || 'free'}
                onUpgradeClick={() => {
                  setShowTemplateSelector(false);
                  setShowUpgradeDialog(true);
                }}
              />
            </DialogContent>
          </Dialog>
          
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger className="w-40 lg:w-48" data-testid="select-template">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem 
                  key={template.id} 
                  value={template.id}
                  disabled={template.isPremium && user?.plan === 'free'}
                >
                  <div className="flex items-center space-x-2">
                    <span>{template.name}</span>
                    {template.isPremium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">PRO</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={exportToPDF}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700 text-white"
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

      {/* Dialogs */}
      <PremiumUpgradeDialog 
        open={showUpgradeDialog} 
        onOpenChange={setShowUpgradeDialog}
        onUpgradeSuccess={() => setShowUpgradeDialog(false)}
      />
    </div>
  );
}
