declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number; useCORS?: boolean; logging?: boolean; [key: string]: unknown };
    jsPDF?: { unit?: string; format?: string | number[]; orientation?: string; [key: string]: unknown };
    pagebreak?: { mode?: string | string[]; [key: string]: unknown };
    [key: string]: unknown;
  }

  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement | string): Html2PdfInstance;
    save(): Promise<void>;
    toPdf(): Html2PdfInstance;
    get(type: string): Promise<unknown>;
    then(callback: (value: unknown) => void): Html2PdfInstance;
    output(type: string, options?: unknown): Promise<unknown>;
  }

  function html2pdf(): Html2PdfInstance;
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Html2PdfInstance;

  export default html2pdf;
}
