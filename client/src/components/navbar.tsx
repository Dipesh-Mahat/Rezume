import { Button } from "@/components/ui/button";
import { FileText, Palette, Heart, Home, Sparkles, Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisualTemplateSelector } from "@/components/template-selector/visual-template-selector";
import { ErrorBoundary } from "@/components/error-boundary";
import { DonationPopup } from "@/components/donation-popup";

interface NavbarProps {
  onTemplateSelect?: (templateId: string) => void;
  currentTemplate?: string;
  aiApiKey?: string;
  onAiKeyChange?: (key: string) => void;
}

export function Navbar({ onTemplateSelect, currentTemplate, aiApiKey, onAiKeyChange }: NavbarProps) {
  const [location, setLocation] = useLocation();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [showAiKey, setShowAiKey] = useState(false);

  const isBuilder = location === "/builder";

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50 w-full">
      <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <button
            onClick={() => setLocation("/")}
            className="text-xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
          >
            Rezume
          </button>

          {/* Center Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setLocation("/")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location === "/" ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setLocation("/builder")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location === "/builder" ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume Builder</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">

            {/* AI Key — only on builder page */}
            {isBuilder && onAiKeyChange && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center space-x-1.5 ${
                      aiApiKey
                        ? "border-blue-300 text-blue-600 bg-blue-50"
                        : "border-slate-300 text-slate-700"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs font-medium">AI Key</span>
                    {aiApiKey && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">AI Enhancement</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Add your OpenAI key (<code className="bg-slate-100 px-1 rounded">sk-...</code>) or Google Gemini key
                        (<code className="bg-slate-100 px-1 rounded">AIza...</code>) to get AI-powered writing improvements.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-600">API Key</Label>
                      <div className="relative">
                        <Input
                          type={showAiKey ? "text" : "password"}
                          placeholder="sk-... or AIza..."
                          value={aiApiKey || ""}
                          onChange={(e) => onAiKeyChange(e.target.value)}
                          className="pr-8 text-sm h-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowAiKey(!showAiKey)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showAiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      Your key is stored only in your browser and never sent to our servers.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Templates — only on builder page */}
            {isBuilder && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplates(true)}
                className="flex items-center space-x-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-medium">Templates</span>
              </Button>
            )}

            {/* Donate — always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDonation(true)}
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline ml-1.5 text-xs font-medium">Donate</span>
            </Button>
          </div>

        </div>
      </div>

      {/* Template Selector Dialog */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-2xl">
          <ErrorBoundary fallback={({ resetError }) => (
            <div className="p-6 text-center">
              <p className="text-red-500 mb-4">Couldn't load templates. Please try again.</p>
              <Button onClick={() => { resetError(); setTimeout(() => setShowTemplates(true), 100); }}>
                Try Again
              </Button>
            </div>
          )}>
            <VisualTemplateSelector
              selectedTemplate={currentTemplate || "modern"}
              onTemplateSelect={(templateId) => {
                if (onTemplateSelect) onTemplateSelect(templateId);
                else setLocation(`/builder?template=${templateId}`);
                setShowTemplates(false);
              }}
            />
          </ErrorBoundary>
        </DialogContent>
      </Dialog>

      <DonationPopup open={showDonation} onOpenChange={setShowDonation} />
    </nav>
  );
}
