# EatRite Design System

A luxury, elegant, and minimal design system inspired by the EatRite 3-leaf logo. This design system embodies premium health-focused branding with sophisticated dark themes and elegant gold accents.

## 🎨 Brand Identity

### Visual Tone
- **Luxury**: Premium feel with high-end aesthetics
- **Elegant**: Sophisticated and refined visual language
- **Minimal**: Clean spacing and purposeful design
- **Health-focused**: Nature-inspired with organic elements
- **Dark**: Modern dark theme with depth and contrast

### Core Principles
1. **Premium Quality**: Every element should feel expensive and well-crafted
2. **Health & Wellness**: Visual cues that promote nutrition and wellbeing
3. **Accessibility**: Inclusive design for all users
4. **Consistency**: Unified experience across all touchpoints
5. **Performance**: Optimized for all devices and connection speeds

## 🌈 Color System

### Primary Palette (Gold)
Our signature gold represents luxury, quality, and the golden standard of nutrition.

```css
--color-primary-50: #fdfbf7   /* Lightest gold tint */
--color-primary-100: #fbf5e8
--color-primary-200: #f6e6c4
--color-primary-300: #f0d090
--color-primary-400: #e8b85c
--color-primary-500: #d4a047  /* Main brand gold */
--color-primary-600: #c18d39
--color-primary-700: #a1742f
--color-primary-800: #85602c
--color-primary-900: #6f5028
--color-primary-950: #3f2c14  /* Darkest gold shade */
```

### Background System (Dark Theme)
Deep, rich blacks that create depth and sophistication.

```css
--color-bg-primary: #000000    /* Pure black */
--color-bg-secondary: #0a0a0a  /* Slightly elevated */
--color-bg-tertiary: #111111   /* Cards and surfaces */
--color-bg-elevated: #1a1a1a   /* Modal/drawer backgrounds */
--color-bg-overlay: rgba(0, 0, 0, 0.85) /* Modal overlays */
```

### Surface Colors
For cards, inputs, and interactive elements.

```css
--color-surface-primary: #1a1a1a
--color-surface-secondary: #262626
--color-surface-tertiary: #333333
--color-surface-border: #404040
--color-surface-divider: #2a2a2a
--color-surface-hover: #404040
```

### Text Hierarchy
Carefully crafted text colors for optimal readability and hierarchy.

```css
--color-text-primary: #ffffff     /* Main text */
--color-text-secondary: #e5e5e5   /* Secondary text */
--color-text-tertiary: #a3a3a3    /* Muted text */
--color-text-quaternary: #737373  /* Disabled text */
--color-text-inverse: #000000     /* Text on gold backgrounds */
--color-text-placeholder: #525252 /* Placeholder text */
```

### Semantic Colors
Status colors that maintain the luxury aesthetic.

```css
/* Success (uses gold theme) */
--color-success-main: #d4a047
--color-success-light: #f0d090
--color-success-dark: #85602c
--color-success-bg: #5c3b14

/* Warning (light gold) */
--color-warning-main: #f4c430
--color-warning-light: #f9d672
--color-warning-dark: #c18d39
--color-warning-bg: #7a4f1a

/* Error (elegant gray) */
--color-error-main: #737373
--color-error-light: #a3a3a3
--color-error-dark: #404040
--color-error-bg: #262626
```

## 📝 Typography

### Font Families
- **Serif**: Georgia, "Times New Roman", serif (for headings and luxury elements)
- **Sans-serif**: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif (for body text)
- **Monospace**: "JetBrains Mono", Consolas, Monaco, monospace (for code)

### Type Scale
Responsive typography that scales beautifully across devices.

```css
/* Font Sizes */
--font-size-xs: 0.75rem      /* 12px */
--font-size-sm: 0.875rem     /* 14px */
--font-size-base: 1rem       /* 16px */
--font-size-lg: 1.125rem     /* 18px */
--font-size-xl: 1.25rem      /* 20px */
--font-size-2xl: 1.5rem      /* 24px */
--font-size-3xl: 1.875rem    /* 30px */
--font-size-4xl: 2.25rem     /* 36px */
--font-size-5xl: 3rem        /* 48px */
--font-size-6xl: 3.75rem     /* 60px */
--font-size-7xl: 4.5rem      /* 72px */
```

