// =============================================================================
// ImageModal Component - Clickable images that open in a modal
// =============================================================================

import React, { useState, useEffect, useCallback } from 'react';
import { HiXMark, HiArrowsPointingOut, HiMagnifyingGlassPlus, HiMagnifyingGlassMinus } from 'react-icons/hi2';

interface ImageModalProps {
  /**
   * Image source URL
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Optional caption below the image
   */
  caption?: string;
  /**
   * Additional CSS classes for the thumbnail
   */
  className?: string;
  /**
   * Whether to show full width in the modal
   */
  fullWidth?: boolean;
}

export function ImageModal({
  src,
  alt,
  caption,
  className = '',
  fullWidth = false,
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setIsOpen(true);
    setZoom(1);
    setIsLoading(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.5, 0.5));
  const handleResetZoom = () => setZoom(1);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleResetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  return (
    <>
      {/* Thumbnail */}
      <figure className={`my-6 not-prose ${className}`}>
        <button
          onClick={openModal}
          className="relative group cursor-zoom-in w-full rounded-lg overflow-hidden bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`Expandir imagem: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-base-100/90 rounded-full p-2 shadow-lg">
              <HiArrowsPointingOut className="w-5 h-5 text-base-content" />
            </div>
          </div>
        </button>
        {caption && (
          <figcaption className="text-center text-sm text-base-content/60 mt-3">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
              aria-label="Diminuir zoom"
              disabled={zoom <= 0.5}
            >
              <HiMagnifyingGlassMinus className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-mono min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
              aria-label="Aumentar zoom"
              disabled={zoom >= 3}
            >
              <HiMagnifyingGlassPlus className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <button
              onClick={closeModal}
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
              aria-label="Fechar"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Image container */}
          <div
            className={`relative overflow-auto max-h-[90vh] max-w-[90vw] ${
              fullWidth ? 'w-full' : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            )}
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 cursor-grab active:cursor-grabbing"
              style={{ transform: `scale(${zoom})` }}
              onLoad={() => setIsLoading(false)}
              draggable={false}
            />
          </div>

          {/* Caption in modal */}
          {caption && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <p className="text-white/80 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm max-w-lg text-center">
                {caption}
              </p>
            </div>
          )}

          {/* Keyboard hints */}
          <div className="absolute bottom-4 right-4 z-10 text-white/40 text-xs hidden md:flex gap-3">
            <span><kbd className="kbd kbd-xs">Esc</kbd> fechar</span>
            <span><kbd className="kbd kbd-xs">+</kbd>/<kbd className="kbd kbd-xs">-</kbd> zoom</span>
          </div>
        </div>
      )}
    </>
  );
}

// Gallery component for multiple images
interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  title?: string;
}

export function ImageGallery({ images, columns = 3, title }: ImageGalleryProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="my-8 not-prose">
      {title && (
        <h3 className="text-lg font-semibold text-base-content mb-4">{title}</h3>
      )}
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <ImageModal
            key={index}
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            className="my-0"
          />
        ))}
      </div>
    </div>
  );
}

// MDX Image override - replaces default <img> tags in markdown
// Use this in the MDX components mapping to enable click-to-zoom on all images
interface MDXImageProps {
  src?: string;
  alt?: string;
  title?: string;
  className?: string;
}

export function MDXImage({ src, alt, title, className }: MDXImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const openModal = () => {
    setIsOpen(true);
    setZoom(1);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.5, 3));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.5, 0.5));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!src) return null;

  return (
    <>
      <figure className={`my-6 not-prose ${className || ''}`}>
        <button
          type="button"
          onClick={openModal}
          className="relative group cursor-zoom-in w-full rounded-lg overflow-hidden bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-0 p-0"
        >
          <img
            src={src}
            alt={alt || ''}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-base-100/90 rounded-full p-2 shadow-lg">
              <HiArrowsPointingOut className="w-5 h-5 text-base-content" />
            </div>
          </div>
        </button>
        {title && (
          <figcaption className="text-center text-sm text-base-content/60 mt-3">
            {title}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(z - 0.5, 0.5))}
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
              disabled={zoom <= 0.5}
            >
              <HiMagnifyingGlassMinus className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-mono min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(z + 0.5, 3))}
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
              disabled={zoom >= 3}
            >
              <HiMagnifyingGlassPlus className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-white/20 mx-1" />
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-circle btn-sm bg-base-100/20 hover:bg-base-100/40 border-0 text-white"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative overflow-auto max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt || ''}
              className="max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          {title && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <p className="text-white/80 text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm max-w-lg text-center">
                {title}
              </p>
            </div>
          )}

          <div className="absolute bottom-4 right-4 z-10 text-white/40 text-xs hidden md:flex gap-3">
            <span><kbd className="kbd kbd-xs">Esc</kbd> fechar</span>
            <span><kbd className="kbd kbd-xs">+</kbd>/<kbd className="kbd kbd-xs">-</kbd> zoom</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ImageModal;
