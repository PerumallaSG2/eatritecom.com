/**
 * EatRite Onboarding Flow
 * Premium user onboarding experience with luxury design
 */

import React, { useState } from 'react';
import { EatRiteButton, EatRiteCard, EatRiteIcon, LeafIcon, ProteinIcon, CarbIcon, FatIcon } from '../eatrite/EatRiteComponentLibrary';
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens';

// ============================================================================
// WELCOME SCREEN (Step 1/4)
// ============================================================================

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: EatRiteDesignTokens.spacing['2xl'],
    textAlign: 'center',
  };

  const heroStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.hero.size,
    fontWeight: EatRiteDesignTokens.typography.scale.hero.weight,
    lineHeight: EatRiteDesignTokens.typography.scale.hero.lineHeight,
    letterSpacing: EatRiteDesignTokens.typography.scale.hero.letterSpacing,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.xl,
  };

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
    lineHeight: EatRiteDesignTokens.typography.scale.bodyLarge.lineHeight,
    maxWidth: '500px',
    margin: '0 auto',
    marginBottom: EatRiteDesignTokens.spacing['3xl'],
  };

  return (
    <div style={containerStyles}>
      <div style={heroStyles}>
        <EatRiteIcon size="2xl" color="gold" />
        <h1 style={titleStyles}>Welcome to EatRite</h1>
        <p style={subtitleStyles}>
          Transform your nutrition journey with our premium meal planning and wellness platform. 
          Let's create your personalized wellness experience.
        </p>
      </div>

      <EatRiteButton 
        variant="primary" 
        size="lg" 
        onClick={onNext}
        icon={<LeafIcon size="sm" color="inherit" />}
        iconPosition="right"
      >
        Begin Your Journey
      </EatRiteButton>

      <p style={{
        color: EatRiteDesignTokens.colors.text.tertiary,
        fontSize: EatRiteDesignTokens.typography.scale.caption.size,
        marginTop: EatRiteDesignTokens.spacing.xl,
      }}>
        Takes less than 3 minutes to complete
      </p>
    </div>
  );
};

// ============================================================================
// GOALS SELECTION SCREEN (Step 2/4)
// ============================================================================

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface GoalsScreenProps {
  onNext: (selectedGoals: string[]) => void;
  onBack: () => void;
}

