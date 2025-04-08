import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Helper functions for lazy loading components
 * This helps reduce the initial JavaScript bundle size
 */

// Create a Next.js dynamic imported component 
export function createDynamicComponent(importFn: () => Promise<{ default: React.ComponentType<any> }>, options: Record<string, any> = {}) {
  return dynamic(importFn, {
    ssr: true, // Default to ssr enabled
    loading: function LoadingComponent() { 
      return React.createElement('div', { 
        className: "animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md h-32" 
      });
    },
    ...options
  });
}

// Create a component that only loads on client-side
export function createClientOnlyComponent(importFn: () => Promise<{ default: React.ComponentType<any> }>, options: Record<string, any> = {}) {
  return dynamic(importFn, {
    ssr: false,
    ...options
  });
}
