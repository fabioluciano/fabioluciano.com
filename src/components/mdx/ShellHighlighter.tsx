// =============================================================================
// Shell Syntax Highlighter - Shared utility for terminal/code components
// Uses colors matching Shiki github-dark theme
// =============================================================================

import React from 'react';

interface Token {
  type: 'command' | 'flag' | 'string' | 'variable' | 'path' | 'operator' | 'comment' | 'text';
  value: string;
}

// Common shell commands
const SHELL_COMMANDS = new Set([
  'kubectl', 'docker', 'git', 'npm', 'yarn', 'pnpm', 'node', 'python', 'pip',
  'curl', 'wget', 'ssh', 'scp', 'rsync', 'tar', 'zip', 'unzip', 'gzip',
  'ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'head', 'tail',
  'grep', 'sed', 'awk', 'find', 'xargs', 'sort', 'uniq', 'wc', 'diff',
  'echo', 'printf', 'export', 'source', 'alias', 'which', 'whereis',
  'sudo', 'su', 'chmod', 'chown', 'chgrp', 'ps', 'kill', 'top', 'htop',
  'yq', 'jq', 'base64', 'openssl', 'aws', 'gcloud', 'az', 'terraform',
  'helm', 'kind', 'minikube', 'k3d', 'k9s', 'kubectx', 'kubens',
  'make', 'cmake', 'go', 'cargo', 'rustc', 'gcc', 'clang',
  'systemctl', 'journalctl', 'apt', 'apt-get', 'yum', 'dnf', 'brew',
  'vim', 'nvim', 'nano', 'emacs', 'code', 'less', 'more', 'man',
  'touch', 'file', 'stat', 'du', 'df', 'free', 'uname', 'hostname',
  'ping', 'netstat', 'ss', 'ip', 'ifconfig', 'route', 'traceroute',
  'env', 'set', 'unset', 'read', 'test', 'true', 'false', 'exit',
  'httpie', 'http', 'https', 'nc', 'nmap', 'dig', 'nslookup', 'host',
  'select', 'config',
]);

