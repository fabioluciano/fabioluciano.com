// =============================================================================
// CodeTabs Component - Tabbed code blocks for multiple languages/files
// =============================================================================

import React, { useState } from 'react';

interface Tab {
  label: string;
  language?: string;
  children: React.ReactNode;
}

interface CodeTabsProps {
  tabs: Tab[];
  defaultTab?: number;
}

export function CodeTabs({ tabs, defaultTab = 0 }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="my-6 not-prose">
      {/* Tab buttons */}
      <div className="flex border-b border-base-300 bg-base-200 rounded-t-lg overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === index
                ? 'text-primary border-b-2 border-primary bg-base-100'
                : 'text-base-content/60 hover:text-base-content hover:bg-base-300/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-base-200 rounded-b-lg overflow-hidden">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={activeTab === index ? 'block' : 'hidden'}
          >
            {tab.children}
          </div>
        ))}
      </div>
    </div>
  );
}

// Single tab wrapper for easier MDX usage
interface CodeTabProps {
  label: string;
  language?: string;
  children: React.ReactNode;
}

export function CodeTab({ children }: CodeTabProps) {
  return <>{children}</>;
}

export default CodeTabs;
