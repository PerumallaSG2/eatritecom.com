import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc,
  onLoad,
  onError,
  priority = false,
  quality = 80,
  placeholder = 'blur'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(priority ? src : null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(priority);

  // Generate optimized URL with WebP support
  const getOptimizedUrl = (originalUrl: string, targetWidth?: number, targetHeight?: number) => {
    if (originalUrl.includes('unsplash.com')) {
      let optimizedUrl = originalUrl;
      
      // Add WebP format if browser supports it
      const supportsWebP = () => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      };

      if (supportsWebP()) {
        optimizedUrl = optimizedUrl.replace('auto=format', 'auto=format&fm=webp');
      }

      // Add quality parameter
      if (quality !== 80) {
        optimizedUrl += `&q=${quality}`;
      }

      // Add responsive sizing
      if (targetWidth) {
        optimizedUrl += `&w=${targetWidth}`;
      }
      if (targetHeight) {
        optimizedUrl += `&h=${targetHeight}`;
      }

      return optimizedUrl;
    }
    
    return originalUrl;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setIsInView(true);
          setCurrentSrc(getOptimizedUrl(src, width, height));
          observer.unobserve(target.target);
        }
      },
      {
        rootMargin: '50px' // Start loading 50px before the image enters viewport
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority, src, width, height]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setIsError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      // Generate a placeholder based on alt text
      const placeholderUrl = generateFallbackImage(alt, width, height);
      setCurrentSrc(placeholderUrl);
    }
    onError?.();
  };

  // Generate fallback image
  const generateFallbackImage = (altText: string, w?: number, h?: number) => {
    const colors = ['206B19', 'F7931E', 'FFD23F', '06D6A0', '118AB2', 'EE6C4D'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const emoji = getEmojiForAlt(altText);
    const dimensions = `${w || 400}x${h || 300}`;
    
    return `https://via.placeholder.com/${dimensions}/${randomColor}/FFFFFF?text=${emoji}+${encodeURIComponent(altText.slice(0, 25))}`;
  };

  // Get appropriate emoji based on alt text
  const getEmojiForAlt = (altText: string) => {
    const lower = altText.toLowerCase();
    if (lower.includes('shrimp')) return '🦐';
    if (lower.includes('beef') || lower.includes('steak')) return '🥩';
    if (lower.includes('chicken')) return '🍗';
    if (lower.includes('salmon') || lower.includes('fish')) return '🐟';
    if (lower.includes('pork')) return '🥓';
    if (lower.includes('tofu') || lower.includes('vegan')) return '🥬';
    if (lower.includes('breakfast') || lower.includes('pancake')) return '🥞';
    if (lower.includes('shake') || lower.includes('protein')) return '🥤';
    if (lower.includes('juice')) return '🧃';
    return '🍽️';
  };

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = getOptimizedUrl(src, width, height);
    }
  }, [priority, src, width, height]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {!isLoaded && placeholder === 'blur' && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-2xl">
            {getEmojiForAlt(alt)}
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={currentSrc || undefined}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />

      {/* Loading Overlay */}
      {!isLoaded && isInView && !isError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
            <span className="text-xs">Loading...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-2xl mb-1">{getEmojiForAlt(alt)}</div>
            <div className="text-xs">{alt}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;