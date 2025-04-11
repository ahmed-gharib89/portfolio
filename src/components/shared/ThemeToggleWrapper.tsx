'use client';

import { createClientOnlyComponent } from '@/lib/utils/component-loader';

// Dynamically import the ThemeToggle component
// This ensures it's only loaded client-side and not included in the main bundle
const ThemeToggle = createClientOnlyComponent(
  () => import('@/components/shared/ThemeToggle'),
  {
    // Display a simple placeholder while loading
    loading: () => (
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <span className="animate-pulse bg-gray-200 dark:bg-gray-700 w-5 h-5 rounded-full"></span>
      </div>
    ),
  }
);

export default ThemeToggle;
