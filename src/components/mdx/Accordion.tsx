// =============================================================================
// Accordion Component - Collapsible content sections using DaisyUI collapse
// =============================================================================

import React from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi2';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  name?: string;
}

// Using DaisyUI collapse with radio buttons for single-open behavior
// or checkboxes for multiple-open behavior
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  icon,
  name,
}: AccordionItemProps) {
  // Generate unique ID for this item
  const inputId = React.useId();

  return (
    <div className="collapse collapse-arrow border-b border-base-300 last:border-b-0 rounded-none">
      <input
        type={name ? 'radio' : 'checkbox'}
        name={name}
        id={inputId}
        defaultChecked={defaultOpen}
        className="peer"
      />
      <div className="collapse-title flex items-center gap-3 px-4 py-4 min-h-0 font-medium text-base-content hover:bg-base-200/50 transition-colors">
        {icon && <span className="text-primary flex-shrink-0">{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="collapse-content px-4">
        <div className="pb-4 text-base-content/80 prose prose-sm max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  title?: string;
  /** If true, only one item can be open at a time */
  singleOpen?: boolean;
}

export function Accordion({ children, title, singleOpen = false }: AccordionProps) {
  // Generate a unique group name for radio buttons if singleOpen
  const groupName = singleOpen ? React.useId() : undefined;

  return (
    <div className="my-6 not-prose border border-base-300 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-3 bg-base-200 border-b border-base-300">
          <span className="font-medium text-base-content">{title}</span>
        </div>
      )}
      <div className="join join-vertical w-full">
        {singleOpen
          ? React.Children.map(children, (child) => {
              if (React.isValidElement<AccordionItemProps>(child)) {
                return React.cloneElement(child, { name: groupName });
              }
              return child;
            })
          : children}
      </div>
    </div>
  );
}

// FAQ specific components
interface FAQItemProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  name?: string;
}

export function FAQItem({ question, children, defaultOpen = false, name }: FAQItemProps) {
  return (
    <AccordionItem
      title={question}
      defaultOpen={defaultOpen}
      icon={<HiQuestionMarkCircle className="w-5 h-5" />}
      name={name}
    >
      {children}
    </AccordionItem>
  );
}

interface FAQProps {
  children: React.ReactNode;
  title?: string;
  singleOpen?: boolean;
}

export function FAQ({ children, title = 'Perguntas Frequentes', singleOpen = false }: FAQProps) {
  const groupName = singleOpen ? React.useId() : undefined;

  return (
    <div className="my-6 not-prose">
      {title && (
        <h3 className="text-xl font-semibold text-base-content mb-4">{title}</h3>
      )}
      <div className="border border-base-300 rounded-lg overflow-hidden">
        <div className="join join-vertical w-full">
          {singleOpen
            ? React.Children.map(children, (child) => {
                if (React.isValidElement<FAQItemProps>(child)) {
                  return React.cloneElement(child, { name: groupName });
                }
                return child;
              })
            : children}
        </div>
      </div>
    </div>
  );
}

// Details/Summary alternative (simpler, native HTML - always works without JS)
interface DetailsProps {
  summary: string;
  children: React.ReactNode;
  open?: boolean;
}

export function Details({ summary, children, open = false }: DetailsProps) {
  return (
    <details
      className="my-4 not-prose group collapse collapse-arrow border border-base-300 rounded-lg overflow-hidden bg-base-100"
      open={open}
    >
      <summary className="collapse-title min-h-0 px-4 py-3 cursor-pointer font-medium text-base-content list-none">
        {summary}
      </summary>
      <div className="collapse-content px-4">
        <div className="pb-4 text-base-content/80 prose prose-sm max-w-none border-t border-base-300 pt-4">
          {children}
        </div>
      </div>
    </details>
  );
}

// Simple collapse using DaisyUI's native collapse (CSS-only, no JS required)
interface CollapseProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: 'arrow' | 'plus';
}

export function Collapse({ title, children, defaultOpen = false, icon = 'arrow' }: CollapseProps) {
  const iconClass = icon === 'plus' ? 'collapse-plus' : 'collapse-arrow';
  
  return (
    <div className={`collapse ${iconClass} my-4 not-prose border border-base-300 rounded-lg bg-base-100`}>
      <input type="checkbox" defaultChecked={defaultOpen} />
      <div className="collapse-title font-medium text-base-content">
        {title}
      </div>
      <div className="collapse-content">
        <div className="text-base-content/80 prose prose-sm max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
