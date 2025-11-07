import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

/**
 * Questionnaire screen for collecting user health information
 * Mobile version of the web questionnaire form
 */
const QuestionnaireScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '',
    dietaryPreferences: '',
    activityLevel: '',
    allergies: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update form fields
  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Validate form before submission
  const validateForm = () => {
    const requiredFields = ['name', 'email', 'goal']
    const missingFields = requiredFields.filter(field => !formData[field].trim())
    
    if (missingFields.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields.')
      return false
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.')
      return false
    }

    return true
  }

  // Submit questionnaire to backend
  const submitForm = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        Alert.alert(
          'Success!', 
          'Your personalized nutrition plan is being created. Check your email for updates.',
          [
            {
              text: 'View Plans',
              onPress: () => navigation.navigate('Plans')
            },
            {
              text: 'OK',
              style: 'default'
            }
          ]
        )
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          goal: '',
          dietaryPreferences: '',
          activityLevel: '',
          allergies: ''
        })
      } else {
        Alert.alert('Error', result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      Alert.alert(
        'Connection Error', 
        'Unable to submit your information. Please check your internet connection and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Tell Us About Yourself</Text>
          <Text style={styles.formSubtitle}>
            Help us create the perfect nutrition plan for your unique needs
          </Text>

          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="Enter your full name"
              placeholderTextColor="#a0aec0"
            />
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email Address *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="your.email@example.com"
              placeholderTextColor="#a0aec0"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Goal Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Primary Health Goal *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.goal}
                onValueChange={(value) => updateField('goal', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select your main goal" value="" />
                <Picker.Item label="Lose Weight" value="weight-loss" />
                <Picker.Item label="Gain Weight" value="weight-gain" />
                <Picker.Item label="Build Muscle" value="muscle-building" />
                <Picker.Item label="Maintain Current Weight" value="maintenance" />
                <Picker.Item label="Improve Overall Health" value="general-health" />
                <Picker.Item label="Increase Energy Levels" value="energy" />
              </Picker>
            </View>
          </View>

          {/* Dietary Preferences */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Dietary Preferences</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.dietaryPreferences}
                onValueChange={(value) => updateField('dietaryPreferences', value)}
                style={styles.picker}
              >
                <Picker.Item label="No specific preference" value="" />
                <Picker.Item label="Vegetarian" value="vegetarian" />
                <Picker.Item label="Vegan" value="vegan" />
                <Picker.Item label="Ketogenic" value="keto" />
                <Picker.Item label="Paleo" value="paleo" />
                <Picker.Item label="Mediterranean" value="mediterranean" />
                <Picker.Item label="Low Carb" value="low-carb" />
                <Picker.Item label="Gluten Free" value="gluten-free" />
              </Picker>
            </View>
          </View>

          {/* Activity Level */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Activity Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.activityLevel}
                onValueChange={(value) => updateField('activityLevel', value)}
                style={styles.picker}
              >
                <Picker.Item label="Select your activity level" value="" />
                <Picker.Item label="Sedentary (desk job, minimal exercise)" value="sedentary" />
                <Picker.Item label="Light (light exercise 1-3 days/week)" value="light" />
                <Picker.Item label="Moderate (exercise 3-5 days/week)" value="moderate" />
                <Picker.Item label="Active (exercise 6-7 days/week)" value="active" />
                <Picker.Item label="Very Active (intense daily training)" value="very-active" />
              </Picker>
            </View>
          </View>

          {/* Allergies Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Food Allergies & Restrictions</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.allergies}
              onChangeText={(value) => updateField('allergies', value)}
              placeholder="List any allergies, intolerances, or foods to avoid..."
              placeholderTextColor="#a0aec0"
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={submitForm}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Creating Your Plan...' : 'Get My Nutrition Plan'}
            </Text>
          </TouchableOpacity>
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
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#2d3748',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  picker: {
    height: 50,
    color: '#2d3748',
  },
  submitButton: {
    backgroundColor: '#48bb78',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0aec0',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default QuestionnaireScreen