/**
 * Next.js configuration helper for module chunking and code splitting
 * To be used in next.config.js 
 */

/**
 * Creates module groups for better chunk splitting
 * This helps organize code into logical bundles for better caching
 * 
 * @param {Object} config The webpack config object
 * @returns {Object} Updated webpack config
 */
function configureChunking(config) {
  // Return if config is not available
  if (!config) return config;

  // Modify the webpack config to customize chunking
  config.optimization = {
    ...config.optimization,
    // Configure chunk splitting
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Group React and related packages
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
          name: 'framework',
          priority: 40,
          chunks: 'all',
          enforce: true
        },
        // Group UI-related dependencies
        ui: {
          test: /[\\/]node_modules[\\/](framer-motion|lucide-react|tailwindcss)[\\/]/,
          name: 'ui-libs',
          priority: 30,
          chunks: 'all'
        },
        // Shared utilities across the site
        utils: {
          test: /[\\/]src[\\/]lib[\\/]/,
          name: 'utils',
          priority: 20,
          chunks: 'all',
          minChunks: 2
        },
        // Shared components
        commons: {
          test: /[\\/]src[\\/]components[\\/]/,
          name: 'commons',
          priority: 10,
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  };

  return config;
}

module.exports = {
  configureChunking
};