### Heading Styles
```css
/* H1 - Hero titles */
font-family: serif
font-size: clamp(2.5rem, 5vw, 4rem)
font-weight: 700
background: linear-gradient(135deg, #f4d03f 0%, #d4a047 50%, #b8903d 100%)
-webkit-background-clip: text
-webkit-text-fill-color: transparent

/* H2 - Section titles */
font-family: serif
font-size: clamp(2rem, 4vw, 3rem)
color: #e8b85c

/* H3 - Subsection titles */
font-family: serif
font-size: clamp(1.5rem, 3vw, 2rem)
color: #d4a047
```

## 📐 Spacing System

Consistent spacing based on a 4px grid system.

```css
--spacing-0: 0rem         /* 0px */
--spacing-px: 1px
--spacing-0.5: 0.125rem   /* 2px */
--spacing-1: 0.25rem      /* 4px */
--spacing-2: 0.5rem       /* 8px */
--spacing-3: 0.75rem      /* 12px */
--spacing-4: 1rem         /* 16px */
--spacing-5: 1.25rem      /* 20px */
--spacing-6: 1.5rem       /* 24px */
--spacing-8: 2rem         /* 32px */
--spacing-10: 2.5rem      /* 40px */
--spacing-12: 3rem        /* 48px */
--spacing-16: 4rem        /* 64px */
--spacing-20: 5rem        /* 80px */
--spacing-24: 6rem        /* 96px */
```

## 🎭 Shadows & Effects

Luxury shadow system that adds depth and sophistication.

```css
/* Standard Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.7), 0 2px 4px -1px rgba(0, 0, 0, 0.6)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.7)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.7)

/* Gold Glow Effects */
--shadow-gold: 0 0 20px rgba(212, 160, 71, 0.3), 0 0 40px rgba(212, 160, 71, 0.1)
--shadow-gold-sm: 0 0 10px rgba(212, 160, 71, 0.4)
--shadow-gold-lg: 0 0 30px rgba(212, 160, 71, 0.4), 0 0 60px rgba(212, 160, 71, 0.15)
```

### Gradients
```css
--gradient-gold: linear-gradient(135deg, #f4d03f 0%, #d4a047 50%, #b8903d 100%)
--gradient-dark: linear-gradient(180deg, #000000 0%, #0a0a0a 100%)
--gradient-surface: linear-gradient(135deg, #1a1a1a 0%, #262626 100%)
```

## 🔧 Components

### Button Variants

#### Primary Button
The hero button with gold gradient and glow effects.
- Background: Gold gradient
- Color: Black text
- Shadow: Gold glow
- Hover: Lift effect with enhanced glow

#### Secondary Button
Outline style for secondary actions.
- Background: Transparent
- Border: 2px solid gold
- Color: Gold text
- Hover: Fill with gold background

#### Dark Button
For subtle actions on dark backgrounds.
- Background: Dark surface
- Border: 1px solid border color
- Color: White text
- Hover: Lighter dark surface

### Card Variants

#### Default Card
Standard card with hover effects.
- Background: Dark surface
- Border: Subtle border
- Shadow: Medium shadow
- Hover: Lift with enhanced shadow

#### Premium Card
Featured card with gold accents.
- Background: Surface gradient
- Border: Gold accent border
- Shadow: Enhanced with gold glow
- Top border: Gold gradient line

#### Interactive Card
Clickable cards with feedback.
- Background: Dark surface
- Cursor: Pointer
- Hover: Lift with gold border accent
- Active: Pressed state

### Input Components

#### Text Input
Standard form input with focus states.
- Background: Dark surface
- Border: Subtle border
- Focus: Gold border with glow
- Placeholder: Muted text color

