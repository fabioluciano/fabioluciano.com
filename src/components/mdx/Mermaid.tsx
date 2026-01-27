// =============================================================================
// Mermaid Component - Render Mermaid diagrams
// =============================================================================

'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  caption?: string;
}

// Initialize mermaid with theme settings
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#6366f1',
    primaryTextColor: '#fff',
    primaryBorderColor: '#4f46e5',
    lineColor: '#9ca3af',
    secondaryColor: '#f472b6',
    tertiaryColor: '#f3f4f6',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
  },
});

export function Mermaid({ chart, caption }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Erro ao renderizar o diagrama');
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 not-prose p-4 rounded-lg bg-error/10 border border-error/30 text-error">
        <p className="font-semibold">Erro no diagrama Mermaid</p>
        <p className="text-sm">{error}</p>
        <pre className="mt-2 p-2 bg-base-200 rounded text-xs overflow-x-auto">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <figure className="my-6 not-prose">
      <div
        ref={containerRef}
        className="flex justify-center p-4 bg-base-100 rounded-lg border border-base-300 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="text-center text-sm text-base-content/60 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Mermaid;