export const GoalsScreen: React.FC<GoalsScreenProps> = ({ onNext, onBack }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals: Goal[] = [
    {
      id: 'weight-loss',
      title: 'Weight Management',
      description: 'Reach and maintain your ideal weight with balanced nutrition',
      icon: <ProteinIcon size="lg" color="gold" />
    },
    {
      id: 'muscle-gain',
      title: 'Build Muscle',
      description: 'Fuel your fitness goals with protein-rich meal plans',
      icon: <CarbIcon size="lg" color="gold" />
    },
    {
      id: 'energy',
      title: 'More Energy',
      description: 'Feel energized throughout the day with optimized nutrition',
      icon: <FatIcon size="lg" color="gold" />
    },
    {
      id: 'wellness',
      title: 'Overall Wellness',
      description: 'Comprehensive nutrition for a healthier lifestyle',
      icon: <LeafIcon size="lg" color="gold" />
    }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    padding: EatRiteDesignTokens.spacing['2xl'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
    maxWidth: '600px',
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h1.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h1.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
    lineHeight: EatRiteDesignTokens.typography.scale.bodyLarge.lineHeight,
  };

  const goalsGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: EatRiteDesignTokens.spacing.xl,
    maxWidth: '800px',
    width: '100%',
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
  };

  const getGoalCardStyles = (isSelected: boolean): React.CSSProperties => ({
    cursor: 'pointer',
    border: `2px solid ${isSelected ? EatRiteDesignTokens.colors.primary.gold : 'rgba(212, 180, 106, 0.2)'}`,
    backgroundColor: isSelected ? 'rgba(212, 180, 106, 0.1)' : EatRiteDesignTokens.colors.surface.darkGreenLight,
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.luxury}`,
    transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: isSelected ? EatRiteDesignTokens.shadows.goldGlow.md : EatRiteDesignTokens.shadows.depth.sm,
  });

  const goalCardContentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: EatRiteDesignTokens.spacing.lg,
  };

  const goalTitleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h4.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h4.weight,
    color: EatRiteDesignTokens.colors.text.primary,
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const goalDescriptionStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    lineHeight: EatRiteDesignTokens.typography.scale.body.lineHeight,
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: EatRiteDesignTokens.spacing.lg,
    alignItems: 'center',
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>What are your wellness goals?</h2>
        <p style={subtitleStyles}>
          Select all that apply. We'll customize your meal plans and recommendations accordingly.
        </p>
      </div>

      <div style={goalsGridStyles}>
        {goals.map((goal) => (
          <EatRiteCard
            key={goal.id}
            variant="luxury"
            padding="lg"
            onClick={() => toggleGoal(goal.id)}
            style={getGoalCardStyles(selectedGoals.includes(goal.id))}
          >
            <div style={goalCardContentStyles}>
              {goal.icon}
              <div>
                <h3 style={goalTitleStyles}>{goal.title}</h3>
                <p style={goalDescriptionStyles}>{goal.description}</p>
              </div>
            </div>
          </EatRiteCard>
        ))}
      </div>

      <div style={actionsStyles}>
        <EatRiteButton variant="outline" size="lg" onClick={onBack}>
          Back
        </EatRiteButton>
        <EatRiteButton 
          variant="primary" 
          size="lg" 
          onClick={() => onNext(selectedGoals)}
          disabled={selectedGoals.length === 0}
        >
          Continue ({selectedGoals.length} selected)
        </EatRiteButton>
      </div>
    </div>
  );
};

// ============================================================================
// DIETARY PREFERENCES SCREEN (Step 3/4)  
// ============================================================================

interface DietaryPreference {
  id: string;
  name: string;
  description: string;
}

interface DietaryPreferencesScreenProps {
  onNext: (preferences: string[]) => void;
  onBack: () => void;
}

export const DietaryPreferencesScreen: React.FC<DietaryPreferencesScreenProps> = ({ onNext, onBack }) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const preferences: DietaryPreference[] = [
    { id: 'vegetarian', name: 'Vegetarian', description: 'Plant-based with dairy & eggs' },
    { id: 'vegan', name: 'Vegan', description: 'Completely plant-based' },
    { id: 'keto', name: 'Ketogenic', description: 'High fat, very low carb' },
    { id: 'paleo', name: 'Paleo', description: 'Whole foods, no grains' },
    { id: 'mediterranean', name: 'Mediterranean', description: 'Fish, vegetables, olive oil' },
    { id: 'gluten-free', name: 'Gluten-Free', description: 'No wheat, barley, or rye' },
    { id: 'dairy-free', name: 'Dairy-Free', description: 'No milk products' },
    { id: 'low-sodium', name: 'Low Sodium', description: 'Heart-healthy low salt' },
  ];

  const togglePreference = (prefId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(prefId) 
        ? prev.filter(id => id !== prefId)
        : [...prev, prefId]
    );
  };

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    padding: EatRiteDesignTokens.spacing['2xl'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
    maxWidth: '600px',
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h1.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h1.weight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.lg,
  };

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
    lineHeight: EatRiteDesignTokens.typography.scale.bodyLarge.lineHeight,
  };

  const preferencesGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: EatRiteDesignTokens.spacing.lg,
    maxWidth: '900px',
    width: '100%',
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
  };

  const getPreferenceStyles = (isSelected: boolean): React.CSSProperties => ({
    padding: EatRiteDesignTokens.spacing.xl,
    border: `1px solid ${isSelected ? EatRiteDesignTokens.colors.primary.gold : 'rgba(212, 180, 106, 0.2)'}`,
    backgroundColor: isSelected ? 'rgba(212, 180, 106, 0.1)' : EatRiteDesignTokens.colors.surface.darkGreenLight,
    borderRadius: EatRiteDesignTokens.borderRadius['2xl'],
    cursor: 'pointer',
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.luxury}`,
    boxShadow: isSelected ? EatRiteDesignTokens.shadows.goldGlow.sm : 'none',
  });

  const preferenceNameStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.body,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    fontWeight: 600,
    color: EatRiteDesignTokens.colors.text.primary,
    marginBottom: EatRiteDesignTokens.spacing.xs,
  };

  const preferenceDescStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.tertiary,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: EatRiteDesignTokens.spacing.lg,
    alignItems: 'center',
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>Any dietary preferences?</h2>
        <p style={subtitleStyles}>
          Let us know about any dietary restrictions or preferences so we can customize your meal recommendations.
        </p>
      </div>

      <div style={preferencesGridStyles}>
        {preferences.map((preference) => (
          <div
            key={preference.id}
            style={getPreferenceStyles(selectedPreferences.includes(preference.id))}
            onClick={() => togglePreference(preference.id)}
          >
            <div style={preferenceNameStyles}>{preference.name}</div>
            <div style={preferenceDescStyles}>{preference.description}</div>
          </div>
        ))}
      </div>

      <div style={actionsStyles}>
        <EatRiteButton variant="outline" size="lg" onClick={onBack}>
          Back
        </EatRiteButton>
        <EatRiteButton 
          variant="primary" 
          size="lg" 
          onClick={() => onNext(selectedPreferences)}
        >
          Continue
        </EatRiteButton>
      </div>
    </div>
  );
};

