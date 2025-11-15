/**
 * EatRite User Profile & Settings
 * Premium user account management and preferences
 */

import React, { useState } from 'react';
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
  UserIcon
} from '../eatrite/EatRiteComponentLibrary';
import { EatRiteDesignTokens } from '../../styles/design-system/eatrite-design-tokens';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  avatar: string;
  memberSince: string;
  subscriptionTier: 'basic' | 'premium' | 'elite';
}

interface HealthProfile {
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active';
  healthGoals: string[];
  dietaryRestrictions: string[];
  allergies: string[];
  medicalConditions: string[];
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface NutritionGoals {
  dailyCalories: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
  waterIntake: number; // in ml
  mealsPerDay: number;
  weightGoal: 'lose' | 'maintain' | 'gain';
  targetWeight: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  mealReminders: boolean;
  supplementReminders: boolean;
  progressUpdates: boolean;
  promotionalOffers: boolean;
  weeklyReports: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  shareProgressData: boolean;
  allowDataAnalytics: boolean;
  marketingCommunications: boolean;
}

// ============================================================================
// SAMPLE USER DATA
// ============================================================================

const sampleUser: UserProfile = {
  id: 'user123',
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '1990-03-15',
  gender: 'female',
  avatar: '/api/placeholder/150/150',
  memberSince: '2024-01-15',
  subscriptionTier: 'premium',
};

const sampleHealthProfile: HealthProfile = {
  height: 165,
  weight: 62,
  activityLevel: 'moderately-active',
  healthGoals: ['Weight Management', 'Muscle Building', 'Energy Boost'],
  dietaryRestrictions: ['Gluten-Free', 'Low Sodium'],
  allergies: ['Shellfish'],
  medicalConditions: [],
  fitnessLevel: 'intermediate',
};

const sampleNutritionGoals: NutritionGoals = {
  dailyCalories: 2000,
  proteinPercentage: 25,
  carbsPercentage: 45,
  fatPercentage: 30,
  waterIntake: 2500,
  mealsPerDay: 3,
  weightGoal: 'maintain',
  targetWeight: 62,
};

// ============================================================================
// MAIN USER PROFILE COMPONENT
// ============================================================================

interface UserProfileProps {
  onSaveProfile?: (profile: UserProfile) => void;
  onSaveHealthProfile?: (healthProfile: HealthProfile) => void;
  onSaveNutritionGoals?: (goals: NutritionGoals) => void;
  onDeleteAccount?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  onSaveProfile,
  onSaveHealthProfile,
  onSaveNutritionGoals,
  onDeleteAccount,
}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>(sampleUser);
  const [healthProfile, setHealthProfile] = useState<HealthProfile>(sampleHealthProfile);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>(sampleNutritionGoals);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    mealReminders: true,
    supplementReminders: true,
    progressUpdates: true,
    promotionalOffers: false,
    weeklyReports: true,
  });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'friends',
    shareProgressData: true,
    allowDataAnalytics: true,
    marketingCommunications: false,
  });

  // Container styles
  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    background: EatRiteDesignTokens.colors.gradients.surface,
    padding: EatRiteDesignTokens.spacing['2xl'],
  };

  const contentStyles: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto',
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
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
          <h1 style={titleStyles}>Your Profile</h1>
          <p style={{
            color: EatRiteDesignTokens.colors.text.secondary,
            fontSize: EatRiteDesignTokens.typography.scale.bodyLarge.size,
          }}>
            Manage your account, preferences, and nutrition goals
          </p>
        </header>

        {/* Profile Header Card */}
        <ProfileHeaderCard user={userProfile} />

        {/* Navigation Tabs */}
        <div style={{ marginBottom: EatRiteDesignTokens.spacing['2xl'] }}>
          <EatRiteTabs
            items={[
              { id: 'profile', label: 'Personal Info', icon: <UserIcon size="sm" color="inherit" /> },
              { id: 'health', label: 'Health Profile', icon: <ProteinIcon size="sm" color="inherit" /> },
              { id: 'nutrition', label: 'Nutrition Goals', icon: <LeafIcon size="sm" color="inherit" /> },
              { id: 'notifications', label: 'Notifications', icon: <CarbIcon size="sm" color="inherit" /> },
              { id: 'privacy', label: 'Privacy', icon: <FatIcon size="sm" color="inherit" /> },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <PersonalInfoTab
            profile={userProfile}
            onChange={setUserProfile}
            onSave={onSaveProfile}
          />
        )}

        {activeTab === 'health' && (
          <HealthProfileTab
            profile={healthProfile}
            onChange={setHealthProfile}
            onSave={onSaveHealthProfile}
          />
        )}

        {activeTab === 'nutrition' && (
          <NutritionGoalsTab
            goals={nutritionGoals}
            onChange={setNutritionGoals}
            onSave={onSaveNutritionGoals}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsTab
            settings={notificationSettings}
            onChange={setNotificationSettings}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyTab
            settings={privacySettings}
            onChange={setPrivacySettings}
            onDeleteAccount={onDeleteAccount}
          />
        )}
      </div>
    </div>
  );
};

