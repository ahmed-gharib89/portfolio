'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * Custom hook for managing theme state
 * @returns Object containing theme state and functions to manipulate it
 */
export function useTheme() {
  // Initialize with system preference but will be updated from localStorage in useEffect
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    setMounted(true);
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    if (theme === 'dark') {
      // Switch to light mode
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      // Switch to dark mode
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  /**
   * Set a specific theme
   * @param newTheme The theme to set
   */
  const setThemeValue = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    setTheme: setThemeValue,
    mounted
  };
}
