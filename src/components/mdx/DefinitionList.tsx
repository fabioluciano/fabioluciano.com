// =============================================================================
// DefinitionList Component - Term-definition pairs for MDX content
// =============================================================================

import React from 'react';
import { FiBook, FiInfo, FiCode, FiPackage, FiAlertTriangle } from 'react-icons/fi';

type IconType = 'book' | 'info' | 'code' | 'package';

interface DefinitionItem {
  term: string;
  definition: string;
  icon?: IconType;
  emphasis?: boolean;
  caveat?: string;
  relatedTerms?: string[];
}

interface DefinitionListProps {
  items: DefinitionItem[];
  variant?: 'default' | 'compact' | 'glossary';
  columns?: 1 | 2 | 3;
  showIcons?: boolean;
  indexable?: boolean;
}

const iconMap: Record<IconType, React.ComponentType<{ className?: string }>> = {
  book: FiBook,
  info: FiInfo,
  code: FiCode,
  package: FiPackage,
};

const generateId = (term: string): string => {
  return term.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

export function DefinitionList({
  items,
  variant = 'default',
  columns = 1,
  showIcons = true,
  indexable = false,
}: DefinitionListProps) {
  const getGridClasses = (): string => {
    if (variant === 'compact') return 'space-y-3';
    switch (columns) {
      case 2:
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
      case 3:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      default:
        return 'space-y-6';
    }
  };

  return (
    <dl className={`definition-list variant-${variant} ${getGridClasses()} my-8 not-prose`}>
      {items.map((item, index) => {
        const Icon = item.icon ? iconMap[item.icon] : null;
        const termId = indexable ? generateId(item.term) : undefined;

        return (
          <div
            key={index}
            className={`definition-item ${item.emphasis ? 'emphasized' : ''} ${
              variant === 'compact'
                ? 'p-3 border-l-4 border-base-300 bg-transparent'
                : variant === 'glossary'
                ? 'p-5 rounded-lg border border-base-300 bg-base-100 shadow-sm'
                : 'p-4 rounded-lg border border-base-300 bg-base-100'
            } transition-all duration-200 hover:border-primary/30 hover:shadow-sm ${
              item.emphasis ? 'border-primary/30 bg-primary/10' : ''
            }`}
          >
            <dt
              id={termId}
              className="definition-term font-semibold text-lg mb-2 flex items-center gap-2 scroll-mt-20"
            >
              {showIcons && Icon && (
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
              )}
              <span>{item.term}</span>
            </dt>
            <dd className="definition-description text-base-content">
              {item.definition}
              {item.caveat && (
                <div className="caveat mt-2 text-xs text-base-content/60 italic flex items-start gap-1">
                  <FiAlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span>{item.caveat}</span>
                </div>
              )}
              {item.relatedTerms && item.relatedTerms.length > 0 && (
                <div className="related-terms mt-2 text-sm text-base-content/60">
                  Ver também:{' '}
                  {item.relatedTerms.map((id, i) => (
                    <React.Fragment key={i}>
                      <a
                        href={`#${id}`}
                        className="text-primary hover:underline"
                      >
                        {id}
                      </a>
                      {i < item.relatedTerms!.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export default DefinitionList;
