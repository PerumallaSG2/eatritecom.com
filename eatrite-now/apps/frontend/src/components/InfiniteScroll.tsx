import React, { useState, useEffect, useCallback, useRef } from 'react'
import { MealCardSkeleton } from './Skeleton'

interface InfiniteScrollProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  loadMore: () => Promise<void>
  hasMore: boolean
  loading: boolean
  itemsPerPage?: number
  threshold?: number
  className?: string
  skeletonCount?: number
}

function InfiniteScroll<T>({
  items,
  renderItem,
  loadMore,
  hasMore,
  loading,
  itemsPerPage = 6,
  threshold = 300,
  className = '',
  skeletonCount = 3,
}: InfiniteScrollProps<T>) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  // Initialize displayed items
  useEffect(() => {
    const initialItems = items.slice(0, itemsPerPage)
    setDisplayedItems(initialItems)
    setCurrentPage(1)
  }, [items, itemsPerPage])

  // Load more items from the current array
  const loadMoreItems = useCallback(() => {
    if (loadingRef.current) return

    loadingRef.current = true

    setTimeout(() => {
      const nextPage = currentPage + 1
      const startIndex = 0
      const endIndex = nextPage * itemsPerPage
      const newItems = items.slice(startIndex, endIndex)

      setDisplayedItems(newItems)
      setCurrentPage(nextPage)
      loadingRef.current = false

      // If we've shown all local items and there are more to fetch
      if (endIndex >= items.length && hasMore) {
        loadMore()
      }
    }, 300) // Small delay for better UX
  }, [currentPage, items, itemsPerPage, hasMore, loadMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0]
        if (
          target.isIntersecting &&
          !loading &&
          (displayedItems.length < items.length || hasMore)
        ) {
          loadMoreItems()
        }
      },
      {
        root: null,
        rootMargin: `${threshold}px`,
        threshold: 0.1,
      }
    )

    const currentSentinel = sentinelRef.current
    if (currentSentinel) {
      observer.observe(currentSentinel)
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
      }
    }
  }, [
    loadMoreItems,
    loading,
    displayedItems.length,
    items.length,
    hasMore,
    threshold,
  ])

  // Smooth scroll performance optimization
  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events for performance
      requestAnimationFrame(() => {
        // Any scroll-based calculations can go here
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={className}>
      {/* Rendered Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayedItems.map((item, index) => (
          <div
            key={`item-${index}`}
            className="transition-opacity duration-300"
          >
            {renderItem(item, index)}
          </div>
        ))}

        {/* Loading Skeletons */}
        {loading && <MealCardSkeleton count={skeletonCount} />}
      </div>

      {/* Load More Trigger (Intersection Observer Target) */}
      <div ref={sentinelRef} className="flex items-center justify-center py-8">
        {loading ? (
          <div className="flex items-center space-x-2 text-green-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <span className="text-sm font-medium">
              Loading more delicious meals...
            </span>
          </div>
        ) : displayedItems.length < items.length ? (
          <button
            onClick={loadMoreItems}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105 active:scale-95"
            style={{ fontFamily: 'source-sans-pro, sans-serif' }}
          >
            Load More Meals
          </button>
        ) : hasMore ? (
          <div className="text-gray-500 text-sm">
            Scroll down for more meals...
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            🎉 You've seen all our amazing meals!
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScroll
