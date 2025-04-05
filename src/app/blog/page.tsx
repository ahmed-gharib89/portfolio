import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import { TrendingUp } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/blog/mdx-utils';
import BlogList from '@/components/blog/BlogList';
import BlogCard from '@/components/blog/BlogCard';

export const metadata = {
  title: 'Blog | Ahmed Gharib - Data Engineer & Analytics Professional',
  description: 'Read articles about data engineering, analytics, and AI technologies by Ahmed Gharib',
};

export default async function Blog() {
  const allPosts = await getAllBlogPosts();
  
  // Featured posts are the 3 most recent ones
  const featuredPosts = allPosts.slice(0, 3);
  
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
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
                Featured Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map((post, index) => (
                  <BlogCard 
                    key={post.slug}
                    post={post}
                    featured={true}
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Blog List with search and filtering */}
        <BlogList initialPosts={allPosts} />
      </main>
      
      <Footer />
    </div>
  );
}