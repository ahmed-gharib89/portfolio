'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import Link from 'next/link';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    slug: 'modern-data-engineering-practices',
    title: 'Modern Data Engineering Practices in 2025',
    excerpt: 'Explore the latest trends and best practices in data engineering, including real-time processing, decentralized data architecture, and the rise of data mesh.',
    date: 'April 1, 2025',
    category: 'Data Engineering',
    image: '/assets/images/data-engineering.jpg',
  },
  {
    id: 2,
    slug: 'llms-in-data-pipelines',
    title: 'Integrating LLMs into Data Engineering Pipelines',
    excerpt: 'Learn how to leverage Large Language Models to enhance your data pipelines by automating data quality checks, generating documentation, and improving data transformation.',
    date: 'March 15, 2025',
    category: 'AI & Data Engineering',
    image: '/assets/images/llm-data.jpg',
  },
  {
    id: 3,
    slug: 'streaming-architecture',
    title: 'Building Robust Streaming Data Architectures',
    excerpt: 'A comprehensive guide to designing and implementing streaming data architectures using Kafka, Spark, and modern cloud services.',
    date: 'February 28, 2025',
    category: 'Data Architecture',
    image: '/assets/images/streaming-data.jpg',
  },
  {
    id: 4,
    slug: 'llm-data-extraction',
    title: 'Using LLMs for Automated Data Extraction and Classification',
    excerpt: 'Discover how to use large language models to extract structured data from unstructured text and automate classification tasks in your data pipeline.',
    date: 'February 10, 2025',
    category: 'AI & Data Engineering',
    image: '/assets/images/data-extraction.jpg',
  },
  {
    id: 5,
    slug: 'data-governance-ai-era',
    title: 'Data Governance in the AI Era',
    excerpt: 'Addressing the challenges and opportunities of implementing effective data governance practices when working with LLMs and generative AI.',
    date: 'January 25, 2025',
    category: 'Data Governance',
    image: '/assets/images/data-governance.jpg',
  }
];

// Blog categories for filtering
const categories = ['All Categories', 'Data Engineering', 'AI & Data Engineering', 'Data Architecture', 'Data Governance'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-1/4">
                <div className="sticky top-24">
                  <div className="mb-6">
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
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                              selectedCategory === category
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
                </div>
              </div>
              
              {/* Blog posts */}
              <div className="w-full md:w-3/4">
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                      <Link href={`/blog/${post.slug}`} key={post.id}>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                          <div className="h-48 bg-gray-200 dark:bg-gray-700">
                            {/* Replace with actual image when available */}
                            <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                              {post.category} Image
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center mb-2">
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                {post.category}
                              </span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {post.date}
                              </span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              {post.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                              Read more →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
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