/**
 * EatRite Supplements Catalog
 * Premium supplement browsing and purchasing experience
 */

import React, { useState, useMemo } from 'react'
import {
  EatRiteButton,
  EatRiteCard,
  EatRiteIcon,
  EatRiteTabs,
  EatRiteInput,
  ProteinIcon,
  CarbIcon,
  FatIcon,
  LeafIcon,
  CartIcon,
  UserIcon,
} from '../eatrite/EatRiteComponentLibrary'
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Supplement {
  id: string
  name: string
  brand: string
  category:
    | 'protein'
    | 'vitamins'
    | 'minerals'
    | 'performance'
    | 'wellness'
    | 'weight-management'
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  servingsPerContainer: number
  servingSize: string
  image: string
  images: string[]
  ingredients: string[]
  benefits: string[]
  certifications: string[]
  nutritionFacts: {
    [key: string]: string
  }
  usage: string
  warnings?: string[]
  isPremium: boolean
  isBestseller: boolean
  isOnSale: boolean
  tags: string[]
  allergens?: string[]
  thirdPartyTested: boolean
}

interface FilterState {
  category: string
  priceRange: [number, number]
  rating: number
  brands: string[]
  certifications: string[]
  searchTerm: string
  sortBy: 'name' | 'price' | 'rating' | 'popularity'
  sortOrder: 'asc' | 'desc'
}

// ============================================================================
// SAMPLE SUPPLEMENTS DATA
// ============================================================================

