'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, TrendingUp, Calendar, Clock } from 'lucide-react';

// Updated blog data with all enhanced posts
const blogPosts = [
  {
    id: 1,
    slug: 'the-rise-of-large-action-models',
    title: 'The Rise of Large Action Models',
    excerpt: 'Explore how Large Action Models (LAMs) are extending beyond language capabilities to interact with software tools, APIs, and digital environments, creating new possibilities for automation and augmentation.',
    date: 'April 4, 2025',
    readingTime: '11 min',
    category: 'Artificial Intelligence',
    image: '/assets/images/large-action-models.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'manus-ai-revolutionizing-productivity',
    title: 'Manus AI: Revolutionizing Productivity',
    excerpt: 'Discover how Manus AI is transforming productivity across industries with its innovative approach to AI assistance, automation, and augmentation.',
    date: 'April 15, 2025',
    readingTime: '10 min',
    category: 'Artificial Intelligence',
    image: '/assets/images/manus-ai.jpg',
    featured: true,
  },
  {
    id: 3,
    slug: 'vibe-coding-future-of-development',
    title: 'Vibe Coding: The Future of Software Development in 2025',
    excerpt: 'Discover how vibe coding is transforming software development by allowing developers to create applications through natural language prompts and AI-powered code generation.',
    date: 'April 10, 2025',
    readingTime: '12 min',
    category: 'Software Development',
    image: '/assets/images/vibe-coding.jpg',
    featured: true,
  },
  {
    id: 4,
    slug: 'vector-databases-practical-guide',
    title: 'Vector Databases: A Practical Guide',
    excerpt: 'Learn how vector databases are revolutionizing similarity search and powering the next generation of AI applications with this comprehensive practical guide.',
    date: 'April 12, 2025',
    readingTime: '15 min',
    category: 'Data Engineering',
    image: '/assets/images/vector-databases.jpg',
    featured: false,
  },
  {
    id: 5,
    slug: 'streaming-architecture',
    title: 'Streaming Architecture: Building Real-Time Data Pipelines',
    excerpt: 'Explore modern streaming architecture patterns and best practices for building scalable, resilient real-time data pipelines that deliver immediate insights from high-velocity data.',
    date: 'April 5, 2025',
    readingTime: '12 min',
    category: 'Data Engineering',
    image: '/assets/images/streaming-architecture.jpg',
    featured: false,
  },
  {
    id: 6,
    slug: 'synthetic-data-generation-llms',
    title: 'Synthetic Data Generation with LLMs',
    excerpt: 'Explore how Large Language Models are revolutionizing synthetic data generation for testing, training, and privacy-preserving analytics in data engineering workflows.',
    date: 'April 6, 2025',
    readingTime: '7 min',
    category: 'Data Engineering',
    image: '/assets/images/synthetic-data.jpg',
    featured: false,
  },
  {
    id: 7,
    slug: 'real-time-analytics-edge-computing',
    title: 'Real-Time Analytics with Edge Computing',
    excerpt: 'Explore how edge computing is transforming real-time analytics by processing data closer to the source, reducing latency, and enabling new use cases for time-sensitive applications.',
    date: 'April 7, 2025',
    readingTime: '7 min',
    category: 'Data Architecture',
    image: '/assets/images/edge-computing.jpg',
    featured: false,
  },
  {
    id: 8,
    slug: 'prompt-engineering-data-analysis',
    title: 'Prompt Engineering for Data Analysis',
    excerpt: 'Learn how to effectively use prompt engineering techniques to leverage large language models for data analysis tasks, from data exploration to insight generation.',
    date: 'April 8, 2025',
    readingTime: '8 min',
    category: 'Data Science',
    image: '/assets/images/prompt-engineering.jpg',
    featured: false,
  },
  {
    id: 9,
    slug: 'data-governance-ai-era',
    title: 'Data Governance in the AI Era',
    excerpt: 'Explore the evolving landscape of data governance as AI transforms how organizations collect, process, and utilize data, with practical strategies for maintaining compliance and ethics.',
    date: 'April 9, 2025',
    readingTime: '9 min',
    category: 'Data Governance',
    image: '/assets/images/data-governance.jpg',
    featured: false,
  },
  {
    id: 10,
    slug: 'llm-data-extraction',
    title: 'LLM-Powered Data Extraction',
    excerpt: 'Discover how large language models are revolutionizing data extraction from unstructured sources, enabling organizations to unlock valuable insights from previously inaccessible information.',
    date: 'April 11, 2025',
    readingTime: '8 min',
    category: 'Data Science',
    image: '/assets/images/llm-extraction.jpg',
    featured: false,
  },
  {
    id: 11,
    slug: 'ai-agents-data-pipeline',
    title: 'AI Agents in Data Pipeline Orchestration',
    excerpt: 'Learn how AI agents are transforming data pipeline orchestration by automating complex workflows, detecting anomalies, and optimizing resource utilization.',
    date: 'April 13, 2025',
    readingTime: '7 min',
    category: 'Data Engineering',
    image: '/assets/images/ai-agents.jpg',
    featured: false,
  },
  {
    id: 12,
    slug: 'data-lakehouse-architecture-2025',
    title: 'Data Lakehouse Architecture in 2025',
    excerpt: 'Explore the evolution of data lakehouse architecture and how it combines the best features of data lakes and data warehouses for modern analytics workloads.',
    date: 'April 14, 2025',
    readingTime: '6 min',
    category: 'Data Architecture',
    image: '/assets/images/data-lakehouse.jpg',
    featured: false,
  },
  {
    id: 13,
    slug: 'data-mesh-implementation',
    title: 'Implementing Data Mesh: Lessons from the Field',
    excerpt: 'Practical insights and lessons learned from implementing data mesh architecture in large enterprises, with strategies for overcoming common challenges.',
    date: 'April 16, 2025',
    readingTime: '9 min',
    category: 'Data Architecture',
    image: '/assets/images/data-mesh.jpg',
    featured: false,
  },
  {
    id: 14,
    slug: 'dbt-advanced-techniques',
    title: 'Advanced dbt Techniques for Modern Data Teams',
    excerpt: 'Master advanced dbt techniques that help data teams improve collaboration, testing, and deployment of analytics code in complex data environments.',
    date: 'April 17, 2025',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/dbt-techniques.jpg',
    featured: false,
  },
  {
    id: 15,
    slug: 'ethical-considerations-ai-data',
    title: 'Ethical Considerations in AI Data Practices',
    excerpt: 'Explore the ethical dimensions of data collection, processing, and utilization in AI systems, with frameworks for responsible data practices.',
    date: 'April 18, 2025',
    readingTime: '10 min',
    category: 'Data Governance',
    image: '/assets/images/ai-ethics.jpg',
    featured: false,
  }
];

