/**
 * EatRite Home Screen
 * Demonstrates the luxury design system in action
 */

import React from 'react'
import { EatRiteButton } from '../ui/Button/EatRiteButton'
import { EatRiteCard } from '../ui/Card/EatRiteCard'
import { EatRiteInput } from '../ui/Input/EatRiteInput'
import EatRiteIcons from '../icons/EatRiteIcons'
import './ExampleScreens.css'

const EatRiteHomeScreen: React.FC = () => {
  return (
    <div className="eatrite-screen eatrite-screen--home">
      {/* Hero Section */}
      <section className="eatrite-hero">
        <div className="eatrite-hero__content">
          <div className="eatrite-hero__brand">
            <EatRiteIcons.ThreeLeaves
              size="xl"
              color="gold"
              className="eatrite-icon--glow"
            />
            <h1 className="eatrite-hero__title">EatRite</h1>
          </div>

          <h2 className="eatrite-hero__subtitle">
            Luxury Nutrition, Delivered
          </h2>

          <p className="eatrite-hero__description">
            Experience premium, chef-crafted meals designed to nourish your body
            and elevate your lifestyle. Pure ingredients, exceptional taste.
          </p>

          <div className="eatrite-hero__actions">
            <EatRiteButton
              variant="primary"
              size="lg"
              leftIcon={<EatRiteIcons.Leaf size="md" />}
            >
              Start Your Journey
            </EatRiteButton>
            <EatRiteButton variant="secondary" size="lg">
              View Menu
            </EatRiteButton>
          </div>
        </div>

        <div className="eatrite-hero__image">
          <div className="eatrite-hero__image-placeholder">
            <EatRiteIcons.Bowl
              size="xl"
              color="gold"
              className="eatrite-icon--glow"
            />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="eatrite-search">
        <div className="eatrite-search__container">
          <EatRiteInput
            placeholder="Search meals, ingredients, or dietary preferences..."
            size="lg"
            leftIcon={<EatRiteIcons.Search size="md" />}
            rightIcon={<EatRiteIcons.Filter size="md" />}
            className="eatrite-search__input"
          />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="eatrite-categories">
        <div className="eatrite-section-header">
          <h3 className="eatrite-section-title">Curated Collections</h3>
          <p className="eatrite-section-subtitle">
            Discover meals crafted for your lifestyle
          </p>
        </div>

        <div className="eatrite-categories__grid">
          <EatRiteCard variant="premium" className="eatrite-category-card">
            <div className="eatrite-category-card__icon">
              <EatRiteIcons.ThreeLeaves size="lg" color="gold" />
            </div>
            <h4 className="eatrite-category-card__title">Plant-Based</h4>
            <p className="eatrite-category-card__description">
              Pure, organic ingredients from nature's finest sources
            </p>
            <div className="eatrite-category-card__stats">
              <span className="eatrite-stat">150+ Meals</span>
            </div>
          </EatRiteCard>

          <EatRiteCard variant="premium" className="eatrite-category-card">
            <div className="eatrite-category-card__icon">
              <EatRiteIcons.Heart size="lg" color="gold" />
            </div>
            <h4 className="eatrite-category-card__title">Heart Healthy</h4>
            <p className="eatrite-category-card__description">
              Nutritionally balanced for optimal cardiovascular wellness
            </p>
            <div className="eatrite-category-card__stats">
              <span className="eatrite-stat">200+ Meals</span>
            </div>
          </EatRiteCard>

          <EatRiteCard variant="premium" className="eatrite-category-card">
            <div className="eatrite-category-card__icon">
              <EatRiteIcons.Target size="lg" color="gold" />
            </div>
            <h4 className="eatrite-category-card__title">Performance</h4>
            <p className="eatrite-category-card__description">
              High-protein meals designed for active lifestyles
            </p>
            <div className="eatrite-category-card__stats">
              <span className="eatrite-stat">120+ Meals</span>
            </div>
          </EatRiteCard>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="eatrite-featured">
        <div className="eatrite-section-header">
          <h3 className="eatrite-section-title">Chef's Selection</h3>
          <p className="eatrite-section-subtitle">
            This week's premium creations
          </p>
        </div>

        <div className="eatrite-meals-grid">
          <EatRiteCard variant="interactive" className="eatrite-meal-card">
            <div className="eatrite-meal-card__image">
              <div className="eatrite-meal-card__badge">
                <EatRiteIcons.Star size="sm" color="gold" />
                <span>Premium</span>
              </div>
            </div>
            <div className="eatrite-meal-card__content">
              <h4 className="eatrite-meal-card__title">
                Mediterranean Quinoa Bowl
              </h4>
              <p className="eatrite-meal-card__description">
                Organic quinoa, roasted vegetables, tahini drizzle
              </p>
              <div className="eatrite-meal-card__nutrition">
                <div className="eatrite-nutrition-item">
                  <EatRiteIcons.Activity size="sm" color="gold" />
                  <span>450 cal</span>
                </div>
                <div className="eatrite-nutrition-item">
                  <EatRiteIcons.Target size="sm" color="gold" />
                  <span>18g protein</span>
                </div>
              </div>
              <div className="eatrite-meal-card__actions">
                <span className="eatrite-price">$18.99</span>
                <EatRiteButton
                  size="sm"
                  leftIcon={<EatRiteIcons.Plus size="sm" />}
                >
                  Add to Cart
                </EatRiteButton>
              </div>
            </div>
          </EatRiteCard>

          <EatRiteCard variant="interactive" className="eatrite-meal-card">
            <div className="eatrite-meal-card__image">
              <div className="eatrite-meal-card__badge">
                <EatRiteIcons.ChefHat size="sm" color="gold" />
                <span>Chef's Choice</span>
              </div>
            </div>
            <div className="eatrite-meal-card__content">
              <h4 className="eatrite-meal-card__title">
                Grass-Fed Steak & Vegetables
              </h4>
              <p className="eatrite-meal-card__description">
                Prime cut with seasonal roasted vegetables, herb butter
              </p>
              <div className="eatrite-meal-card__nutrition">
                <div className="eatrite-nutrition-item">
                  <EatRiteIcons.Activity size="sm" color="gold" />
                  <span>620 cal</span>
                </div>
                <div className="eatrite-nutrition-item">
                  <EatRiteIcons.Target size="sm" color="gold" />
                  <span>45g protein</span>
                </div>
              </div>
              <div className="eatrite-meal-card__actions">
                <span className="eatrite-price">$32.99</span>
                <EatRiteButton
                  size="sm"
                  leftIcon={<EatRiteIcons.Plus size="sm" />}
                >
                  Add to Cart
                </EatRiteButton>
              </div>
            </div>
          </EatRiteCard>

          <EatRiteCard variant="interactive" className="eatrite-meal-card">
            <div className="eatrite-meal-card__image">
              <div className="eatrite-meal-card__badge">
                <EatRiteIcons.Leaf size="sm" color="gold" />
                <span>Plant-Based</span>
              </div>
            </div>
            <div className="eatrite-meal-card__content">
              <h4 className="eatrite-meal-card__title">
                Wild Mushroom Risotto
              </h4>
              <p className="eatrite-meal-card__description">
                Creamy arborio rice with seasonal wild mushrooms, truffle oil
              </p>
              <div className="eatrite-meal-card__nutrition">
                <div className="eatrite-nutrition-item">
                  <EatRiteIcons.Activity size="sm" color="gold" />
                  <span>380 cal</span>
                </div>
                <div className="eatrite-nutrition-item">
                  <EatRiteIcons.Target size="sm" color="gold" />
                  <span>12g protein</span>
                </div>
              </div>
              <div className="eatrite-meal-card__actions">
                <span className="eatrite-price">$24.99</span>
                <EatRiteButton
                  size="sm"
                  leftIcon={<EatRiteIcons.Plus size="sm" />}
                >
                  Add to Cart
                </EatRiteButton>
              </div>
            </div>
          </EatRiteCard>
        </div>
      </section>

      {/* Stats Section */}
      <section className="eatrite-stats">
        <div className="eatrite-stats__grid">
          <EatRiteCard variant="flat" className="eatrite-stat-card">
            <div className="eatrite-stat-card__icon">
              <EatRiteIcons.ChefHat size="lg" color="gold" />
            </div>
            <div className="eatrite-stat-card__content">
              <div className="eatrite-stat-value">500+</div>
              <div className="eatrite-stat-label">Premium Meals</div>
            </div>
          </EatRiteCard>

          <EatRiteCard variant="flat" className="eatrite-stat-card">
            <div className="eatrite-stat-card__icon">
              <EatRiteIcons.Heart size="lg" color="gold" />
            </div>
            <div className="eatrite-stat-card__content">
              <div className="eatrite-stat-value">50K+</div>
              <div className="eatrite-stat-label">Happy Customers</div>
            </div>
          </EatRiteCard>

          <EatRiteCard variant="flat" className="eatrite-stat-card">
            <div className="eatrite-stat-card__icon">
              <EatRiteIcons.Truck size="lg" color="gold" />
            </div>
            <div className="eatrite-stat-card__content">
              <div className="eatrite-stat-value">24/7</div>
              <div className="eatrite-stat-label">Fresh Delivery</div>
            </div>
          </EatRiteCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="eatrite-cta">
        <EatRiteCard variant="premium" className="eatrite-cta-card">
          <div className="eatrite-cta__content">
            <div className="eatrite-cta__icon">
              <EatRiteIcons.ThreeLeaves
                size="xl"
                color="gold"
                className="eatrite-icon--glow"
              />
            </div>
            <h3 className="eatrite-cta__title">
              Ready to transform your nutrition?
            </h3>
            <p className="eatrite-cta__description">
              Join thousands who've discovered the perfect balance of luxury,
              health, and convenience.
            </p>
            <div className="eatrite-cta__actions">
              <EatRiteButton
                variant="primary"
                size="lg"
                leftIcon={<EatRiteIcons.ArrowRight size="md" />}
              >
                Start Your Plan
              </EatRiteButton>
              <EatRiteButton variant="ghost" size="lg">
                Learn More
              </EatRiteButton>
            </div>
          </div>
        </EatRiteCard>
      </section>
    </div>
  )
}

export default EatRiteHomeScreen