const sampleSupplements: Supplement[] = [
  {
    id: 'whey-protein-isolate',
    name: 'Premium Whey Protein Isolate',
    brand: 'EatRite Performance',
    category: 'protein',
    description: 'Ultra-pure whey protein isolate with 25g protein per serving',
    longDescription:
      'Our premium whey protein isolate is sourced from grass-fed cows and processed using advanced filtration technology to remove lactose and fat while preserving the protein structure. Perfect for post-workout recovery and muscle building.',
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 342,
    servingsPerContainer: 30,
    servingSize: '1 scoop (30g)',
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
    ingredients: [
      'Whey Protein Isolate',
      'Natural Flavors',
      'Stevia Extract',
      'Lecithin',
    ],
    benefits: [
      'Muscle Recovery',
      'Lean Mass Building',
      'Fast Absorption',
      'Low Lactose',
    ],
    certifications: ['Third-Party Tested', 'NSF Certified', 'Informed Sport'],
    nutritionFacts: {
      Calories: '110',
      Protein: '25g',
      Carbohydrates: '1g',
      Fat: '0.5g',
      BCAAs: '5.5g',
      Leucine: '2.7g',
    },
    usage:
      'Mix 1 scoop with 8-10oz of water or milk. Consume within 30 minutes post-workout.',
    warnings: [
      'Keep out of reach of children',
      'Consult physician before use if pregnant',
    ],
    isPremium: true,
    isBestseller: true,
    isOnSale: true,
    tags: ['Post-Workout', 'Muscle Building', 'Low Carb'],
    thirdPartyTested: true,
  },
  {
    id: 'omega-3-complex',
    name: 'Ultra Omega-3 Fish Oil Complex',
    brand: 'EatRite Wellness',
    category: 'wellness',
    description:
      'High-potency omega-3 with EPA and DHA for heart and brain health',
    longDescription:
      'Sourced from wild-caught fish in pristine waters, our omega-3 complex provides optimal ratios of EPA and DHA to support cardiovascular health, brain function, and anti-inflammatory response.',
    price: 39.99,
    rating: 4.7,
    reviewCount: 198,
    servingsPerContainer: 60,
    servingSize: '2 softgels',
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300'],
    ingredients: [
      'Fish Oil Concentrate',
      'Gelatin',
      'Glycerin',
      'Natural Vitamin E',
    ],
    benefits: [
      'Heart Health',
      'Brain Function',
      'Anti-Inflammatory',
      'Joint Support',
    ],
    certifications: ['Third-Party Tested', 'IFOS 5-Star'],
    nutritionFacts: {
      'Total Omega-3': '1000mg',
      EPA: '600mg',
      DHA: '400mg',
      'Other Omega-3': '100mg',
    },
    usage:
      'Take 2 softgels daily with meals, or as directed by healthcare professional.',
    warnings: ['Consult physician if taking blood thinners'],
    isPremium: true,
    isBestseller: false,
    isOnSale: false,
    tags: ['Heart Health', 'Brain Support', 'Anti-Inflammatory'],
    thirdPartyTested: true,
  },
  {
    id: 'multivitamin-premium',
    name: 'Complete Daily Multivitamin',
    brand: 'EatRite Essentials',
    category: 'vitamins',
    description: 'Comprehensive daily nutrition with 25+ vitamins and minerals',
    longDescription:
      'A scientifically formulated blend of essential vitamins, minerals, and antioxidants to support overall health and fill nutritional gaps in your diet. Made with premium, bioavailable forms of nutrients.',
    price: 29.99,
    rating: 4.5,
    reviewCount: 89,
    servingsPerContainer: 30,
    servingSize: '2 tablets',
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300'],
    ingredients: [
      'Vitamin Blend',
      'Mineral Complex',
      'Antioxidant Blend',
      'Digestive Enzymes',
    ],
    benefits: [
      'Energy Support',
      'Immune Health',
      'Antioxidant Protection',
      'Daily Nutrition',
    ],
    certifications: ['Third-Party Tested', 'USP Verified'],
    nutritionFacts: {
      'Vitamin A': '900mcg',
      'Vitamin C': '90mg',
      'Vitamin D': '20mcg',
      'B-Complex': 'Complete Profile',
      Iron: '18mg',
      Calcium: '200mg',
    },
    usage:
      'Take 2 tablets daily with breakfast, or as directed by healthcare professional.',
    isPremium: false,
    isBestseller: true,
    isOnSale: false,
    tags: ['Daily Health', 'Energy', 'Immune Support'],
    thirdPartyTested: true,
  },
  {
    id: 'pre-workout-energy',
    name: 'Natural Pre-Workout Energy',
    brand: 'EatRite Performance',
    category: 'performance',
    description:
      'Clean energy and focus blend with natural caffeine and adaptogens',
    longDescription:
      'Fuel your workouts with our clean, natural pre-workout formula featuring green tea caffeine, L-theanine, and adaptogenic herbs for sustained energy without the crash.',
    price: 44.99,
    rating: 4.6,
    reviewCount: 156,
    servingsPerContainer: 20,
    servingSize: '1 scoop (12g)',
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300'],
    ingredients: [
      'Green Tea Extract',
      'L-Theanine',
      'Rhodiola Root',
      'B-Vitamins',
      'Natural Flavors',
    ],
    benefits: ['Clean Energy', 'Mental Focus', 'Endurance Support', 'No Crash'],
    certifications: ['Third-Party Tested', 'Informed Choice'],
    nutritionFacts: {
      Caffeine: '150mg',
      'L-Theanine': '100mg',
      'Rhodiola Extract': '300mg',
      B6: '1.7mg',
      B12: '2.4mcg',
    },
    usage: 'Mix 1 scoop with 8oz water 15-30 minutes before workout.',
    warnings: [
      'Do not exceed recommended dose',
      'Not for use by individuals under 18',
    ],
    isPremium: true,
    isBestseller: false,
    isOnSale: false,
    tags: ['Pre-Workout', 'Energy', 'Focus', 'Natural'],
    thirdPartyTested: true,
  },
  {
    id: 'digestive-enzymes',
    name: 'Advanced Digestive Enzyme Complex',
    brand: 'EatRite Wellness',
    category: 'wellness',
    description:
      'Full-spectrum enzyme blend for optimal digestion and nutrient absorption',
    longDescription:
      'Support your digestive health with our comprehensive enzyme blend featuring protease, lipase, amylase, and specialized enzymes for breaking down proteins, fats, and carbohydrates.',
    price: 34.99,
    rating: 4.4,
    reviewCount: 73,
    servingsPerContainer: 60,
    servingSize: '1 capsule',
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300'],
    ingredients: [
      'Protease Blend',
      'Lipase',
      'Amylase',
      'Cellulase',
      'Lactase',
      'Bromelain',
    ],
    benefits: [
      'Digestive Support',
      'Nutrient Absorption',
      'Bloating Relief',
      'Gut Health',
    ],
    certifications: ['Third-Party Tested', 'Vegan Certified'],
    nutritionFacts: {
      Protease: '25,000 HUT',
      Lipase: '5,000 FIP',
      Amylase: '15,000 DU',
      Cellulase: '1,000 CU',
      Lactase: '3,000 ALU',
      Bromelain: '100 GDU',
    },
    usage:
      'Take 1 capsule with each meal, or as directed by healthcare professional.',
    isPremium: false,
    isBestseller: false,
    isOnSale: false,
    tags: ['Digestive Health', 'Gut Support', 'Enzyme Blend'],
    thirdPartyTested: true,
  },
  {
    id: 'collagen-peptides',
    name: 'Grass-Fed Collagen Peptides',
    brand: 'EatRite Beauty',
    category: 'wellness',
    description:
      'Premium collagen peptides for skin, hair, nails, and joint health',
    longDescription:
      'Sourced from grass-fed, pasture-raised cattle, our collagen peptides are hydrolyzed for optimal absorption and bioavailability. Support your beauty from within.',
    price: 42.99,
    rating: 4.7,
    reviewCount: 234,
    servingsPerContainer: 28,
    servingSize: '1 scoop (20g)',
    image: '/api/placeholder/300/300',
    images: ['/api/placeholder/300/300'],
    ingredients: ['Hydrolyzed Collagen Peptides (Types I & III)'],
    benefits: [
      'Skin Health',
      'Hair & Nails',
      'Joint Support',
      'Muscle Recovery',
    ],
    certifications: ['Third-Party Tested', 'Grass-Fed Certified'],
    nutritionFacts: {
      'Collagen Peptides': '20g',
      Protein: '18g',
      Glycine: '3.4g',
      Proline: '2.4g',
      Hydroxyproline: '2.1g',
    },
    usage:
      'Mix 1 scoop into smoothies, coffee, or your favorite beverage daily.',
    isPremium: true,
    isBestseller: true,
    isOnSale: false,
    tags: ['Beauty', 'Skin Health', 'Joint Support', 'Grass-Fed'],
    thirdPartyTested: true,
  },
]

