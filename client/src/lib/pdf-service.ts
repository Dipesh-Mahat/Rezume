export class PDFService {
  static async exportResume(htmlContent: string, filename: string = 'resume.pdf'): Promise<void> {
    try {
      const response = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: htmlContent })
      });

      if (!response.ok) {
        throw new Error(`PDF export failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      throw new Error(`PDF export failed: ${error.message}`);
    }
  }

  static generateResumeHTML(resumeData: any, template: string = 'modern'): string {
    // This would generate the HTML content for PDF export
    // For now, we'll get it directly from the DOM in the component
    return '';
  }
}
