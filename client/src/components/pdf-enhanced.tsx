import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Settings, Loader2 } from "lucide-react";

interface PDFExportProps {
  resumeData: any;
  template: string;
}

export function EnhancedPDFExport({ resumeData, template }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfOptions, setPdfOptions] = useState({
    format: 'letter',
    margin: 'normal',
    fontSize: 'medium',
    colorScheme: 'full'
  });
  const [filename, setFilename] = useState('');
  const { toast } = useToast();

  const generatePDF = async () => {
    if (!resumeData.personalInfo?.fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name before exporting PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const exportData = {
        resumeData,
        template,
        options: pdfOptions
      };

      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportData)
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `${resumeData.personalInfo.fullName}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "PDF Generated",
        description: "Your resume has been successfully exported as PDF.",
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Export Failed",
        description: "Unable to generate PDF. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const previewPDF = () => {
    // Open preview in new tab
    const previewWindow = window.open('/api/pdf/preview', '_blank');
    if (previewWindow) {
      previewWindow.postMessage({
        type: 'PREVIEW_DATA',
        data: { resumeData, template, options: pdfOptions }
      }, window.location.origin);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          PDF Export
        </CardTitle>
        <CardDescription>
          Generate a professional PDF version of your resume with custom formatting options.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Name */}
        <div className="space-y-2">
          <Label htmlFor="filename">File Name (optional)</Label>
          <Input
            id="filename"
            placeholder={`${resumeData.personalInfo?.fullName || 'Your'}_Resume.pdf`}
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>

        {/* PDF Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Paper Size</Label>
            <Select 
              value={pdfOptions.format} 
              onValueChange={(value) => setPdfOptions({...pdfOptions, format: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="letter">US Letter (8.5 × 11 in)</SelectItem>
                <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                <SelectItem value="legal">US Legal (8.5 × 14 in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Margins</Label>
            <Select 
              value={pdfOptions.margin} 
              onValueChange={(value) => setPdfOptions({...pdfOptions, margin: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="narrow">Narrow (0.5 in)</SelectItem>
                <SelectItem value="normal">Normal (0.75 in)</SelectItem>
                <SelectItem value="wide">Wide (1 in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select 
              value={pdfOptions.fontSize} 
              onValueChange={(value) => setPdfOptions({...pdfOptions, fontSize: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (10-12pt)</SelectItem>
                <SelectItem value="medium">Medium (11-13pt)</SelectItem>
                <SelectItem value="large">Large (12-14pt)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Color Scheme</Label>
            <Select 
              value={pdfOptions.colorScheme} 
              onValueChange={(value) => setPdfOptions({...pdfOptions, colorScheme: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Color</SelectItem>
                <SelectItem value="reduced">Reduced Color</SelectItem>
                <SelectItem value="grayscale">Grayscale</SelectItem>
                <SelectItem value="blackwhite">Black & White</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={previewPDF}
            variant="outline"
            className="flex-1"
            disabled={isGenerating}
          >
            <Settings className="mr-2 h-4 w-4" />
            Preview PDF
          </Button>
          
          <Button 
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex-1"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>

        {/* Helpful Tips */}
        <div className="bg-blue-50 p-4 rounded-lg text-sm">
          <h4 className="font-medium text-blue-900 mb-2">PDF Export Tips:</h4>
          <ul className="text-blue-800 space-y-1">
            <li>• Use "Preview PDF" to check formatting before downloading</li>
            <li>• Letter size is standard for US employers</li>
            <li>• A4 size is standard for international applications</li>
            <li>• Grayscale option ensures good printing on any printer</li>
            <li>• Narrow margins fit more content on a single page</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced error handling for PDF operations
export function usePDFGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generatePDF = async (data: any, options: any) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, options }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'PDF generation failed');
      }

      return await response.blob();
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to generate PDF';
      setError(errorMessage);
      toast({
        title: "PDF Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePDF,
    isGenerating,
    error,
  };
}