// ============================================================================
// MAIN SUPPLEMENTS CATALOG COMPONENT
// ============================================================================

interface SupplementsCatalogProps {
  onAddToCart?: (supplement: Supplement, quantity: number) => void
  onViewDetails?: (supplement: Supplement) => void
  cartItems?: string[]
}

export const SupplementsCatalog: React.FC<SupplementsCatalogProps> = ({
  onAddToCart,
  onViewDetails,
  cartItems = [],
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: [0, 100],
    rating: 0,
    brands: [],
    certifications: [],
    searchTerm: '',
    sortBy: 'popularity',
    sortOrder: 'desc',
  })

  // Filter and sort supplements
  const filteredSupplements = useMemo(() => {
    let filtered = sampleSupplements.filter(supplement => {
      const matchesCategory =
        filters.category === 'all' || supplement.category === filters.category
      const matchesPrice =
        supplement.price >= filters.priceRange[0] &&
        supplement.price <= filters.priceRange[1]
      const matchesRating = supplement.rating >= filters.rating
      const matchesSearch =
        supplement.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        supplement.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(supplement.brand)

      return (
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        matchesSearch &&
        matchesBrand
      )
    })

    // Sort supplements
    filtered.sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'price':
          comparison = a.price - b.price
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'popularity':
          comparison = b.reviewCount - a.reviewCount
          break
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [filters])

  // Get unique brands and categories for filters
  const uniqueBrands = [...new Set(sampleSupplements.map(s => s.brand))]
  const categories = [
    {
      id: 'all',
      label: 'All Categories',
      icon: <LeafIcon size="sm" color="inherit" />,
    },
    {
      id: 'protein',
      label: 'Protein',
      icon: <ProteinIcon size="sm" color="inherit" />,
    },
    {
      id: 'vitamins',
      label: 'Vitamins',
      icon: <LeafIcon size="sm" color="inherit" />,
    },
    {
      id: 'minerals',
      label: 'Minerals',
      icon: <CarbIcon size="sm" color="inherit" />,
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: <FatIcon size="sm" color="inherit" />,
    },
    {
      id: 'wellness',
      label: 'Wellness',
      icon: <UserIcon size="sm" color="inherit" />,
    },
    {
      id: 'weight-management',
      label: 'Weight Management',
      icon: <LeafIcon size="sm" color="inherit" />,
    },
  ]

  // Container styles
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    padding: EatRiteDesignTokens.spacing['2xl'],
  }

  const contentStyles: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
  }

  // Header styles
  const headerStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
    textAlign: 'center',
  }

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.hero.size,
    fontWeight: EatRiteDesignTokens.typography.scale.hero.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.md,
  }

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        {/* Header */}
        <header style={headerStyles}>
          <div style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
            <EatRiteIcon size="xl" color="gold" />
          </div>
          <h1 style={titleStyles}>Premium Supplements</h1>
          <p
            style={{
              color: EatRiteDesignTokens.colors.text.secondary,
              fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
            }}
          >
            Science-backed nutrition to optimize your health and performance
          </p>
        </header>

        {/* Category Filter Tabs */}
        <div style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
          <EatRiteTabs
            items={categories}
            activeTab={filters.category}
            onChange={category => setFilters(prev => ({ ...prev, category }))}
            variant="pills"
          />
        </div>

        {/* Filters and Search Bar */}
        <FiltersSection
          filters={filters}
          onFiltersChange={setFilters}
          uniqueBrands={uniqueBrands}
        />

        {/* Results Summary */}
        <div
          style={{
            marginBottom: EatRiteDesignTokens.spacing.xl,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: EatRiteDesignTokens.colors.text.secondary,
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
            }}
          >
            Showing {filteredSupplements.length} supplements
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: EatRiteDesignTokens.spacing.md,
            }}
          >
            <label
              style={{
                fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
                color: EatRiteDesignTokens.colors.text.primary,
                fontWeight: 600,
              }}
            >
              Sort by:
            </label>
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={e => {
                const [sortBy, sortOrder] = e.target.value.split('-') as [
                  FilterState['sortBy'],
                  FilterState['sortOrder'],
                ]
                setFilters(prev => ({ ...prev, sortBy, sortOrder }))
              }}
              style={{
                padding: EatRiteDesignTokens.spacing.sm,
                borderRadius: EatRiteDesignTokens.borderRadius.md,
                border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}40`,
                backgroundColor:
                  EatRiteDesignTokens.colors.surface.darkGreenLight,
                color: EatRiteDesignTokens.colors.text.primary,
                fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              }}
            >
              <option value="popularity-desc">Most Popular</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Supplements Grid */}
        <SupplementsGrid
          supplements={filteredSupplements}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      </div>
    </div>
  )
}

// ============================================================================
// FILTERS SECTION COMPONENT
// ============================================================================

interface FiltersSectionProps {
  filters: FilterState
  onFiltersChange: React.Dispatch<React.SetStateAction<FilterState>>
  uniqueBrands: string[]
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  filters,
  onFiltersChange,
  uniqueBrands,
}) => {
  return (
    <EatRiteCard
      variant="luxury"
      padding="xl"
      style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: EatRiteDesignTokens.spacing.lg,
          alignItems: 'end',
        }}
      >
        {/* Search */}
        <EatRiteInput
          label="Search Supplements"
          placeholder="Search by name or keyword..."
          value={filters.searchTerm}
          onChange={value =>
            onFiltersChange(prev => ({ ...prev, searchTerm: value }))
          }
        />

        {/* Price Range */}
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: EatRiteDesignTokens.spacing.sm,
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}
          >
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.priceRange[1]}
            onChange={e =>
              onFiltersChange(prev => ({
                ...prev,
                priceRange: [prev.priceRange[0], parseInt(e.target.value)],
              }))
            }
            style={{
              width: '100%',
              accentColor: EatRiteDesignTokens.colors.primary.gold,
            }}
          />
        </div>

        {/* Minimum Rating */}
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: EatRiteDesignTokens.spacing.sm,
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}
          >
            Minimum Rating
          </label>
          <select
            value={filters.rating}
            onChange={e =>
              onFiltersChange(prev => ({
                ...prev,
                rating: parseFloat(e.target.value),
              }))
            }
            style={{
              width: '100%',
              padding: EatRiteDesignTokens.spacing.md,
              borderRadius: EatRiteDesignTokens.borderRadius.lg,
              border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
              backgroundColor:
                EatRiteDesignTokens.colors.surface.darkGreenLight,
              color: EatRiteDesignTokens.colors.text.primary,
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
            }}
          >
            <option value={0}>All Ratings</option>
            <option value={4}>4+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={4.8}>4.8+ Stars</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: EatRiteDesignTokens.spacing.sm,
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}
          >
            Brand
          </label>
          <select
            value={filters.brands[0] || ''}
            onChange={e =>
              onFiltersChange(prev => ({
                ...prev,
                brands: e.target.value ? [e.target.value] : [],
              }))
            }
            style={{
              width: '100%',
              padding: EatRiteDesignTokens.spacing.md,
              borderRadius: EatRiteDesignTokens.borderRadius.lg,
              border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
              backgroundColor:
                EatRiteDesignTokens.colors.surface.darkGreenLight,
              color: EatRiteDesignTokens.colors.text.primary,
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
            }}
          >
            <option value="">All Brands</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <EatRiteButton
          variant="outline"
          size="md"
          onClick={() =>
            onFiltersChange({
              category: 'all',
              priceRange: [0, 100],
              rating: 0,
              brands: [],
              certifications: [],
              searchTerm: '',
              sortBy: 'popularity',
              sortOrder: 'desc',
            })
          }
        >
          Clear Filters
        </EatRiteButton>
      </div>
    </EatRiteCard>
  )
}

// ============================================================================
// SUPPLEMENTS GRID COMPONENT
// ============================================================================

interface SupplementsGridProps {
  supplements: Supplement[]
  cartItems: string[]
  onAddToCart?: (supplement: Supplement, quantity: number) => void
  onViewDetails?: (supplement: Supplement) => void
}

const SupplementsGrid: React.FC<SupplementsGridProps> = ({
  supplements,
  cartItems,
  onAddToCart,
  onViewDetails,
}) => {
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: EatRiteDesignTokens.spacing.xl,
  }

  if (supplements.length === 0) {
    return (
      <EatRiteCard
        variant="luxury"
        padding="xl"
        style={{ textAlign: 'center' }}
      >
        <div
          style={{
            color: EatRiteDesignTokens.colors.text.secondary,
            fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
          }}
        >
          No supplements found matching your criteria. Try adjusting your
          filters.
        </div>
      </EatRiteCard>
    )
  }

  return (
    <div style={gridStyles}>
      {supplements.map(supplement => (
        <SupplementCard
          key={supplement.id}
          supplement={supplement}
          isInCart={cartItems.includes(supplement.id)}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}

// ============================================================================
// SUPPLEMENT CARD COMPONENT
// ============================================================================

interface SupplementCardProps {
  supplement: Supplement
  isInCart: boolean
  onAddToCart?: (supplement: Supplement, quantity: number) => void
  onViewDetails?: (supplement: Supplement) => void
}

const SupplementCard: React.FC<SupplementCardProps> = ({
  supplement,
  isInCart,
  onAddToCart,
  onViewDetails,
}) => {
  const [quantity, setQuantity] = useState(1)

  const cardStyles: React.CSSProperties = {
    position: 'relative',
    cursor: 'pointer',
    transition: `transform ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
  }

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: EatRiteDesignTokens.borderRadius.lg,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  }

  const badgesStyles: React.CSSProperties = {
    position: 'absolute',
    top: EatRiteDesignTokens.spacing.md,
    left: EatRiteDesignTokens.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: EatRiteDesignTokens.spacing.xs,
  }

  const badgeStyles: React.CSSProperties = {
    padding: `${EatRiteDesignTokens.spacing.xs} ${EatRiteDesignTokens.spacing.sm}`,
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    fontWeight: 700,
  }

  const priceStyles: React.CSSProperties = {
    position: 'absolute',
    top: EatRiteDesignTokens.spacing.md,
    right: EatRiteDesignTokens.spacing.md,
    backgroundColor: EatRiteDesignTokens.colors.primary.gold,
    color: EatRiteDesignTokens.colors.surface.darkGreen,
    padding: `${EatRiteDesignTokens.spacing.sm} ${EatRiteDesignTokens.spacing.md}`,
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    fontWeight: 700,
  }

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h5.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h5.weight,
    color: EatRiteDesignTokens.colors.text.primary,
    marginBottom: EatRiteDesignTokens.spacing.sm,
    lineHeight: EatRiteDesignTokens.typography.scale.h5.lineHeight,
  }

  const brandStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.primary.gold,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    fontWeight: 600,
    marginBottom: EatRiteDesignTokens.spacing.sm,
  }

  const descriptionStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    lineHeight: EatRiteDesignTokens.typography.scale.bodySmall.lineHeight,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  }

  const ratingStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.xs,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  }

  const benefitsStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: EatRiteDesignTokens.spacing.xs,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  }

  const benefitTagStyles: React.CSSProperties = {
    padding: `${EatRiteDesignTokens.spacing.xs} ${EatRiteDesignTokens.spacing.sm}`,
    backgroundColor: 'rgba(212, 180, 106, 0.1)',
    color: EatRiteDesignTokens.colors.primary.gold,
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    fontWeight: 600,
  }

  const actionsStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: EatRiteDesignTokens.spacing.md,
    alignItems: 'center',
  }

  return (
    <EatRiteCard
      variant="luxury"
      padding="lg"
      hover
      style={cardStyles}
      onClick={() => onViewDetails?.(supplement)}
    >
      {/* Badges */}
      <div style={badgesStyles}>
        {supplement.isBestseller && (
          <div
            style={{
              ...badgeStyles,
              backgroundColor: EatRiteDesignTokens.colors.semantic.success,
              color: EatRiteDesignTokens.colors.surface.offWhite,
            }}
          >
            Bestseller
          </div>
        )}
        {supplement.isOnSale && (
          <div
            style={{
              ...badgeStyles,
              backgroundColor: EatRiteDesignTokens.colors.semantic.error,
              color: EatRiteDesignTokens.colors.surface.offWhite,
            }}
          >
            Sale
          </div>
        )}
        {supplement.isPremium && (
          <div
            style={{
              ...badgeStyles,
              backgroundColor: EatRiteDesignTokens.colors.primary.gold,
              color: EatRiteDesignTokens.colors.surface.darkGreen,
            }}
          >
            Premium
          </div>
        )}
      </div>

      {/* Price */}
      <div style={priceStyles}>
        ${supplement.price}
        {supplement.originalPrice && (
          <span
            style={{
              textDecoration: 'line-through',
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              opacity: 0.7,
              marginLeft: EatRiteDesignTokens.spacing.xs,
            }}
          >
            ${supplement.originalPrice}
          </span>
        )}
      </div>

      <img src={supplement.image} alt={supplement.name} style={imageStyles} />

      <div style={brandStyles}>{supplement.brand}</div>
      <h3 style={titleStyles}>{supplement.name}</h3>
      <p style={descriptionStyles}>{supplement.description}</p>

      {/* Rating */}
      <div style={ratingStyles}>
        <span style={{ color: EatRiteDesignTokens.colors.primary.gold }}>
          {'★'.repeat(Math.floor(supplement.rating))}
          {'☆'.repeat(5 - Math.floor(supplement.rating))}
        </span>
        <span
          style={{
            color: EatRiteDesignTokens.colors.text.tertiary,
            fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
          }}
        >
          {supplement.rating} ({supplement.reviewCount} reviews)
        </span>
      </div>

      {/* Benefits Tags */}
      <div style={benefitsStyles}>
        {supplement.benefits.slice(0, 3).map((benefit, index) => (
          <span key={index} style={benefitTagStyles}>
            {benefit}
          </span>
        ))}
      </div>

      {/* Serving Info */}
      <div
        style={{
          color: EatRiteDesignTokens.colors.text.tertiary,
          fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
          marginBottom: EatRiteDesignTokens.spacing.lg,
        }}
      >
        {supplement.servingsPerContainer} servings • {supplement.servingSize}
      </div>

      {/* Actions */}
      <div style={actionsStyles} onClick={e => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: EatRiteDesignTokens.spacing.xs,
          }}
        >
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: EatRiteDesignTokens.borderRadius.md,
              border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
              backgroundColor: 'transparent',
              color: EatRiteDesignTokens.colors.primary.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            −
          </button>
          <span
            style={{
              minWidth: '30px',
              textAlign: 'center',
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: EatRiteDesignTokens.borderRadius.md,
              border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
              backgroundColor: EatRiteDesignTokens.colors.primary.gold,
              color: EatRiteDesignTokens.colors.surface.darkGreen,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            +
          </button>
        </div>

        <EatRiteButton
          variant={isInCart ? 'outline' : 'primary'}
          size="sm"
          icon={<CartIcon size="sm" color="inherit" />}
          onClick={() => onAddToCart?.(supplement, quantity)}
          disabled={isInCart}
          style={{ flex: 1 }}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </EatRiteButton>

        <EatRiteButton
          variant="outline"
          size="sm"
          onClick={() => onViewDetails?.(supplement)}
        >
          Details
        </EatRiteButton>
      </div>
    </EatRiteCard>
  )
}

export default SupplementsCatalog
