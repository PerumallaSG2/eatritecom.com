/**
 * EatRite Icon Library
 * Minimal gold icons inspired by the 3-leaf logo design
 * Consistent stroke width and luxury aesthetic
 */

import React from 'react'

interface IconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: 'gold' | 'white' | 'gray' | 'green'
}

const sizeMap = {
  sm: '16',
  md: '24',
  lg: '32',
  xl: '48',
}

const colorMap = {
  gold: '#d4a047',
  white: '#ffffff',
  gray: '#a3a3a3',
  green: '#10b981',
}

const IconBase: React.FC<
  IconProps & { children: React.ReactNode; viewBox?: string }
> = ({
  size = 'md',
  className = '',
  color = 'gold',
  children,
  viewBox = '0 0 24 24',
}) => {
  const iconSize = sizeMap[size]
  const iconColor = colorMap[color]

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox={viewBox}
      fill="none"
      stroke={iconColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`eatrite-icon ${className}`}
      style={{
        filter:
          color === 'gold'
            ? 'drop-shadow(0 0 4px rgba(212, 160, 71, 0.3))'
            : undefined,
      }}
    >
      {children}
    </svg>
  )
}

// === LEAF & NATURE ICONS ===
export const LeafIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M12 2C8 2 5 5 5 9c0 3 2 6 4 8l3 3 3-3c2-2 4-5 4-8 0-4-3-7-7-7z" />
    <path d="M12 9c-1.5 0-2.5-1-2.5-2.5S10.5 4 12 4s2.5 1 2.5 2.5S13.5 9 12 9z" />
  </IconBase>
)

export const ThreeLeavesIcon: React.FC<IconProps> = props => (
  <IconBase {...props} viewBox="0 0 32 32">
    {/* Center vertical leaf */}
    <ellipse
      cx="16"
      cy="12"
      rx="3"
      ry="8"
      fill="currentColor"
      stroke="currentColor"
    />
    {/* Left angled leaf */}
    <ellipse
      cx="10"
      cy="18"
      rx="2.5"
      ry="6"
      fill="currentColor"
      stroke="currentColor"
      transform="rotate(-35 10 18)"
    />
    {/* Right angled leaf */}
    <ellipse
      cx="22"
      cy="18"
      rx="2.5"
      ry="6"
      fill="currentColor"
      stroke="currentColor"
      transform="rotate(35 22 18)"
    />
  </IconBase>
)

export const PlantIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M12 2v20" />
    <path d="M7 7c3-3 9-3 12 0" />
    <path d="M5 12c3-3 9-3 12 0" />
    <path d="M12 22l-3-3" />
    <path d="M12 22l3-3" />
  </IconBase>
)

export const SeedIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M12 3c4 0 7 3 7 7 0 2-1 4-2 5l-5 6-5-6c-1-1-2-3-2-5 0-4 3-7 7-7z" />
    <circle cx="12" cy="8" r="2" />
  </IconBase>
)

// === FOOD & NUTRITION ICONS ===
export const AppleIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M12 3c-3 0-5 2-5 5 0 4 2 7 5 7s5-3 5-7c0-3-2-5-5-5z" />
    <path d="M12 3c0-1 1-2 2-2" />
    <path d="M14 5c1 0 2-1 2-2" />
  </IconBase>
)

export const CarrotIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M12 22V8c0-2 2-4 4-4s4 2 4 4v14" />
    <path d="M8 8l4-4" />
    <path d="M16 4l4 4" />
    <path d="M12 4l2 2" />
  </IconBase>
)

export const BowlIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M4 12a8 8 0 0 0 16 0" />
    <path d="M4 12h16" />
    <path d="M8 16c2 2 6 2 8 0" />
  </IconBase>
)

export const ChefHatIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M17 21v-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2" />
    <path d="M7 18V9a5 5 0 0 1 10 0v9" />
    <path d="M12 4a2 2 0 0 1 4 0" />
    <path d="M8 6a2 2 0 0 1 0-4" />
  </IconBase>
)

// === UI & INTERACTION ICONS ===
export const HeartIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </IconBase>
)

export const StarIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </IconBase>
)

export const CheckIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <polyline points="20,6 9,17 4,12" />
  </IconBase>
)

export const PlusIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconBase>
)

export const MinusIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </IconBase>
)

export const CartIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </IconBase>
)

export const UserIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </IconBase>
)

export const MenuIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </IconBase>
)

export const CloseIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </IconBase>
)

export const ArrowRightIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </IconBase>
)

export const ArrowLeftIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </IconBase>
)

// === DELIVERY & TIME ICONS ===
export const ClockIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </IconBase>
)

export const TruckIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16,8 20,8 23,11 23,16 16,16" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </IconBase>
)

export const MapPinIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </IconBase>
)

// === HEALTH & FITNESS ICONS ===
export const ActivityIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
  </IconBase>
)

export const WeightIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <path d="M6.5 6.5h11" />
    <path d="M6.5 17.5h11" />
    <path d="M6.5 6.5L5 17.5" />
    <path d="M17.5 6.5L19 17.5" />
    <circle cx="12" cy="12" r="2" />
  </IconBase>
)

export const TargetIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </IconBase>
)

// === SETTINGS & SYSTEM ICONS ===
export const SettingsIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m11-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
  </IconBase>
)

export const FilterIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </IconBase>
)

export const SearchIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </IconBase>
)

// Export all icons
export const EatRiteIcons = {
  // Nature & Brand
  Leaf: LeafIcon,
  ThreeLeaves: ThreeLeavesIcon,
  Plant: PlantIcon,
  Seed: SeedIcon,

  // Food & Nutrition
  Apple: AppleIcon,
  Carrot: CarrotIcon,
  Bowl: BowlIcon,
  ChefHat: ChefHatIcon,

  // UI & Interaction
  Heart: HeartIcon,
  Star: StarIcon,
  Check: CheckIcon,
  Plus: PlusIcon,
  Minus: MinusIcon,
  Cart: CartIcon,
  User: UserIcon,
  Menu: MenuIcon,
  Close: CloseIcon,
  ArrowRight: ArrowRightIcon,
  ArrowLeft: ArrowLeftIcon,

  // Delivery & Time
  Clock: ClockIcon,
  Truck: TruckIcon,
  MapPin: MapPinIcon,

  // Health & Fitness
  Activity: ActivityIcon,
  Weight: WeightIcon,
  Target: TargetIcon,

  // Settings & System
  Settings: SettingsIcon,
  Filter: FilterIcon,
  Search: SearchIcon,
}

export default EatRiteIcons
