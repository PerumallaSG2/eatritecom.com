/**
 * EatRite Home Dashboard
 * Premium dashboard with featured meals, supplements, and wellness stats
 */

import React, { useState } from 'react';
import { 
  EatRiteButton, 
  EatRiteCard, 
  EatRiteIcon, 
  EatRiteSectionHeader,
  EatRiteTabs,
  ProteinIcon,
  CarbIcon,
  FatIcon,
  LeafIcon,
  CalendarIcon,
  CartIcon,
  UserIcon
} from '../eatrite/EatRiteComponentLibrary';
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  image: string;
  rating: number;
  isPopular?: boolean;
  isFavorite?: boolean;
}

interface Supplement {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  benefits: string[];
}

interface NutritionStat {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

// ============================================================================
// SAMPLE DATA
// ============================================================================

const sampleMeals: Meal[] = [
  {
    id: '1',
    name: 'Grilled Salmon Bowl',
    description: 'Premium Atlantic salmon with quinoa, roasted vegetables, and avocado',
    calories: 520,
    protein: 42,
    carbs: 28,
    fat: 24,
    price: 24.99,
    image: '/api/placeholder/300/200',
    rating: 4.8,
    isPopular: true,
  },
  {
    id: '2',
    name: 'Organic Chicken Power Bowl',
    description: 'Free-range chicken breast with sweet potato and steamed broccoli',
    calories: 450,
    protein: 38,
    carbs: 32,
    fat: 18,
    price: 19.99,
    image: '/api/placeholder/300/200',
    rating: 4.6,
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Mediterranean Veggie Wrap',
    description: 'Hummus, grilled vegetables, feta cheese in whole wheat tortilla',
    calories: 380,
    protein: 16,
    carbs: 45,
    fat: 14,
    price: 16.99,
    image: '/api/placeholder/300/200',
    rating: 4.4,
  },
];

const sampleSupplements: Supplement[] = [
  {
    id: '1',
    name: 'Premium Whey Protein',
    category: 'Protein',
    price: 49.99,
    image: '/api/placeholder/200/200',
    rating: 4.9,
    benefits: ['Muscle Recovery', 'Lean Mass', 'Post-Workout'],
  },
  {
    id: '2',
    name: 'Omega-3 Complex',
    category: 'Heart Health',
    price: 32.99,
    image: '/api/placeholder/200/200',
    rating: 4.7,
    benefits: ['Heart Health', 'Brain Function', 'Anti-Inflammatory'],
  },
];

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

interface HomeDashboardProps {
  userName?: string;
  onMealClick?: (meal: Meal) => void;
  onSupplementClick?: (supplement: Supplement) => void;
  onViewAllMeals?: () => void;
  onViewAllSupplements?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  userName = 'Sarah',
  onMealClick,
  onSupplementClick,
  onViewAllMeals,
  onViewAllSupplements,
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample nutrition stats
  const nutritionStats: NutritionStat[] = [
    { label: 'Calories', current: 1650, target: 2000, unit: 'kcal', color: EatRiteDesignTokens.colors.primary.gold },
    { label: 'Protein', current: 85, target: 120, unit: 'g', color: EatRiteDesignTokens.colors.semantic.info },
    { label: 'Carbs', current: 145, target: 200, unit: 'g', color: EatRiteDesignTokens.colors.semantic.success },
    { label: 'Fats', current: 55, target: 65, unit: 'g', color: EatRiteDesignTokens.colors.semantic.warning },
  ];

  // Container styles
  const dashboardStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    padding: EatRiteDesignTokens.spacing['2xl'],
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
    textAlign: 'center',
  };

