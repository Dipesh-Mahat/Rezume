import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload, FileText, Database } from "lucide-react";

interface DataExportProps {
  resumeData: any;
  onImport: (data: any) => void;
}

export function DataExportImport({ resumeData, onImport }: DataExportProps) {
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(resumeData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${resumeData.personalInfo?.fullName || 'resume'}_data.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      toast({
        title: "Data Exported",
        description: "Your resume data has been exported as JSON file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const importFromJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Basic validation
      if (!data.personalInfo || typeof data.personalInfo !== 'object') {
        throw new Error('Invalid resume data format');
      }
      
      onImport(data);
      
      toast({
        title: "Data Imported",
        description: "Your resume data has been successfully imported.",
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Unable to import data. Please ensure the file is a valid JSON export.",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      // Reset the input
      event.target.value = '';
    }
  };

  const exportToTXT = () => {
    try {
      let content = '';
      
      // Header
      if (resumeData.personalInfo) {
        content += `${resumeData.personalInfo.fullName || 'Name'}\n`;
        content += `${resumeData.personalInfo.title || 'Title'}\n`;
        content += `Email: ${resumeData.personalInfo.email || 'N/A'}\n`;
        content += `Phone: ${resumeData.personalInfo.phone || 'N/A'}\n`;
        content += `Location: ${resumeData.personalInfo.location || 'N/A'}\n`;
        if (resumeData.personalInfo.linkedin) {
          content += `LinkedIn: ${resumeData.personalInfo.linkedin}\n`;
        }
        content += '\n';
      }

      // Summary
      if (resumeData.summary) {
        content += 'PROFESSIONAL SUMMARY\n';
        content += '===================\n';
        content += `${resumeData.summary}\n\n`;
      }

      // Experience
      if (resumeData.experience?.length > 0) {
        content += 'PROFESSIONAL EXPERIENCE\n';
        content += '=======================\n';
        resumeData.experience.forEach((exp: any) => {
          content += `${exp.title} at ${exp.company}\n`;
          content += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`;
          if (exp.description) {
            content += `${exp.description}\n`;
          }
          if (exp.achievements?.length > 0) {
            content += 'Key Achievements:\n';
            exp.achievements.forEach((achievement: string) => {
              content += `• ${achievement}\n`;
            });
          }
          content += '\n';
        });
      }

      // Education
      if (resumeData.education?.length > 0) {
        content += 'EDUCATION\n';
        content += '=========\n';
        resumeData.education.forEach((edu: any) => {
          content += `${edu.degree}\n`;
          content += `${edu.school}, ${edu.graduationYear}\n`;
          if (edu.gpa) {
            content += `GPA: ${edu.gpa}\n`;
          }
          content += '\n';
        });
      }

      // Skills
      if (resumeData.skills?.length > 0) {
        content += 'SKILLS\n';
        content += '======\n';
        const skillsByCategory: { [key: string]: string[] } = {};
        
        resumeData.skills.forEach((skill: any) => {
          const category = skill.category || 'Other';
          if (!skillsByCategory[category]) {
            skillsByCategory[category] = [];
          }
          skillsByCategory[category].push(`${skill.name} (${skill.level})`);
        });

        Object.entries(skillsByCategory).forEach(([category, skills]) => {
          content += `${category}:\n`;
          skills.forEach(skill => {
            content += `• ${skill}\n`;
          });
          content += '\n';
        });
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo?.fullName || 'resume'}_summary.txt`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Text Export Complete",
        description: "Your resume has been exported as a text file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export text file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5" />
          Data Management
        </CardTitle>
        <CardDescription>
          Export your resume data for backup or import from a previous export.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Export Options</h4>
            
            <Button
              onClick={exportToJSON}
              variant="outline"
              className="w-full justify-start"
            >
              <Download className="mr-2 h-4 w-4" />
              Export as JSON (Full Data)
            </Button>

            <Button
              onClick={exportToTXT}
              variant="outline"
              className="w-full justify-start"
            >
              <FileText className="mr-2 h-4 w-4" />
              Export as Text Summary
            </Button>
          </div>

          {/* Import Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Import Options</h4>
            
            <div className="space-y-2">
              <Label htmlFor="json-import" className="text-sm text-gray-600">
                Import from JSON file
              </Label>
              <div className="relative">
                <Input
                  id="json-import"
                  type="file"
                  accept=".json"
                  onChange={importFromJSON}
                  disabled={isImporting}
                  className="cursor-pointer"
                />
                {isImporting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded">
          <strong>Note:</strong> JSON exports contain all your resume data and can be re-imported. 
          Text exports are for reference only and cannot be imported.
        </div>
      </CardContent>
    </Card>
  );
}