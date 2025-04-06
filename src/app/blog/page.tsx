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
  {
    id: 1,
    slug: 'modern-data-engineering-practices',
    title: 'Modern Data Engineering Practices in 2025',
    excerpt: 'Explore the latest trends and best practices in data engineering, including real-time processing, decentralized data architecture, and the rise of data mesh.',
    date: 'April 1, 2025',
    readingTime: '8 min',
    category: 'Data Engineering',
    image: '/assets/images/data-engineering.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'llms-in-data-pipelines',
    title: 'Integrating LLMs into Data Engineering Pipelines',
    excerpt: 'Learn how to leverage Large Language Models to enhance your data pipelines by automating data quality checks, generating documentation, and improving data transformation.',
    date: 'March 15, 2025',
    readingTime: '10 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/llm-data.jpg',
    featured: true,
  },
  {
    id: 3,
    slug: 'streaming-architecture',
    title: 'Building Robust Streaming Data Architectures',
    excerpt: 'A comprehensive guide to designing and implementing streaming data architectures using Kafka, Spark, and modern cloud services.',
    date: 'February 28, 2025',
    readingTime: '12 min',
    category: 'Data Architecture',
    image: '/assets/images/streaming-data.jpg',
  },
  {
    id: 4,
    slug: 'llm-data-extraction',
    title: 'Using LLMs for Automated Data Extraction and Classification',
    excerpt: 'Discover how to use large language models to extract structured data from unstructured text and automate classification tasks in your data pipeline.',
    date: 'February 10, 2025',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/data-extraction.jpg',
  },
  {
    id: 5,
    slug: 'data-governance-ai-era',
    title: 'Data Governance in the AI Era',
    excerpt: 'Addressing the challenges and opportunities of implementing effective data governance practices when working with LLMs and generative AI.',
    date: 'January 25, 2025',
    readingTime: '7 min',
    category: 'Data Governance',
    image: '/assets/images/data-governance.jpg',
    featured: true,
  },
  // New blog posts
  {
    id: 6,
    slug: 'vector-databases-practical-guide',
    title: 'Vector Databases: A Practical Guide for Data Engineers',
    excerpt: 'A deep dive into vector databases, how they work, and how to implement them for AI applications. Learn about indexing strategies, query optimization, and real-world use cases.',
    date: 'April 3, 2025',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/vector-databases.jpg',
    featured: true,
  },
  {
    id: 7,
    slug: 'multimodal-llms-data-integration',
    title: 'Multimodal LLMs and Their Impact on Data Integration',
    excerpt: 'How multimodal large language models are changing the data integration landscape by enabling text, image, and audio data to be processed together.',
    date: 'March 28, 2025',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/multimodal-llms.jpg',
  },
  {
    id: 8,
    slug: 'synthetic-data-generation-llms',
    title: 'Synthetic Data Generation Using LLMs for Testing and Development',
    excerpt: 'How to leverage LLMs to generate realistic synthetic data for testing, development, and augmenting training datasets while preserving privacy and security.',
    date: 'March 20, 2025',
    readingTime: '8 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/synthetic-data.jpg',
  },
  {
    id: 9,
    slug: 'data-lakehouse-architecture-2025',
    title: 'Data Lakehouse Architecture in 2025: Evolution and Best Practices',
    excerpt: 'Explore how data lakehouse architectures have evolved to combine the best of data lakes and data warehouses, with practical implementation strategies.',
    date: 'March 10, 2025',
    readingTime: '10 min',
    category: 'Data Architecture',
    image: '/assets/images/data-lakehouse.jpg',
  },
  {
    id: 10,
    slug: 'real-time-analytics-edge-computing',
    title: 'Real-time Analytics at the Edge: Architectures and Technologies',
    excerpt: 'How edge computing is enabling real-time analytics closer to data sources, reducing latency and bandwidth usage while improving decision-making speed.',
    date: 'March 5, 2025',
    readingTime: '8 min',
    category: 'Data Architecture',
    image: '/assets/images/edge-computing.jpg',
  },
  {
    id: 11,
    slug: 'dbt-advanced-techniques',
    title: 'Advanced dbt Techniques for Modern Data Teams',
    excerpt: 'Take your data build tool (dbt) skills to the next level with advanced techniques for testing, documentation, macros, and orchestration.',
    date: 'February 22, 2025',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/dbt-advanced.jpg',
  },
  {
    id: 12,
    slug: 'data-mesh-implementation',
    title: 'Implementing Data Mesh: Practical Strategies and Challenges',
    excerpt: 'Real-world strategies for implementing a data mesh architecture, including domain ownership, self-service platforms, and federated governance.',
    date: 'February 15, 2025',
    readingTime: '14 min',
    category: 'Data Architecture',
    image: '/assets/images/data-mesh.jpg',
  },
  {
    id: 13,
    slug: 'ai-agents-data-pipeline',
    title: 'AI Agents for Automated Data Pipeline Management',
    excerpt: 'How autonomous AI agents are transforming data pipeline creation, monitoring, and optimization with minimal human intervention.',
    date: 'February 7, 2025',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/ai-agents.jpg',
  },
  {
    id: 14,
    slug: 'prompt-engineering-data-analysis',
    title: 'Prompt Engineering Techniques for Data Analysis with LLMs',
    excerpt: 'Master the art of crafting effective prompts for data analysis tasks using large language models, with examples and best practices.',
    date: 'January 30, 2025',
    readingTime: '8 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/prompt-engineering.jpg',
  },
  {
    id: 15,
    slug: 'ethical-considerations-ai-data',
    title: 'Ethical Considerations in AI-Driven Data Engineering',
    excerpt: 'Navigating the ethical challenges of using AI in data engineering, including bias mitigation, transparency, and responsible AI practices.',
    date: 'January 20, 2025',
    readingTime: '7 min',
    category: 'Data Governance',
    image: '/assets/images/ethical-ai.jpg',
  },
  {
    id: 16,
    slug: 'optimizing-modern-data-stack-dbt-snowflake',
    title: 'Optimizing the Modern Data Stack: Leveraging dbt with Snowflake',
    excerpt: 'Discover how dbt and Snowflake combine to create a powerful, scalable, and maintainable data pipeline solution with best practices and optimization techniques.',
    date: 'April 5, 2025',
    readingTime: '10 min',
    category: 'Data Engineering',
    image: '/assets/images/data-engineering.jpg',
    featured: true,
  },
  {
    id: 17,
    slug: 'the-rise-of-large-action-models',
    title: 'The Rise of Large Action Models: Redefining AI from Text to Action',
    excerpt: 'Explore how Large Action Models (LAMs) are extending beyond text generation to perform complex actions, revolutionizing automation and human-AI interaction across industries.',
    date: 'April 5, 2025',
    readingTime: '15 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/large-action-models.jpg',
    featured: true,
  }
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
                      <div className={`h-48 bg-gradient-to-br ${getCategoryColor(post.category)} relative`}>
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

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-1/4">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Search
                    </h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Categories
                    </h3>
                    <ul className="space-y-2">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Sort By
                    </h3>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Subscribe to Newsletter
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Get the latest articles and insights delivered to your inbox monthly.
                    </p>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-2"
                    />
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Blog posts */}
              <div className="w-full md:w-3/4">
                {processedPosts.length > 0 ? (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        All Articles
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        {processedPosts.length} {processedPosts.length === 1 ? 'article' : 'articles'} found
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {currentPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                          <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className={`h-48 bg-gradient-to-br ${getCategoryColor(post.category)} relative`}>
                              {post.featured && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl">
                                  Featured
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <div className="flex items-center mb-2">
                                <span className="text-sm text-blue-600 dark:text-blue-400">
                                  {post.category}
                                </span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {post.date}
                                </span>
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {post.readingTime} read
                                </span>
                                <span className="text-blue-600 dark:text-blue-400 font-medium">
                                  Read more →
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <nav className="flex items-center space-x-2">
                          <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                          >
                            <ArrowLeft className="h-5 w-5" />
                          </button>

                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Show first page, last page, current page, and pages around current
                            const shouldShow =
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              Math.abs(pageNumber - currentPage) <= 1;

                            if (!shouldShow) {
                              // Show ellipsis but avoid duplicate ellipsis
                              if (pageNumber === 2 || pageNumber === totalPages - 1) {
                                return (
                                  <span key={pageNumber} className="text-gray-400">…</span>
                                );
                              }
                              return null;
                            }

                            return (
                              <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === pageNumber
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                  }`}
                              >
                                {pageNumber}
                              </button>
                            );
                          })}

                          <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                          >
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}