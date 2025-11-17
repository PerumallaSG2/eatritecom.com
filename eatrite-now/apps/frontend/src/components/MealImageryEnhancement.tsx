import React, { useState, useRef, useCallback } from 'react'
import {
  Eye,
  Download,
  RefreshCw,
  Image as ImageIcon,
  Zap,
  Palette,
  Settings,
} from 'lucide-react'

interface ImageEnhancementOptions {
  quality: 'low' | 'medium' | 'high' | 'ultra'
  format: 'webp' | 'jpg' | 'png'
  lazy: boolean
  blur: boolean
  responsive: boolean
  watermark: boolean
}

interface OptimizedImage {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  quality?: number
  className?: string
  fallbackSrc?: string
  placeholder?: string
  onLoad?: () => void
  onError?: () => void
}

interface MealImageryEnhancementProps {
  images: OptimizedImage[]
  enhancementOptions?: Partial<ImageEnhancementOptions>
  onImageClick?: (src: string) => void
}

const MealImageryEnhancement: React.FC<MealImageryEnhancementProps> = ({
  images,
  enhancementOptions = {},
  onImageClick,
}) => {
  const [options, setOptions] = useState<ImageEnhancementOptions>({
    quality: 'high',
    format: 'webp',
    lazy: true,
    blur: true,
    responsive: true,
    watermark: false,
    ...enhancementOptions,
  })

  const [selectedImage, setSelectedImage] = useState<OptimizedImage | null>(
    null
  )
  const [isEnhancing, setIsEnhancing] = useState<Record<string, boolean>>({})
  const [showSettings, setShowSettings] = useState(false)

  const enhanceImage = useCallback(async (image: OptimizedImage) => {
    setIsEnhancing(prev => ({ ...prev, [image.src]: true }))

    // Simulate image enhancement process
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsEnhancing(prev => ({ ...prev, [image.src]: false }))
  }, [])

  const getOptimizedImageUrl = useCallback(
    (src: string, width?: number): string => {
      // In a real implementation, this would call an image optimization service
      // like Cloudinary, ImageKit, or a custom service
      const baseUrl = src.replace('/api/placeholder/', '/api/optimized/')
      const params = new URLSearchParams()

      if (width) params.append('w', width.toString())
      params.append('q', getQualityValue(options.quality).toString())
      params.append('f', options.format)

      if (options.blur) params.append('blur', '10')
      if (options.watermark) params.append('wm', 'eatrite')

      return `${baseUrl}?${params.toString()}`
    },
    [options]
  )

  const getQualityValue = (quality: string): number => {
    switch (quality) {
      case 'low':
        return 60
      case 'medium':
        return 75
      case 'high':
        return 85
      case 'ultra':
        return 95
      default:
        return 85
    }
  }

  const generateSrcSet = useCallback(
    (src: string): string => {
      if (!options.responsive) return ''

      const sizes = [400, 600, 800, 1200]
      return sizes
        .map(size => `${getOptimizedImageUrl(src, size)} ${size}w`)
        .join(', ')
    },
    [getOptimizedImageUrl, options.responsive]
  )

  const downloadImage = async (image: OptimizedImage) => {
    try {
      const response = await fetch(getOptimizedImageUrl(image.src))
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `enhanced-${image.alt.replace(/\s+/g, '-').toLowerCase()}.${options.format}`
      a.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const EnhancedImage: React.FC<{ image: OptimizedImage }> = ({ image }) => {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    const handleLoad = () => {
      setLoaded(true)
      image.onLoad?.()
    }

    const handleError = () => {
      setError(true)
      image.onError?.()
    }

    return (
      <div className="relative group overflow-hidden rounded-xl bg-gray-100">
        {/* Loading State */}
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Blur Placeholder */}
        {options.blur && !loaded && (
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
            style={{
              backgroundImage: `url(${getOptimizedImageUrl(image.src, 50)})`,
            }}
          />
        )}

        {/* Main Image */}
        <img
          ref={imgRef}
          src={
            error
              ? image.fallbackSrc || '/api/placeholder/400/300'
              : getOptimizedImageUrl(image.src)
          }
          srcSet={error ? '' : generateSrcSet(image.src)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={image.alt}
          loading={options.lazy ? 'lazy' : 'eager'}
          className={`w-full h-full object-cover transition-all duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${image.className || ''}`}
          onLoad={handleLoad}
          onError={handleError}
          onClick={() => onImageClick?.(image.src)}
        />

        {/* Enhancement Controls */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedImage(image)}
              className="bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-lg shadow-lg transition-colors"
              title="View Full Size"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => enhanceImage(image)}
              disabled={isEnhancing[image.src]}
              className="bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] p-2 rounded-lg shadow-lg transition-colors disabled:opacity-50"
              title="Enhance Quality"
            >
              {isEnhancing[image.src] ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => downloadImage(image)}
              className="bg-[#0F2B1E] hover:bg-[#0A2418] text-white p-2 rounded-lg shadow-lg transition-colors"
              title="Download Enhanced"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quality Badge */}
        {loaded && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-full">
            {options.quality.toUpperCase()}
          </div>
        )}

        {/* Enhancement Progress */}
        {isEnhancing[image.src] && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Enhancing image quality...
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhancement Settings Panel */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl font-bold text-[#0F2B1E]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Image Enhancement Settings
          </h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 bg-[#D4B46A] hover:bg-[#B8935A] text-[#0F2B1E] font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            {showSettings ? 'Hide Settings' : 'Show Settings'}
          </button>
        </div>

        {showSettings && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quality Setting */}
            <div>
              <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                Image Quality
              </label>
              <select
                value={options.quality}
                onChange={e =>
                  setOptions(prev => ({
                    ...prev,
                    quality: e.target.value as any,
                  }))
                }
                className="w-full px-3 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
              >
                <option value="low">Low (60%)</option>
                <option value="medium">Medium (75%)</option>
                <option value="high">High (85%)</option>
                <option value="ultra">Ultra (95%)</option>
              </select>
            </div>

            {/* Format Setting */}
            <div>
              <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                Image Format
              </label>
              <select
                value={options.format}
                onChange={e =>
                  setOptions(prev => ({
                    ...prev,
                    format: e.target.value as any,
                  }))
                }
                className="w-full px-3 py-2 border border-[#D4B46A]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4B46A]/50"
              >
                <option value="webp">WebP (Recommended)</option>
                <option value="jpg">JPEG</option>
                <option value="png">PNG</option>
              </select>
            </div>

            {/* Enhancement Options */}
            <div>
              <label className="block text-sm font-medium text-[#0F2B1E] mb-2">
                Enhancement Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.lazy}
                    onChange={e =>
                      setOptions(prev => ({ ...prev, lazy: e.target.checked }))
                    }
                    className="rounded border-[#D4B46A]/30 text-[#D4B46A] focus:ring-[#D4B46A]/50"
                  />
                  <span className="text-sm text-gray-700">Lazy Loading</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.blur}
                    onChange={e =>
                      setOptions(prev => ({ ...prev, blur: e.target.checked }))
                    }
                    className="rounded border-[#D4B46A]/30 text-[#D4B46A] focus:ring-[#D4B46A]/50"
                  />
                  <span className="text-sm text-gray-700">
                    Blur Placeholder
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.responsive}
                    onChange={e =>
                      setOptions(prev => ({
                        ...prev,
                        responsive: e.target.checked,
                      }))
                    }
                    className="rounded border-[#D4B46A]/30 text-[#D4B46A] focus:ring-[#D4B46A]/50"
                  />
                  <span className="text-sm text-gray-700">
                    Responsive Images
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.watermark}
                    onChange={e =>
                      setOptions(prev => ({
                        ...prev,
                        watermark: e.target.checked,
                      }))
                    }
                    className="rounded border-[#D4B46A]/30 text-[#D4B46A] focus:ring-[#D4B46A]/50"
                  />
                  <span className="text-sm text-gray-700">Watermark</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#D4B46A]/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#D4B46A]">
              {images.length}
            </div>
            <div className="text-sm text-gray-600">Total Images</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#D4B46A]">
              {options.format.toUpperCase()}
            </div>
            <div className="text-sm text-gray-600">Format</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#D4B46A]">
              {getQualityValue(options.quality)}%
            </div>
            <div className="text-sm text-gray-600">Quality</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#D4B46A]">
              {Object.values(isEnhancing).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-600">Enhancing</div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-[#D4B46A]/20">
        <h3 className="text-lg font-bold text-[#0F2B1E] mb-4">
          Enhanced Meal Gallery
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={`${image.src}-${index}`} className="aspect-square">
              <EnhancedImage image={image} />
            </div>
          ))}
        </div>
      </div>

      {/* Full-Size Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-lg shadow-lg z-10"
            >
              ✕
            </button>
            <img
              src={getOptimizedImageUrl(selectedImage.src)}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
              <h4 className="font-bold">{selectedImage.alt}</h4>
              <div className="text-sm opacity-75">
                {options.format.toUpperCase()} • {options.quality} quality
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhancement Tips */}
      <div className="bg-gradient-to-r from-[#F5EEDC] to-white rounded-xl p-6 border border-[#D4B46A]/20">
        <div className="flex items-start gap-4">
          <Palette className="w-6 h-6 text-[#D4B46A] mt-1" />
          <div>
            <h4 className="font-bold text-[#0F2B1E] mb-2">
              Image Enhancement Tips
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use WebP format for better compression and quality</li>
              <li>• Enable lazy loading to improve page load times</li>
              <li>• High quality setting recommended for hero images</li>
              <li>
                • Responsive images adapt to different screen sizes
                automatically
              </li>
              <li>• Blur placeholders provide smooth loading experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Example usage component
