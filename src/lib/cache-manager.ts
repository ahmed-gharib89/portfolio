'use client';

import React, { useEffect, useState } from 'react';

// Cache management utility for static assets
const CacheManager = {
  // Set item in cache with expiration
  setWithExpiry: (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  // Get item from cache, checking expiration
  getWithExpiry: (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  },

  // Clear expired items from cache
  clearExpired: () => {
    const now = new Date().getTime();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('cache_')) {
        const itemStr = localStorage.getItem(key);
        if (itemStr) {
          const item = JSON.parse(itemStr);
          if (now > item.expiry) {
            localStorage.removeItem(key);
          }
        }
      }
    }
  },

  // Prefetch and cache assets
  prefetchAssets: async (urls, ttl = 24 * 60 * 60 * 1000) => {
    try {
      urls.forEach(async (url) => {
        const cacheKey = `cache_${url.replace(/[^a-zA-Z0-9]/g, '_')}`;
        
        // Check if already cached
        if (CacheManager.getWithExpiry(cacheKey)) return;
        
        // Fetch and cache
        const response = await fetch(url, { cache: 'force-cache' });
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        CacheManager.setWithExpiry(cacheKey, objectUrl, ttl);
      });
    } catch (error) {
      console.error('Error prefetching assets:', error);
    }
  }
};

export default CacheManager;
