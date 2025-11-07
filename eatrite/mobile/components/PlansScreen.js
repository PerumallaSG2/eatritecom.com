import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native'

/**
 * Plans screen showcasing nutrition plan options
 * Mobile version of the web nutrition plans section
 */
const PlansScreen = ({ navigation }) => {
  const nutritionPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$89',
      period: 'per week',
      description: 'Perfect for getting started with healthy eating',
      features: [
        'Personalized weekly meal plan',
        '10 meals included',
        'Basic nutrition tracking',
        'Email customer support',
        'Recipe cards and tips'
      ],
      isPopular: false,
      buttonText: 'Start Trial'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$149',
      period: 'per week',
      description: 'Most popular plan for complete nutrition transformation',
      features: [
        'Everything in Starter plan',
        '21 meals per week',
        'Advanced nutrition analytics',
        'Priority customer support',
        'Monthly nutritionist consultation',
        'Custom meal modifications'
      ],
      isPopular: true,
      buttonText: 'Get Started'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '$219',
      period: 'per week',
      description: 'Ultimate plan with premium support and unlimited options',
      features: [
        'Everything in Premium plan',
        'Unlimited meal variety',
        'Weekly nutritionist check-ins',
        'Custom recipe requests',
        '24/7 priority support',
        'Fitness plan integration',
        'Detailed progress reports'
      ],
      isPopular: false,
      buttonText: 'Go Elite'
    }
  ]

  // Handle plan selection
  const selectPlan = (plan) => {
    Alert.alert(
      'Plan Selected',
      `You chose the ${plan.name} plan for ${plan.price}/week. In a real app, this would take you to checkout.`,
      [
        {
          text: 'Start Questionnaire',
          onPress: () => navigation.navigate('Questionnaire')
        },
        {
          text: 'OK',
          style: 'default'
        }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choose Your Plan</Text>
          <Text style={styles.headerSubtitle}>
            Select the nutrition plan that fits your lifestyle and goals
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {nutritionPlans.map((plan) => (
            <View 
              key={plan.id} 
              style={[
                styles.planCard,
                plan.isPopular && styles.popularPlanCard
              ]}
            >
              {plan.isPopular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Most Popular</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.planPricing}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </View>
                <Text style={styles.planDescription}>{plan.description}</Text>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureCheck}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.planButton,
                  plan.isPopular && styles.popularPlanButton
                ]}
                onPress={() => selectPlan(plan)}
              >
                <Text style={[
                  styles.planButtonText,
                  plan.isPopular && styles.popularPlanButtonText
                ]}>
                  {plan.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.plansInfo}>
          <Text style={styles.infoText}>
            All plans include free delivery, organic ingredients, and 24/7 customer support. 
            Cancel anytime.
          </Text>
        </View>

        {/* Footer Credit */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Web Design by <Text style={styles.creditText}>Sairam Perumalla</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  plansContainer: {
    padding: 20,
    gap: 20,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  popularPlanCard: {
    borderColor: '#48bb78',
    shadowOpacity: 0.1,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#48bb78',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  popularBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  planPricing: {
    alignItems: 'center',
    marginBottom: 15,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#48bb78',
  },
  planPeriod: {
    fontSize: 14,
    color: '#718096',
  },
  planDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  planFeatures: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  featureCheck: {
    color: '#48bb78',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#2d3748',
    lineHeight: 20,
  },
  planButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#48bb78',
    paddingVertical: 16,
    borderRadius: 12,
  },
  popularPlanButton: {
    backgroundColor: '#48bb78',
    borderColor: '#48bb78',
  },
  planButtonText: {
    color: '#48bb78',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  popularPlanButtonText: {
    color: 'white',
  },
  plansInfo: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#2d3748',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#a0aec0',
  },
  creditText: {
    color: '#48bb78',
    fontWeight: '600',
  },
})

export default PlansScreen