// ============================================================================
// PROFILE HEADER CARD
// ============================================================================

interface ProfileHeaderCardProps {
  user: UserProfile;
}

const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({ user }) => {
  const cardStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const contentStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: EatRiteDesignTokens.spacing.xl,
  };

  const avatarStyles: React.CSSProperties = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `4px solid ${EatRiteDesignTokens.colors.primary.gold}`,
    boxShadow: EatRiteDesignTokens.shadows.goldGlow.lg,
  };

  const infoStyles: React.CSSProperties = {
    flex: 1,
  };

  const nameStyles: React.CSSProperties = {
    fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
    fontSize: EatRiteDesignTokens.typography.scale.h2.size,
    fontWeight: EatRiteDesignTokens.typography.scale.h2.weight,
    color: EatRiteDesignTokens.colors.text.primary,
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const tierStyles: React.CSSProperties = {
    display: 'inline-block',
    padding: `${EatRiteDesignTokens.spacing.xs} ${EatRiteDesignTokens.spacing.md}`,
    backgroundColor: user.subscriptionTier === 'elite' 
      ? EatRiteDesignTokens.colors.primary.gold
      : user.subscriptionTier === 'premium'
      ? EatRiteDesignTokens.colors.semantic.info
      : EatRiteDesignTokens.colors.surface.darkGreenLight,
    color: user.subscriptionTier === 'basic' 
      ? EatRiteDesignTokens.colors.text.primary
      : EatRiteDesignTokens.colors.surface.darkGreen,
    borderRadius: EatRiteDesignTokens.borderRadius.full,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: EatRiteDesignTokens.spacing.md,
  };

  const memberSinceStyles: React.CSSProperties = {
    color: EatRiteDesignTokens.colors.text.secondary,
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
  };

  return (
    <EatRiteCard variant="luxury" padding="xl" style={cardStyles}>
      <div style={contentStyles}>
        <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} style={avatarStyles} />
        
        <div style={infoStyles}>
          <h2 style={nameStyles}>{user.firstName} {user.lastName}</h2>
          <div style={tierStyles}>
            {user.subscriptionTier} Member
          </div>
          <p style={memberSinceStyles}>
            Member since {new Date(user.memberSince).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </p>
        </div>

        <div>
          <EatRiteButton variant="outline" size="md">
            Change Photo
          </EatRiteButton>
        </div>
      </div>
    </EatRiteCard>
  );
};

// ============================================================================
// PERSONAL INFO TAB
// ============================================================================

interface PersonalInfoTabProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
  onSave?: (profile: UserProfile) => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ profile, onChange, onSave }) => {
  const formGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: EatRiteDesignTokens.spacing.xl,
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  return (
    <EatRiteCard variant="luxury" padding="xl">
      <h3 style={{
        fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
        fontSize: EatRiteDesignTokens.typography.scale.h3.size,
        fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
        color: EatRiteDesignTokens.colors.text.primary,
        marginBottom: EatRiteDesignTokens.spacing.xl,
      }}>
        Personal Information
      </h3>

      <div style={formGridStyles}>
        <EatRiteInput
          label="First Name"
          value={profile.firstName}
          onChange={(value) => onChange({ ...profile, firstName: value })}
        />

        <EatRiteInput
          label="Last Name"
          value={profile.lastName}
          onChange={(value) => onChange({ ...profile, lastName: value })}
        />

        <EatRiteInput
          label="Email Address"
          value={profile.email}
          onChange={(value) => onChange({ ...profile, email: value })}
          type="email"
        />

        <EatRiteInput
          label="Phone Number"
          value={profile.phone}
          onChange={(value) => onChange({ ...profile, phone: value })}
          type="text"
        />

        <div>
          <label style={{
            display: 'block',
            marginBottom: EatRiteDesignTokens.spacing.sm,
            fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
            fontWeight: 600,
            color: EatRiteDesignTokens.colors.text.primary,
          }}>
            Date of Birth
          </label>
          <input
            type="date"
            value={profile.dateOfBirth}
            onChange={(e) => onChange({ ...profile, dateOfBirth: e.target.value })}
            style={{
              width: '100%',
              padding: EatRiteDesignTokens.spacing.md,
              borderRadius: EatRiteDesignTokens.borderRadius.lg,
              border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
              backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
              color: EatRiteDesignTokens.colors.text.primary,
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: EatRiteDesignTokens.spacing.sm,
            fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
            fontWeight: 600,
            color: EatRiteDesignTokens.colors.text.primary,
          }}>
            Gender
          </label>
          <select
            value={profile.gender}
            onChange={(e) => onChange({ ...profile, gender: e.target.value as UserProfile['gender'] })}
            style={{
              width: '100%',
              padding: EatRiteDesignTokens.spacing.md,
              borderRadius: EatRiteDesignTokens.borderRadius.lg,
              border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
              backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
              color: EatRiteDesignTokens.colors.text.primary,
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
            }}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: EatRiteDesignTokens.spacing.md,
      }}>
        <EatRiteButton variant="outline" size="lg">
          Cancel
        </EatRiteButton>
        <EatRiteButton 
          variant="primary" 
          size="lg"
          onClick={() => onSave?.(profile)}
        >
          Save Changes
        </EatRiteButton>
      </div>
    </EatRiteCard>
  );
};