  const welcomeStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.hero.size,
    fontWeight: EatRiteDesignTokens.typography.scale.hero.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.md,
  };

  const dateStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
  };

  // Grid styles
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gap: EatRiteDesignTokens.spacing['2xl'],
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
  };

  const sectionsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: EatRiteDesignTokens.spacing['2xl'],
  };

  return (
    <div style={dashboardStyles}>
      <div style={contentStyles}>
        {/* Dashboard Header */}
        <header style={headerStyles}>
          <div style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
            <EatRiteIcon size="xl" color="gold" />
          </div>
          <h1 style={welcomeStyles}>Welcome back, {userName}!</h1>
          <p style={dateStyles}>
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </header>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: EatRiteDesignTokens.spacing['3xl'] }}>
          <EatRiteTabs
            items={[
              { id: 'overview', label: 'Overview', icon: <UserIcon size="sm" color="inherit" /> },
              { id: 'meals', label: 'Meals', icon: <LeafIcon size="sm" color="inherit" /> },
              { id: 'nutrition', label: 'Nutrition', icon: <ProteinIcon size="sm" color="inherit" /> },
              { id: 'progress', label: 'Progress', icon: <CalendarIcon size="sm" color="inherit" /> },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />
        </div>

        <div style={gridStyles}>
          {/* Quick Stats Overview */}
          <QuickStatsSection nutritionStats={nutritionStats} />
          
          <div style={sectionsGridStyles}>
            {/* Featured Meals Section */}
            <FeaturedMealsSection 
              meals={sampleMeals} 
              onMealClick={onMealClick}
              onViewAll={onViewAllMeals}
            />
            
            {/* Supplements Section */}
            <SupplementsSection 
              supplements={sampleSupplements}
              onSupplementClick={onSupplementClick}
              onViewAll={onViewAllSupplements}
            />
          </div>

          {/* Today's Recommendations */}
          <RecommendationsSection />
          
          {/* Quick Actions */}
          <QuickActionsSection />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// QUICK STATS SECTION
// ============================================================================

interface QuickStatsSectionProps {
  nutritionStats: NutritionStat[];
}

const QuickStatsSection: React.FC<QuickStatsSectionProps> = ({ nutritionStats }) => {
  const sectionStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const statsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: EatRiteDesignTokens.spacing.xl,
  };

  const statCardStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: EatRiteDesignTokens.spacing.xl,
  };

  const statValueStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h3.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
    color: EatRiteDesignTokens.colors.primary.gold,
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const statLabelStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    marginBottom: EatRiteDesignTokens.spacing.md,
  };

  const progressBarStyles: React.CSSProperties = {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(212, 180, 106, 0.2)',
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    overflow: 'hidden',
  };

  const getProgressFillStyles = (current: number, target: number, color: string): React.CSSProperties => ({
    height: '100%',
    background: `linear-gradient(90deg, ${color}, ${EatRiteDesignTokens.colors.primary.gold})`,
    width: `${Math.min((current / target) * 100, 100)}%`,
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    transition: `width ${EatRiteDesignTokens.animations.duration.slow} ${EatRiteDesignTokens.animations.easing.easeOut}`,
  });

  return (
    <div style={sectionStyles}>
      <EatRiteSectionHeader
        title="Today's Nutrition"
        subtitle="Track your daily nutrition goals and progress"
        icon={<ProteinIcon size="lg" color="gold" />}
        centered
      />
      
      <div style={statsGridStyles}>
        {nutritionStats.map((stat) => (
          <EatRiteCard key={stat.label} variant="luxury" padding="lg" hover>
            <div style={statCardStyles}>
              <div style={statValueStyles}>
                {stat.current} / {stat.target} {stat.unit}
              </div>
              <div style={statLabelStyles}>{stat.label}</div>
              <div style={progressBarStyles}>
                <div style={getProgressFillStyles(stat.current, stat.target, stat.color)} />
              </div>
            </div>
          </EatRiteCard>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// FEATURED MEALS SECTION
// ============================================================================

interface FeaturedMealsSectionProps {
  meals: Meal[];
  onMealClick?: (meal: Meal) => void;
  onViewAll?: () => void;
}

const FeaturedMealsSection: React.FC<FeaturedMealsSectionProps> = ({ 
  meals, 
  onMealClick, 
  onViewAll 
}) => {
  const sectionStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const mealsGridStyles: React.CSSProperties = {
    display: 'grid',
    gap: EatRiteDesignTokens.spacing.xl,
  };

  const mealCardStyles: React.CSSProperties = {
    cursor: 'pointer',
  };

  const mealImageStyles: React.CSSProperties = {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: EatRiteDesignTokens.borderRadius.lg,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const mealTitleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h4.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h4.weight,
    color: EatRiteDesignTokens.colors.text.primary,
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const mealDescStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    lineHeight: EatRiteDesignTokens.typography.scale.bodySmall.lineHeight,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const macrosStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const macroStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.xs,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    color: EatRiteDesignTokens.colors.text.tertiary,
  };

  const priceStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h4.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h4.weight,
    color: EatRiteDesignTokens.colors.primary.gold,
    textAlign: 'right',
  };

  return (
    <EatRiteCard variant="luxury" padding="xl" style={sectionStyles}>
      <EatRiteSectionHeader
        title="Featured Meals"
        subtitle="Curated selections for your wellness goals"
        icon={<LeafIcon size="md" color="gold" />}
        action={
          <EatRiteButton variant="outline" size="sm" onClick={onViewAll}>
            View All
          </EatRiteButton>
        }
      />
      
      <div style={mealsGridStyles}>
        {meals.slice(0, 3).map((meal) => (
          <div
            key={meal.id}
            style={mealCardStyles}
            onClick={() => onMealClick?.(meal)}
          >
            <img 
              src={meal.image} 
              alt={meal.name}
              style={mealImageStyles}
            />
            <h3 style={mealTitleStyles}>{meal.name}</h3>
            <p style={mealDescStyles}>{meal.description}</p>
            
            <div style={macrosStyles}>
              <div style={macroStyles}>
                <ProteinIcon size="xs" color="gold" />
                <span>{meal.protein}g</span>
              </div>
              <div style={macroStyles}>
                <CarbIcon size="xs" color="gold" />
                <span>{meal.carbs}g</span>
              </div>
              <div style={macroStyles}>
                <FatIcon size="xs" color="gold" />
                <span>{meal.fat}g</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: EatRiteDesignTokens.colors.text.tertiary, fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size }}>
                {meal.calories} calories
              </span>
              <span style={priceStyles}>${meal.price}</span>
            </div>
          </div>
        ))}
      </div>
    </EatRiteCard>
  );
};

// ============================================================================
// SUPPLEMENTS SECTION
// ============================================================================

interface SupplementsSectionProps {
  supplements: Supplement[];
  onSupplementClick?: (supplement: Supplement) => void;
  onViewAll?: () => void;
}

const SupplementsSection: React.FC<SupplementsSectionProps> = ({ 
  supplements, 
  onSupplementClick, 
  onViewAll 
}) => {
  const sectionStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const supplementsGridStyles: React.CSSProperties = {
    display: 'grid',
    gap: EatRiteDesignTokens.spacing.xl,
  };

  return (
    <EatRiteCard variant="luxury" padding="xl" style={sectionStyles}>
      <EatRiteSectionHeader
        title="Premium Supplements"
        subtitle="Enhance your nutrition with quality supplements"
        icon={<ProteinIcon size="md" color="gold" />}
        action={
          <EatRiteButton variant="outline" size="sm" onClick={onViewAll}>
            View All
          </EatRiteButton>
        }
      />
      
      <div style={supplementsGridStyles}>
        {supplements.map((supplement) => (
          <div
            key={supplement.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onSupplementClick?.(supplement)}
          >
            <img 
              src={supplement.image} 
              alt={supplement.name}
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'cover',
                borderRadius: EatRiteDesignTokens.borderRadius.lg,
                marginBottom: EatRiteDesignTokens.spacing.lg,
              }}
            />
            <h3 style={{
              fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
              fontSize: EatRiteDesignTokens.typography.scale.h5.size,
              fontWeight: EatRiteDesignTokens.typography.scale.h5.weight,
              color: EatRiteDesignTokens.colors.text.primary,
              marginBottom: EatRiteDesignTokens.spacing.sm,
            }}>
              {supplement.name}
            </h3>
            <p style={{
              color: EatRiteDesignTokens.colors.text.tertiary,
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              marginBottom: EatRiteDesignTokens.spacing.md,
            }}>
              {supplement.category}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
                fontSize: EatRiteDesignTokens.typography.scale.h5.size,
                fontWeight: EatRiteDesignTokens.typography.scale.h5.weight,
                color: EatRiteDesignTokens.colors.primary.gold,
              }}>
                ${supplement.price}
              </span>
              <EatRiteButton variant="outline" size="sm">
                Add to Cart
              </EatRiteButton>
            </div>
          </div>
        ))}
      </div>
    </EatRiteCard>
  );
};

