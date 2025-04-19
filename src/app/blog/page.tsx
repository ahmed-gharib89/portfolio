'use client';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Search } from 'lucide-react';

// Image shimmer placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    slug: 'data-lakehouse-architecture-2025',
    title: 'Data Lakehouse Architecture in 2025: Evolution and Best Practices',
    excerpt: 'Explore the evolution of data lakehouse architecture and how it will shape the future of data engineering in 2025 and beyond.',
    date: 'Apr 15, 2025',
    readingTime: '8 min',
    category: 'Data Engineering',
    image: '/assets/images/blog/data-lakehouse.jpg',
  },
  {
    id: 2,
    slug: 'ai-agents-data-pipeline',
    title: 'Integrating AI Agents into Data Pipelines: A Practical Guide',
    excerpt: 'Learn how to effectively integrate AI agents into your data pipelines to automate processes and enhance data quality.',
    date: 'Apr 10, 2025',
    readingTime: '6 min',
    category: 'AI',
    image: '/assets/images/blog/ai-agents.jpg',
  },
  {
    id: 3,
    slug: 'vector-databases-practical-guide',
    title: 'Vector Databases: A Practical Guide for Data Engineers',
    excerpt: 'A comprehensive guide to understanding and implementing vector databases for efficient similarity search and AI applications.',
    date: 'Apr 5, 2025',
    readingTime: '10 min',
    category: 'Databases',
    image: '/assets/images/blog/vector-db.jpg',
  },
  {
    id: 4,
    slug: 'data-mesh-implementation',
    title: 'Implementing Data Mesh: Lessons from the Trenches',
    excerpt: 'Real-world insights and lessons learned from implementing data mesh architecture in large enterprises.',
    date: 'Mar 28, 2025',
    readingTime: '12 min',
    category: 'Data Architecture',
    image: '/assets/images/blog/data-mesh.jpg',
  },
  {
    id: 5,
    slug: 'streaming-architecture',
    title: 'Modern Streaming Architecture for Real-Time Analytics',
    excerpt: 'Designing and implementing a robust streaming architecture for real-time data processing and analytics.',
    date: 'Mar 20, 2025',
    readingTime: '9 min',
    category: 'Data Engineering',
    image: '/assets/images/blog/streaming.jpg',
  },
  {
    id: 6,
    slug: 'dbt-advanced-techniques',
    title: 'Advanced dbt Techniques for Complex Data Transformations',
    excerpt: 'Explore advanced techniques in dbt for handling complex data transformations and maintaining data quality.',
    date: 'Mar 15, 2025',
    readingTime: '7 min',
    category: 'Data Engineering',
    image: '/assets/images/blog/dbt.jpg',
  },
  // Additional posts
  {
    id: 7,
    slug: 'data-governance-ai-era',
    title: 'Data Governance in the AI Era: New Challenges and Solutions',
    excerpt: 'Addressing the evolving challenges of data governance in the age of artificial intelligence and machine learning.',
    date: 'Mar 8, 2025',
    readingTime: '8 min',
    category: 'Data Governance',
    image: '/assets/images/blog/data-governance.jpg',
  },
  {
    id: 8,
    slug: 'real-time-analytics-edge-computing',
    title: 'Real-Time Analytics at the Edge: Architecture and Implementation',
    excerpt: 'How to design and implement real-time analytics solutions at the edge for IoT and distributed systems.',
    date: 'Mar 1, 2025',
    readingTime: '11 min',
    category: 'Analytics',
    image: '/assets/images/blog/edge-computing.jpg',
  },
  {
    id: 9,
    slug: 'prompt-engineering-data-analysis',
    title: 'Prompt Engineering for Data Analysis with Large Language Models',
    excerpt: 'Techniques and best practices for effective prompt engineering when using LLMs for data analysis tasks.',
    date: 'Feb 22, 2025',
    readingTime: '6 min',
    category: 'AI',
    image: '/assets/images/blog/prompt-engineering.jpg',
  },
];

// Function to get category color
const getCategoryColor = (category: string) => {
  const categoryColors: Record<string, string> = {
    'Data Engineering': 'from-blue-500 to-blue-700',
    'AI': 'from-purple-500 to-purple-700',
    'Databases': 'from-green-500 to-green-700',
    'Data Architecture': 'from-orange-500 to-orange-700',
    'Data Governance': 'from-red-500 to-red-700',
    'Analytics': 'from-teal-500 to-teal-700',
  };
  
  return categoryColors[category] || 'from-gray-500 to-gray-700';
};

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const postsPerPage = 6;
  
  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Handle pagination
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  // Reset search when component unmounts
  useEffect(() => {
    return () => {
      setSearchTerm('');
      setCurrentPage(1);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main>
        <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
              Blog & Articles
            </h1>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Insights, tutorials, and perspectives on data engineering, AI, and modern analytics.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-3 pr-12 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
            
            {/* Blog Posts */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                        aria-label="Previous page"
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
                          aria-label={`Page ${number}`}
                          aria-current={currentPage === number ? 'page' : undefined}
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
                        aria-label="Next page"
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
