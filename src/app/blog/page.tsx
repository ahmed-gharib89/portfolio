'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, TrendingUp, Calendar, Clock } from 'lucide-react';

// Enhanced blog data with more posts
const blogPosts = [
  {
    id: 0,
    slug: 'vibe-coding-future-of-development',
    title: 'Vibe Coding: The Future of Software Development in 2025',
    excerpt: 'Discover how vibe coding is transforming software development by allowing developers to create applications through natural language prompts and AI-powered code generation.',
    date: 'April 6, 2025',
    readingTime: '12 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/vibe-coding.jpg',
    featured: true,
  },
  // ... other blog posts remain the same
];

// Expanded blog categories for filtering
const categories = [
  'All Categories',
  'Data Engineering',
  'AI & Data Engineering',
  'Data Architecture',
  'Data Governance'
];

// Sort options
const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'featured', label: 'Featured' }
];

// Generate blur placeholder for images
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) => typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str);

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('latest');
  const [displayCount, setDisplayCount] = useState(6);

  const postsPerPage = 6;

  // Reset page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortOption]);

  // Filter and sort posts
  const processedPosts = blogPosts
    // First filter by category and search
    .filter(post => {
      const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    // Then sort based on selected option
    .sort((a, b) => {
      switch (sortOption) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'featured':
          // Sort by featured status first, then by date
          if (a.featured === b.featured) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return a.featured ? -1 : 1;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = processedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(processedPosts.length / postsPerPage);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to generate a placeholder gradient background based on category
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Data Engineering':
        return 'from-blue-400 to-blue-600';
      case 'AI & Data Engineering':
        return 'from-purple-400 to-purple-600';
      case 'Data Architecture':
        return 'from-green-400 to-green-600';
      case 'Data Governance':
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  // Handle load more button
  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, processedPosts.length));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="pt-24 pb-16">
        <AnimatedSection className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Blog
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Insights on Data Engineering, Analytics, and AI Technologies
            </p>
          </div>
        </AnimatedSection>

        {/* Featured Posts Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
              Featured Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts
                .filter(post => post.featured)
                .slice(0, 3)
                .map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                    <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                      <div className="h-48 relative">
                        <Image 
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                          priority={post.featured}
                        />
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl">
                          Featured
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center mb-2 text-sm">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {post.category}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="flex items-center text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readingTime} read
                          </span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            Read article →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Rest of the component remains the same */}
      </main>

      <Footer />
    </div>
  );
}
