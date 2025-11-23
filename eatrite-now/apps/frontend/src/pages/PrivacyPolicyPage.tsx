import React from 'react'
import { Shield, Lock, Eye, UserCheck, FileText, Mail } from 'lucide-react'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how EatRite collects, uses, and protects your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Updated: November 23, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Delivery address and billing information</li>
                  <li>Dietary preferences and restrictions</li>
                  <li>Health goals and nutritional information (optional)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Usage Data</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Order history and meal preferences</li>
                  <li>App usage patterns and interactions</li>
                  <li>Device information and IP address</li>
                  <li>Location data for delivery purposes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Payment Information</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Credit card information (processed securely by Stripe)</li>
                  <li>Payment history and transaction details</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="text-gray-700 space-y-3">
              <p><strong>Service Delivery:</strong> Process orders, arrange delivery, and provide customer support.</p>
              <p><strong>Personalization:</strong> Recommend meals based on your preferences and dietary needs.</p>
              <p><strong>Communication:</strong> Send order confirmations, delivery updates, and promotional offers.</p>
              <p><strong>Analytics:</strong> Improve our app performance and user experience.</p>
              <p><strong>AI Features:</strong> Power our nutrition tracking and meal recommendation algorithms.</p>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Protection & Security</h2>
            </div>
            
            <div className="text-gray-700 space-y-3">
              <p><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols.</p>
              <p><strong>Secure Storage:</strong> Personal data is stored on secure servers with restricted access.</p>
              <p><strong>Payment Security:</strong> We use Stripe for payment processing and do not store credit card information.</p>
              <p><strong>Access Controls:</strong> Only authorized personnel can access your data for legitimate business purposes.</p>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-orange-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Data Sharing</h2>
            </div>
            
            <div className="text-gray-700">
              <p className="mb-3">We do not sell your personal information. We may share data with:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Service Providers:</strong> Delivery partners, payment processors, and analytics services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
            </div>
            
            <div className="text-gray-700">
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability (export your data)</li>
                <li>Object to processing for direct marketing</li>
              </ul>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies & Tracking</h2>
            <div className="text-gray-700 space-y-3">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Remember your preferences and login status</li>
                <li>Analyze app usage and performance</li>
                <li>Provide personalized content and recommendations</li>
                <li>Enable social media features</li>
              </ul>
              <p>You can control cookies through your browser settings.</p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700">
              EatRite is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Continued use of our service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            </div>
            
            <div className="text-gray-700 space-y-2">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="mt-4 space-y-1">
                <p><strong>Email:</strong> privacy@eatrite.com</p>
                <p><strong>Phone:</strong> 1-800-EATRITE</p>
                <p><strong>Address:</strong> EatRite Privacy Officer<br />
                123 Healthy Street<br />
                Nutrition City, NC 12345</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage