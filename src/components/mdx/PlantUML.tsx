// =============================================================================
// PlantUML Component - Renders PlantUML diagrams in MDX
// =============================================================================

import React from 'react';
import { getPlantUMLUrl, generateDiagramHash } from '@/lib/plantuml';

interface PlantUMLProps {
  /**
   * PlantUML code to render
   */
  code: string;
  /**
   * Alt text for the diagram image
   */
  alt?: string;
  /**
   * Caption to display below the diagram
   */
  caption?: string;
  /**
   * Output format (svg or png)
   */
  format?: 'svg' | 'png';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * PlantUML component for rendering diagrams in MDX
 *
 * Usage in MDX:
 * ```mdx
 * <PlantUML
 *   code={`
 *     @startuml
 *     Alice -> Bob: Hello
 *     Bob --> Alice: Hi!
 *     @enduml
 *   `}
 *   alt="Sequence diagram"
 *   caption="Simple sequence diagram"
 * />
 * ```
 */
export function PlantUML({
  code,
  alt = 'PlantUML Diagram',
  caption,
  format = 'svg',
  className = '',
}: PlantUMLProps) {
  // Clean up the code
  const cleanCode = code.trim();

  // Generate URL for the diagram
  // In production, this would use pre-built diagrams
  // For development, we use the PlantUML server directly
  const diagramUrl = getPlantUMLUrl(cleanCode, { format });
  const hash = generateDiagramHash(cleanCode);

  return (
    <figure className={`my-8 not-prose ${className}`}>
      <div className="flex justify-center bg-base-200 rounded-lg p-4 overflow-x-auto">
        <img
          src={diagramUrl}
          alt={alt}
          className="max-w-full h-auto"
          loading="lazy"
          data-plantuml-hash={hash}
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-base-content/60 mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Inline PlantUML for simpler usage
 * Automatically wraps code in @startuml/@enduml if not present
 */
export function PlantUMLInline({
  children,
  ...props
}: Omit<PlantUMLProps, 'code'> & { children: string }) {
  let code = children.trim();

  // Auto-wrap if needed
  if (!code.startsWith('@start')) {
    code = `@startuml\n${code}\n@enduml`;
  }

  return <PlantUML code={code} {...props} />;
}

export default PlantUML;
