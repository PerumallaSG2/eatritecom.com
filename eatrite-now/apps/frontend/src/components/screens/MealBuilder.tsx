/**
 * EatRite Interactive Meal Builder
 * Premium meal customization with real-time nutrition tracking
 */

import React, { useState, useCallback } from 'react';
import { 
  EatRiteButton, 
  EatRiteCard, 
  EatRiteIcon, 
  EatRiteSectionHeader,
  EatRiteTabs,
  EatRiteInput,
  ProteinIcon,
  CarbIcon,
  FatIcon,
  LeafIcon,
  CartIcon,
  UserIcon
} from '../eatrite/EatRiteComponentLibrary';
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Ingredient {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'vegetable' | 'fat' | 'seasoning';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  price: number;
  servingSize: string;
  servingSizeGrams: number;
  image: string;
  allergens?: string[];
  isOrganic?: boolean;
  isPremium?: boolean;
}

interface SelectedIngredient extends Ingredient {
  quantity: number;
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  totalPrice: number;
}

interface MealBuilderState {
  selectedIngredients: SelectedIngredient[];
  mealName: string;
  servings: number;
  activeCategory: string;
  searchTerm: string;
  dietaryFilter: string;
  selectedFilters: string[];
}

interface NutritionGoals {
  calories: { min: number; max: number };
  protein: { min: number; max: number };
  carbs: { min: number; max: number };
  fat: { min: number; max: number };
}

// ============================================================================
// SAMPLE INGREDIENTS DATA
// ============================================================================

const sampleIngredients: Ingredient[] = [
  // Proteins
  {
    id: 'chicken-breast',
    name: 'Organic Chicken Breast',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    price: 8.99,
    servingSize: '100g',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isOrganic: true,
    isPremium: true,
  },
  {
    id: 'salmon-fillet',
    name: 'Atlantic Salmon Fillet',
    category: 'protein',
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 12,
    fiber: 0,
    price: 12.99,
    servingSize: '100g',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isPremium: true,
  },
  {
    id: 'tofu-extra-firm',
    name: 'Extra Firm Tofu',
    category: 'protein',
    calories: 70,
    protein: 8,
    carbs: 2,
    fat: 4,
    fiber: 1,
    price: 3.99,
    servingSize: '100g',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isOrganic: true,
  },
  // Carbohydrates
  {
    id: 'quinoa',
    name: 'Organic Quinoa',
    category: 'carb',
    calories: 368,
    protein: 14.1,
    carbs: 64.2,
    fat: 6.1,
    fiber: 7,
    price: 6.99,
    servingSize: '100g (dry)',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isOrganic: true,
  },
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'carb',
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1,
    fiber: 3,
    price: 2.99,
    servingSize: '100g',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isOrganic: true,
  },
  // Vegetables
  {
    id: 'broccoli',
    name: 'Fresh Broccoli',
    category: 'vegetable',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    price: 3.49,
    servingSize: '100g',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isOrganic: true,
  },
  {
    id: 'spinach',
    name: 'Baby Spinach',
    category: 'vegetable',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    price: 4.99,
    servingSize: '100g',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isOrganic: true,
  },
  // Fats
  {
    id: 'avocado',
    name: 'Fresh Avocado',
    category: 'fat',
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    fiber: 7,
    price: 2.49,
    servingSize: '100g',
    servingSizeGrams: 100,
    image: '/api/placeholder/150/150',
    isOrganic: true,
  },
  {
    id: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    category: 'fat',
    calories: 884,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    price: 8.99,
    servingSize: '1 tbsp (15ml)',
    servingSizeGrams: 15,
    image: '/api/placeholder/150/150',
    isPremium: true,
  },
];

// ============================================================================
// MAIN MEAL BUILDER COMPONENT
// ============================================================================

interface MealBuilderProps {
  onSaveMeal?: (meal: any) => void;
  onAddToCart?: (meal: any) => void;
  nutritionGoals?: NutritionGoals;
}

