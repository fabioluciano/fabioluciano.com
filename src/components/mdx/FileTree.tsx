// =============================================================================
// FileTree Component - Display directory structures
// =============================================================================

import React from 'react';
import { HiFolder, HiFolderOpen, HiDocument } from 'react-icons/hi2';

interface FileTreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeItem[];
  highlight?: boolean;
}

interface FileTreeProps {
  data: FileTreeItem[];
  title?: string;
}

function TreeItem({
  item,
  depth = 0,
}: {
  item: FileTreeItem;
  depth?: number;
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const hasChildren = item.type === 'folder' && item.children?.length;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-base-200 transition-colors cursor-pointer ${
          item.highlight ? 'bg-primary/10 text-primary' : ''
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {item.type === 'folder' ? (
          isOpen ? (
            <HiFolderOpen className="h-4 w-4 text-warning flex-shrink-0" />
          ) : (
            <HiFolder className="h-4 w-4 text-warning flex-shrink-0" />
          )
        ) : (
          <HiDocument className="h-4 w-4 text-base-content/60 flex-shrink-0" />
        )}
        <span
          className={`text-sm ${
            item.type === 'folder' ? 'font-medium' : ''
          }`}
        >
          {item.name}
        </span>
      </div>

      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child, index) => (
            <TreeItem key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ data, title }: FileTreeProps) {
  return (
    <div className="my-6 not-prose border border-base-300 rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-base-200 border-b border-base-300">
          <span className="text-sm font-medium text-base-content/70">
            {title}
          </span>
        </div>
      )}
      <div className="p-2 bg-base-100 font-mono text-sm max-h-96 overflow-auto">
        {data.map((item, index) => (
          <TreeItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FileTree;
