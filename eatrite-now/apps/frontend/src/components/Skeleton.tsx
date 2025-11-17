import React from 'react'

interface SkeletonProps {
  className?: string
  width?: string
  height?: string
  rounded?: boolean
  animate?: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  rounded = false,
  animate = true,
}) => {
  return (
    <div
      className={`bg-gray-200 ${rounded ? 'rounded-full' : 'rounded'} ${
        animate ? 'animate-pulse' : ''
      } ${className}`}
      style={{ width, height }}
    />
  )
}

interface MealCardSkeletonProps {
  count?: number
}

export const MealCardSkeleton: React.FC<MealCardSkeletonProps> = ({
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
          {/* Image Skeleton */}
          <div className="relative aspect-[4/3]">
            <Skeleton height="100%" className="rounded-none" />

            {/* Badge Skeletons */}
            <div className="absolute top-3 left-3">
              <Skeleton width="60px" height="24px" rounded />
            </div>
            <div className="absolute top-3 right-3">
              <Skeleton width="50px" height="24px" rounded />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-4 sm:p-5">
            {/* Title Skeleton */}
            <div className="mb-3">
              <Skeleton height="1.5rem" className="mb-2" />
              <Skeleton height="1rem" width="80%" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-1.5 mb-4">
              <Skeleton width="60px" height="24px" rounded />
              <Skeleton width="80px" height="24px" rounded />
              <Skeleton width="70px" height="24px" rounded />
            </div>

            {/* Nutrition Skeleton */}
            <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
              {[1, 2, 3].map(i => (
                <div key={i} className="text-center">
                  <Skeleton height="1rem" className="mb-1" />
                  <Skeleton height="0.75rem" width="60%" className="mx-auto" />
                </div>
              ))}
            </div>

            {/* Button Skeleton */}
            <Skeleton height="3rem" rounded />
          </div>
        </div>
      ))}
    </>
  )
}

interface SearchSkeletonProps {}

export const SearchSkeleton: React.FC<SearchSkeletonProps> = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar Skeleton */}
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton height="3rem" className="flex-1" />
          <Skeleton width="100px" height="3rem" />
        </div>

        {/* Quick Filters Skeleton */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} width="80px" height="2rem" rounded />
          ))}
        </div>

        {/* Results Count Skeleton */}
        <div className="flex justify-between">
          <Skeleton width="150px" height="1rem" />
          <Skeleton width="120px" height="1.5rem" />
        </div>
      </div>
    </div>
  )
}

interface HeroSkeletonProps {}

export const HeroSkeleton: React.FC<HeroSkeletonProps> = () => {
  return (
    <div className="bg-gray-200 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Skeleton height="3rem" className="mb-6 mx-auto max-w-2xl" />
        <Skeleton height="1.5rem" className="mb-4 mx-auto max-w-lg" />
        <Skeleton height="1rem" className="mb-8 mx-auto max-w-md" />
        <div className="flex justify-center space-x-4">
          <Skeleton width="150px" height="3rem" />
          <Skeleton width="120px" height="3rem" />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
