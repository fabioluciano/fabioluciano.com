// =============================================================================
// Footnote Component - Add footnotes and references
// =============================================================================

'use client';

import React, { useState } from 'react';

interface FootnoteRefProps {
  id: number;
  children: React.ReactNode;
}

interface FootnoteListProps {
  children: React.ReactNode;
}

interface FootnoteItemProps {
  id: number;
  children: React.ReactNode;
}

export function FootnoteRef({ id, children }: FootnoteRefProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <span className="relative inline">
      {children}
      <sup
        className="cursor-pointer text-primary hover:text-primary/80 font-semibold ml-0.5"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => setShowPreview(false)}
        onClick={() => {
          const element = document.getElementById(`footnote-${id}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      >
        [{id}]
      </sup>
      {showPreview && (
        <span className="absolute z-50 left-0 bottom-full mb-2 w-64 p-3 rounded-lg bg-base-200 border border-base-300 shadow-lg text-sm">
          <span className="text-base-content/80">
            Clique para ir para a nota de rodape {id}
          </span>
        </span>
      )}
    </span>
  );
}

export function FootnoteList({ children }: FootnoteListProps) {
  return (
    <section className="my-8 not-prose border-t border-base-300 pt-6">
      <h4 className="text-sm font-semibold text-base-content/60 uppercase tracking-wider mb-4">
        Notas de Rodape
      </h4>
      <ol className="space-y-3 text-sm">
        {children}
      </ol>
    </section>
  );
}

export function FootnoteItem({ id, children }: FootnoteItemProps) {
  return (
    <li
      id={`footnote-${id}`}
      className="flex gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors scroll-mt-20"
    >
      <span className="text-primary font-semibold flex-shrink-0">[{id}]</span>
      <span className="text-base-content/80">{children}</span>
    </li>
  );
}

export default FootnoteRef;
