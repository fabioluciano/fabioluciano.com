// =============================================================================
// Timeline Component - Display events in chronological order
// =============================================================================

import React from 'react';
import {
  HiCheckCircle,
  HiClock,
  HiXCircle,
  HiArrowPath,
  HiStar,
} from 'react-icons/hi2';

type TimelineStatus = 'completed' | 'current' | 'pending' | 'error' | 'milestone';

interface TimelineEventProps {
  date?: string;
  title: string;
  status?: TimelineStatus;
  children?: React.ReactNode;
}

const statusConfig: Record<
  TimelineStatus,
  {
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    lineClass: string;
  }
> = {
  completed: {
    icon: HiCheckCircle,
    iconClass: 'text-success bg-success/10',
    lineClass: 'bg-success',
  },
  current: {
    icon: HiArrowPath,
    iconClass: 'text-primary bg-primary/10 animate-spin',
    lineClass: 'bg-primary',
  },
  pending: {
    icon: HiClock,
    iconClass: 'text-base-content/40 bg-base-200',
    lineClass: 'bg-base-300',
  },
  error: {
    icon: HiXCircle,
    iconClass: 'text-error bg-error/10',
    lineClass: 'bg-error',
  },
  milestone: {
    icon: HiStar,
    iconClass: 'text-warning bg-warning/10',
    lineClass: 'bg-warning',
  },
};

export function TimelineEvent({
  date,
  title,
  status = 'completed',
  children,
}: TimelineEventProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="timeline-event relative pl-8 pb-8 last:pb-0">
      {/* Vertical line */}
      <div
        className={`absolute left-[11px] top-6 bottom-0 w-0.5 ${config.lineClass} last:hidden`}
      />

      {/* Icon */}
      <div
        className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center ${config.iconClass}`}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="pt-0.5">
        {date && (
          <time className="text-xs text-base-content/50 font-medium uppercase tracking-wide">
            {date}
          </time>
        )}
        <h4 className="text-base font-semibold text-base-content mt-0.5">
          {title}
        </h4>
        {children && (
          <div className="mt-2 text-sm text-base-content/70 prose prose-sm max-w-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

interface TimelineProps {
  children: React.ReactNode;
  title?: string;
}

export function Timeline({ children, title }: TimelineProps) {
  return (
    <div className="my-6 not-prose">
      {title && (
        <h3 className="text-lg font-semibold text-base-content mb-4">{title}</h3>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export default Timeline;