function tokenizeShell(input: string): Token[] {
  const tokens: Token[] = [];
  let remaining = input;

  let isFirstWord = true;
  let afterPipe = false;

  while (remaining.length > 0) {
    let matched = false;

    // Skip whitespace (preserve it)
    const wsMatch = remaining.match(/^(\s+)/);
    if (wsMatch) {
      tokens.push({ type: 'text', value: wsMatch[1] });
      remaining = remaining.slice(wsMatch[1].length);
      continue;
    }

    // Pipe or semicolon (next word could be command)
    const pipeMatch = remaining.match(/^(\||;|&&|\|\|)/);
    if (pipeMatch) {
      tokens.push({ type: 'operator', value: pipeMatch[1] });
      remaining = remaining.slice(pipeMatch[1].length);
      afterPipe = true;
      matched = true;
      continue;
    }

    // Redirections
    const redirectMatch = remaining.match(/^(>>|>|<|2>&1|&>|&>>)/);
    if (redirectMatch) {
      tokens.push({ type: 'operator', value: redirectMatch[1] });
      remaining = remaining.slice(redirectMatch[1].length);
      matched = true;
      continue;
    }

    // Double-quoted strings
    const dqMatch = remaining.match(/^"([^"\\]|\\.)*"/);
    if (dqMatch) {
      tokens.push({ type: 'string', value: dqMatch[0] });
      remaining = remaining.slice(dqMatch[0].length);
      isFirstWord = false;
      matched = true;
      continue;
    }

    // Single-quoted strings
    const sqMatch = remaining.match(/^'[^']*'/);
    if (sqMatch) {
      tokens.push({ type: 'string', value: sqMatch[0] });
      remaining = remaining.slice(sqMatch[0].length);
      isFirstWord = false;
      matched = true;
      continue;
    }

    // Environment variable assignment (VAR=value at start)
    const envAssignMatch = remaining.match(/^([A-Z_][A-Z0-9_]*=)(\S*)/);
    if (envAssignMatch && (isFirstWord || afterPipe)) {
      tokens.push({ type: 'variable', value: envAssignMatch[1] });
      if (envAssignMatch[2]) {
        // Check if value is a path or string
        if (envAssignMatch[2].startsWith('/') || envAssignMatch[2].includes('/')) {
          tokens.push({ type: 'path', value: envAssignMatch[2] });
        } else {
          tokens.push({ type: 'string', value: envAssignMatch[2] });
        }
      }
      remaining = remaining.slice(envAssignMatch[0].length);
      matched = true;
      continue;
    }

    // Variable expansion $VAR or ${VAR}
    const varMatch = remaining.match(/^(\$\{[^}]+\}|\$[A-Za-z_][A-Za-z0-9_]*)/);
    if (varMatch) {
      tokens.push({ type: 'variable', value: varMatch[0] });
      remaining = remaining.slice(varMatch[0].length);
      isFirstWord = false;
      matched = true;
      continue;
    }

    // Flags (--flag or -f)
    const flagMatch = remaining.match(/^(--?[a-zA-Z][a-zA-Z0-9-]*)/);
    if (flagMatch) {
      tokens.push({ type: 'flag', value: flagMatch[1] });
      remaining = remaining.slice(flagMatch[1].length);
      isFirstWord = false;
      matched = true;
      continue;
    }

    // Paths (starting with / or ./ or ~/ or containing /)
    const pathMatch = remaining.match(/^(~\/[^\s|>]+|\.\.?\/[^\s|>]+|\/[^\s|>]+)/);
    if (pathMatch) {
      tokens.push({ type: 'path', value: pathMatch[1] });
      remaining = remaining.slice(pathMatch[1].length);
      isFirstWord = false;
      matched = true;
      continue;
    }

    // Words (commands or arguments)
    const wordMatch = remaining.match(/^([^\s|;&<>"'\\]+)/);
    if (wordMatch) {
      const word = wordMatch[1];
      if ((isFirstWord || afterPipe) && SHELL_COMMANDS.has(word)) {
        tokens.push({ type: 'command', value: word });
        afterPipe = false;
      } else if (word.includes('/')) {
        tokens.push({ type: 'path', value: word });
      } else {
        tokens.push({ type: 'text', value: word });
      }
      remaining = remaining.slice(word.length);
      isFirstWord = false;
      matched = true;
      continue;
    }

    // Fallback: single character
    if (!matched) {
      tokens.push({ type: 'text', value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

// GitHub Dark theme colors (direct hex values)
const tokenColors: Record<Token['type'], string> = {
  command: '#d2a8ff',   // Purple - functions/commands
  flag: '#ff7b72',      // Red/salmon - keywords/flags
  string: '#a5d6ff',    // Light blue - strings
  variable: '#79c0ff',  // Blue - constants/variables
  path: '#7ee787',      // Green - paths
  operator: '#ff7b72',  // Red - operators
  comment: '#8b949e',   // Gray - comments
  text: '',
};

interface HighlightedShellProps {
  children: React.ReactNode;
}

// Helper to extract text content from React children
function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return getTextContent((children as React.ReactElement).props.children);
  }
  return '';
}

export function HighlightedShell({ children }: HighlightedShellProps) {
  // Extract text content from children (handles arrays, nested elements, etc.)
  const text = getTextContent(children);

  if (!text) {
    return <>{children}</>;
  }

  const tokens = tokenizeShell(text);

  return (
    <>
      {tokens.map((token, i) => {
        if (token.type === 'text' || !tokenColors[token.type]) {
          return <span key={i}>{token.value}</span>;
        }

        const style: React.CSSProperties = {
          color: tokenColors[token.type],
        };

        if (token.type === 'comment') {
          style.fontStyle = 'italic';
        }

        return <span key={i} style={style}>{token.value}</span>;
      })}
    </>
  );
}

export default HighlightedShell;
