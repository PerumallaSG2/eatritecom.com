import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Menu & Services */}
          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/menu"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Weekly Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/plans"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Our Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Delivery Options
                </Link>
              </li>
              <li>
                <Link
                  to="/nutrition-coaching"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Nutrition Coaching
                </Link>
              </li>
              <li>
                <Link
                  to="/corporate"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Corporate Sales & Partnerships
                </Link>
              </li>
              <li>
                <Link
                  to="/add-ons"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Add-Ons
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/student-beans"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Student Beans
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/working-at-factor"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Working At Factor
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile App */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <h3 className="text-gray-900 font-semibold text-base mb-2">
                Download our app
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Manage your deliveries from anywhere, anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                {/* Apple Store Badge */}
                <a
                  href="#"
                  className="inline-block bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="text-xs font-semibold">App Store</div>
                    </div>
                  </div>
                </a>

                {/* Google Play Badge */}
                <a
                  href="#"
                  className="inline-block bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div>
                      <div className="text-xs">Get it on</div>
                      <div className="text-xs font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-600 text-sm">© EatRite 2025</p>
              <Link
                to="/accessibility"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Accessibility
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Link
                to="/terms"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/do-not-sell"
                className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
              >
                Do Not Sell or Share My Personal Information
              </Link>
            </div>
          </div>

          {/* Credit */}
          <div className="text-center mt-4 pt-3 border-t border-gray-100">
            <p className="text-gray-500 text-xs">
              Web design by{' '}
              <span className="text-blue-600 font-medium">
                Sairam Perumalla
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
