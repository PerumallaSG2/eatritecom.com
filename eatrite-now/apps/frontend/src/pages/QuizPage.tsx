import { useState } from 'react';
import { buildApiUrl } from '../config/api';

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    
    // Health & Activity
    activityLevel: '',
    healthGoals: '',
    
    // Dietary Information
    dietaryRestrictions: '',
    allergies: '',
    mealsPerDay: '3',
    
    // Preferences
    budget: '',
    
    // Legacy fields for backward compatibility
    dietaryGoals: '',
    mealsPerWeek: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const totalSteps = 6;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(buildApiUrl('/api/quiz/submit'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your information has been submitted successfully. We\'ll create your personalized meal plan soon!');
        // Reset form
        setFormData({
          name: '', email: '', age: '', gender: '', height: '', weight: '',
          activityLevel: '', healthGoals: '', dietaryRestrictions: '', allergies: '',
          mealsPerDay: '3', budget: '', dietaryGoals: '', mealsPerWeek: ''
        });
        setCurrentStep(1);
      } else {
        setSubmitMessage('There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your information. Please try again.');
    }

    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your age"
                  min="18"
                  max="100"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Physical Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm) *
                </label>
                <input
                  type="number"
                  id="height"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter height in cm"
                  min="120"
                  max="250"
                  required
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter weight in kg"
                  min="30"
                  max="300"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity & Goals</h2>
            <div>
              <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level *
              </label>
              <select
                id="activityLevel"
                value={formData.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            <div>
              <label htmlFor="healthGoals" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Health Goals *
              </label>
              <select
                id="healthGoals"
                value={formData.healthGoals}
                onChange={(e) => handleInputChange('healthGoals', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dietary Preferences</h2>
            <div>
              <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Preferences
              </label>
              <select
                id="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-2">
                Food Allergies or Intolerances
              </label>
              <textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Please list any food allergies or intolerances..."
                rows={4}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Meal Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="mealsPerDay" className="block text-sm font-medium text-gray-700 mb-2">
                  Meals Per Day
                </label>
                <select
                  id="mealsPerDay"
                  value={formData.mealsPerDay}
                  onChange={(e) => handleInputChange('mealsPerDay', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="2">2 Meals</option>
                  <option value="3">3 Meals</option>
                  <option value="4">4 Meals</option>
                  <option value="5">5 Meals</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Weekly Budget (USD)
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Budget</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-150">$100 - $150</option>
                  <option value="150-200">$150 - $200</option>
                  <option value="200+">$200+</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Age:</strong> {formData.age}</div>
                <div><strong>Gender:</strong> {formData.gender}</div>
                <div><strong>Height:</strong> {formData.height} cm</div>
                <div><strong>Weight:</strong> {formData.weight} kg</div>
                <div><strong>Activity Level:</strong> {formData.activityLevel}</div>
                <div><strong>Health Goals:</strong> {formData.healthGoals}</div>
                <div><strong>Dietary Preferences:</strong> {formData.dietaryRestrictions || 'None'}</div>
                <div><strong>Meals Per Day:</strong> {formData.mealsPerDay}</div>
                <div><strong>Budget:</strong> {formData.budget || 'Not specified'}</div>
              </div>
              {formData.allergies && (
                <div className="mt-4">
                  <strong>Allergies/Intolerances:</strong>
                  <p className="text-sm text-gray-600 mt-1">{formData.allergies}</p>
                </div>
              )}
            </div>
            {submitMessage && (
              <div className={`p-4 rounded-lg ${submitMessage.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {submitMessage}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get Your Personalized Meal Plan</h1>
          <p className="text-lg text-gray-600">Tell us about yourself to create the perfect nutrition plan for you</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg'
            }`}
          >
            Previous
          </button>
          
          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Creating Your Plan...' : 'Get My Meal Plan'}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-700 hover:shadow-lg transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;