// ============================================================================
// RECOMMENDATIONS SECTION
// ============================================================================

const RecommendationsSection: React.FC = () => {
  const recommendations = [
    { 
      title: 'Increase Protein Intake', 
      description: 'Add 15g more protein to reach your daily goal',
      action: 'View Protein-Rich Meals',
      icon: <ProteinIcon size="md" color="gold" />
    },
    { 
      title: 'Stay Hydrated', 
      description: 'Drink 2 more glasses of water today',
      action: 'Set Reminder',
      icon: <LeafIcon size="md" color="gold" />
    },
  ];

  return (
    <EatRiteCard variant="luxury" padding="xl">
      <EatRiteSectionHeader
        title="Today's Recommendations"
        subtitle="Personalized suggestions to optimize your nutrition"
        icon={<UserIcon size="md" color="gold" />}
      />
      
      <div style={{ 
        display: 'grid', 
        gap: EatRiteDesignTokens.spacing.lg,
      }}>
        {recommendations.map((rec, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: EatRiteDesignTokens.spacing.lg,
              padding: EatRiteDesignTokens.spacing.lg,
              backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
              borderRadius: EatRiteDesignTokens.borderRadius.lg,
              border: `1px solid rgba(212, 180, 106, 0.2)`,
            }}
          >
            {rec.icon}
            <div style={{ flex: 1 }}>
              <h4 style={{
                fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
                fontSize: EatRiteDesignTokens.typography.scale.body.size,
                fontWeight: 600,
                color: EatRiteDesignTokens.colors.text.primary,
                marginBottom: EatRiteDesignTokens.spacing.xs,
              }}>
                {rec.title}
              </h4>
              <p style={{
                color: EatRiteDesignTokens.colors.text.secondary,
                fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              }}>
                {rec.description}
              </p>
            </div>
            <EatRiteButton variant="outline" size="sm">
              {rec.action}
            </EatRiteButton>
          </div>
        ))}
      </div>
    </EatRiteCard>
  );
};

