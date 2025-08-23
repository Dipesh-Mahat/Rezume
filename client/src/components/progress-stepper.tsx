import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export function ProgressStepper({ currentStep, totalSteps, stepNames }: ProgressStepperProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div data-testid="progress-stepper">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900" data-testid="stepper-title">
          Build Your Resume
        </h2>
        <span className="text-sm text-gray-500" data-testid="step-counter">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500" 
            style={{ width: `${percentage}%` }}
            data-testid="progress-bar"
          />
        </div>
        <span className="text-sm font-medium text-primary" data-testid="progress-percentage">
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        {stepNames.map((name, index) => (
          <span 
            key={index}
            className={cn(
              "transition-colors",
              index + 1 <= currentStep ? "text-primary font-medium" : ""
            )}
            data-testid={`step-label-${index + 1}`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
