// =============================================================================
// CompareColumns Component - Compare two things side by side
// =============================================================================

import React from 'react';
import { HiCheck, HiXMark } from 'react-icons/hi2';

interface CompareColumnsProps {
  leftTitle: string;
  rightTitle: string;
  centerTitle?: string;
  leftType?: 'positive' | 'negative' | 'neutral';
  rightType?: 'positive' | 'negative' | 'neutral';
  centerType?: 'positive' | 'negative' | 'neutral';
  leftItems: string[];
  rightItems: string[];
  centerItems?: string[];
}

const typeStyles = {
  positive: {
    header: 'bg-success/20 text-success border-success/30',
    border: 'border-success/30',
    icon: HiCheck,
  },
  negative: {
    header: 'bg-error/20 text-error border-error/30',
    border: 'border-error/30',
    icon: HiXMark,
  },
  neutral: {
    header: 'bg-base-200 text-base-content border-base-300',
    border: 'border-base-300',
    icon: null,
  },
};

export function CompareColumns({
  leftTitle,
  rightTitle,
  centerTitle,
  leftType = 'negative',
  rightType = 'positive',
  centerType = 'neutral',
  leftItems,
  rightItems,
  centerItems,
}: CompareColumnsProps) {
  const leftStyle = typeStyles[leftType];
  const rightStyle = typeStyles[rightType];
  const centerStyle = centerItems ? typeStyles[centerType] : null;
  const LeftIcon = leftStyle.icon;
  const RightIcon = rightStyle.icon;
  const CenterIcon = centerStyle?.icon;

  const hasThreeColumns = centerItems && centerItems.length > 0;
  const gridCols = hasThreeColumns ? 'md:grid-cols-3' : 'md:grid-cols-2';

  // Define item icons based on type
  const getItemIcon = (type: 'positive' | 'negative' | 'neutral') => {
    if (type === 'positive') {
      return <span className="text-success mt-0.5">✓</span>;
    } else if (type === 'negative') {
      return <span className="text-error mt-0.5">✗</span>;
    }
    return <span className="text-base-content/50 mt-0.5">•</span>;
  };

  return (
    <div className={`my-6 not-prose grid grid-cols-1 ${gridCols} gap-4`}>
      {/* Left Column */}
      <div className={`rounded-lg border ${leftStyle.border} overflow-hidden`}>
        <div className={`px-4 py-3 ${leftStyle.header} border-b flex items-center gap-2`}>
          {LeftIcon && <LeftIcon className="w-5 h-5" />}
          <span className="font-semibold">{leftTitle}</span>
        </div>
        <ul className="p-4 space-y-2">
          {leftItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {getItemIcon(leftType)}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Center Column (optional) */}
      {hasThreeColumns && centerStyle && (
        <div className={`rounded-lg border ${centerStyle.border} overflow-hidden`}>
          <div className={`px-4 py-3 ${centerStyle.header} border-b flex items-center gap-2`}>
            {CenterIcon && <CenterIcon className="w-5 h-5" />}
            <span className="font-semibold">{centerTitle}</span>
          </div>
          <ul className="p-4 space-y-2">
            {centerItems!.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                {getItemIcon(centerType)}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Right Column */}
      <div className={`rounded-lg border ${rightStyle.border} overflow-hidden`}>
        <div className={`px-4 py-3 ${rightStyle.header} border-b flex items-center gap-2`}>
          {RightIcon && <RightIcon className="w-5 h-5" />}
          <span className="font-semibold">{rightTitle}</span>
        </div>
        <ul className="p-4 space-y-2">
          {rightItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              {getItemIcon(rightType)}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CompareColumns;
