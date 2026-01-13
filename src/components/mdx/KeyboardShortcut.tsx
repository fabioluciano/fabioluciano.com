// =============================================================================
// KeyboardShortcut Component - Display keyboard shortcuts beautifully
// =============================================================================

import React from 'react';

interface KeyboardShortcutProps {
  keys: string[];
  description?: string;
  inline?: boolean;
}

const keyLabels: Record<string, string> = {
  cmd: '⌘',
  command: '⌘',
  ctrl: 'Ctrl',
  control: 'Ctrl',
  alt: 'Alt',
  option: '⌥',
  shift: '⇧',
  enter: '↵',
  return: '↵',
  tab: '⇥',
  escape: 'Esc',
  esc: 'Esc',
  space: '␣',
  backspace: '⌫',
  delete: '⌦',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
};

function formatKey(key: string): string {
  const lowerKey = key.toLowerCase();
  return keyLabels[lowerKey] || key.toUpperCase();
}

export function KeyboardShortcut({
  keys,
  description,
  inline = false,
}: KeyboardShortcutProps) {
  const keyElements = keys.map((key, index) => (
    <React.Fragment key={index}>
      <kbd className="px-2 py-1 text-sm font-mono font-semibold bg-base-200 border border-base-300 rounded shadow-sm min-w-[28px] inline-flex items-center justify-center">
        {formatKey(key)}
      </kbd>
      {index < keys.length - 1 && (
        <span className="mx-1 text-base-content/40">+</span>
      )}
    </React.Fragment>
  ));

  if (inline) {
    return <span className="inline-flex items-center gap-0.5">{keyElements}</span>;
  }

  return (
    <div className="inline-flex items-center gap-3 my-1">
      <span className="inline-flex items-center gap-0.5">{keyElements}</span>
      {description && (
        <span className="text-sm text-base-content/70">{description}</span>
      )}
    </div>
  );
}

// Kbd component for single keys inline
interface KbdProps {
  children: string;
}

export function Kbd({ children }: KbdProps) {
  return (
    <kbd className="px-1.5 py-0.5 text-xs font-mono font-semibold bg-base-200 border border-base-300 rounded shadow-sm">
      {formatKey(children)}
    </kbd>
  );
}

// ShortcutList for displaying multiple shortcuts
interface ShortcutItem {
  keys: string[];
  description: string;
}

interface ShortcutListProps {
  shortcuts: ShortcutItem[];
  title?: string;
}

export function ShortcutList({ shortcuts, title }: ShortcutListProps) {
  return (
    <div className="my-6 not-prose border border-base-300 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-base-200 border-b border-base-300">
          <span className="text-sm font-medium text-base-content/70">{title}</span>
        </div>
      )}
      <div className="divide-y divide-base-300">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 hover:bg-base-200/50 transition-colors"
          >
            <span className="text-sm text-base-content">{shortcut.description}</span>
            <KeyboardShortcut keys={shortcut.keys} inline />
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyboardShortcut;