// ============================================================================
// HEALTH PROFILE TAB
// ============================================================================

interface HealthProfileTabProps {
  profile: HealthProfile;
  onChange: (profile: HealthProfile) => void;
  onSave?: (profile: HealthProfile) => void;
}

const HealthProfileTab: React.FC<HealthProfileTabProps> = ({ profile, onChange, onSave }) => {
  const sectionStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  const formGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: EatRiteDesignTokens.spacing.xl,
  };

  return (
    <div>
      {/* Basic Measurements */}
      <EatRiteCard variant="luxury" padding="xl" style={sectionStyles}>
        <h3 style={{
          fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
          fontSize: EatRiteDesignTokens.typography.scale.h3.size,
          fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
          color: EatRiteDesignTokens.colors.text.primary,
          marginBottom: EatRiteDesignTokens.spacing.xl,
        }}>
          Basic Measurements
        </h3>

        <div style={formGridStyles}>
          <EatRiteInput
            label="Height (cm)"
            value={profile.height.toString()}
            onChange={(value) => onChange({ ...profile, height: parseFloat(value) || 0 })}
            type="number"
          />

          <EatRiteInput
            label="Weight (kg)"
            value={profile.weight.toString()}
            onChange={(value) => onChange({ ...profile, weight: parseFloat(value) || 0 })}
            type="number"
          />

          <div>
            <label style={{
              display: 'block',
              marginBottom: EatRiteDesignTokens.spacing.sm,
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}>
              Activity Level
            </label>
            <select
              value={profile.activityLevel}
              onChange={(e) => onChange({ ...profile, activityLevel: e.target.value as HealthProfile['activityLevel'] })}
              style={{
                width: '100%',
                padding: EatRiteDesignTokens.spacing.md,
                borderRadius: EatRiteDesignTokens.borderRadius.lg,
                border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
                backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
                color: EatRiteDesignTokens.colors.text.primary,
                fontSize: EatRiteDesignTokens.typography.scale.body.size,
              }}
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightly-active">Lightly Active</option>
              <option value="moderately-active">Moderately Active</option>
              <option value="very-active">Very Active</option>
              <option value="extremely-active">Extremely Active</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: EatRiteDesignTokens.spacing.sm,
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}>
              Fitness Level
            </label>
            <select
              value={profile.fitnessLevel}
              onChange={(e) => onChange({ ...profile, fitnessLevel: e.target.value as HealthProfile['fitnessLevel'] })}
              style={{
                width: '100%',
                padding: EatRiteDesignTokens.spacing.md,
                borderRadius: EatRiteDesignTokens.borderRadius.lg,
                border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
                backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
                color: EatRiteDesignTokens.colors.text.primary,
                fontSize: EatRiteDesignTokens.typography.scale.body.size,
              }}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </EatRiteCard>

      {/* Health Goals & Restrictions */}
      <EatRiteCard variant="luxury" padding="xl" style={sectionStyles}>
        <h3 style={{
          fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
          fontSize: EatRiteDesignTokens.typography.scale.h3.size,
          fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
          color: EatRiteDesignTokens.colors.text.primary,
          marginBottom: EatRiteDesignTokens.spacing.xl,
        }}>
          Health Goals & Restrictions
        </h3>

        <HealthGoalsSelector
          selectedGoals={profile.healthGoals}
          onChange={(goals) => onChange({ ...profile, healthGoals: goals })}
        />

        <DietaryRestrictionsSelector
          selectedRestrictions={profile.dietaryRestrictions}
          onChange={(restrictions) => onChange({ ...profile, dietaryRestrictions: restrictions })}
        />
      </EatRiteCard>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: EatRiteDesignTokens.spacing.md,
      }}>
        <EatRiteButton variant="outline" size="lg">
          Cancel
        </EatRiteButton>
        <EatRiteButton 
          variant="primary" 
          size="lg"
          onClick={() => onSave?.(profile)}
        >
          Save Health Profile
        </EatRiteButton>
      </div>
    </div>
  );
};

