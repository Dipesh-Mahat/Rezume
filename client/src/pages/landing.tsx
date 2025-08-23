import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { FileText, Users, Download, Crown, LogIn, User, LogOut } from "lucide-react";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { PremiumUpgradeDialog } from "@/components/premium/premium-upgrade-dialog";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/contexts/auth-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  // Check for auth URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authParam = urlParams.get('auth');
    if (authParam === 'signin' || authParam === 'signup') {
      setShowAuthDialog(true);
    }
  }, []);

  const handleStartBuilding = () => {
    if (isAuthenticated) {
      setLocation("/builder");
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
    // Redirect to builder after successful authentication
    setLocation("/builder");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navbar */}
      <Navbar onUpgradeClick={() => setShowUpgradeDialog(true)} />

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" data-testid="hero-title">
              Create Professional{" "}
              <span className="text-blue-600">Resumes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-testid="hero-description">
              Build impressive resumes with our easy-to-use builder. Choose from professional templates 
              and download your resume as PDF instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={handleStartBuilding}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                data-testid="button-start-building"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Building Resume
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center" data-testid="feature-easy">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="text-blue-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
                <p className="text-gray-600">Simple step-by-step process to build your resume</p>
              </div>
              <div className="text-center" data-testid="feature-templates">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-green-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Templates</h3>
                <p className="text-gray-600">Choose from carefully designed layouts</p>
              </div>
              <div className="text-center" data-testid="feature-export">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="text-purple-600 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Download PDF</h3>
                <p className="text-gray-600">Export your resume as PDF instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose from Professional Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our collection of professionally designed templates. 
              Free templates to get you started, premium templates for advanced customization.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
              <Crown className="w-4 h-4 mr-2" />
              Premium Features
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unlock Premium Templates & Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take your resume to the next level with our premium templates and advanced customization options.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">15+ Premium Templates</h3>
              <p className="text-gray-600">Access exclusive templates designed by professionals</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Unlimited Downloads</h3>
              <p className="text-gray-600">Download your resume as many times as you need</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-600">Get help when you need it with priority support</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              onClick={() => setShowUpgradeDialog(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Crown className="mr-2 h-5 w-5" />
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rezume</h3>
              <p className="text-gray-600 text-sm">
                Build professional resumes quickly with our simple resume builder.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Templates</a></li>
                <li><a href="#" className="hover:text-gray-900">Examples</a></li>
                <li><a href="#" className="hover:text-gray-900">Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 Rezume. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dialogs */}
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        onAuthSuccess={handleAuthSuccess}
      />
      
      <PremiumUpgradeDialog 
        open={showUpgradeDialog} 
        onOpenChange={setShowUpgradeDialog}
        onUpgradeSuccess={() => setShowUpgradeDialog(false)}
      />

      {/* Template Selector Dialog */}
            {/* Template Selector Dialog removed - now handled in navbar */}
    </div>
  );
}