// Expanded blog categories for filtering
const categories = [
  'All Categories',
  'Artificial Intelligence',
  'Data Engineering',
  'Data Architecture',
  'Data Governance',
  'Data Science',
  'Software Development'
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
      case 'Artificial Intelligence':
        return 'from-purple-400 to-purple-600';
      case 'Data Architecture':
        return 'from-green-400 to-green-600';
      case 'Data Governance':
        return 'from-amber-400 to-amber-600';
      case 'Data Science':
        return 'from-pink-400 to-pink-600';
      case 'Software Development':
        return 'from-indigo-400 to-indigo-600';
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
              Insights on Data Engineering, Analytics, AI Technologies, and Software Development
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

        {/* Filter and Search Section */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* All Posts Grid */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              All Articles
              {selectedCategory !== 'All Categories' && (
                <span className="text-blue-600 dark:text-blue-400 ml-2">
                  in {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="text-blue-600 dark:text-blue-400 ml-2">
                  matching "{searchQuery}"
                </span>
              )}
            </h2>

            {processedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Categories');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                      <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                        <div className="h-48 relative">
                          <Image 
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(post.category)} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="text-xs font-semibold mb-1">
                              {post.category}
                            </div>
                            <h3 className="text-lg font-bold line-clamp-2">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {post.date}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.readingTime} read
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md flex items-center ${
                          currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 rounded-md flex items-center justify-center ${
                            currentPage === number
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {number}
                        </button>
                      ))}

                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md flex items-center ${
                          currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
