import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'

/**
 * Home screen with hero section and navigation to other screens
 * Mobile version of the web's hero and how-it-works sections
 */
const HomeScreen = ({ navigation }) => {
  // Process steps for "How It Works" section
  const steps = [
    {
      number: 1,
      title: "Complete Your Profile",
      description: "Share your health goals and dietary preferences",
      emoji: "📝"
    },
    {
      number: 2,
      title: "Get Custom Plan",
      description: "Receive a personalized nutrition plan",
      emoji: "🎯"
    },
    {
      number: 3,
      title: "Fresh Meals Delivered",
      description: "Enjoy healthy meals at your doorstep",
      emoji: "🚚"
    },
    {
      number: 4,
      title: "Track Progress",
      description: "Monitor your wellness journey",
      emoji: "📈"
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>🥗</Text>
          </View>
          <Text style={styles.heroTitle}>
            Transform Your Health with{'\n'}
            <Text style={styles.highlightText}>Personalized Nutrition</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Get custom meal plans designed for your unique body, goals, and lifestyle. 
            Fresh, nutritious meals delivered straight to your door.
          </Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Questionnaire')}
            >
              <Text style={styles.primaryButtonText}>Start Your Journey</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Plans')}
            >
              <Text style={styles.secondaryButtonText}>View Plans</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* How It Works Section */}
        <View style={styles.howItWorksSection}>
          <Text style={styles.sectionTitle}>How Eatrite Works</Text>
          <Text style={styles.sectionSubtitle}>
            Your wellness transformation in four simple steps
          </Text>
          
          <View style={styles.stepsContainer}>
            {steps.map((step) => (
              <View key={step.number} style={styles.stepCard}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{step.number}</Text>
                  </View>
                  <Text style={styles.stepEmoji}>{step.emoji}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            ))}
          </View>
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
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f7fafc',
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#48bb78',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  heroEmoji: {
    fontSize: 50,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2d3748',
    marginBottom: 20,
    lineHeight: 36,
  },
  highlightText: {
    color: '#48bb78',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#718096',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  heroButtons: {
    width: '100%',
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#48bb78',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#48bb78',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#48bb78',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  howItWorksSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2d3748',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#718096',
    marginBottom: 30,
  },
  stepsContainer: {
    gap: 20,
  },
  stepCard: {
    backgroundColor: '#f7fafc',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#48bb78',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepEmoji: {
    fontSize: 30,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
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

export default HomeScreen