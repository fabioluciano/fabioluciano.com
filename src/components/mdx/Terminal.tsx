// =============================================================================
// Terminal Component - Unified terminal/code display with syntax highlighting
// =============================================================================

import React, { useRef, useState } from 'react';
import { HighlightedShell } from './ShellHighlighter';

// =============================================================================
// Copy Button Component
// =============================================================================

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = getText();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded hover:bg-base-content/10 transition-colors"
      title="Copiar código"
      aria-label="Copiar código"
    >
      {copied ? (
        <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

// =============================================================================
// Terminal Component
// =============================================================================

interface TerminalProps {
  /**
   * Window title displayed in the header
   */
  title?: string;
  /**
   * Hide the header with traffic lights
   */
  hideHeader?: boolean;
  /**
   * Background color variant
   */
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
  /**
   * Terminal content
   */
  children: React.ReactNode;
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

export function Terminal({
  title = 'Terminal',
  hideHeader = false,
  variant = 'default',
  children,
  className = '',
}: TerminalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const getTextContent = () => {
    if (!contentRef.current) return '';
    // Get text content, preserving newlines
    const lines: string[] = [];
    contentRef.current.querySelectorAll('[data-command]').forEach((el) => {
      lines.push(el.textContent || '');
    });
    return lines.length > 0 ? lines.join('\n') : contentRef.current.textContent || '';
  };

  return (
    <div className={`my-6 not-prose rounded-lg overflow-hidden border border-base-300 shadow-lg ${className}`}>
      {/* Terminal header with traffic lights */}
      {!hideHeader && (
        <div className="flex items-center gap-2 px-4 py-2 bg-base-300">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <span className="flex-1 text-center text-sm text-base-content/60 font-medium">
            {title}
          </span>
          <CopyButton getText={getTextContent} />
        </div>
      )}

      {/* Terminal content */}
      <div ref={contentRef} className={`p-4 font-mono text-sm overflow-x-auto ${variantClasses[variant]}`}>
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
}

// =============================================================================
// Command Component - Single command line with prompt and syntax highlighting
// =============================================================================

interface CommandProps {
  /**
   * Prompt character (default: $)
   */
  prompt?: string;
  /**
   * Command content
   */
  children: React.ReactNode;
  /**
   * Disable syntax highlighting
   */
  noHighlight?: boolean;
  /**
   * Highlight this line with a background color
   */
  highlight?: boolean;
  /**
   * Highlight color
   */
  highlightColor?: 'warning' | 'error' | 'success' | 'info';
}

const highlightClasses: Record<string, string> = {
  warning: 'bg-warning/20 -mx-4 px-4',
  error: 'bg-error/20 -mx-4 px-4',
  success: 'bg-success/20 -mx-4 px-4',
  info: 'bg-info/20 -mx-4 px-4',
};

export function Command({
  prompt = '$',
  children,
  noHighlight = false,
  highlight = false,
  highlightColor = 'warning',
}: CommandProps) {
  // Check if this is a comment (prompt is #)
  const isComment = prompt === '#';
  const bgClass = highlight ? highlightClasses[highlightColor] : '';

  return (
    <div className={`flex gap-2 ${bgClass}`}>
      <span className={`select-none shrink-0 ${isComment ? 'text-base-content/50' : 'text-success'}`}>
        {prompt}
      </span>
      <span data-command className={`whitespace-pre-wrap ${isComment ? 'text-base-content/50 italic' : ''}`}>
        {isComment || noHighlight ? children : <HighlightedShell>{children}</HighlightedShell>}
      </span>
    </div>
  );
}

// =============================================================================
// Output Component - Output line without prompt
// =============================================================================

interface OutputProps {
  /**
   * Output content
   */
  children: React.ReactNode;
  /**
   * Output type/color
   */
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export function Output({ children, type = 'default' }: OutputProps) {
  const colors = {
    default: '',
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
  };

  return <div className={colors[type]}>{children}</div>;
}

// =============================================================================
// Aliases for backwards compatibility
// =============================================================================

// MockupCode is Terminal without header
export function MockupCode({
  children,
  variant = 'default',
  className = '',
}: Omit<TerminalProps, 'title' | 'hideHeader'>) {
  return (
    <Terminal hideHeader variant={variant} className={className}>
      {children}
    </Terminal>
  );
}

// CodeLine is Command with different styling
export function CodeLine({
  prefix = '$',
  children,
  noHighlight = false,
  highlight = false,
  highlightColor = 'warning',
}: CommandProps & { prefix?: string }) {
  return (
    <Command
      prompt={prefix}
      noHighlight={noHighlight}
      highlight={highlight}
      highlightColor={highlightColor}
    >
      {children}
    </Command>
  );
}

// Convenience components
export function CommandLine(props: Omit<CommandProps, 'prompt'>) {
  return <Command prompt="$" {...props} />;
}

export function OutputLine(props: Omit<CommandProps, 'prompt'>) {
  return <Command prompt=">" {...props} />;
}

export function HomeDirLine(props: Omit<CommandProps, 'prompt'>) {
  return <Command prompt="~" {...props} />;
}

// Numbered lines helper
interface NumberedLinesProps {
  lines: Array<{
    content: string;
    highlight?: boolean;
    highlightColor?: 'warning' | 'error' | 'success' | 'info';
  }>;
  startFrom?: number;
  noHighlight?: boolean;
}

export function NumberedLines({ lines, startFrom = 1, noHighlight }: NumberedLinesProps) {
  return (
    <>
      {lines.map((line, index) => (
        <Command
          key={index}
          prompt={String(startFrom + index)}
          highlight={line.highlight}
          highlightColor={line.highlightColor}
          noHighlight={noHighlight}
        >
          {line.content}
        </Command>
      ))}
    </>
  );
}

// Legacy aliases
export const TerminalMockup = Terminal;
export const ShellSession = MockupCode;

export default Terminal;
