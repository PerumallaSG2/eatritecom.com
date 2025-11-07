import React, { useState } from 'react'

const QuestionnaireForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    healthGoals: '',
    dietaryRestrictions: '',
    allergies: '',
    mealsPerDay: '3',
    budget: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitMessage('Thank you! Your information has been submitted successfully. We\'ll create your personalized plan soon!')
        setFormData({
          name: '',
          email: '',
          age: '',
          gender: '',
          height: '',
          weight: '',
          activityLevel: '',
          healthGoals: '',
          dietaryRestrictions: '',
          allergies: '',
          mealsPerDay: '3',
          budget: ''
        })
      } else {
        setSubmitMessage('There was an error submitting your information. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your information. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <section id="questionnaire" className="questionnaire">
      <div className="container">
        <div className="section-header">
          <h2>Start Your Personalized Journey</h2>
          <p>Tell us about yourself to get a nutrition plan that works for you</p>
        </div>

        <form className="questionnaire-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="height">Height (cm) *</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="120"
                max="250"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg) *</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="30"
                max="300"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="activityLevel">Activity Level *</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (hard exercise 6-7 days/week)</option>
              <option value="very-active">Very Active (very hard exercise, physical job)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="healthGoals">Primary Health Goals *</label>
            <select
              id="healthGoals"
              name="healthGoals"
              value={formData.healthGoals}
              onChange={handleChange}
              required
            >
              <option value="">Select Your Goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="weight-gain">Weight Gain</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintain Current Weight</option>
              <option value="general-health">General Health & Wellness</option>
              <option value="energy">Increase Energy</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dietaryRestrictions">Dietary Preferences</label>
            <select
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
            >
              <option value="">No Restrictions</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Ketogenic</option>
              <option value="paleo">Paleo</option>
              <option value="mediterranean">Mediterranean</option>
              <option value="low-carb">Low Carb</option>
              <option value="gluten-free">Gluten Free</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="allergies">Food Allergies or Intolerances</label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Please list any food allergies or intolerances..."
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mealsPerDay">Meals Per Day</label>
              <select
                id="mealsPerDay"
                name="mealsPerDay"
                value={formData.mealsPerDay}
                onChange={handleChange}
              >
                <option value="2">2 Meals</option>
                <option value="3">3 Meals</option>
                <option value="4">4 Meals</option>
                <option value="5">5 Meals</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="budget">Weekly Budget (USD)</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">Select Budget</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-150">$100 - $150</option>
                <option value="150-200">$150 - $200</option>
                <option value="200+">$200+</option>
              </select>
            </div>
          </div>

          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
              {submitMessage}
            </div>
          )}

          <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Get My Personalized Plan'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default QuestionnaireForm