#### Search Input
Specialized search with rounded corners.
- Border radius: Full (pill shape)
- Background: Secondary surface
- Icons: Left (search) and right (filter)

## 🎯 Icons

### Design Principles
- **Minimal**: Clean line icons with 1.5px stroke
- **Consistent**: Uniform stroke width and corner radius
- **Scalable**: SVG-based for crisp rendering at all sizes
- **Accessible**: Proper contrast and focus states

### Icon Sizes
```css
--icon-xs: 12px
--icon-sm: 16px
--icon-md: 24px   /* Default */
--icon-lg: 32px
--icon-xl: 48px
--icon-2xl: 64px
```

### Icon Colors
- **Gold**: Primary brand color for emphasis
- **White**: Standard icon color on dark backgrounds
- **Gray**: Muted icons for secondary information
- **Green**: Success states and health indicators

### Special Effects
- **Glow**: Gold drop-shadow for premium elements
- **Interactive**: Hover states with scale and glow
- **Loading**: Pulse animation for loading states

## 📱 Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px    /* Mobile landscape */
--breakpoint-md: 768px    /* Tablet portrait */
--breakpoint-lg: 1024px   /* Tablet landscape / Small desktop */
--breakpoint-xl: 1280px   /* Desktop */
--breakpoint-2xl: 1536px  /* Large desktop */
```

### Mobile-First Approach
- Design for mobile first, enhance for larger screens
- Touch-friendly interactive elements (minimum 44px)
- Readable text sizes without zooming
- Optimized images and assets

## ♿ Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements have sufficient contrast
- Focus states are clearly visible

### Keyboard Navigation
- All interactive elements are focusable
- Tab order is logical and intuitive
- Focus indicators are clearly visible

### Screen Readers
- Semantic HTML structure
- Proper ARIA labels and roles
- Descriptive alt text for images

### Motion & Animation
- Respects `prefers-reduced-motion`
- Essential animations only
- No auto-playing media

## 🚀 Implementation

### CSS Custom Properties
All design tokens are available as CSS custom properties for easy theming and consistency.

### React Components
Pre-built React components that implement the design system:
- `EatRiteButton` - Button component with all variants
- `EatRiteCard` - Card component with layout options
- `EatRiteInput` - Form input with validation states
- `EatRiteIcon` - Icon system with consistent styling

### Theme Provider
React context provider for accessing design tokens in JavaScript:
```tsx
import { EatRiteProvider, useEatRiteTheme } from './context/EatRiteThemeProvider';

// Wrap your app
<EatRiteProvider>
  <App />
</EatRiteProvider>

// Use in components
const theme = useEatRiteTheme();
```

## 📖 Usage Examples

### Hero Section
```tsx
<section className="eatrite-hero">
  <h1 className="eatrite-hero__title">EatRite</h1>
  <p className="eatrite-hero__subtitle">Luxury Nutrition, Delivered</p>
  <EatRiteButton variant="primary" size="lg">
    Start Your Journey
  </EatRiteButton>
</section>
```

### Meal Card
```tsx
<EatRiteCard variant="premium">
  <h4>Mediterranean Quinoa Bowl</h4>
  <p>Organic quinoa, roasted vegetables, tahini drizzle</p>
  <div className="nutrition-info">
    <span>450 cal</span>
    <span>18g protein</span>
  </div>
  <EatRiteButton size="sm">Add to Cart</EatRiteButton>
</EatRiteCard>
```

## 🔄 Maintenance

### Version Control
- All design tokens are version controlled
- Breaking changes are clearly documented
- Backward compatibility is maintained when possible

### Updates
- Regular reviews of color contrast and accessibility
- Performance monitoring of components
- User feedback integration

### Documentation
- Living style guide with examples
- Component API documentation
- Design decision records

---

This design system creates a cohesive, luxury experience that reflects the EatRite brand's commitment to premium nutrition and elegant simplicity. Every element is designed to feel expensive, healthy, and accessible to all users.