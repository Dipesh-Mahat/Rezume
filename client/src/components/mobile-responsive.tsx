import { cn } from "@/lib/utils";

interface MobileOptimizedProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileOptimizedContainer({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      "min-h-screen flex flex-col",
      className
    )}>
      {children}
    </div>
  );
}

export function ResponsiveGrid({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8",
      "w-full flex-1",
      className
    )}>
      {children}
    </div>
  );
}

export function MobileFormSection({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border p-4 lg:p-6",
      "space-y-6",
      className
    )}>
      {children}
    </div>
  );
}

export function MobilePreviewSection({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "bg-gray-50 rounded-lg p-4 lg:p-6",
      "overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
}

// Mobile-first step navigation
interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSaving?: boolean;
  className?: string;
}

export function StepNavigation({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  isFirstStep, 
  isLastStep,
  isSaving = false,
  className 
}: StepNavigationProps) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row justify-between items-center gap-4",
      "p-4 bg-white border-t border-gray-200",
      "sticky bottom-0 z-10",
      className
    )}>
      {/* Progress indicator for mobile */}
      <div className="flex sm:hidden w-full justify-center">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="flex justify-between w-full sm:w-auto items-center gap-4">
        <button
          onClick={onPrevious}
          disabled={isFirstStep}
          className={cn(
            "px-4 py-2 rounded-lg border font-medium transition-colors",
            isFirstStep
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
        >
          Previous
        </button>

        {/* Save status - hidden on mobile */}
        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-600">Saved</span>
            </>
          )}
        </div>

        <button
          onClick={onNext}
          disabled={isLastStep}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-colors",
            isLastStep
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Mobile-optimized form input containers
export function MobileFormField({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "space-y-2",
      "touch-manipulation", // Improves touch responsiveness
      className
    )}>
      {children}
    </div>
  );
}

// Mobile-optimized preview container
export function MobileResumePreview({ children, className }: MobileOptimizedProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-lg border",
      "max-h-[70vh] lg:max-h-none overflow-y-auto lg:overflow-visible",
      "text-sm lg:text-base", // Smaller text on mobile
      className
    )}>
      {children}
    </div>
  );
}