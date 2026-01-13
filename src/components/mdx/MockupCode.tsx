// =============================================================================
// MockupCode Component - DaisyUI terminal/code mockup wrapper
// =============================================================================

import React from 'react';

interface MockupCodeProps {
  /**
   * The content/lines to display
   */
  children?: React.ReactNode;
  /**
   * Background color variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
  /**
   * Additional CSS classes
   */
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-neutral text-neutral-content',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
  accent: 'bg-accent text-accent-content',
  neutral: 'bg-neutral text-neutral-content',
  info: 'bg-info text-info-content',
  success: 'bg-success text-success-content',
  warning: 'bg-warning text-warning-content',
  error: 'bg-error text-error-content',
};

export function MockupCode({
  children,
  variant = 'default',
  className = '',
}: MockupCodeProps) {
  return (
    <div className={`mockup-code my-6 not-prose ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Line component for mockup-code
interface CodeLineProps {
  /**
   * Prefix character (e.g., $, >, ~, or line number)
   */
  prefix?: string;
  /**
   * Line content
   */
  children: React.ReactNode;
  /**
   * Highlight this line
   */
  highlight?: boolean;
  /**
   * Highlight color
   */
  highlightColor?: 'warning' | 'error' | 'success' | 'info';
  /**
   * Hide the prefix
   */
  noPrefix?: boolean;
}

const highlightClasses: Record<string, string> = {
  warning: 'bg-warning text-warning-content',
  error: 'bg-error text-error-content',
  success: 'bg-success text-success-content',
  info: 'bg-info text-info-content',
};

export function CodeLine({
  prefix = '$',
  children,
  highlight = false,
  highlightColor = 'warning',
  noPrefix = false,
}: CodeLineProps) {
  const baseClass = highlight ? highlightClasses[highlightColor] : '';
  
  if (noPrefix) {
    return (
      <pre className={baseClass}>
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <pre data-prefix={prefix} className={baseClass}>
      <code>{children}</code>
    </pre>
  );
}

// Convenience components for common prefixes
interface PrefixLineProps {
  children: React.ReactNode;
  highlight?: boolean;
  highlightColor?: 'warning' | 'error' | 'success' | 'info';
}

export function CommandLine({ children, highlight, highlightColor }: PrefixLineProps) {
  return <CodeLine prefix="$" highlight={highlight} highlightColor={highlightColor}>{children}</CodeLine>;
}

export function OutputLine({ children, highlight, highlightColor }: PrefixLineProps) {
  return <CodeLine prefix=">" highlight={highlight} highlightColor={highlightColor}>{children}</CodeLine>;
}

export function HomeDirLine({ children, highlight, highlightColor }: PrefixLineProps) {
  return <CodeLine prefix="~" highlight={highlight} highlightColor={highlightColor}>{children}</CodeLine>;
}

// Numbered lines helper
interface NumberedLinesProps {
  lines: Array<{
    content: string;
    highlight?: boolean;
    highlightColor?: 'warning' | 'error' | 'success' | 'info';
  }>;
  startFrom?: number;
}

export function NumberedLines({ lines, startFrom = 1 }: NumberedLinesProps) {
  return (
    <>
      {lines.map((line, index) => (
        <CodeLine
          key={index}
          prefix={String(startFrom + index)}
          highlight={line.highlight}
          highlightColor={line.highlightColor}
        >
          {line.content}
        </CodeLine>
      ))}
    </>
  );
}

// Terminal mockup with window controls (combines mockup-code style with window header)
interface TerminalMockupProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

export function TerminalMockup({
  title = 'Terminal',
  children,
  variant = 'default',
  className = '',
}: TerminalMockupProps) {
  return (
    <div className={`mockup-code my-6 not-prose ${variantClasses[variant]} ${className}`} data-title={title}>
      <div className="mockup-code-title px-4 py-1 text-xs opacity-60 border-b border-base-content/10 mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

// Shell session mockup - simulates a real terminal session
interface ShellSessionProps {
  children: React.ReactNode;
  prompt?: string;
  className?: string;
}

export function ShellSession({
  children,
  className = '',
}: ShellSessionProps) {
  return (
    <div className={`mockup-code my-6 not-prose bg-neutral text-neutral-content ${className}`}>
      {children}
    </div>
  );
}

export default MockupCode;
