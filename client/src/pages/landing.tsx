import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { FileText, Users, Download, Heart, Shield, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { DonationPopup } from "@/components/donation-popup";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [showDonation, setShowDonation] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-6 tracking-wide">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              FREE &middot; NO SIGN-UP &middot; OPEN SOURCE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
              Build a resume that<br />gets you hired
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional templates, instant PDF export, AI-powered writing.
              Everything runs in your browser — your data never leaves your device.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => setLocation("/builder")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base font-medium"
              >
                <FileText className="mr-2 h-4 w-4" />
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowDonation(true)}
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 h-12 text-base font-medium"
              >
                <Heart className="mr-2 h-4 w-4" />
                Support Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">100% Private</h3>
              <p className="text-sm text-slate-500 leading-relaxed">No servers, no tracking, no accounts. Everything stays in your browser.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-white h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">14 Pro Templates</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Modern, classic, creative, executive, industry-specific. All free.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="text-white h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Instant PDF</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Download a pixel-perfect PDF with one click. No limits ever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Three steps. That's it.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "1", t: "Enter your details", d: "Fill in your info, education, experience, and skills step by step." },
              { n: "2", t: "Pick a template", d: "Choose from 14 professionally designed layouts. Live preview as you type." },
              { n: "3", t: "Download PDF", d: "Export your polished resume instantly. Ready to send to employers." },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">{s.n}</div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{s.t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => setLocation("/builder")}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 text-base font-medium"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Help keep Rezume free
          </h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            Rezume is free and always will be. If you find it useful, consider
            supporting us with a small donation.
          </p>
          <Button 
            variant="outline"
            onClick={() => setShowDonation(true)}
            className="border-slate-300 text-slate-700 hover:bg-white"
          >
            <Heart className="mr-2 h-4 w-4" />
            Support with Crypto
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="font-semibold text-slate-900">Rezume</span>
              <button onClick={() => setLocation("/builder")} className="text-sm text-slate-500 hover:text-slate-900">Builder</button>
              <button onClick={() => setShowDonation(true)} className="text-sm text-slate-500 hover:text-slate-900">Support</button>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Rezume by Dipesh Mahat. Free and open source.
            </p>
          </div>
        </div>
      </footer>

      <DonationPopup open={showDonation} onOpenChange={setShowDonation} />
    </div>
  );
}
