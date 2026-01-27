// =============================================================================
// Glossary/Tooltip Component - Define technical terms inline
// =============================================================================

'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

export function Tooltip({ term, definition, children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span
      ref={tooltipRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-b-2 border-dotted border-primary text-primary cursor-help font-medium"
      >
        {children || term}
      </button>

      {isOpen && (
        <span className="absolute z-[9999] left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 rounded-lg bg-base-200 border border-base-300 shadow-xl text-sm">
          <span className="font-semibold text-primary block mb-1">{term}</span>
          <span className="text-base-content/80">{definition}</span>
          {/* Arrow pointing up */}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-base-200" />
        </span>
      )}
    </span>
  );
}

// Glossary list component
interface GlossaryListProps {
  children: React.ReactNode;
}

interface GlossaryTermProps {
  term: string;
  children: React.ReactNode;
}

export function GlossaryList({ children }: GlossaryListProps) {
  return (
    <dl className="my-6 not-prose space-y-4">
      {children}
    </dl>
  );
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  return (
    <div className="rounded-lg border border-base-300 p-4">
      <dt className="font-semibold text-primary mb-1">{term}</dt>
      <dd className="text-sm text-base-content/80">{children}</dd>
    </div>
  );
}

export default Tooltip;