export const MealBuilder: React.FC<MealBuilderProps> = ({
  onSaveMeal,
  onAddToCart,
  nutritionGoals = {
    calories: { min: 400, max: 800 },
    protein: { min: 25, max: 50 },
    carbs: { min: 30, max: 80 },
    fat: { min: 10, max: 35 },
  }
}) => {
  const [state, setState] = useState<MealBuilderState>({
    selectedIngredients: [],
    mealName: '',
    servings: 1,
    activeCategory: 'all',
    searchTerm: '',
    dietaryFilter: 'all',
    selectedFilters: [],
  });

  // Calculate total nutrition for the meal
  const totalNutrition = state.selectedIngredients.reduce(
    (total, ingredient) => ({
      calories: total.calories + ingredient.totalNutrition.calories,
      protein: total.protein + ingredient.totalNutrition.protein,
      carbs: total.carbs + ingredient.totalNutrition.carbs,
      fat: total.fat + ingredient.totalNutrition.fat,
      fiber: total.fiber + ingredient.totalNutrition.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const totalPrice = state.selectedIngredients.reduce(
    (total, ingredient) => total + ingredient.totalPrice,
    0
  );

  // Add ingredient to meal
  const addIngredient = useCallback((ingredient: Ingredient) => {
    const quantity = 1;
    const multiplier = quantity * (ingredient.servingSizeGrams / 100);
    
    const selectedIngredient: SelectedIngredient = {
      ...ingredient,
      quantity,
      totalNutrition: {
        calories: Math.round(ingredient.calories * multiplier),
        protein: Math.round(ingredient.protein * multiplier * 10) / 10,
        carbs: Math.round(ingredient.carbs * multiplier * 10) / 10,
        fat: Math.round(ingredient.fat * multiplier * 10) / 10,
        fiber: Math.round(ingredient.fiber * multiplier * 10) / 10,
      },
      totalPrice: Math.round(ingredient.price * quantity * 100) / 100,
    };

    setState(prev => ({
      ...prev,
      selectedIngredients: [...prev.selectedIngredients, selectedIngredient],
    }));
  }, []);

  // Update ingredient quantity
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setState(prev => ({
        ...prev,
        selectedIngredients: prev.selectedIngredients.filter(ing => ing.id !== id),
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      selectedIngredients: prev.selectedIngredients.map(ingredient => {
        if (ingredient.id === id) {
          const multiplier = newQuantity * (ingredient.servingSizeGrams / 100);
          return {
            ...ingredient,
            quantity: newQuantity,
            totalNutrition: {
              calories: Math.round(ingredient.calories * multiplier),
              protein: Math.round(ingredient.protein * multiplier * 10) / 10,
              carbs: Math.round(ingredient.carbs * multiplier * 10) / 10,
              fat: Math.round(ingredient.fat * multiplier * 10) / 10,
              fiber: Math.round(ingredient.fiber * multiplier * 10) / 10,
            },
            totalPrice: Math.round(ingredient.price * newQuantity * 100) / 100,
          };
        }
        return ingredient;
      }),
    }));
  }, []);

  // Filter ingredients
  const filteredIngredients = sampleIngredients.filter(ingredient => {
    const matchesCategory = state.activeCategory === 'all' || ingredient.category === state.activeCategory;
    const matchesSearch = ingredient.name.toLowerCase().includes(state.searchTerm.toLowerCase());
    const matchesDietary = state.dietaryFilter === 'all' || 
      (state.dietaryFilter === 'organic' && ingredient.isOrganic) ||
      (state.dietaryFilter === 'premium' && ingredient.isPremium);
    
    return matchesCategory && matchesSearch && matchesDietary;
  });

  // Container styles
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    padding: EatRiteDesignTokens.spacing['2xl'],
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: EatRiteDesignTokens.spacing['2xl'],
  };

  // Header
  const headerStyles: React.CSSProperties = {
    gridColumn: '1 / -1',
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
    textAlign: 'center',
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.hero.size,
    fontWeight: EatRiteDesignTokens.typography.scale.hero.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.md,
  };

  return (
    <div style={containerStyles}>
      <div style={contentStyles}>
        {/* Header */}
        <header style={headerStyles}>
          <div style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
            <EatRiteIcon size="xl" color="gold" />
          </div>
          <h1 style={titleStyles}>Build Your Perfect Meal</h1>
          <p style={{
            color: EatRiteDesignTokens.colors.text.secondary,
            fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
          }}>
            Customize every ingredient to meet your nutrition goals
          </p>
        </header>

        {/* Main Builder Section */}
        <div>
          {/* Meal Name Input */}
          <EatRiteCard variant="luxury" padding="xl" style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
            <EatRiteInput
              label="Meal Name"
              placeholder="Enter a name for your custom meal"
              value={state.mealName}
              onChange={(value) => setState(prev => ({ ...prev, mealName: value }))}
            />
          </EatRiteCard>

          {/* Category Filter Tabs */}
          <div style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
            <EatRiteTabs
              items={[
                { id: 'all', label: 'All Ingredients', icon: <LeafIcon size="sm" color="inherit" /> },
                { id: 'protein', label: 'Protein', icon: <ProteinIcon size="sm" color="inherit" /> },
                { id: 'carb', label: 'Carbs', icon: <CarbIcon size="sm" color="inherit" /> },
                { id: 'vegetable', label: 'Vegetables', icon: <LeafIcon size="sm" color="inherit" /> },
                { id: 'fat', label: 'Healthy Fats', icon: <FatIcon size="sm" color="inherit" /> },
              ]}
              activeTab={state.activeCategory}
              onChange={(category) => setState(prev => ({ ...prev, activeCategory: category }))}
              variant="pills"
            />
          </div>

          {/* Search and Filters */}
          <EatRiteCard variant="luxury" padding="lg" style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: EatRiteDesignTokens.spacing.lg,
              alignItems: 'end',
            }}>
              <EatRiteInput
                label="Search Ingredients"
                placeholder="Search by name..."
                value={state.searchTerm}
                onChange={(value) => setState(prev => ({ ...prev, searchTerm: value }))}
              />
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: EatRiteDesignTokens.spacing.sm,
                  fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
                  fontWeight: 600,
                  color: EatRiteDesignTokens.colors.text.primary,
                }}>
                  Filter
                </label>
                <select
                  value={state.dietaryFilter}
                  onChange={(e) => setState(prev => ({ ...prev, dietaryFilter: e.target.value }))}
                  style={{
                    padding: EatRiteDesignTokens.spacing.md,
                    borderRadius: EatRiteDesignTokens.borderRadius.lg,
                    border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
                    backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
                    color: EatRiteDesignTokens.colors.text.primary,
                    fontSize: EatRiteDesignTokens.typography.scale.body.size,
                    minWidth: '150px',
                  }}
                >
                  <option value="all">All Items</option>
                  <option value="organic">Organic Only</option>
                  <option value="premium">Premium Only</option>
                </select>
              </div>

              <EatRiteButton variant="outline" size="md">
                Clear Filters
              </EatRiteButton>
            </div>
          </EatRiteCard>

          {/* Ingredients Grid */}
          <IngredientsGrid 
            ingredients={filteredIngredients}
            selectedIngredients={state.selectedIngredients}
            onAddIngredient={addIngredient}
          />
        </div>

        {/* Meal Summary Sidebar */}
        <div>
          <MealSummary
            selectedIngredients={state.selectedIngredients}
            totalNutrition={totalNutrition}
            totalPrice={totalPrice}
            nutritionGoals={nutritionGoals}
            mealName={state.mealName}
            onUpdateQuantity={updateQuantity}
            onSaveMeal={onSaveMeal}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INGREDIENTS GRID COMPONENT
