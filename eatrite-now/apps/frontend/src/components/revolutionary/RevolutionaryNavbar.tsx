import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import livingFoodTokens from '../../styles/design-system/living-food-tokens';

interface RevolutionaryNavbarProps {
  selectedGoal?: 'energy' | 'wellness' | 'performance' | 'balance';
}

const RevolutionaryNavbar: React.FC<RevolutionaryNavbarProps> = ({ 
  selectedGoal = 'energy' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentTheme = livingFoodTokens.colors.adaptive[selectedGoal];

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/menu', label: 'Menu', icon: '🍽️' },
    { path: '/plans', label: 'Plans', icon: '📋' },
    { path: '/pricing', label: 'Pricing', icon: '💳' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        background: `${currentTheme.bg}95`,
        borderBottom: `1px solid ${currentTheme.primary}30`
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
              style={{ 
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: `0 4px 12px ${currentTheme.primary}40`
              }}
            >
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-bold text-white">EatRite</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                  style={{
                    background: isActive ? `${currentTheme.primary}30` : 'transparent',
                    border: isActive ? `1px solid ${currentTheme.primary}` : '1px solid transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Health Goal Indicator */}
            <motion.div
              className="hidden md:flex items-center px-3 py-2 rounded-lg"
              style={{
                background: `${currentTheme.primary}20`,
                border: `1px solid ${currentTheme.primary}40`
              }}
              animate={{
                boxShadow: [
                  `0 0 10px ${currentTheme.primary}30`,
                  `0 0 20px ${currentTheme.primary}50`,
                  `0 0 10px ${currentTheme.primary}30`
                ]
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ background: currentTheme.primary }}
              />
              <span className="text-white/90 text-sm font-medium">
                {selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)} Mode
              </span>
            </motion.div>

            {/* Cart Button */}
            <motion.button
              className="relative p-2 rounded-lg"
              style={{
                background: `${currentTheme.secondary}20`,
                border: `1px solid ${currentTheme.secondary}40`
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: `${currentTheme.secondary}30`
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} className="text-white" />
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                  style={{ background: currentTheme.primary }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg"
              style={{
                background: `${currentTheme.primary}20`,
                border: `1px solid ${currentTheme.primary}40`
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t"
            style={{ borderColor: `${currentTheme.primary}30` }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.button
                    key={link.path}
                    onClick={() => handleNavigation(link.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-white/70'
                    }`}
                    style={{
                      background: isActive ? `${currentTheme.primary}30` : 'transparent',
                      border: isActive ? `1px solid ${currentTheme.primary}` : '1px solid transparent'
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </motion.button>
                );
              })}
              
              {/* Mobile Goal Indicator */}
              <div 
                className="flex items-center justify-center space-x-2 py-3 mt-4 rounded-lg"
                style={{
                  background: `${currentTheme.primary}20`,
                  border: `1px solid ${currentTheme.primary}40`
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: currentTheme.primary }}
                />
                <span className="text-white/90 text-sm font-medium">
                  {selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)} Mode Active
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default RevolutionaryNavbar;