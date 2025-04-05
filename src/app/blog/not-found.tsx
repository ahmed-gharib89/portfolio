import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Post Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sorry, we couldn't find the blog post you're looking for.
              It might have been moved, deleted, or never existed.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                href="/blog"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse All Articles
              </Link>
              
              <Link 
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Return Home
              </Link>
            </div>
            
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for articles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}