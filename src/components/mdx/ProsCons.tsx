// =============================================================================
// ProsCons Component - Balanced trade-off analysis for MDX content
// =============================================================================

import React from 'react';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

interface ProConItem {
  text: string;
  emphasis?: boolean;
  caveat?: string;
}

interface ProsConsProps {
  prosTitle?: string;
  consTitle?: string;
  pros: (ProConItem | string)[];
  cons: (ProConItem | string)[];
  context?: string;
  variant?: 'balanced' | 'warning' | 'positive';
}

const normalizeItems = (items: (ProConItem | string)[]): ProConItem[] => {
  return items.map((item) =>
    typeof item === 'string' ? { text: item, emphasis: false } : item
  );
};

const getVariantClasses = (variant: string): string => {
  switch (variant) {
    case 'warning':
      return 'border-warning/30';
    case 'positive':
      return 'border-success/30';
    default:
      return 'border-base-300';
  }
};

export function ProsCons({
  prosTitle = 'Benefícios',
  consTitle = 'Limitações',
  pros,
  cons,
  context,
  variant = 'balanced',
}: ProsConsProps) {
  const prosNormalized = normalizeItems(pros);
  const consNormalized = normalizeItems(cons);

  return (
    <div className="my-8">
      {context && (
        <div className="mb-4 p-4 bg-info/10 rounded-lg border-l-4 border-info">
          <h3 className="text-lg font-semibold text-base-content flex items-center gap-2 m-0">
            <FiInfo className="w-5 h-5 text-info flex-shrink-0" />
            {context}
          </h3>
        </div>
      )}
      <div
        className={`pros-cons not-prose border-2 rounded-lg p-6 bg-base-100 transition-all duration-200 hover:shadow-md ${getVariantClasses(
          variant
        )}`}
      >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros Column */}
        <div className="pros-column">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-success">
            <FiCheckCircle className="w-5 h-5" />
            {prosTitle}
          </h4>
          <ul className="list-none space-y-3 pl-0 m-0">
            {prosNormalized.map((item, index) => (
              <li
                key={index}
                className={`flex items-start gap-2 text-sm ${item.emphasis ? 'font-semibold' : ''}`}
              >
                <FiCheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <span>{item.text}</span>
                  {item.caveat && (
                    <div className="caveat mt-1 text-xs text-base-content/60 italic flex items-start gap-1">
                      <FiAlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{item.caveat}</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className="cons-column">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-error">
            <FiXCircle className="w-5 h-5" />
            {consTitle}
          </h4>
          <ul className="list-none space-y-3 pl-0 m-0">
            {consNormalized.map((item, index) => (
              <li
                key={index}
                className={`flex items-start gap-2 text-sm ${item.emphasis ? 'font-semibold' : ''}`}
              >
                <FiXCircle className="w-4 h-4 text-error flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <span>{item.text}</span>
                  {item.caveat && (
                    <div className="caveat mt-1 text-xs text-base-content/60 italic flex items-start gap-1">
                      <FiAlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                      <span>{item.caveat}</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ProsCons;
