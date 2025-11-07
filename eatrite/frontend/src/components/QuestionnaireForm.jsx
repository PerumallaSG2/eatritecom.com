import React, { useState } from 'react'

/**
 * Questionnaire form component for collecting user health information
 * Handles form state, validation, and submission to the backend API
 */
const QuestionnaireForm = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '',
    dietaryPreferences: '',
    activityLevel: '',
    allergies: ''
  })

  // UI state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  // Handle input changes with proper state updates
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Form validation logic
  const validateForm = () => {
    const requiredFields = ['name', 'email', 'goal']
    const missingFields = requiredFields.filter(field => !formData[field].trim())
    
    if (missingFields.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      })
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      })
      return false
    }

    return true
  }

  // Handle form submission to backend API
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    
    // Clear previous status messages
    setSubmitStatus({ type: '', message: '' })
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }

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
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your information has been submitted successfully. We\'ll create your personalized nutrition plan soon!'
        })
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          goal: '',
          dietaryPreferences: '',
          activityLevel: '',
          allergies: ''
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Unable to connect to our servers. Please check your internet connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="questionnaire" className="questionnaire">
      <div className="container">
        <header className="section-header">
          <h2>Tell Us About Yourself</h2>
          <p>Help us create the perfect nutrition plan for your unique needs</p>
        </header>

        <form className="questionnaire-form" onSubmit={handleFormSubmit}>
          {/* Personal Information */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Health Goals */}
          <div className="form-group">
            <label htmlFor="goal">Primary Health Goal *</label>
            <select
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your main goal</option>
              <option value="weight-loss">Lose Weight</option>
              <option value="weight-gain">Gain Weight</option>
              <option value="muscle-building">Build Muscle</option>
              <option value="maintenance">Maintain Current Weight</option>
              <option value="general-health">Improve Overall Health</option>
              <option value="energy">Increase Energy Levels</option>
            </select>
          </div>

          {/* Dietary Preferences */}
          <div className="form-group">
            <label htmlFor="dietaryPreferences">Dietary Preferences</label>
            <select
              id="dietaryPreferences"
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleInputChange}
            >
              <option value="">No specific preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Ketogenic</option>
              <option value="paleo">Paleo</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="low-carb">Low Carb</option>
              <option value="gluten-free">Gluten Free</option>
            </select>
          </div>

          {/* Activity Level */}
          <div className="form-group">
            <label htmlFor="activityLevel">Activity Level</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleInputChange}
            >
              <option value="">Select your activity level</option>
              <option value="sedentary">Sedentary (desk job, little exercise)</option>
              <option value="light">Light (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (exercise 3-5 days/week)</option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="very-active">Very Active (intense daily exercise)</option>
            </select>
          </div>

          {/* Allergies and Restrictions */}
          <div className="form-group">
            <label htmlFor="allergies">Food Allergies & Restrictions</label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="List any food allergies, intolerances, or foods you prefer to avoid..."
              rows="3"
            />
          </div>

          {/* Status Messages */}
          {submitStatus.message && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Your Plan...' : 'Get My Nutrition Plan'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default QuestionnaireForm