// ============================================================================
// HEALTH GOALS SELECTOR
// ============================================================================

interface HealthGoalsSelectorProps {
  selectedGoals: string[];
  onChange: (goals: string[]) => void;
}

const HealthGoalsSelector: React.FC<HealthGoalsSelectorProps> = ({ selectedGoals, onChange }) => {
  const availableGoals = [
    'Weight Loss', 'Weight Gain', 'Weight Management', 'Muscle Building',
    'Improved Energy', 'Better Sleep', 'Digestive Health', 'Heart Health',
    'Mental Clarity', 'Stress Management', 'Athletic Performance', 'Recovery'
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      onChange(selectedGoals.filter(g => g !== goal));
    } else {
      onChange([...selectedGoals, goal]);
    }
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: EatRiteDesignTokens.spacing.md,
    marginBottom: EatRiteDesignTokens.spacing.xl,
  };

  const goalButtonStyles = (isSelected: boolean): React.CSSProperties => ({
    padding: EatRiteDesignTokens.spacing.md,
    borderRadius: EatRiteDesignTokens.borderRadius.lg,
    border: `2px solid ${isSelected ? EatRiteDesignTokens.colors.primary.gold : 'rgba(212, 180, 106, 0.3)'}`,
    backgroundColor: isSelected ? 'rgba(212, 180, 106, 0.2)' : EatRiteDesignTokens.colors.surface.darkGreenLight,
    color: isSelected ? EatRiteDesignTokens.colors.primary.gold : EatRiteDesignTokens.colors.text.primary,
    cursor: 'pointer',
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
    fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
    fontWeight: isSelected ? 600 : 400,
    textAlign: 'center',
  });

  return (
    <div style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
      <label style={{
        display: 'block',
        marginBottom: EatRiteDesignTokens.spacing.lg,
        fontSize: EatRiteDesignTokens.typography.scale.body.size,
        fontWeight: 600,
        color: EatRiteDesignTokens.colors.text.primary,
      }}>
        Health Goals (Select all that apply)
      </label>
      
      <div style={gridStyles}>
        {availableGoals.map((goal) => (
          <div
            key={goal}
            onClick={() => toggleGoal(goal)}
            style={goalButtonStyles(selectedGoals.includes(goal))}
          >
            {goal}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// DIETARY RESTRICTIONS SELECTOR
// ============================================================================

interface DietaryRestrictionsSelectorProps {
  selectedRestrictions: string[];
  onChange: (restrictions: string[]) => void;
}

const DietaryRestrictionsSelector: React.FC<DietaryRestrictionsSelectorProps> = ({ selectedRestrictions, onChange }) => {
  const availableRestrictions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto',
    'Paleo', 'Low Carb', 'Low Fat', 'Low Sodium', 'Sugar-Free',
    'Kosher', 'Halal', 'Nut-Free', 'Soy-Free'
  ];

  const toggleRestriction = (restriction: string) => {
    if (selectedRestrictions.includes(restriction)) {
      onChange(selectedRestrictions.filter(r => r !== restriction));
    } else {
      onChange([...selectedRestrictions, restriction]);
    }
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: EatRiteDesignTokens.spacing.md,
  };

  const restrictionButtonStyles = (isSelected: boolean): React.CSSProperties => ({
    padding: EatRiteDesignTokens.spacing.sm,
    borderRadius: EatRiteDesignTokens.borderRadius.lg,
    border: `2px solid ${isSelected ? EatRiteDesignTokens.colors.semantic.warning : 'rgba(212, 180, 106, 0.3)'}`,
    backgroundColor: isSelected ? 'rgba(255, 159, 67, 0.2)' : EatRiteDesignTokens.colors.surface.darkGreenLight,
    color: isSelected ? EatRiteDesignTokens.colors.semantic.warning : EatRiteDesignTokens.colors.text.primary,
    cursor: 'pointer',
    transition: `all ${EatRiteDesignTokens.animations.duration.normal} ${EatRiteDesignTokens.animations.easing.easeOut}`,
    fontSize: EatRiteDesignTokens.typography.scale.caption.size,
    fontWeight: isSelected ? 600 : 400,
    textAlign: 'center',
  });

  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: EatRiteDesignTokens.spacing.lg,
        fontSize: EatRiteDesignTokens.typography.scale.body.size,
        fontWeight: 600,
        color: EatRiteDesignTokens.colors.text.primary,
      }}>
        Dietary Restrictions & Preferences
      </label>
      
      <div style={gridStyles}>
        {availableRestrictions.map((restriction) => (
          <div
            key={restriction}
            onClick={() => toggleRestriction(restriction)}
            style={restrictionButtonStyles(selectedRestrictions.includes(restriction))}
          >
            {restriction}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// NUTRITION GOALS TAB
// ============================================================================

interface NutritionGoalsTabProps {
  goals: NutritionGoals;
  onChange: (goals: NutritionGoals) => void;
  onSave?: (goals: NutritionGoals) => void;
}

const NutritionGoalsTab: React.FC<NutritionGoalsTabProps> = ({ goals, onChange, onSave }) => {
  const formGridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: EatRiteDesignTokens.spacing.xl,
    marginBottom: EatRiteDesignTokens.spacing['2xl'],
  };

  return (
    <EatRiteCard variant="luxury" padding="xl">
      <h3 style={{
        fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
        fontSize: EatRiteDesignTokens.typography.scale.h3.size,
        fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
        color: EatRiteDesignTokens.colors.text.primary,
        marginBottom: EatRiteDesignTokens.spacing.xl,
      }}>
        Nutrition Goals
      </h3>

      <div style={formGridStyles}>
        <EatRiteInput
          label="Daily Calories"
          value={goals.dailyCalories.toString()}
          onChange={(value) => onChange({ ...goals, dailyCalories: parseInt(value) || 0 })}
          type="number"
        />

        <EatRiteInput
          label="Target Weight (kg)"
          value={goals.targetWeight.toString()}
          onChange={(value) => onChange({ ...goals, targetWeight: parseFloat(value) || 0 })}
          type="number"
        />

        <EatRiteInput
          label="Water Intake (ml)"
          value={goals.waterIntake.toString()}
          onChange={(value) => onChange({ ...goals, waterIntake: parseInt(value) || 0 })}
          type="number"
        />

        <EatRiteInput
          label="Meals Per Day"
          value={goals.mealsPerDay.toString()}
          onChange={(value) => onChange({ ...goals, mealsPerDay: parseInt(value) || 0 })}
          type="number"
        />

        <div>
          <label style={{
            display: 'block',
            marginBottom: EatRiteDesignTokens.spacing.sm,
            fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
            fontWeight: 600,
            color: EatRiteDesignTokens.colors.text.primary,
          }}>
            Weight Goal
          </label>
          <select
            value={goals.weightGoal}
            onChange={(e) => onChange({ ...goals, weightGoal: e.target.value as NutritionGoals['weightGoal'] })}
            style={{
              width: '100%',
              padding: EatRiteDesignTokens.spacing.md,
              borderRadius: EatRiteDesignTokens.borderRadius.lg,
              border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
              backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
              color: EatRiteDesignTokens.colors.text.primary,
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
            }}
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>
      </div>

      {/* Macro Distribution */}
      <div style={{ marginBottom: EatRiteDesignTokens.spacing['2xl'] }}>
        <h4 style={{
          fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
          fontSize: EatRiteDesignTokens.typography.scale.h4.size,
          fontWeight: EatRiteDesignTokens.typography.scale.h4.weight,
          color: EatRiteDesignTokens.colors.text.primary,
          marginBottom: EatRiteDesignTokens.spacing.lg,
        }}>
          Macronutrient Distribution
        </h4>

        <MacroSliders goals={goals} onChange={onChange} />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: EatRiteDesignTokens.spacing.md,
      }}>
        <EatRiteButton variant="outline" size="lg">
          Reset to Defaults
        </EatRiteButton>
        <EatRiteButton 
          variant="primary" 
          size="lg"
          onClick={() => onSave?.(goals)}
        >
          Save Nutrition Goals
        </EatRiteButton>
      </div>
    </EatRiteCard>
  );
};

// ============================================================================
// MACRO SLIDERS COMPONENT
// ============================================================================

interface MacroSlidersProps {
  goals: NutritionGoals;
  onChange: (goals: NutritionGoals) => void;
}

const MacroSliders: React.FC<MacroSlidersProps> = ({ goals, onChange }) => {
  const sliderStyles: React.CSSProperties = {
    marginBottom: EatRiteDesignTokens.spacing.xl,
  };

  const labelStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  const sliderInputStyles: React.CSSProperties = {
    width: '100%',
    accentColor: EatRiteDesignTokens.colors.primary.gold,
    marginBottom: EatRiteDesignTokens.spacing.sm,
  };

  // Ensure percentages always add up to 100%
  const updateMacroPercentage = (macro: 'protein' | 'carbs' | 'fat', newValue: number) => {
    const totalOthers = macro === 'protein' 
      ? goals.carbsPercentage + goals.fatPercentage
      : macro === 'carbs'
      ? goals.proteinPercentage + goals.fatPercentage
      : goals.proteinPercentage + goals.carbsPercentage;

    const remaining = 100 - newValue;
    
    if (remaining >= 0) {
      const ratio = remaining / totalOthers;
      
      let newGoals = { ...goals };
      
      if (macro === 'protein') {
        newGoals.proteinPercentage = newValue;
        newGoals.carbsPercentage = Math.round(goals.carbsPercentage * ratio);
        newGoals.fatPercentage = Math.round(goals.fatPercentage * ratio);
      } else if (macro === 'carbs') {
        newGoals.carbsPercentage = newValue;
        newGoals.proteinPercentage = Math.round(goals.proteinPercentage * ratio);
        newGoals.fatPercentage = Math.round(goals.fatPercentage * ratio);
      } else {
        newGoals.fatPercentage = newValue;
        newGoals.proteinPercentage = Math.round(goals.proteinPercentage * ratio);
        newGoals.carbsPercentage = Math.round(goals.carbsPercentage * ratio);
      }
      
      onChange(newGoals);
    }
  };

  return (
    <div>
      {/* Protein */}
      <div style={sliderStyles}>
        <div style={labelStyles}>
          <span style={{
            fontSize: EatRiteDesignTokens.typography.scale.body.size,
            fontWeight: 600,
            color: EatRiteDesignTokens.colors.text.primary,
          }}>
            Protein
          </span>
          <span style={{
            fontSize: EatRiteDesignTokens.typography.scale.body.size,
            color: EatRiteDesignTokens.colors.primary.gold,
            fontWeight: 600,
          }}>
            {goals.proteinPercentage}%
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="50"
          value={goals.proteinPercentage}
          onChange={(e) => updateMacroPercentage('protein', parseInt(e.target.value))}
          style={sliderInputStyles}
        />
      </div>

      {/* Carbohydrates */}
      <div style={sliderStyles}>
        <div style={labelStyles}>
          <span style={{
            fontSize: EatRiteDesignTokens.typography.scale.body.size,
            fontWeight: 600,
            color: EatRiteDesignTokens.colors.text.primary,
          }}>
            Carbohydrates
          </span>
          <span style={{
            fontSize: EatRiteDesignTokens.typography.scale.body.size,
            color: EatRiteDesignTokens.colors.semantic.success,
            fontWeight: 600,
          }}>
            {goals.carbsPercentage}%
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="70"
          value={goals.carbsPercentage}
          onChange={(e) => updateMacroPercentage('carbs', parseInt(e.target.value))}
          style={sliderInputStyles}
        />
      </div>

      {/* Fat */}
      <div style={sliderStyles}>
        <div style={labelStyles}>
          <span style={{
            fontSize: EatRiteDesignTokens.typography.scale.body.size,
            fontWeight: 600,
            color: EatRiteDesignTokens.colors.text.primary,
          }}>
            Fat
          </span>
          <span style={{
            fontSize: EatRiteDesignTokens.typography.scale.body.size,
            color: EatRiteDesignTokens.colors.semantic.warning,
            fontWeight: 600,
          }}>
            {goals.fatPercentage}%
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="50"
          value={goals.fatPercentage}
          onChange={(e) => updateMacroPercentage('fat', parseInt(e.target.value))}
          style={sliderInputStyles}
        />
      </div>

      {/* Total Verification */}
      <div style={{
        padding: EatRiteDesignTokens.spacing.md,
        backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
        borderRadius: EatRiteDesignTokens.borderRadius.lg,
        border: `1px solid rgba(212, 180, 106, 0.3)`,
      }}>
        <span style={{
          fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
          color: EatRiteDesignTokens.colors.text.secondary,
        }}>
          Total: {goals.proteinPercentage + goals.carbsPercentage + goals.fatPercentage}%
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// NOTIFICATIONS TAB
// ============================================================================

interface NotificationsTabProps {
  settings: NotificationSettings;
  onChange: (settings: NotificationSettings) => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ settings, onChange }) => {
  const toggleSetting = (key: keyof NotificationSettings) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  const settingItemStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: EatRiteDesignTokens.spacing.lg,
    borderBottom: `1px solid rgba(212, 180, 106, 0.2)`,
  };

  const settingLabelStyles: React.CSSProperties = {
    fontSize: EatRiteDesignTokens.typography.scale.body.size,
    fontWeight: 600,
    color: EatRiteDesignTokens.colors.text.primary,
  };

  const toggleStyles = (isEnabled: boolean): React.CSSProperties => ({
    width: '50px',
    height: '28px',
    borderRadius: '14px',
    backgroundColor: isEnabled ? EatRiteDesignTokens.colors.primary.gold : 'rgba(212, 180, 106, 0.3)',
    cursor: 'pointer',
    position: 'relative',
    transition: `background-color ${EatRiteDesignTokens.animations.duration.normal}`,
  });

  const toggleKnobStyles = (isEnabled: boolean): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: EatRiteDesignTokens.colors.surface.offWhite,
    position: 'absolute',
    top: '2px',
    left: isEnabled ? '24px' : '2px',
    transition: `left ${EatRiteDesignTokens.animations.duration.normal}`,
  });

  const notificationSettings = [
    { key: 'emailNotifications' as const, label: 'Email Notifications', description: 'Receive updates via email' },
    { key: 'pushNotifications' as const, label: 'Push Notifications', description: 'Mobile push notifications' },
    { key: 'mealReminders' as const, label: 'Meal Reminders', description: 'Reminders for meal times' },
    { key: 'supplementReminders' as const, label: 'Supplement Reminders', description: 'Daily supplement notifications' },
    { key: 'progressUpdates' as const, label: 'Progress Updates', description: 'Weekly progress summaries' },
    { key: 'promotionalOffers' as const, label: 'Promotional Offers', description: 'Special deals and discounts' },
    { key: 'weeklyReports' as const, label: 'Weekly Reports', description: 'Detailed nutrition and health reports' },
  ];

  return (
    <EatRiteCard variant="luxury" padding="xl">
      <h3 style={{
        fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
        fontSize: EatRiteDesignTokens.typography.scale.h3.size,
        fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
        color: EatRiteDesignTokens.colors.text.primary,
        marginBottom: EatRiteDesignTokens.spacing.xl,
      }}>
        Notification Preferences
      </h3>

      {notificationSettings.map((setting) => (
        <div key={setting.key} style={settingItemStyles}>
          <div>
            <div style={settingLabelStyles}>{setting.label}</div>
            <div style={{
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              color: EatRiteDesignTokens.colors.text.secondary,
              marginTop: EatRiteDesignTokens.spacing.xs,
            }}>
              {setting.description}
            </div>
          </div>
          
          <div
            onClick={() => toggleSetting(setting.key)}
            style={toggleStyles(settings[setting.key])}
          >
            <div style={toggleKnobStyles(settings[setting.key])} />
          </div>
        </div>
      ))}

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: EatRiteDesignTokens.spacing.md,
        marginTop: EatRiteDesignTokens.spacing.xl,
      }}>
        <EatRiteButton variant="primary" size="lg">
          Save Notification Settings
        </EatRiteButton>
      </div>
    </EatRiteCard>
  );
};

