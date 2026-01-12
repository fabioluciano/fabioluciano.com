// =============================================================================
// Icon Component - Unified icon system using react-icons
// =============================================================================

import type { IconType } from 'react-icons';

// Feather Icons (Fi) - Primary UI icons
import {
  FiArrowRight,
  FiArrowLeft,
  FiArrowUp,
  FiArrowDown,
  FiChevronRight,
  FiChevronLeft,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
  FiSearch,
  FiHome,
  FiUser,
  FiUsers,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiTag,
  FiFolder,
  FiFile,
  FiFileText,
  FiEdit,
  FiTrash,
  FiPlus,
  FiMinus,
  FiCheck,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiHelpCircle,
  FiSettings,
  FiSun,
  FiMoon,
  FiGlobe,
  FiLink,
  FiExternalLink,
  FiShare2,
  FiBookmark,
  FiHeart,
  FiStar,
  FiEye,
  FiEyeOff,
  FiCopy,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiTerminal,
  FiCode,
  FiGitBranch,
  FiGitCommit,
  FiGitMerge,
  FiGitPullRequest,
  FiServer,
  FiDatabase,
  FiCloud,
  FiCpu,
  FiHardDrive,
  FiMonitor,
  FiSmartphone,
  FiWifi,
  FiLock,
  FiUnlock,
  FiShield,
  FiKey,
  FiZap,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiBarChart2,
  FiPieChart,
  FiLayers,
  FiGrid,
  FiList,
  FiLayout,
  FiBox,
  FiPackage,
  FiTool,
  FiAward,
  FiTarget,
  FiCompass,
  FiNavigation,
  FiSend,
  FiMessageSquare,
  FiMessageCircle,
  FiRss,
  FiBookOpen,
  FiBook,
  FiPenTool,
  FiFeather,
  FiCoffee,
  FiCommand,
  FiHash,
  FiAtSign,
  FiPercent,
  FiDollarSign,
} from 'react-icons/fi';

// Heroicons (Hi) - Additional UI icons
import {
  HiOutlineSparkles,
  HiOutlineRocketLaunch,
  HiOutlineLightBulb,
  HiOutlineFire,
  HiOutlineBolt,
  HiOutlineBeaker,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineNewspaper,
  HiOutlinePresentationChartBar,
  HiOutlineCog6Tooth,
  HiOutlineWrenchScrewdriver,
  HiOutlineCubeTransparent,
  HiOutlineCommandLine,
  HiOutlineClipboardDocumentList,
  HiOutlineTrophy,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
} from 'react-icons/hi2';

// Simple Icons (Si) - Technology/Brand icons
import {
  SiKubernetes,
  SiDocker,
  SiTerraform,
  SiAnsible,
  SiHelm,
  SiPrometheus,
  SiGrafana,
  SiJenkins,
  SiGithubactions,
  SiArgocd,
  SiAmazonwebservices,
  SiGooglecloud,
  SiMicrosoftazure,
  SiLinux,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPython,
  SiGo,
  SiRust,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiApachekafka,
  SiRabbitmq,
  SiNginx,
  SiVault,
  SiDatadog,
  SiNewrelic,
  SiLinkedin,
  SiTwitter,
  SiYoutube,
  SiMedium,
  SiDevdotto,
  SiHashnode,
} from 'react-icons/si';

// Box Icons (Bi) - Additional icons
import {
  BiNetworkChart,
  BiCodeBlock,
  BiWorld,
  BiRocket,
  BiData,
} from 'react-icons/bi';

// Tabler Icons (Tb) - Additional icons
import {
  TbBrandOpenSource,
  TbCloudComputing,
  TbApi,
  TbDeviceAnalytics,
  TbBuildingSkyscraper,
} from 'react-icons/tb';

