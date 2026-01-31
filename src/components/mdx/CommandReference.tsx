// =============================================================================
// CommandReference Component - CLI command documentation for MDX content
// =============================================================================

import React, { useState } from 'react';
import { FiTerminal, FiCopy, FiCheck } from 'react-icons/fi';

interface CommandItem {
  cmd: string;
  args?: string;
  flags?: string[];
  description: string;
  example?: string;
  output?: string;
  category?: string;
}

interface CommandReferenceProps {
  commands: CommandItem[];
  title?: string;
  showCategories?: boolean;
  enableCopy?: boolean;
}

export function CommandReference({
  commands,
  title,
  showCategories = false,
  enableCopy = true,
}: CommandReferenceProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const groupedCommands = showCategories
    ? commands.reduce((acc, cmd) => {
        const category = cmd.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(cmd);
        return acc;
      }, {} as Record<string, CommandItem[]>)
    : { All: commands };

  const handleCopy = async (command: string, index: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFullCommand = (cmd: CommandItem): string => {
    return `${cmd.cmd}${cmd.args ? ' ' + cmd.args : ''}${
      cmd.flags ? ' ' + cmd.flags.join(' ') : ''
    }`;
  };

  let globalIndex = 0;

  return (
    <div className="command-reference my-8 not-prose">
      {title && (
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FiTerminal className="w-5 h-5 text-primary" />
          {title}
        </h4>
      )}

      {Object.entries(groupedCommands).map(([category, cmds]) => (
        <div key={category} className="command-category mb-6">
          {showCategories && (
            <h5 className="text-lg font-semibold mb-3 text-base-content">
              {category}
            </h5>
          )}

          <div className="commands-grid space-y-3">
            {cmds.map((command) => {
              const currentIndex = globalIndex++;
              const fullCommand = getFullCommand(command);

              return (
                <div
                  key={currentIndex}
                  className="command-item rounded-lg border border-base-300 bg-base-100 p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="command-header flex items-start justify-between gap-3 mb-2">
                    <div className="command-syntax flex-1">
                      <code className="text-sm font-mono bg-base-200 px-2 py-1 rounded break-all">
                        <span className="text-primary">{command.cmd}</span>
                        {command.args && (
                          <span className="text-secondary">
                            {' '}
                            {command.args}
                          </span>
                        )}
                        {command.flags && command.flags.length > 0 && (
                          <span className="text-success">
                            {' '}
                            {command.flags.join(' ')}
                          </span>
                        )}
                      </code>
                    </div>
                    {enableCopy && (
                      <button
                        className="copy-button p-2 rounded hover:bg-base-200 transition-all duration-200 active:scale-95"
                        onClick={() => handleCopy(fullCommand, currentIndex)}
                        title="Copy command"
                        type="button"
                      >
                        {copiedIndex === currentIndex ? (
                          <FiCheck className="w-4 h-4 text-success" />
                        ) : (
                          <FiCopy className="w-4 h-4 text-base-content/60" />
                        )}
                      </button>
                    )}
                  </div>

                  <p className="command-description text-sm text-base-content m-0">
                    {command.description}
                  </p>

                  {command.example && (
                    <div className="command-example mt-3 p-2 bg-base-200 rounded text-xs font-mono">
                      <span className="text-base-content/60">$ </span>
                      <span>{command.example}</span>
                    </div>
                  )}

                  {command.output && (
                    <div className="command-output mt-2 p-2 bg-base-200 rounded text-xs font-mono text-base-content/60">
                      {command.output}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommandReference;