// ============================================================================

interface IngredientsGridProps {
  ingredients: Ingredient[];
  selectedIngredients: SelectedIngredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
}

const IngredientsGrid: React.FC<IngredientsGridProps> = ({
  ingredients,
  selectedIngredients,
  onAddIngredient,
}) => {
  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: EatRiteDesignTokens.spacing.lg,
  };

  const isIngredientSelected = (ingredient: Ingredient) => {
    return selectedIngredients.some(selected => selected.id === ingredient.id);
  };

  return (
    <div style={gridStyles}>
      {ingredients.map((ingredient) => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
          isSelected={isIngredientSelected(ingredient)}
          onAdd={() => onAddIngredient(ingredient)}
        />
      ))}
    </div>
  );
};

// ============================================================================
// INGREDIENT CARD COMPONENT
// ============================================================================

interface IngredientCardProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onAdd: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  isSelected,
  onAdd,
}) => {
  const cardStyles: React.CSSProperties = {
    position: 'relative',
    opacity: isSelected ? 0.7 : 1,
    transform: isSelected ? 'scale(0.98)' : 'scale(1)',
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: EatRiteDesignTokens.borderRadius.lg,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const nameStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h5.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h5.weight,
    color: EatRiteDesignTokens.colors.text.primary,
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const servingStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.tertiary,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    marginBottom: EatRiteDesignTokens.spacing.md,
  };

  const nutritionGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: EatRiteDesignTokens.spacing.sm,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const nutritionItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.xs,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    color: EatRiteDesignTokens.colors.text.secondary,
  };

  const priceStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h5.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h5.weight,
    color: EatRiteDesignTokens.colors.primary.gold,
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const badgeStyles: React.CSSProperties = {
    position: 'absolute',
    top: EatRiteDesignTokens.spacing.md,
    right: EatRiteDesignTokens.spacing.md,
    padding: `${EatRiteDesignTokens.spacing.xs} ${EatRiteDesignTokens.spacing.sm}`,
    backgroundColor: EatRiteDesignTokens.colors.primary.gold,
    color: EatRiteDesignTokens.colors.surface.darkGreen,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    fontWeight: 700,
    borderRadius: EatRiteDesignTokens.borderRadius.full,
  };

  return (
    <EatRiteCard variant="luxury" padding="lg" hover style={cardStyles}>
      {(ingredient.isOrganic || ingredient.isPremium) && (
        <div style={badgeStyles}>
          {ingredient.isPremium ? 'Premium' : 'Organic'}
        </div>
      )}
      
      <img src={ingredient.image} alt={ingredient.name} style={imageStyles} />
      
      <h3 style={nameStyles}>{ingredient.name}</h3>
      <p style={servingStyles}>Per {ingredient.servingSize}</p>
      
      <div style={nutritionGridStyles}>
        <div style={nutritionItemStyles}>
          <span>🔥</span>
          <span>{ingredient.calories} cal</span>
        </div>
        <div style={nutritionItemStyles}>
          <ProteinIcon size="xs" color="gold" />
          <span>{ingredient.protein}g</span>
        </div>
        <div style={nutritionItemStyles}>
          <CarbIcon size="xs" color="gold" />
          <span>{ingredient.carbs}g</span>
        </div>
        <div style={nutritionItemStyles}>
          <FatIcon size="xs" color="gold" />
          <span>{ingredient.fat}g</span>
        </div>
      </div>
      
      <div style={priceStyles}>${ingredient.price}</div>
      
      <EatRiteButton
        variant={isSelected ? "outline" : "primary"}
        size="sm"
        onClick={onAdd}
        disabled={isSelected}
        style={{ width: '100%' }}
      >
        {isSelected ? '✓ Added' : '+ Add to Meal'}
      </EatRiteButton>
    </EatRiteCard>
  );
};

