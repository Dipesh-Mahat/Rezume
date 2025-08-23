import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Rocket, Play, Sparkles, Palette, Download } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const handleStartBuilding = () => {
    setLocation("/builder");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900" data-testid="logo">
                Rezume
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium" data-testid="nav-templates">
                Templates
              </button>
              <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium" data-testid="nav-pricing">
                Pricing
              </button>
              <Button variant="default" size="sm" data-testid="nav-signin">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" data-testid="hero-title">
              Build Your Resume in{" "}
              <span className="text-primary">5 Minutes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-testid="hero-description">
              Create professional resumes with our AI-powered builder. Choose from beautiful templates, 
              get real-time suggestions, and export to PDF instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={handleStartBuilding}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all"
                data-testid="button-start-building"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Start Building Now
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                className="text-gray-600 px-8 py-4 text-lg font-medium hover:text-gray-800"
                data-testid="button-watch-demo"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative max-w-4xl mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                alt="Modern office workspace with laptop" 
                className="rounded-xl shadow-2xl w-full h-auto"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center" data-testid="feature-ai">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered</h3>
                <p className="text-gray-600">Get intelligent suggestions and content improvements</p>
              </div>
              <div className="text-center" data-testid="feature-templates">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="text-accent h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Beautiful Templates</h3>
                <p className="text-gray-600">Choose from professionally designed layouts</p>
              </div>
              <div className="text-center" data-testid="feature-export">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="text-purple-500 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Export</h3>
                <p className="text-gray-600">Download as PDF with one click</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rezume</h3>
              <p className="text-gray-600 text-sm">
                Build professional resumes in minutes with our AI-powered tools and beautiful templates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Templates</a></li>
                <li><a href="#" className="hover:text-gray-900">AI Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
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
            <p>&copy; 2024 Rezume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
