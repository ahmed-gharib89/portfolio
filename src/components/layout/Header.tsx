'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

interface HeaderProps {
  scrollToSection?: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Handle section navigation with smooth scrolling
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // Only handle section navigation on the home page
    if (window.location.pathname === '/') {
      e.preventDefault();
      if (scrollToSection) {
        scrollToSection(sectionId);
      } else {
        // Fallback if scrollToSection is not provided
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
      setActiveSection(sectionId);
      closeMobileMenu();
    }
  };
  
  // Define navigation items to avoid duplication
  const navigationItems = [
    { href: "/", label: "Home", sectionId: null },
    { href: "/#about", label: "About", sectionId: "about" },
    { href: "/#experience", label: "Experience", sectionId: "experience" },
    { href: "/#projects", label: "Projects", sectionId: "projects" },
    { href: "/#skills", label: "Skills", sectionId: "skills" },
    { href: "/blog", label: "Blog", sectionId: null },
    { href: "/#contact", label: "Contact", sectionId: "contact" }
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Ahmed Gharib
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            item.sectionId ? (
              <a 
                key={item.label}
                href={item.href} 
                className={`nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                  activeSection === item.sectionId ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                }`}
                onClick={(e) => handleSectionClick(e, item.sectionId)}
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={item.label}
                href={item.href} 
                className="nav-link text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            )
          ))}
          
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
              {navigationItems.map((item) => (
                item.sectionId ? (
                  <a 
                    key={item.label}
                    href={item.href} 
                    className={`text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      activeSection === item.sectionId ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
                    }`}
                    onClick={(e) => handleSectionClick(e, item.sectionId)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link 
                    key={item.label}
                    href={item.href} 
                    className="text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
