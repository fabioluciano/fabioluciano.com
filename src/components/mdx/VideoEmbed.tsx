// =============================================================================
// VideoEmbed Component - Responsive video embeds for YouTube/Vimeo
// =============================================================================

import React from 'react';
import { HiPlay } from 'react-icons/hi2';

type VideoProvider = 'youtube' | 'vimeo';

interface VideoEmbedProps {
  /**
   * Video URL or ID
   */
  src: string;
  /**
   * Video title for accessibility
   */
  title?: string;
  /**
   * Video caption
   */
  caption?: string;
  /**
   * Aspect ratio (default: 16/9)
   */
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16';
  /**
   * Start time in seconds
   */
  start?: number;
  /**
   * Auto-detect provider or specify manually
   */
  provider?: VideoProvider;
}

function detectProvider(src: string): VideoProvider {
  if (src.includes('youtube.com') || src.includes('youtu.be')) {
    return 'youtube';
  }
  if (src.includes('vimeo.com')) {
    return 'vimeo';
  }
  return 'youtube'; // Default to YouTube
}

function extractYouTubeId(src: string): string {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = src.match(pattern);
    if (match) return match[1];
  }

  return src;
}

function extractVimeoId(src: string): string {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /^(\d+)$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = src.match(pattern);
    if (match) return match[1];
  }

  return src;
}

function getEmbedUrl(
  src: string,
  provider: VideoProvider,
  start?: number
): string {
  switch (provider) {
    case 'youtube': {
      const videoId = extractYouTubeId(src);
      const params = new URLSearchParams({
        rel: '0',
        modestbranding: '1',
      });
      if (start) params.set('start', start.toString());
      return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
    }
    case 'vimeo': {
      const videoId = extractVimeoId(src);
      const params = new URLSearchParams({
        byline: '0',
        portrait: '0',
      });
      if (start) params.set('t', `${start}s`);
      return `https://player.vimeo.com/video/${videoId}?${params}`;
    }
  }
}

const aspectRatioClasses: Record<string, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '9/16': 'aspect-[9/16]',
};

export function VideoEmbed({
  src,
  title = 'Video',
  caption,
  aspectRatio = '16/9',
  start,
  provider,
}: VideoEmbedProps) {
  const detectedProvider = provider || detectProvider(src);
  const embedUrl = getEmbedUrl(src, detectedProvider, start);

  return (
    <figure className="my-8 not-prose">
      <div
        className={`relative w-full ${aspectRatioClasses[aspectRatio]} bg-base-200 rounded-lg overflow-hidden shadow-lg`}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-base-content/60 mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Thumbnail version with play button (for lazy loading)
interface VideoThumbnailProps extends VideoEmbedProps {
  thumbnail?: string;
}

export function VideoThumbnail({
  src,
  title = 'Video',
  caption,
  aspectRatio = '16/9',
  start,
  provider,
  thumbnail,
}: VideoThumbnailProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const detectedProvider = provider || detectProvider(src);

  // Generate thumbnail URL if not provided
  const thumbnailUrl =
    thumbnail ||
    (detectedProvider === 'youtube'
      ? `https://img.youtube.com/vi/${extractYouTubeId(src)}/maxresdefault.jpg`
      : undefined);

  if (isPlaying) {
    return (
      <VideoEmbed
        src={src}
        title={title}
        caption={caption}
        aspectRatio={aspectRatio}
        start={start}
        provider={detectedProvider}
      />
    );
  }

  return (
    <figure className="my-8 not-prose">
      <button
        onClick={() => setIsPlaying(true)}
        className={`relative w-full ${aspectRatioClasses[aspectRatio]} bg-base-200 rounded-lg overflow-hidden shadow-lg group cursor-pointer`}
        aria-label={`Play video: ${title}`}
      >
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <HiPlay className="w-8 h-8 text-primary-content ml-1" />
          </div>
        </div>
      </button>
      {caption && (
        <figcaption className="text-center text-sm text-base-content/60 mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default VideoEmbed;
