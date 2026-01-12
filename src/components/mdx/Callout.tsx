// =============================================================================
// Callout Component - Highlighted blocks for MDX content
// =============================================================================

import React from 'react';
import {
  HiInformationCircle,
  HiExclamationTriangle,
  HiLightBulb,
  HiXCircle,
  HiCheckCircle,
} from 'react-icons/hi2';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger' | 'success';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ComponentType<{ className?: string }>;
    alertClass: string;
    defaultTitle: string;
  }
> = {
  info: {
    icon: HiInformationCircle,
    alertClass: 'alert-info',
    defaultTitle: 'Info',
  },
  warning: {
    icon: HiExclamationTriangle,
    alertClass: 'alert-warning',
    defaultTitle: 'Warning',
  },
  tip: {
    icon: HiLightBulb,
    alertClass: 'alert-success',
    defaultTitle: 'Tip',
  },
  danger: {
    icon: HiXCircle,
    alertClass: 'alert-error',
    defaultTitle: 'Danger',
  },
  success: {
    icon: HiCheckCircle,
    alertClass: 'alert-success',
    defaultTitle: 'Success',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={`alert ${config.alertClass} my-6 not-prose`}>
      <Icon className="h-6 w-6 flex-shrink-0" />
      <div className="flex flex-col gap-1">
        {title && <h4 className="font-bold">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

export default Callout;