// ============================================================================
// MEAL SUMMARY COMPONENT
// ============================================================================

interface MealSummaryProps {
  selectedIngredients: SelectedIngredient[];
  totalNutrition: any;
  totalPrice: number;
  nutritionGoals: NutritionGoals;
  mealName: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onSaveMeal?: (meal: any) => void;
  onAddToCart?: (meal: any) => void;
}

const MealSummary: React.FC<MealSummaryProps> = ({
  selectedIngredients,
  totalNutrition,
  totalPrice,
  nutritionGoals,
  mealName,
  onUpdateQuantity,
  onSaveMeal,
  onAddToCart,
}) => {
  const stickyStyles: React.CSSProperties = {
    position: 'sticky',
    top: EatRiteDesignTokens.spacing['2xl'],
  };

  return (
    <div style={stickyStyles}>
      {/* Nutrition Summary */}
      <EatRiteCard variant="luxury" padding="xl" style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
        <EatRiteSectionHeader
          title="Nutrition Summary"
          subtitle="Track your meal's nutrition profile"
          icon={<ProteinIcon size="md" color="gold" />}
          centered
        />
        
        <NutritionProgressBars 
          nutrition={totalNutrition} 
          goals={nutritionGoals} 
        />
      </EatRiteCard>

      {/* Selected Ingredients */}
      <EatRiteCard variant="luxury" padding="xl" style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
        <EatRiteSectionHeader
          title="Your Meal"
          subtitle={`${selectedIngredients.length} ingredients selected`}
          icon={<LeafIcon size="md" color="gold" />}
        />
        
        <SelectedIngredientsList 
          ingredients={selectedIngredients}
          onUpdateQuantity={onUpdateQuantity}
        />
        
        <div style={{
          borderTop: `1px solid rgba(212, 180, 106, 0.2)`,
          paddingTop: EatRiteDesignTokens.spacing.lg,
          marginTop: EatRiteDesignTokens.spacing.lg,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: EatRiteDesignTokens.spacing.lg,
          }}>
            <span style={{
              fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
              fontSize: EatRiteDesignTokens.typography.scale.h4.size,
              fontWeight: EatRiteDesignTokens.typography.scale.h4.weight,
              color: EatRiteDesignTokens.colors.text.primary,
            }}>
              Total Price:
            </span>
            <span style={{
              fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
              fontSize: EatRiteDesignTokens.typography.scale.h3.size,
              fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
              color: EatRiteDesignTokens.colors.primary.gold,
            }}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          
          <div style={{
            display: 'grid',
            gap: EatRiteDesignTokens.spacing.md,
          }}>
            <EatRiteButton
              variant="primary"
              size="lg"
              icon={<CartIcon size="md" color="inherit" />}
              onClick={() => onAddToCart?.({ 
                name: mealName || 'Custom Meal',
                ingredients: selectedIngredients,
                nutrition: totalNutrition,
                price: totalPrice,
              })}
              disabled={selectedIngredients.length === 0}
              style={{ width: '100%' }}
            >
              Add to Cart
            </EatRiteButton>
            
            <EatRiteButton
              variant="outline"
              size="lg"
              icon={<UserIcon size="md" color="inherit" />}
              onClick={() => onSaveMeal?.({
                name: mealName || 'Custom Meal',
                ingredients: selectedIngredients,
                nutrition: totalNutrition,
                price: totalPrice,
              })}
              disabled={selectedIngredients.length === 0 || !mealName}
              style={{ width: '100%' }}
            >
              Save Meal Plan
            </EatRiteButton>
          </div>
        </div>
      </EatRiteCard>
    </div>
  );
};