// ============================================================================
// COMPLETION SCREEN (Step 4/4)
// ============================================================================

interface CompletionScreenProps {
  onComplete: () => void;
  userData: {
    goals: string[];
    preferences: string[];
  };
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ onComplete, userData }) => {
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: EatRiteDesignTokens.spacing['2xl'],
    textAlign: 'center',
  };

  const heroStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['4xl'],
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.hero.size,
    fontWeight: EatRiteDesignTokens.typography.scale.hero.weight,
    lineHeight: EatRiteDesignTokens.typography.scale.hero.lineHeight,
    background: EatRiteDesignTokens.colors.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: EatRiteDesignTokens.spacing.xl,
  };

  const subtitleStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
    lineHeight: EatRiteDesignTokens.typography.scale.bodyLarge.lineHeight,
    maxWidth: '500px',
    margin: '0 auto',
    marginBottom: EatRiteDesignTokens.spacing['3xl'],
  };

  const summaryCardStyles: React.CSSProperties = {
    maxWidth: '400px',
    width: '100%',
    marginBottom: EatRiteDesignTokens.spacing['3xl'],
  };

  const summaryTitleStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h3.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
    color: EatRiteDesignTokens.colors.primary.gold,
    marginBottom: EatRiteDesignTokens.spacing.lg,
    textAlign: 'center',
  };

  const summaryItemStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    marginBottom: EatRiteDesignTokens.spacing.sm,
    textAlign: 'left',
  };

  return (
    <div style={containerStyles}>
      <div style={heroStyles}>
        <EatRiteIcon size="2xl" color="gold" />
        <h1 style={titleStyles}>You're All Set!</h1>
        <p style={subtitleStyles}>
          Your personalized nutrition profile is ready. We'll now create custom meal plans 
          tailored specifically to your goals and preferences.
        </p>
      </div>

      <EatRiteCard variant="luxury" padding="lg" style={summaryCardStyles}>
        <h3 style={summaryTitleStyles}>Your Profile Summary</h3>
        
        <div style={{ marginBottom: EatRiteDesignTokens.spacing.lg }}>
          <div style={{ ...summaryItemStyles, fontWeight: 600, marginBottom: EatRiteDesignTokens.spacing.sm }}>
            Goals ({userData.goals.length})
          </div>
          {userData.goals.map((goal) => (
            <div key={goal} style={summaryItemStyles}>• {goal}</div>
          ))}
        </div>

        {userData.preferences.length > 0 && (
          <div>
            <div style={{ ...summaryItemStyles, fontWeight: 600, marginBottom: EatRiteDesignTokens.spacing.sm }}>
              Dietary Preferences ({userData.preferences.length})
            </div>
            {userData.preferences.map((pref) => (
              <div key={pref} style={summaryItemStyles}>• {pref}</div>
            ))}
          </div>
        )}
      </EatRiteCard>

      <EatRiteButton 
        variant="primary" 
        size="xl" 
        onClick={onComplete}
        icon={<LeafIcon size="sm" color="inherit" />}
        iconPosition="right"
      >
        Start My Wellness Journey
      </EatRiteButton>
    </div>
  );
};

// ============================================================================
// MAIN ONBOARDING FLOW COMPONENT
// ============================================================================

interface OnboardingFlowProps {
  onComplete: (userData: any) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<{
    goals: string[];
    preferences: string[];
  }>({
    goals: [],
    preferences: [],
  });

  const handleGoalsComplete = (goals: string[]) => {
    setUserData(prev => ({ ...prev, goals }));
    setCurrentStep(2);
  };

  const handlePreferencesComplete = (preferences: string[]) => {
    setUserData(prev => ({ ...prev, preferences }));
    setCurrentStep(3);
  };

  const handleComplete = () => {
    onComplete(userData);
  };

  const steps = [
    <WelcomeScreen onNext={() => setCurrentStep(1)} />,
    <GoalsScreen onNext={handleGoalsComplete} onBack={() => setCurrentStep(0)} />,
    <DietaryPreferencesScreen onNext={handlePreferencesComplete} onBack={() => setCurrentStep(1)} />,
    <CompletionScreen onComplete={handleComplete} userData={userData} />
  ];

  return steps[currentStep];
};

export default OnboardingFlow;