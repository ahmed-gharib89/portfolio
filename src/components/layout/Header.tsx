'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggleWrapper';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // Consider all section paths as home page to ensure navigation works consistently
  const sectionPaths = ['/', '/home', '/about', '/experience', '/projects', '/skills', '/contact'];
  const isHomePage = sectionPaths.includes(pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionPath: string, sectionId: string) => {
    e.preventDefault();
    
    // If not on homepage, navigate to homepage with section path
    if (!isHomePage) {
      window.location.href = sectionPath;
      return;
    }
    
    const targetElement = document.querySelector(`#${sectionId}`);
    
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

      // Update URL without causing a page reload
      window.history.pushState(null, '', sectionPath);
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
        <div className="hidden md:flex items-center">
          <nav className="flex space-x-8 mr-4">
            <a 
              href="/home" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/home' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/home', 'hero')}
            >
              Home
            </a>
            <a 
              href="/about" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/about' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/about', 'about')}
            >
              About
            </a>
            <a 
              href="/experience" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/experience' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/experience', 'experience')}
            >
              Experience
            </a>
            <a 
              href="/projects" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/projects' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/projects', 'projects')}
            >
              Projects
            </a>
            <a 
              href="/skills" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/skills' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/skills', 'skills')}
            >
              Skills
            </a>
            <Link 
              href="/blog"
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/blog' || pathname.startsWith('/blog/') ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              Blog
            </Link>
            <a 
              href="/contact" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/contact' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/contact', 'contact')}
            >
              Contact
            </a>
          </nav>
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Header Actions */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button 
            className="text-gray-700 dark:text-gray-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="/home" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/home' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/home', 'hero')}
            >
              Home
            </a>
            <a 
              href="/about" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/about' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/about', 'about')}
            >
              About
            </a>
            <a 
              href="/experience" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/experience' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/experience', 'experience')}
            >
              Experience
            </a>
            <a 
              href="/projects" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/projects' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/projects', 'projects')}
            >
              Projects
            </a>
            <a 
              href="/skills" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/skills' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/skills', 'skills')}
            >
              Skills
            </a>
            <Link 
              href="/blog"
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/blog' || pathname.startsWith('/blog/') ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              Blog
            </Link>
            <a 
              href="/contact" 
              className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === '/contact' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
              onClick={(e) => handleSmoothScroll(e, '/contact', 'contact')}
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
