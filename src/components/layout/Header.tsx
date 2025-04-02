'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Close menu if open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      // Scroll to the element with smooth animation
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Update URL without causing a jump
      window.history.pushState(null, '', targetId);
    }
  };

  return (
    <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/assets/images/dark.png" 
            alt="Ahmed Gharib Logo" 
            width={40} 
            height={40} 
            className="mr-2"
          />
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Ahmed Gharib</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a 
            href="#hero" 
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => handleSmoothScroll(e, '#hero')}
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => handleSmoothScroll(e, '#about')}
          >
            About
          </a>
          <a 
            href="#experience" 
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => handleSmoothScroll(e, '#experience')}
          >
            Experience
          </a>
          <a 
            href="#projects" 
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => handleSmoothScroll(e, '#projects')}
          >
            Projects
          </a>
          <a 
            href="#skills" 
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => handleSmoothScroll(e, '#skills')}
          >
            Skills
          </a>
          <a 
            href="#contact" 
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#hero" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => handleSmoothScroll(e, '#hero')}
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => handleSmoothScroll(e, '#about')}
            >
              About
            </a>
            <a 
              href="#experience" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => handleSmoothScroll(e, '#experience')}
            >
              Experience
            </a>
            <a 
              href="#projects" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => handleSmoothScroll(e, '#projects')}
            >
              Projects
            </a>
            <a 
              href="#skills" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => handleSmoothScroll(e, '#skills')}
            >
              Skills
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