// ============================================================================
// PRIVACY TAB
// ============================================================================

interface PrivacyTabProps {
  settings: PrivacySettings;
  onChange: (settings: PrivacySettings) => void;
  onDeleteAccount?: () => void;
}

const PrivacyTab: React.FC<PrivacyTabProps> = ({ settings, onChange, onDeleteAccount }) => {
  return (
    <div>
      {/* Privacy Settings */}
      <EatRiteCard variant="luxury" padding="xl" style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
        <h3 style={{
          fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
          fontSize: EatRiteDesignTokens.typography.scale.h3.size,
          fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
          color: EatRiteDesignTokens.colors.text.primary,
          marginBottom: EatRiteDesignTokens.spacing.xl,
        }}>
          Privacy & Data Settings
        </h3>

        <div style={{ marginBottom: EatRiteDesignTokens.spacing.xl }}>
          <label style={{
            display: 'block',
            marginBottom: EatRiteDesignTokens.spacing.sm,
            fontSize: EatRiteDesignTokens.typography.scale.body.size,
            fontWeight: 600,
            color: EatRiteDesignTokens.colors.text.primary,
          }}>
            Profile Visibility
          </label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => onChange({ ...settings, profileVisibility: e.target.value as PrivacySettings['profileVisibility'] })}
            style={{
              width: '100%',
              padding: EatRiteDesignTokens.spacing.md,
              borderRadius: EatRiteDesignTokens.borderRadius.lg,
              border: `2px solid ${EatRiteDesignTokens.colors.primary.gold}20`,
              backgroundColor: EatRiteDesignTokens.colors.surface.darkGreenLight,
              color: EatRiteDesignTokens.colors.text.primary,
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
              marginBottom: EatRiteDesignTokens.spacing.xl,
            }}
          >
            <option value="public">Public - Anyone can view</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private - Only you</option>
          </select>
        </div>

        {/* Privacy Toggle Settings */}
        <PrivacyToggles settings={settings} onChange={onChange} />
      </EatRiteCard>

      {/* Danger Zone */}
      <EatRiteCard 
        variant="luxury" 
        padding="xl"
        style={{ 
          border: `2px solid ${EatRiteDesignTokens.colors.semantic.error}40`,
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
        }}
      >
        <h3 style={{
          fontFamily: EatRiteDesignTokens.typography.fontFamilies.heading,
          fontSize: EatRiteDesignTokens.typography.scale.h3.size,
          fontWeight: EatRiteDesignTokens.typography.scale.h3.weight,
          color: EatRiteDesignTokens.colors.semantic.error,
          marginBottom: EatRiteDesignTokens.spacing.lg,
        }}>
          Danger Zone
        </h3>

        <p style={{
          color: EatRiteDesignTokens.colors.text.secondary,
          fontSize: EatRiteDesignTokens.typography.scale.body.size,
          marginBottom: EatRiteDesignTokens.spacing.lg,
        }}>
          Once you delete your account, there is no going back. Please be certain.
        </p>

        <EatRiteButton
          variant="outline"
          size="lg"
          onClick={onDeleteAccount}
          style={{
            borderColor: EatRiteDesignTokens.colors.semantic.error,
            color: EatRiteDesignTokens.colors.semantic.error,
          }}
        >
          Delete Account
        </EatRiteButton>
      </EatRiteCard>
    </div>
  );
};

