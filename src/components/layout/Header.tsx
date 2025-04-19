'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Lazy load components to reduce initial bundle size
const ThemeToggle = React.lazy(() => import('../ThemeToggle'));

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image 
              src="/assets/images/dark.png" 
              alt="Ahmed Gharib Logo" 
              width={40} 
              height={40} 
              className="rounded-md"
            />
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            Ahmed Gharib
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </a>
          <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About
          </a>
          <a href="/experience" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Experience
          </a>
          <a href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Projects
          </a>
          <a href="/skills" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Skills
          </a>
          <a href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Blog
          </a>
          <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Contact
          </a>
          
          {/* Theme Toggle */}
          {mounted && (
            <React.Suspense fallback={<div className="w-6 h-6"></div>}>
              <ThemeToggle />
            </React.Suspense>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {mounted && (
            <React.Suspense fallback={<div className="w-6 h-6 mr-4"></div>}>
              <ThemeToggle />
            </React.Suspense>
          )}
          
          <button 
            onClick={toggleMobileMenu}
            className="ml-4 text-gray-700 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 pt-20">
            <nav className="flex flex-col items-center space-y-6 p-6">
              <a 
                href="/" 
                className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </a>
              <a 
                href="/about" 
                className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </a>
              <a 
                href="/experience" 
                className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                Experience
              </a>
              <a 
                href="/projects" 
                className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                Projects
              </a>
              <a 
                href="/skills" 
                className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                Skills
              </a>
              <a 
                href="/blog" 
                className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                Blog
              </a>
              <a 
                href="/contact" 
                className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
