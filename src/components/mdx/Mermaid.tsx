// =============================================================================
// Mermaid Component - Render Mermaid diagrams with fullscreen modal
// =============================================================================

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MermaidProps {
  chart: string;
  caption?: string;
}

// Store mermaid instance after dynamic import
let mermaidInstance: typeof import('mermaid').default | null = null;
let isInitialized = false;

const getMermaid = async () => {
  if (mermaidInstance) return mermaidInstance;

  // Dynamic import - only loads when called, after DOM is ready
  const mermaid = (await import('mermaid')).default;
  mermaidInstance = mermaid;

  if (!isInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#6366f1',
        lineColor: '#6366f1',
        secondaryColor: '#fce7f3',
        secondaryTextColor: '#1e293b',
        tertiaryColor: '#f1f5f9',
        tertiaryTextColor: '#1e293b',
        background: '#ffffff',
        mainBkg: '#e0e7ff',
        nodeBorder: '#6366f1',
        nodeTextColor: '#1e293b',
        clusterBkg: '#f8fafc',
        clusterBorder: '#6366f1',
        titleColor: '#1e293b',
        edgeLabelBackground: '#ffffff',
        textColor: '#1e293b',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        padding: 15,
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
      mindmap: {
        padding: 16,
        maxNodeWidth: 200,
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
        gridLineStartPadding: 35,
        fontSize: 11,
        sectionFontSize: 11,
        numberSectionStyles: 4,
      },
    });
    isInitialized = true;
  }

  return mermaid;
};

// Expand icon component
const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6" />
    <path d="M9 21H3v-6" />
    <path d="M21 3l-7 7" />
    <path d="M3 21l7-7" />
  </svg>
);

// Close icon component
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function Mermaid({ chart, caption }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        setIsLoading(true);
        const mermaid = await getMermaid();
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Erro ao renderizar o diagrama');
      } finally {
        setIsLoading(false);
      }
    };

    renderChart();
  }, [chart]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = useCallback(() => {
    if (svg && !error) {
      setIsModalOpen(true);
    }
  }, [svg, error]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
    <>
      <figure className="my-6 not-prose">
        <div className="relative group">
          <div
            ref={containerRef}
            className="flex justify-center items-center p-4 bg-base-100 rounded-lg border border-base-300 overflow-x-auto min-h-[200px] cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}
            aria-label="Clique para expandir o diagrama"
          >
            {isLoading && !svg ? (
              <div className="flex items-center justify-center text-base-content/50">
                <span className="loading loading-spinner loading-md mr-2"></span>
                Carregando diagrama...
              </div>
            ) : (
              <div
                className="flex justify-center items-center w-full [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:max-h-[500px]"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            )}
          </div>
          {/* Expand button */}
          {svg && !isLoading && (
            <button
              onClick={openModal}
              className="absolute top-2 right-2 p-2 bg-base-100/90 hover:bg-primary hover:text-primary-content rounded-lg border border-base-300 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
              aria-label="Expandir diagrama"
              title="Expandir diagrama"
            >
              <ExpandIcon />
            </button>
          )}
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-base-content/60 mt-2">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Diagrama em tela cheia"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-3 bg-base-100 hover:bg-error hover:text-error-content rounded-full shadow-lg transition-colors z-10"
            aria-label="Fechar"
          >
            <CloseIcon />
          </button>

          {/* Modal content */}
          <div
            className="relative max-w-[95vw] max-h-[90vh] p-6 bg-base-100 rounded-xl shadow-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Diagram */}
            <div
              className="flex justify-center items-center min-w-[70vw] [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:max-h-[80vh]"
              dangerouslySetInnerHTML={{ __html: svg }}
            />

            {/* Caption in modal */}
            {caption && (
              <p className="text-center text-sm text-base-content/60 mt-6 pt-4 border-t border-base-300">
                {caption}
              </p>
            )}
          </div>

          {/* Instructions */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            Pressione ESC ou clique fora para fechar
          </p>
        </div>
      )}
    </>
  );
}

export default Mermaid;