export const MealGalleryShowcase: React.FC = () => {
  const sampleImages: OptimizedImage[] = [
    {
      src: '/api/placeholder/400/300',
      alt: 'Mediterranean Salmon Bowl',
      width: 400,
      height: 300,
    },
    {
      src: '/api/placeholder/400/300',
      alt: 'Grilled Chicken Quinoa',
      width: 400,
      height: 300,
    },
    {
      src: '/api/placeholder/400/300',
      alt: 'Plant-Based Buddha Bowl',
      width: 400,
      height: 300,
    },
    {
      src: '/api/placeholder/400/300',
      alt: 'Asian Fusion Stir-Fry',
      width: 400,
      height: 300,
    },
    {
      src: '/api/placeholder/400/300',
      alt: 'Italian Herb Chicken',
      width: 400,
      height: 300,
    },
    {
      src: '/api/placeholder/400/300',
      alt: 'Mexican-Inspired Bowl',
      width: 400,
      height: 300,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-bold text-[#0F2B1E] mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Meal Imagery Enhancement
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience our advanced image optimization system featuring
          high-quality compression, responsive loading, and real-time
          enhancement capabilities for stunning meal photography.
        </p>
      </div>

      <MealImageryEnhancement
        images={sampleImages}
        enhancementOptions={{
          quality: 'high',
          format: 'webp',
          lazy: true,
          blur: true,
          responsive: true,
          watermark: false,
        }}
        onImageClick={src => console.log('Image clicked:', src)}
      />
    </div>
  )
}

export default MealImageryEnhancement