// ============================================================================
// NUTRITION PROGRESS BARS
// ============================================================================

interface NutritionProgressBarsProps {
  nutrition: any;
  goals: NutritionGoals;
}

const NutritionProgressBars: React.FC<NutritionProgressBarsProps> = ({
  nutrition,
  goals,
}) => {
  const nutrients = [
    { 
      key: 'calories' as keyof typeof nutrition, 
      label: 'Calories', 
      unit: 'kcal', 
      color: EatRiteDesignTokens.colors.primary.gold,
      goal: goals.calories,
    },
    { 
      key: 'protein' as keyof typeof nutrition, 
      label: 'Protein', 
      unit: 'g', 
      color: EatRiteDesignTokens.colors.semantic.info,
      goal: goals.protein,
    },
    { 
      key: 'carbs' as keyof typeof nutrition, 
      label: 'Carbs', 
      unit: 'g', 
      color: EatRiteDesignTokens.colors.semantic.success,
      goal: goals.carbs,
    },
    { 
      key: 'fat' as keyof typeof nutrition, 
      label: 'Fat', 
      unit: 'g', 
      color: EatRiteDesignTokens.colors.semantic.warning,
      goal: goals.fat,
    },
  ];

  return (
    <div style={{ display: 'grid', gap: EatRiteDesignTokens.spacing.lg }}>
      {nutrients.map((nutrient) => {
        const current = nutrition[nutrient.key];
        const percentage = ((current - nutrient.goal.min) / (nutrient.goal.max - nutrient.goal.min)) * 100;
        const isInRange = current >= nutrient.goal.min && current <= nutrient.goal.max;
        
        return (
          <div key={nutrient.label}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: EatRiteDesignTokens.spacing.sm,
            }}>
              <span style={{
                fontSize: EatRiteDesignTokens.typography.scale.body.size,
                fontWeight: 600,
                color: EatRiteDesignTokens.colors.text.primary,
              }}>
                {nutrient.label}
              </span>
              <span style={{
                fontSize: EatRiteDesignTokens.typography.scale.body.size,
                color: isInRange ? EatRiteDesignTokens.colors.semantic.success : EatRiteDesignTokens.colors.text.secondary,
                fontWeight: 600,
              }}>
                {current.toFixed(1)} {nutrient.unit}
              </span>
            </div>
            
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(212, 180, 106, 0.2)',
              borderRadius: EatRiteDesignTokens.borderRadius.full,
              overflow: 'hidden',
            }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(Math.max(percentage, 0), 100)}%`,
                  background: isInRange 
                    ? `linear-gradient(90deg, ${nutrient.color}, ${EatRiteDesignTokens.colors.semantic.success})`
                    : `linear-gradient(90deg, ${nutrient.color}, ${EatRiteDesignTokens.colors.semantic.warning})`,
                  borderRadius: EatRiteDesignTokens.borderRadius.full,
                  transition: `width ${EatRiteDesignTokens.animations.duration.slow} ${EatRiteDesignTokens.animations.easing.easeOut}`,
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: EatRiteDesignTokens.spacing.xs,
            }}>
              <span style={{
                fontSize: EatRiteDesignTokens.typography.scale.caption.size,
                color: EatRiteDesignTokens.colors.text.tertiary,
              }}>
                {nutrient.goal.min} {nutrient.unit}
              </span>
              <span style={{
                fontSize: EatRiteDesignTokens.typography.scale.caption.size,
                color: EatRiteDesignTokens.colors.text.tertiary,
              }}>
                {nutrient.goal.max} {nutrient.unit}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// SELECTED INGREDIENTS LIST
// ============================================================================

interface SelectedIngredientsListProps {
  ingredients: SelectedIngredient[];
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const SelectedIngredientsList: React.FC<SelectedIngredientsListProps> = ({
  ingredients,
  onUpdateQuantity,
}) => {
  if (ingredients.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        color: EatRiteDesignTokens.colors.text.tertiary,
        fontSize: EatRiteDesignTokens.typography.scale.body.size,
        padding: EatRiteDesignTokens.spacing.xl,
      }}>
        No ingredients selected yet. Start building your meal!
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: EatRiteDesignTokens.spacing.lg }}>
      {ingredients.map((ingredient) => (
        <div
          key={ingredient.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: EatRiteDesignTokens.spacing.md,
            padding: EatRiteDesignTokens.spacing.md,
            backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
            borderRadius: EatRiteDesignTokens.borderRadius.lg,
            border: `1px solid rgba(212, 180, 106, 0.2)`,
          }}
        >
          <img
            src={ingredient.image}
            alt={ingredient.name}
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: EatRiteDesignTokens.borderRadius.md,
            }}
          />
          
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
              marginBottom: EatRiteDesignTokens.spacing.xs,
            }}>
              {ingredient.name}
            </div>
            <div style={{
              fontSize: EatRiteDesignTokens.typography.scale.caption.size,
              color: EatRiteDesignTokens.colors.text.tertiary,
            }}>
              ${ingredient.totalPrice.toFixed(2)} • {ingredient.totalNutrition.calories} cal
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: EatRiteDesignTokens.spacing.xs,
          }}>
            <button
              onClick={() => onUpdateQuantity(ingredient.id, ingredient.quantity - 1)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: EatRiteDesignTokens.borderRadius.md,
                border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
                backgroundColor: 'transparent',
                color: EatRiteDesignTokens.colors.primary.gold,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              −
            </button>
            
            <span style={{
              minWidth: '30px',
              textAlign: 'center',
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}>
              {ingredient.quantity}
            </span>
            
            <button
              onClick={() => onUpdateQuantity(ingredient.id, ingredient.quantity + 1)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: EatRiteDesignTokens.borderRadius.md,
                border: `1px solid ${EatRiteDesignTokens.colors.primary.gold}`,
                backgroundColor: EatRiteDesignTokens.colors.primary.gold,
                color: EatRiteDesignTokens.colors.surface.darkGreen,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealBuilder;