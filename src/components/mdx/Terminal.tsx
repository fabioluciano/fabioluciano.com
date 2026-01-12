// =============================================================================
// Terminal Component - Display terminal/command line output
// =============================================================================

import React from 'react';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
}

export function Terminal({ title = 'Terminal', children }: TerminalProps) {
  return (
    <div className="my-6 not-prose rounded-lg overflow-hidden border border-base-300 shadow-lg">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-base-300">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-error"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
        </div>
        {/* Title */}
        <span className="flex-1 text-center text-sm text-base-content/60 font-medium">
          {title}
        </span>
        {/* Spacer for centering */}
        <div className="w-12"></div>
      </div>

      {/* Terminal content */}
      <div className="p-4 bg-neutral text-neutral-content font-mono text-sm overflow-x-auto">
        <pre className="whitespace-pre-wrap">{children}</pre>
      </div>
    </div>
  );
}

// Command line with prompt
interface CommandProps {
  prompt?: string;
  children: React.ReactNode;
}

export function Command({ prompt = '$', children }: CommandProps) {
  return (
    <div className="flex gap-2">
      <span className="text-success select-none">{prompt}</span>
      <span>{children}</span>
    </div>
  );
}

// Output line (no prompt)
interface OutputProps {
  children: React.ReactNode;
  type?: 'default' | 'success' | 'error' | 'warning';
}

export function Output({ children, type = 'default' }: OutputProps) {
  const colors = {
    default: '',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
  };

  return <div className={colors[type]}>{children}</div>;
}

export default Terminal;
