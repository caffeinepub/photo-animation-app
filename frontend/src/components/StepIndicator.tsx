import React from 'react';

interface Step {
  number: number;
  label: string;
  emoji: string;
}

const STEPS: Step[] = [
  { number: 1, label: 'Upload', emoji: '📸' },
  { number: 2, label: 'Template', emoji: '🎨' },
  { number: 3, label: 'Preview', emoji: '✨' },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 py-4">
      {STEPS.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg font-bold
                  transition-all duration-300
                  ${isActive
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110 ring-4 ring-primary/30'
                    : isCompleted
                    ? 'bg-secondary text-secondary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {isCompleted ? '✓' : step.emoji}
              </div>
              <span
                className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${
                  isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={`
                  flex-1 h-1 rounded-full max-w-16 sm:max-w-24 transition-all duration-500
                  ${step.number < currentStep ? 'bg-secondary' : 'bg-muted'}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