// ============================================================================
// PRIVACY TOGGLES COMPONENT
// ============================================================================

interface PrivacyTogglesProps {
  settings: PrivacySettings;
  onChange: (settings: PrivacySettings) => void;
}

const PrivacyToggles: React.FC<PrivacyTogglesProps> = ({ settings, onChange }) => {
  const toggleSetting = (key: keyof Omit<PrivacySettings, 'profileVisibility'>) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  const settingItemStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: EatRiteDesignTokens.spacing.lg,
    borderBottom: `1px solid rgba(212, 180, 106, 0.2)`,
  };

  const privacySettings = [
    { key: 'shareProgressData' as const, label: 'Share Progress Data', description: 'Allow sharing of anonymized progress data for research' },
    { key: 'allowDataAnalytics' as const, label: 'Data Analytics', description: 'Help improve our services with usage analytics' },
    { key: 'marketingCommunications' as const, label: 'Marketing Communications', description: 'Receive marketing emails and offers' },
  ];

  return (
    <div>
      {privacySettings.map((setting) => (
        <div key={setting.key} style={settingItemStyles}>
          <div>
            <div style={{
              fontSize: EatRiteDesignTokens.typography.scale.body.size,
              fontWeight: 600,
              color: EatRiteDesignTokens.colors.text.primary,
            }}>
              {setting.label}
            </div>
            <div style={{
              fontSize: EatRiteDesignTokens.typography.scale.bodySmall.size,
              color: EatRiteDesignTokens.colors.text.secondary,
              marginTop: EatRiteDesignTokens.spacing.xs,
            }}>
              {setting.description}
            </div>
          </div>
          
          <div
            onClick={() => toggleSetting(setting.key)}
            style={{
              width: '50px',
              height: '28px',
              borderRadius: '14px',
              backgroundColor: settings[setting.key] ? EatRiteDesignTokens.colors.primary.gold : 'rgba(212, 180, 106, 0.3)',
              cursor: 'pointer',
              position: 'relative',
              transition: `background-color ${EatRiteDesignTokens.animations.duration.normal}`,
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: EatRiteDesignTokens.colors.surface.offWhite,
              position: 'absolute',
              top: '2px',
              left: settings[setting.key] ? '24px' : '2px',
              transition: `left ${EatRiteDesignTokens.animations.duration.normal}`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;