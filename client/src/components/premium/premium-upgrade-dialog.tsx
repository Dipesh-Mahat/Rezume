import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Star, Zap, Download, Palette, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PremiumUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgradeSuccess?: () => void;
}

export function PremiumUpgradeDialog({ open, onOpenChange, onUpgradeSuccess }: PremiumUpgradeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const { toast } = useToast();

  const features = [
    {
      icon: Palette,
      title: "Premium Templates",
      description: "Access to 15+ exclusive premium resume templates"
    },
    {
      icon: Download,
      title: "Unlimited Downloads",
      description: "Download your resume as PDF anytime, anywhere"
    },
    {
      icon: Zap,
      title: "Advanced Customization",
      description: "Custom colors, fonts, and layout modifications"
    },
    {
      icon: Users,
      title: "Multiple Resumes",
      description: "Create and manage unlimited resume versions"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Get help when you need it with priority email support"
    },
    {
      icon: Star,
      title: "Export Options",
      description: "Export to multiple formats including PDF, DOC, and TXT"
    }
  ];

  const plans = {
    monthly: {
      price: 9.99,
      period: "month",
      savings: null,
      priceId: "price_monthly_premium"
    },
    yearly: {
      price: 79.99,
      period: "year",
      savings: "Save 33%",
      priceId: "price_yearly_premium"
    }
  };

  const handleUpgrade = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          priceId: plans[selectedPlan].priceId,
          plan: selectedPlan
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
      } else {
        toast({
          title: "Payment Error",
          description: data.message || "Unable to process payment. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Crown className="w-8 h-8 text-yellow-600" />
          </div>
          <DialogTitle className="text-3xl font-bold">
            Unlock Premium Features
          </DialogTitle>
          <p className="text-gray-600 text-lg">
            Take your resume to the next level with our premium templates and features
          </p>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Features List */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Premium Features</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Choose Your Plan</h3>
            
            {/* Plan Toggle */}
            <div className="flex items-center justify-center space-x-4 p-1 bg-gray-100 rounded-lg">
              <button
                className={`px-4 py-2 rounded-md transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setSelectedPlan('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-all ${
                  selectedPlan === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setSelectedPlan('yearly')}
              >
                Yearly
              </button>
            </div>

            {/* Selected Plan Card */}
            <Card className="border-2 border-blue-500 relative">
              {selectedPlan === 'yearly' && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
                  {plans.yearly.savings}
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium Plan</CardTitle>
                <div className="text-4xl font-bold text-blue-600">
                  ${plans[selectedPlan].price}
                  <span className="text-lg text-gray-600 font-normal">
                    /{plans[selectedPlan].period}
                  </span>
                </div>
                {selectedPlan === 'yearly' && (
                  <CardDescription className="text-green-600 font-medium">
                    Save $40 compared to monthly billing
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">All premium templates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Unlimited downloads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Advanced customization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Multiple export formats</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleUpgrade}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : `Upgrade to Premium`}
                </Button>
              </CardFooter>
            </Card>

            <p className="text-xs text-gray-500 text-center">
              Cancel anytime. No questions asked.
            </p>
          </div>
        </div>

        {/* Testimonials or Social Proof */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex justify-center space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic">
              "Rezume Premium helped me land my dream job! The templates are professional and the customization options are amazing."
            </p>
            <p className="text-sm text-gray-500 mt-2">- Sarah K., Software Engineer</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
