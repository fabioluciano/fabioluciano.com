// =============================================================================
// DiffViewer Component - Show code differences (before/after)
// =============================================================================

import React from 'react';

interface DiffViewerProps {
  before: string;
  after: string;
  language?: string;
  beforeTitle?: string;
  afterTitle?: string;
}

// Simple diff algorithm - compares lines
function computeDiff(before: string, after: string) {
  const beforeLines = before.trim().split('\n');
  const afterLines = after.trim().split('\n');
  const afterSet = new Set(afterLines);
  const beforeSet = new Set(beforeLines);

  const beforeDiff = beforeLines.map((line) => ({
    text: line,
    type: afterSet.has(line) ? 'same' : 'removed',
  }));

  const afterDiff = afterLines.map((line) => ({
    text: line,
    type: beforeSet.has(line) ? 'same' : 'added',
  }));

  return { beforeDiff, afterDiff };
}

export function DiffViewer({
  before,
  after,
  language = 'text',
  beforeTitle = 'Antes',
  afterTitle = 'Depois',
}: DiffViewerProps) {
  const { beforeDiff, afterDiff } = computeDiff(before, after);

  // Calculate max lines to ensure equal height
  const maxLines = Math.max(beforeDiff.length, afterDiff.length);

  // Pad arrays to same length
  const paddedBefore = [...beforeDiff];
  const paddedAfter = [...afterDiff];

  while (paddedBefore.length < maxLines) {
    paddedBefore.push({ text: '', type: 'same' as const });
  }
  while (paddedAfter.length < maxLines) {
    paddedAfter.push({ text: '', type: 'same' as const });
  }

  return (
    <div className="my-6 not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Before */}
      <div className="rounded-lg overflow-hidden border border-error/30 bg-error/10">
        <div className="px-4 py-2 bg-error/20 border-b border-error/30 flex items-center gap-2">
          <span className="text-error font-mono text-xs">−</span>
          <span className="text-sm font-semibold text-error">{beforeTitle}</span>
        </div>
        <div className="font-mono text-sm">
          {paddedBefore.map((line, i) => (
            <div
              key={i}
              className={`px-4 py-1 whitespace-pre-wrap break-words min-h-[1.75rem] ${
                line.type === 'removed'
                  ? 'bg-error/20 font-medium'
                  : ''
              }`}
            >
              <span className="inline-block w-4 mr-2 text-base-content/40 select-none">
                {line.type === 'removed' ? '−' : ' '}
              </span>
              <span className="break-words">{line.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* After */}
      <div className="rounded-lg overflow-hidden border border-success/30 bg-success/10">
        <div className="px-4 py-2 bg-success/20 border-b border-success/30 flex items-center gap-2">
          <span className="text-success font-mono text-xs">+</span>
          <span className="text-sm font-semibold text-success">{afterTitle}</span>
        </div>
        <div className="font-mono text-sm">
          {paddedAfter.map((line, i) => (
            <div
              key={i}
              className={`px-4 py-1 whitespace-pre-wrap break-words min-h-[1.75rem] ${
                line.type === 'added'
                  ? 'bg-success/20 font-medium'
                  : ''
              }`}
            >
              <span className="inline-block w-4 mr-2 text-base-content/40 select-none">
                {line.type === 'added' ? '+' : ' '}
              </span>
              <span className="break-words">{line.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiffViewer;
