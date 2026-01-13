// =============================================================================
// MDX Components - Re-export all MDX components
// =============================================================================

export { Callout } from './Callout';
export { CodeTabs, CodeTab } from './CodeTabs';
export { FileTree } from './FileTree';
export {
  Terminal,
  Command,
  Output,
  // Backwards compatibility aliases
  MockupCode,
  CodeLine,
  CommandLine,
  OutputLine,
  HomeDirLine,
  NumberedLines,
  TerminalMockup,
  ShellSession,
} from './Terminal';
export { Steps, Step } from './Steps';
export { PlantUML, PlantUMLInline } from './PlantUML';
export { KeyboardShortcut, Kbd, ShortcutList } from './KeyboardShortcut';
export { Timeline, TimelineEvent } from './Timeline';
export { VideoEmbed, VideoThumbnail } from './VideoEmbed';
export { Accordion, AccordionItem, FAQ, FAQItem, Details, Collapse } from './Accordion';
export { ImageModal, ImageGallery, MDXImage } from './ImageModal';
export { LinkCard, LinkCardGrid, InlineLink } from './LinkCard';

// Re-export UI components that are useful in MDX
export { Badge } from '../ui/Badge';
