// =============================================================================
// Steps Component - Step-by-step instructions
// =============================================================================

import React from 'react';

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-6 not-prose">
      <ol className="relative border-l-2 border-primary/30 ml-4 space-y-8">
        {React.Children.map(children, (child, index) => (
          <li className="ml-6">
            {/* Step number */}
            <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-primary text-primary-content rounded-full text-sm font-bold">
              {index + 1}
            </span>
            {child}
          </li>
        ))}
      </ol>
    </div>
  );
}

interface StepProps {
  title?: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
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
  );
}

export default Steps;