// ============================================================================
// QUICK ACTIONS SECTION
// ============================================================================

const QuickActionsSection: React.FC = () => {
  const actions = [
    { label: 'Build New Meal Plan', icon: <CalendarIcon size="md" color="inherit" />, variant: 'primary' as const },
    { label: 'Track Today\'s Meals', icon: <LeafIcon size="md" color="inherit" />, variant: 'secondary' as const },
    { label: 'View Progress Report', icon: <ProteinIcon size="md" color="inherit" />, variant: 'outline' as const },
    { label: 'Browse Supplements', icon: <CartIcon size="md" color="inherit" />, variant: 'outline' as const },
  ];

  return (
    <EatRiteCard variant="luxury" padding="xl">
      <EatRiteSectionHeader
        title="Quick Actions"
        subtitle="Jump to your most used features"
        icon={<UserIcon size="md" color="gold" />}
        centered
      />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: EatRiteDesignTokens.spacing.lg,
      }}>
        {actions.map((action, index) => (
          <EatRiteButton
            key={index}
            variant={action.variant}
            size="lg"
            icon={action.icon}
            iconPosition="left"
            style={{
              height: '60px',
              justifyContent: 'flex-start',
              padding: `${EatRiteDesignTokens.spacing.lg} ${EatRiteDesignTokens.spacing.xl}`,
            }}
          >
            {action.label}
          </EatRiteButton>
        ))}
      </div>
    </EatRiteCard>
  );
};

export default HomeDashboard;