// =============================================================================
// Steps Component - Step-by-step instructions
// =============================================================================

import React from 'react';

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="steps-container my-6 not-prose relative border-l-2 border-primary/30 ml-4 space-y-6">
      {children}
    </div>
  );
}

interface StepProps {
  title?: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="step-item relative ml-6 pb-2">
      {/* Step number - uses CSS counter */}
      <span className="step-number absolute -left-10 top-0 flex items-center justify-center w-8 h-8 bg-primary text-primary-content rounded-full text-sm font-bold" />
      <div className="pt-1">
        {title && (
          <h4 className="text-lg font-semibold text-base-content mb-2">
            {title}
          </h4>
        )}
        <div className="text-base-content/80 prose prose-sm max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Steps;
