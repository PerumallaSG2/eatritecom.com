# EatRite Luxury Design System

**Elegant • Premium • Minimalist**

## Brand Philosophy
The EatRite design system embodies luxury, health, and sophistication. Inspired by the elegant 3-leaf logo, every element reflects premium quality with clean minimalism.

---

## 🎨 Color Palette

### Primary Colors
```
Gold Metallic (#D4A047)
├── Light Gold: #F4C430
├── Medium Gold: #D4A047 (Primary)
├── Dark Gold: #B8832D
└── Deep Gold: #96661F
```

### Background Colors
```
Pure Black (#000000)
├── Near Black: #0A0A0A
├── Charcoal: #171717
├── Dark Grey: #262626
└── Medium Grey: #404040
```

### Accent Colors (Optional)
```
Organic Green (#042F1A)
├── Forest Green: #087F4A
├── Dark Forest: #042F1A
└── Deep Forest: #021C0F
```

### Text Colors
```
Primary Text: #FFFFFF (Pure White)
Secondary Text: #E5E5E5 (Light Grey)
Tertiary Text: #A3A3A3 (Medium Grey)
Gold Text: #D4A047 (Brand Gold)
```

---

## 📝 Typography

### Font Families
- **Headings**: Georgia (Serif) - Luxury & Elegance
- **Body**: Inter (Sans-serif) - Modern & Clean
- **Code**: JetBrains Mono - Technical Precision

### Type Scale
```
Display:   3.75rem (60px) - Hero titles
H1:        3rem (48px) - Page titles
H2:        2.25rem (36px) - Section titles
H3:        1.875rem (30px) - Subsection titles
H4:        1.5rem (24px) - Card titles
H5:        1.25rem (20px) - Small titles
Body Large: 1.125rem (18px) - Emphasis text
Body:       1rem (16px) - Regular text
Small:      0.875rem (14px) - Captions
Tiny:       0.75rem (12px) - Labels
```

### Typography Styles
```css
/* Luxury Gold Gradient Headings */
.heading-luxury {
  background: linear-gradient(135deg, #F4C430 0%, #D4A047 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Georgia, serif;
  font-weight: 700;
}

/* Premium Body Text */
.body-premium {
  font-family: Inter, sans-serif;
  color: #E5E5E5;
  line-height: 1.6;
}
```

---

## 🔘 Component Styles

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #F4C430 0%, #D4A047 100%);
  color: #000000;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 300ms ease;
  box-shadow: 0 8px 32px rgba(212, 160, 71, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 48px rgba(212, 160, 71, 0.4);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #D4A047;
  border: 2px solid #D4A047;
  padding: 10px 22px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 300ms ease;
}

.btn-secondary:hover {
  background: #D4A047;
  color: #000000;
}
```

### Cards

#### Luxury Card
```css
.card-luxury {
  background: linear-gradient(145deg, #171717 0%, #000000 100%);
  border: 1px solid #404040;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  transition: all 300ms ease;
}

.card-luxury:hover {
  transform: translateY(-4px);
  border-color: #D4A047;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.9), 
              0 0 32px rgba(212, 160, 71, 0.2);
}
```

#### Premium Card
```css
.card-premium {
  background: #0A0A0A;
  border: 2px solid #D4A047;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 0 40px rgba(212, 160, 71, 0.2);
}
```

### Input Fields

```css
.input-luxury {
  background: #171717;
  border: 1px solid #404040;
  color: #FFFFFF;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  transition: all 200ms ease;
}

.input-luxury:focus {
  border-color: #D4A047;
  box-shadow: 0 0 0 3px rgba(212, 160, 71, 0.1);
  outline: none;
}

.input-luxury::placeholder {
  color: #737373;
}
```

---

## 🎯 Layout & Spacing

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
5xl: 128px
```

### Grid System
```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Grid */
.grid {
  display: grid;
  gap: 24px;
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## ✨ Animations & Effects

### Gold Glow Animation
```css
@keyframes goldGlow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(212, 160, 71, 0.3); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(212, 160, 71, 0.6); 
  }
}

.animate-glow {
  animation: goldGlow 2s infinite;
}
```

### Fade In Animation
```css
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

---

## 🧭 Navigation

### Luxury Navbar
```css
.navbar-luxury {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #404040;
  padding: 16px 0;
}

.nav-link {
  color: #A3A3A3;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 200ms ease;
  font-weight: 500;
}

.nav-link:hover {
  color: #D4A047;
  background: rgba(212, 160, 71, 0.1);
}

.nav-link.active {
  color: #D4A047;
  background: rgba(212, 160, 71, 0.15);
}
```

---

## 🎨 Brand Elements