// Icon Map - All available icons
const iconMap: Record<string, IconType> = {
  // Navigation & Arrows
  arrowRight: FiArrowRight,
  arrowLeft: FiArrowLeft,
  arrowUp: FiArrowUp,
  arrowDown: FiArrowDown,
  chevronRight: FiChevronRight,
  chevronLeft: FiChevronLeft,
  chevronDown: FiChevronDown,
  chevronUp: FiChevronUp,
  menu: FiMenu,
  close: FiX,
  x: FiX,

  // Actions
  search: FiSearch,
  edit: FiEdit,
  delete: FiTrash,
  trash: FiTrash,
  plus: FiPlus,
  minus: FiMinus,
  check: FiCheck,
  copy: FiCopy,
  download: FiDownload,
  upload: FiUpload,
  refresh: FiRefreshCw,
  share: FiShare2,
  bookmark: FiBookmark,
  heart: FiHeart,
  star: FiStar,
  send: FiSend,

  // Status & Feedback
  alert: FiAlertCircle,
  alertCircle: FiAlertCircle,
  warning: FiAlertTriangle,
  alertTriangle: FiAlertTriangle,
  info: FiInfo,
  help: FiHelpCircle,
  success: FiCheck,
  error: FiX,

  // UI Elements
  home: FiHome,
  user: FiUser,
  users: FiUsers,
  settings: FiSettings,
  sun: FiSun,
  moon: FiMoon,
  globe: FiGlobe,
  link: FiLink,
  externalLink: FiExternalLink,
  eye: FiEye,
  eyeOff: FiEyeOff,
  grid: FiGrid,
  list: FiList,
  layout: FiLayout,

  // Communication
  mail: FiMail,
  email: FiMail,
  phone: FiPhone,
  message: FiMessageSquare,
  chat: FiMessageCircle,
  comment: FiMessageCircle,

  // Content
  file: FiFile,
  fileText: FiFileText,
  document: FiFileText,
  folder: FiFolder,
  tag: FiTag,
  tags: FiTag,
  category: FiFolder,
  rss: FiRss,
  book: FiBook,
  bookOpen: FiBookOpen,
  news: HiOutlineNewspaper,
  newspaper: HiOutlineNewspaper,

  // Time & Date
  calendar: FiCalendar,
  clock: FiClock,
  time: FiClock,

  // Location
  mapPin: FiMapPin,
  location: FiMapPin,
  compass: FiCompass,
  navigation: FiNavigation,

  // Development
  code: FiCode,
  terminal: FiTerminal,
  command: FiCommand,
  commandLine: HiOutlineCommandLine,
  codeBlock: BiCodeBlock,
  api: TbApi,

  // Git
  git: SiGit,
  gitBranch: FiGitBranch,
  gitCommit: FiGitCommit,
  gitMerge: FiGitMerge,
  gitPullRequest: FiGitPullRequest,
  github: SiGithub,
  gitlab: SiGitlab,
  githubActions: SiGithubactions,

  // Infrastructure
  server: FiServer,
  database: FiDatabase,
  cloud: FiCloud,
  cloudComputing: TbCloudComputing,
  cpu: FiCpu,
  hardDrive: FiHardDrive,
  monitor: FiMonitor,
  smartphone: FiSmartphone,
  wifi: FiWifi,
  network: BiNetworkChart,

  // Security
  lock: FiLock,
  unlock: FiUnlock,
  shield: FiShield,
  key: FiKey,
  vault: SiVault,

  // Metrics & Charts
  activity: FiActivity,
  trendingUp: FiTrendingUp,
  trendingDown: FiTrendingDown,
  barChart: FiBarChart2,
  pieChart: FiPieChart,
  chartBar: HiOutlineChartBar,
  analytics: TbDeviceAnalytics,
  presentationChart: HiOutlinePresentationChartBar,

  // Platform & DevOps
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  docker: SiDocker,
  terraform: SiTerraform,
  ansible: SiAnsible,
  helm: SiHelm,
  argocd: SiArgocd,
  jenkins: SiJenkins,
  prometheus: SiPrometheus,
  grafana: SiGrafana,
  datadog: SiDatadog,
  newrelic: SiNewrelic,
  elasticsearch: SiElasticsearch,
  kafka: SiApachekafka,
  rabbitmq: SiRabbitmq,
  nginx: SiNginx,

  // Cloud Providers
  aws: SiAmazonwebservices,
  gcp: SiGooglecloud,
  googleCloud: SiGooglecloud,
  azure: SiMicrosoftazure,

  // Programming Languages
  python: SiPython,
  go: SiGo,
  golang: SiGo,
  rust: SiRust,
  typescript: SiTypescript,
  javascript: SiJavascript,
  react: SiReact,
  nodejs: SiNodedotjs,

  // Databases
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,

  // OS & Systems
  linux: SiLinux,

  // Decorative & Effects
  sparkles: HiOutlineSparkles,
  rocket: HiOutlineRocketLaunch,
  rocketLaunch: HiOutlineRocketLaunch,
  rocketSimple: BiRocket,
  lightbulb: HiOutlineLightBulb,
  idea: HiOutlineLightBulb,
  fire: HiOutlineFire,
  bolt: HiOutlineBolt,
  zap: FiZap,
  beaker: HiOutlineBeaker,
  experiment: HiOutlineBeaker,

  // Business & Work
  briefcase: HiOutlineBriefcase,
  work: HiOutlineBriefcase,
  building: HiOutlineBuildingOffice2,
  buildingOffice: HiOutlineBuildingOffice2,
  skyscraper: TbBuildingSkyscraper,
  trophy: HiOutlineTrophy,
  award: FiAward,
  target: FiTarget,
  userGroup: HiOutlineUserGroup,
  team: HiOutlineUserGroup,

  // Learning & Education
  academicCap: HiOutlineAcademicCap,
  graduation: HiOutlineAcademicCap,

  // Tools & Objects
  tool: FiTool,
  tools: HiOutlineWrenchScrewdriver,
  wrench: HiOutlineWrenchScrewdriver,
  cog: HiOutlineCog6Tooth,
  gear: HiOutlineCog6Tooth,
  box: FiBox,
  package: FiPackage,
  cube: HiOutlineCubeTransparent,
  layers: FiLayers,
  clipboard: HiOutlineClipboardDocumentList,
  data: BiData,

  // Writing & Content Creation
  pen: FiPenTool,
  penTool: FiPenTool,
  feather: FiFeather,
  coffee: FiCoffee,

  // Social
  linkedin: SiLinkedin,
  twitter: SiTwitter,
  youtube: SiYoutube,
  medium: SiMedium,
  devto: SiDevdotto,
  hashnode: SiHashnode,

  // Misc
  hash: FiHash,
  atSign: FiAtSign,
  at: FiAtSign,
  percent: FiPercent,
  dollar: FiDollarSign,
  money: FiDollarSign,
  world: BiWorld,
  openSource: TbBrandOpenSource,
};

// Default fallback icon
const DefaultIcon = FiBox;

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
}

export function Icon({ name, className = 'h-5 w-5', size }: IconProps) {
  const IconComponent = iconMap[name] || DefaultIcon;

  const sizeProps = size
    ? { size: typeof size === 'number' ? size : undefined }
    : {};

  return <IconComponent className={className} {...sizeProps} />;
}

// Export icon map for direct access if needed
export { iconMap };

// Export individual icon categories for selective imports
export const navigationIcons = {
  arrowRight: FiArrowRight,
  arrowLeft: FiArrowLeft,
  chevronRight: FiChevronRight,
  chevronLeft: FiChevronLeft,
  chevronDown: FiChevronDown,
  menu: FiMenu,
  close: FiX,
};

export const socialIcons = {
  github: SiGithub,
  linkedin: SiLinkedin,
  twitter: SiTwitter,
  mail: FiMail,
};

export const techIcons = {
  kubernetes: SiKubernetes,
  docker: SiDocker,
  terraform: SiTerraform,
  aws: SiAmazonwebservices,
  gcp: SiGooglecloud,
  prometheus: SiPrometheus,
  grafana: SiGrafana,
};
