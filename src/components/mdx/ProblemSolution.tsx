// =============================================================================
// ProblemSolution Component - Before/after transformation narratives for MDX
// =============================================================================

import React from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
} from 'react-icons/fi';
import { Callout } from './Callout';

interface StateMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface State {
  title: string;
  description?: string;
  metrics?: StateMetric[];
  characteristics: string[];
  issues?: string[];
  benefits?: string[];
}

interface Impact {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

interface ProblemSolutionProps {
  scenario: string;
  problem: State;
  solution: State;
  transitionNote?: string;
  impact?: Impact;
  variant?: 'side-by-side' | 'stacked';
}

const getTrendIcon = (trend?: string) => {
  switch (trend) {
    case 'up':
      return FiTrendingUp;
    case 'down':
      return FiTrendingDown;
    default:
      return FiMinus;
  }
};

const getTrendColor = (trend?: string): string => {
  switch (trend) {
    case 'up':
      return 'text-success';
    case 'down':
      return 'text-error';
    default:
      return 'text-base-content/60';
  }
};

export function ProblemSolution({
  scenario,
  problem,
  solution,
  transitionNote,
  impact,
  variant = 'side-by-side',
}: ProblemSolutionProps) {
  return (
    <div className="problem-solution my-8 not-prose relative">
      <div className="scenario-header bg-info/10 border-l-4 border-info p-4 rounded-r-lg mb-6">
        <h4 className="text-lg font-semibold m-0 text-info-content">
          Cenário: {scenario}
        </h4>
      </div>

      <div
        className={
          variant === 'side-by-side'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6 relative'
            : 'space-y-6'
        }
      >
        {/* Problem State */}
        <div className="state-card border-2 border-error/30 rounded-lg p-6 bg-error/10 transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-error/20 flex items-center justify-center">
              <FiAlertCircle className="w-5 h-5 text-error" />
            </div>
            <h5 className="text-xl font-bold m-0">{problem.title}</h5>
          </div>

          {problem.description && (
            <p className="text-sm text-base-content/60 mb-4 m-0">
              {problem.description}
            </p>
          )}

          {problem.metrics && problem.metrics.length > 0 && (
            <div className="metrics-list space-y-2 mb-4 p-3 bg-base-200/50 rounded">
              {problem.metrics.map((metric, index) => {
                const TrendIcon = getTrendIcon(metric.trend);
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span>{metric.value}</span>
                      <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {problem.characteristics.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-base-content m-0">
                Características:
              </p>
              <ul className="list-none space-y-2 pl-0 m-0">
                {problem.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-base-content/40 select-none">•</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {problem.issues && problem.issues.length > 0 && (
            <div className="issues-list">
              <p className="text-sm font-semibold mb-2 text-error flex items-center gap-2 m-0">
                <FiAlertCircle className="w-4 h-4" />
                Problemas:
              </p>
              <ul className="list-none space-y-2 pl-0 m-0">
                {problem.issues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <FiAlertCircle className="w-4 h-4 text-error flex-shrink-0 mt-0.5" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Arrow Transition */}
        {variant === 'side-by-side' && (
          <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-primary text-primary-content rounded-full p-4 shadow-xl">
              <HiArrowRight className="w-8 h-8" />
            </div>
          </div>
        )}

        {/* Solution State */}
        <div className="state-card border-2 border-success/30 rounded-lg p-6 bg-success/10 transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <FiCheckCircle className="w-5 h-5 text-success" />
            </div>
            <h5 className="text-xl font-bold m-0">{solution.title}</h5>
          </div>

          {solution.description && (
            <p className="text-sm text-base-content/60 mb-4 m-0">
              {solution.description}
            </p>
          )}

          {solution.metrics && solution.metrics.length > 0 && (
            <div className="metrics-list space-y-2 mb-4 p-3 bg-base-200/50 rounded">
              {solution.metrics.map((metric, index) => {
                const TrendIcon = getTrendIcon(metric.trend);
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span>{metric.value}</span>
                      <TrendIcon className={`w-4 h-4 ${getTrendColor(metric.trend)}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {solution.characteristics.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-base-content m-0">
                Características:
              </p>
              <ul className="list-none space-y-2 pl-0 m-0">
                {solution.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-base-content/40 select-none">•</span>
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {solution.benefits && solution.benefits.length > 0 && (
            <div className="benefits-list">
              <p className="text-sm font-semibold mb-2 text-success flex items-center gap-2 m-0">
                <FiCheckCircle className="w-4 h-4" />
                Benefícios:
              </p>
              <ul className="list-none space-y-2 pl-0 m-0">
                {solution.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <FiCheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {transitionNote && (
        <div
          className={`transition-note ${
            variant === 'side-by-side' ? 'md:col-span-2' : ''
          } bg-primary/10 border border-primary/30 rounded-lg p-4 text-sm text-center mt-6`}
        >
          <HiArrowRight className="inline-block w-4 h-4 mr-2" />
          {transitionNote}
        </div>
      )}

      {/* Impact Section */}
      {impact && (
        <div className="impact-section mt-6">
          <Callout
            type={
              impact.type === 'positive' ? 'tip' : impact.type === 'negative' ? 'danger' : 'info'
            }
            title={impact.title}
          >
            {impact.description}
          </Callout>
        </div>
      )}
    </div>
  );
}

export default ProblemSolution;
