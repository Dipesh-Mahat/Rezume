import { useState } from "react";
import { useResumeBuilder } from "@/hooks/use-resume-builder";
import { ProgressStepper } from "@/components/progress-stepper";
import { PersonalInfoStep } from "@/components/form-steps/personal-info";
import { EducationStep } from "@/components/form-steps/education";
import { ExperienceStep } from "@/components/form-steps/experience";
import { SkillsStep } from "@/components/form-steps/skills";
import { SummaryStep } from "@/components/form-steps/summary";
import { ResumePreview } from "@/components/resume-preview";
import { ErrorBoundary } from "@/components/error-boundary";
import { Navbar } from "@/components/navbar";
import { DonationPopup, useDonationPopup } from "@/components/donation-popup";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Eye, CheckCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const STEPS = [
  { id: 1, name: "Personal Info", component: PersonalInfoStep },
  { id: 2, name: "Education", component: EducationStep },
  { id: 3, name: "Experience", component: ExperienceStep },
  { id: 4, name: "Skills", component: SkillsStep },
  { id: 5, name: "Summary", component: SummaryStep },
];

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const isMobile = useIsMobile();
  const { showDonation, setShowDonation } = useDonationPopup();
  
  const { resumeData, updateResumeData, updateTemplate } = useResumeBuilder();
  
  const CurrentStepComponent = STEPS.find(step => step.id === currentStep)?.component;
  
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === STEPS.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBoundary>
        <Navbar 
          onTemplateSelect={updateTemplate}
          currentTemplate={resumeData.template}
          aiApiKey={resumeData.aiApiKey}
          onAiKeyChange={(key) => updateResumeData({ aiApiKey: key })}
        />
      </ErrorBoundary>
      
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Form Sidebar */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg overflow-y-auto">
          <div className="p-4 lg:p-6">
            {/* Progress Stepper */}
            <ProgressStepper 
              currentStep={currentStep} 
              totalSteps={STEPS.length}
              stepNames={STEPS.map(step => step.name)}
            />

            {/* Form Content */}
            <div className="mt-8">
              <ErrorBoundary>
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    data={resumeData}
                    updateData={updateResumeData}
                  />
                )}
              </ErrorBoundary>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button 
                variant="ghost" 
                onClick={handlePrevious}
                disabled={isFirstStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {/* Auto-saved indicator */}
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">Auto-saved</span>
              </div>
              
              <Button 
                onClick={handleNext}
                disabled={isLastStep}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Preview Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 p-4 lg:p-6">
          <ErrorBoundary>
            <ResumePreview resumeData={resumeData} updateTemplate={updateTemplate} />
          </ErrorBoundary>
        </div>
      </div>

      {/* Mobile Preview Button */}
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="fixed bottom-4 right-4 shadow-lg"
              size="lg"
            >
              <Eye className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh]">
            <div className="h-full overflow-y-auto">
              <ErrorBoundary>
                <ResumePreview resumeData={resumeData} updateTemplate={updateTemplate} />
              </ErrorBoundary>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Donation Popup */}
      <DonationPopup open={showDonation} onOpenChange={setShowDonation} />
    </div>
  );
}
