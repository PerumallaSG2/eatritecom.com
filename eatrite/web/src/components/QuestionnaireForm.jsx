import React, { useState } from 'react'

/**
 * Questionnaire form for collecting user health information
 * Submits data to the shared backend API endpoint
 */
const QuestionnaireForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    goal: '',
    dietaryPreferences: '',
    activityLevel: '',
    allergies: ''
  })

  const [submissionState, setSubmissionState] = useState({
    isLoading: false,
    message: '',
    type: '' // 'success' or 'error'
  })

  // Handle form field changes
  const updateFormField = (event) => {
    const { name, value } = event.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Validate form data before submission
  const validateFormData = () => {
    const requiredFields = ['name', 'email', 'goal']
    const missingFields = requiredFields.filter(field => !userData[field].trim())
    
    if (missingFields.length > 0) {
      setSubmissionState({
        isLoading: false,
        type: 'error',
        message: 'Please fill in all required fields.'
      })
      return false
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(userData.email)) {
      setSubmissionState({
        isLoading: false,
        type: 'error',
        message: 'Please enter a valid email address.'
      })
      return false
    }

    return true
  }

  // Submit form to backend API
  const submitQuestionnaire = async (event) => {
    event.preventDefault()
    
    // Clear previous messages
    setSubmissionState({ isLoading: false, message: '', type: '' })
    
    if (!validateFormData()) return

    setSubmissionState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await fetch('http://localhost:3001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmissionState({
          isLoading: false,
          type: 'success',
          message: 'Success! Your personalized nutrition plan is being created. Check your email for updates.'
        })
        
        // Clear form after successful submission
        setUserData({
          name: '',
          email: '',
          goal: '',
          dietaryPreferences: '',
          activityLevel: '',
          allergies: ''
        })
      } else {
        setSubmissionState({
          isLoading: false,
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmissionState({
        isLoading: false,
        type: 'error',
        message: 'Unable to submit your information. Please check your connection and try again.'
      })
    }
  }

  return (
    <section id="questionnaire" className="questionnaire">
      <div className="container">
        <div className="section-title">
          <h2>Get Your Personalized Plan</h2>
          <p>Tell us about yourself to create the perfect nutrition plan for you</p>
        </div>

        <form className="health-form" onSubmit={submitQuestionnaire}>
          <div className="form-field">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={updateFormField}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={updateFormField}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="goal">Primary Health Goal *</label>
            <select
              id="goal"
              name="goal"
              value={userData.goal}
              onChange={updateFormField}
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

          <div className="form-field">
            <label htmlFor="dietaryPreferences">Dietary Preferences</label>
            <select
              id="dietaryPreferences"
              name="dietaryPreferences"
              value={userData.dietaryPreferences}
              onChange={updateFormField}
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

          <div className="form-field">
            <label htmlFor="activityLevel">Activity Level</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={userData.activityLevel}
              onChange={updateFormField}
            >
              <option value="">Select your activity level</option>
              <option value="sedentary">Sedentary (desk job, minimal exercise)</option>
              <option value="light">Light (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (exercise 3-5 days/week)</option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="very-active">Very Active (intense daily training)</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="allergies">Food Allergies & Restrictions</label>
            <textarea
              id="allergies"
              name="allergies"
              value={userData.allergies}
              onChange={updateFormField}
              placeholder="List any allergies, intolerances, or foods to avoid..."
              rows="3"
            />
          </div>

          {submissionState.message && (
            <div className={`form-message ${submissionState.type}`}>
              {submissionState.message}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={submissionState.isLoading}
          >
            {submissionState.isLoading ? 'Creating Your Plan...' : 'Get My Nutrition Plan'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default QuestionnaireForm