### 3-Leaf Icon Usage
- **Size**: Use consistent sizes (sm: 16px, md: 24px, lg: 32px, xl: 48px)
- **Color**: Always gold (#D4A047) for brand recognition
- **Animation**: Subtle glow effect for interactive elements
- **Spacing**: Maintain 8px minimum clearance around icon

### Logo Guidelines
- **Primary Logo**: 3-leaf symbol + "EatRite" wordmark
- **Symbol Only**: Use when space is limited
- **Minimum Size**: 24px height for digital use
- **Color Variants**: Gold on dark, White on gold background

---

## 📱 Component Library

### Status Indicators
```css
/* Success (Gold theme) */
.status-success {
  background: #5C3B14;
  color: #F4C430;
  border-left: 4px solid #D4A047;
}

/* Warning */
.status-warning {
  background: #7A4F1A;
  color: #FEF7E0;
  border-left: 4px solid #F4C430;
}

/* Error (Grey theme - no red) */
.status-error {
  background: #262626;
  color: #A3A3A3;
  border-left: 4px solid #737373;
}
```

### Loading States
```css
.loading-spinner {
  border: 2px solid #404040;
  border-top: 2px solid #D4A047;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-shimmer {
  background: linear-gradient(
    90deg,
    #171717 25%,
    #262626 50%,
    #171717 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

---

## 🌟 Usage Examples

### Hero Section
```jsx
<section className="hero-luxury">
  <div className="container">
    <h1 className="heading-luxury text-center mb-6">
      Premium Meal Experience
    </h1>
    <p className="body-premium text-center mb-8 max-w-2xl mx-auto">
      Discover curated meals crafted by world-class chefs, 
      delivered fresh to your door.
    </p>
    <div className="flex justify-center gap-4">
      <button className="btn-primary">
        Start Your Journey
      </button>
      <button className="btn-secondary">
        View Menu
      </button>
    </div>
  </div>
</section>
```

### Meal Card
```jsx
<div className="card-luxury group">
  <img 
    src={meal.image} 
    alt={meal.name}
    className="w-full h-48 object-cover rounded-lg mb-4"
  />
  <h3 className="text-gold text-xl font-serif mb-2">
    {meal.name}
  </h3>
  <p className="body-premium mb-4">
    {meal.description}
  </p>
  <div className="flex justify-between items-center">
    <span className="text-gold font-bold text-lg">
      ${meal.price}
    </span>
    <button className="btn-primary">
      Add to Cart
    </button>
  </div>
</div>
```

---

## 📐 Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-gold: #D4A047;
  --color-gold-light: #F4C430;
  --color-gold-dark: #B8832D;
  --color-black: #000000;
  --color-black-light: #0A0A0A;
  --color-grey-dark: #171717;
  --color-grey-medium: #404040;
  --color-white: #FFFFFF;
  --color-text-secondary: #E5E5E5;
  --color-text-tertiary: #A3A3A3;
  
  /* Typography */
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-sans: Inter, -apple-system, sans-serif;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Shadows */
  --shadow-gold: 0 8px 32px rgba(212, 160, 71, 0.3);
  --shadow-dark: 0 8px 32px rgba(0, 0, 0, 0.8);
  
  /* Gradients */
  --gradient-gold: linear-gradient(135deg, #F4C430 0%, #D4A047 100%);
  --gradient-dark: linear-gradient(145deg, #171717 0%, #000000 100%);
}
```

---

## 🎯 Brand Principles

### Visual Hierarchy
1. **Gold** - Primary actions, headings, brand elements
2. **White** - Primary text, important information  
3. **Grey** - Secondary text, supporting information
4. **Black** - Backgrounds, containers

### Interaction Design
- **Hover States**: Subtle lift (2-4px) + enhanced shadows
- **Active States**: Slight scale down (0.98x)
- **Focus States**: Gold outline with soft glow
- **Transitions**: 200-300ms ease for smooth interactions

### Accessibility
- **Contrast**: All text meets WCAG AA standards
- **Focus**: Visible focus indicators for keyboard navigation
- **Motion**: Respect `prefers-reduced-motion` setting
- **Screen Readers**: Proper ARIA labels and semantic HTML

---

## 🚀 Implementation Guide

### Setup
1. Import design tokens CSS file
2. Configure Tailwind with EatRite color palette
3. Include Inter and Georgia fonts
4. Add animation keyframes

### Component Usage
1. Use semantic class names (`.btn-primary`, `.card-luxury`)
2. Combine utility classes for custom components
3. Maintain consistent spacing using spacing scale
4. Apply luxury animations sparingly for premium feel

### Quality Checklist
- [ ] All colors use design system tokens
- [ ] Typography follows scale and hierarchy
- [ ] Interactive elements have proper hover/focus states
- [ ] Animations are subtle and purposeful
- [ ] Accessibility standards are met
- [ ] Mobile responsiveness is maintained

---

*"Every pixel reflects our commitment to culinary excellence."*

**EatRite Design System v1.0**