/**
 * This file defines dynamic import configurations for code splitting
 * It helps reduce initial bundle size by loading components only when needed
 */

// Blog components - dynamically imported only when visiting blog pages
export const dynamicBlogComponents = async () => {
  try {
    // Blog page component, using the correct path
    const mod = await import('../app/blog/page');
    return mod.default;
  } catch (error) {
    console.warn('Blog page component not found', error);
    return null;
  }
};

// Animation components - can be lazy loaded
export const loadAnimatedSection = () => {
  return import('../components/animation/AnimatedSection').then((mod) => mod.default);
};

// ThemeToggle - used for dark/light mode
export const loadThemeToggle = () => {
  return import('../components/ThemeToggle').then((mod) => mod.default);
};
