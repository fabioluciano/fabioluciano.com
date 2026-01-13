// =============================================================================
// LinkCard Component - Beautiful link previews for external resources
// =============================================================================

import React from 'react';
import {
  HiArrowTopRightOnSquare,
  HiDocument,
  HiCodeBracket,
  HiFolderOpen,
  HiGlobeAlt,
  HiDocumentText,
  HiLink,
} from 'react-icons/hi2';
import { SiGithub } from 'react-icons/si';

type LinkType = 'github' | 'website' | 'pdf' | 'folder' | 'code' | 'document' | 'default';

interface LinkCardProps {
  /**
   * URL do link
   */
  href: string;
  /**
   * Título do card
   */
  title: string;
  /**
   * Descrição opcional
   */
  description?: string;
  /**
   * Tipo do link para ícone apropriado
   */
  type?: LinkType;
  /**
   * Idioma/label opcional
   */
  label?: string;
}

const typeConfig: Record<
  LinkType,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
> = {
  github: {
    icon: SiGithub,
    color: 'text-base-content',
  },
  website: {
    icon: HiGlobeAlt,
    color: 'text-primary',
  },
  pdf: {
    icon: HiDocumentText,
    color: 'text-error',
  },
  folder: {
    icon: HiFolderOpen,
    color: 'text-warning',
  },
  code: {
    icon: HiCodeBracket,
    color: 'text-success',
  },
  document: {
    icon: HiDocument,
    color: 'text-info',
  },
  default: {
    icon: HiLink,
    color: 'text-primary',
  },
};

function detectType(href: string): LinkType {
  if (href.includes('github.com')) return 'github';
  if (href.endsWith('.pdf')) return 'pdf';
  if (href.includes('/tree/') || href.includes('/blob/')) return 'folder';
  return 'website';
}

export function LinkCard({
  href,
  title,
  description,
  type,
  label,
}: LinkCardProps) {
  const detectedType = type || detectType(href);
  const config = typeConfig[detectedType];
  const Icon = config.icon;

  // Extract domain for display
  const domain = (() => {
    try {
      const url = new URL(href);
      return url.hostname.replace('www.', '');
    } catch {
      return href;
    }
  })();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block not-prose my-3"
    >
      <div className="flex items-center gap-4 p-4 border border-base-300 rounded-lg bg-base-100 hover:bg-base-200/50 hover:border-primary/30 transition-all duration-200">
        {/* Icon */}
        <div className={`flex-shrink-0 ${config.color}`}>
          <Icon className="w-8 h-8" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-base-content group-hover:text-primary transition-colors truncate">
              {title}
            </h4>
            {label && (
              <span className="badge badge-sm badge-outline flex-shrink-0 whitespace-nowrap">{label}</span>
            )}
          </div>
          {description && (
            <p className="text-sm text-base-content/60 mt-0.5 line-clamp-1">
              {description}
            </p>
          )}
          <p className="text-xs text-base-content/40 mt-1 truncate">{domain}</p>
        </div>

        {/* Arrow */}
        <HiArrowTopRightOnSquare className="w-5 h-5 text-base-content/30 group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </a>
  );
}

// Grid for multiple link cards
interface LinkCardGridProps {
  children: React.ReactNode;
  columns?: 1 | 2;
  title?: string;
}

export function LinkCardGrid({ children, columns = 1, title }: LinkCardGridProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1';

  return (
    <div className="my-6 not-prose">
      {title && (
        <h3 className="text-lg font-semibold text-base-content mb-4">{title}</h3>
      )}
      <div className={`grid ${gridCols} gap-2`}>{children}</div>
    </div>
  );
}

// Compact inline link with icon
interface InlineLinkProps {
  href: string;
  children: React.ReactNode;
  type?: LinkType;
}

export function InlineLink({ href, children, type }: InlineLinkProps) {
  const detectedType = type || detectType(href);
  const config = typeConfig[detectedType];
  const Icon = config.icon;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-primary hover:underline"
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
      <HiArrowTopRightOnSquare className="w-3 h-3 opacity-50" />
    </a>
  );
}

export default LinkCard;
