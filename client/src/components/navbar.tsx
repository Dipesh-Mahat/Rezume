import { Button } from "@/components/ui/button";
import { Crown, User, LogOut, FileText, Settings, Home, Palette, Layout } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { VisualTemplateSelector } from "@/components/template-selector/visual-template-selector";
import { ErrorBoundary } from "@/components/error-boundary";

interface NavbarProps {
  onUpgradeClick?: () => void;
  onTemplateSelect?: (templateId: string) => void;
  currentTemplate?: string;
}

export function Navbar({ onUpgradeClick, onTemplateSelect, currentTemplate }: NavbarProps) {
  const { user, isAuthenticated, signOut } = useAuth();
  const [location, setLocation] = useLocation();
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [selectedNavTemplate, setSelectedNavTemplate] = useState("modern");

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { path: "/builder", label: "Resume Builder", icon: FileText },
  ];

  // Template categories for the dropdown
  const templates = [
    { id: "modern", name: "Modern Professional", category: "free" },
    { id: "classic", name: "Classic Traditional", category: "free" },
    { id: "professional", name: "Professional Clean", category: "free" },
    { id: "creative", name: "Creative Designer", category: "premium" },
    { id: "minimalist", name: "Clean Minimalist", category: "premium" },
    { id: "executive", name: "Executive Traditional", category: "premium" },
    { id: "modern-pro", name: "Modern Pro Elite", category: "premium" },
    { id: "creative-bold", name: "Creative Bold", category: "premium" },
    { id: "executive-elite", name: "Executive Elite", category: "premium" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setLocation("/")}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Rezume
            </button>
          </div>

          {/* Navigation Links - Show different content based on auth */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => setLocation(item.path)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                {/* Browse Templates Button - always visible for authenticated users */}
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateDropdown(true)}
                  className="flex items-center space-x-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Browse Templates</span>
                </Button>

                {/* Template Selector - only show in builder page */}
                {location === "/builder" && onTemplateSelect && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Palette className="w-4 h-4" />
                      <span>Templates</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="px-2 py-1 text-sm font-medium text-gray-900">Free Templates</div>
                    {templates.filter(t => t.category === "free").map((template) => (
                      <DropdownMenuItem 
                        key={template.id}
                        onClick={() => onTemplateSelect(template.id)}
                        className={currentTemplate === template.id ? "bg-blue-50 text-blue-600" : ""}
                      >
                        <Layout className="mr-2 h-4 w-4" />
                        {template.name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <div className="px-2 py-1 text-sm font-medium text-gray-900">Premium Templates</div>
                    {templates.filter(t => t.category === "premium").map((template) => (
                      <DropdownMenuItem 
                        key={template.id}
                        onClick={() => {
                          if (user?.plan === "premium") {
                            onTemplateSelect(template.id);
                          } else {
                            onUpgradeClick?.();
                          }
                        }}
                        className={currentTemplate === template.id ? "bg-blue-50 text-blue-600" : ""}
                      >
                        <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                        {template.name}
                        {user?.plan !== "premium" && <span className="ml-auto text-xs text-yellow-600">Pro</span>}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              </>
            ) : (
              // Navigation for non-authenticated users
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateDropdown(true)}
                  className="flex items-center space-x-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Browse Templates</span>
                </Button>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.plan === 'free' && (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={onUpgradeClick}
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-500 text-white">
                          {user?.fullName ? getUserInitials(user.fullName) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.fullName}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                        {user?.plan && (
                          <p className="text-xs text-blue-600 font-medium capitalize">
                            {user.plan} Plan
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setLocation('/builder')}>
                      <FileText className="mr-2 h-4 w-4" />
                      My Resumes
                    </DropdownMenuItem>
                    {user?.plan === 'free' && onUpgradeClick && (
                      <DropdownMenuItem onClick={onUpgradeClick}>
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade to Premium
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={() => setLocation("/?auth=signin")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isAuthenticated && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => setLocation(item.path)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => setShowTemplateDropdown(true)}
              className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              <Palette className="w-4 h-4" />
              <span>Browse Templates</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Visual Template Selector Dialog */}
      {showTemplateDropdown && (
        <Dialog open={true} onOpenChange={setShowTemplateDropdown}>
          <DialogContent className="max-w-6xl">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Browse Resume Templates</h2>
              <ErrorBoundary fallback={({ error, resetError }) => (
                <div className="p-4 text-center">
                  <p className="text-red-500 mb-4">Unable to load templates. Please try again later.</p>
                  <Button onClick={() => {
                    resetError();
                    setShowTemplateDropdown(false);
                  }}>Close</Button>
                </div>
              )}>
                <VisualTemplateSelector
                  selectedTemplate={selectedNavTemplate}
                  userPlan={(user?.plan as 'free' | 'premium') || 'free'}
                  onUpgradeClick={onUpgradeClick}
                  onTemplateSelect={(templateId) => {
                    setSelectedNavTemplate(templateId);
                    if (onTemplateSelect) {
                      onTemplateSelect(templateId);
                    } else {
                      setLocation(`/builder?template=${templateId}`);
                    }
                    setShowTemplateDropdown(false);
                  }}
                />
              </ErrorBoundary>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </nav>
  );
}
