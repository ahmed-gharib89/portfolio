import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import BlogCard from '@/components/blog/BlogCard';
import TableOfContents from '@/components/blog/TableOfContents';
import { Calendar, Clock, Share2, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts, type BlogPostMetadata } from '@/lib/blog/mdx-utils';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
// Import the named export object
import { mdxComponents } from '@/lib/blog/mdx-components';

// Generate static params for all blog posts at build time
export const generateStaticParams = async () => {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Estimate reading time (roughly 200 words per minute)
const estimateReadingTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

// Generate SEO metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: `${post.title} | Ahmed Gharib's Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Ahmed Gharib'],
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }
  
  // Get next and previous posts for navigation
  const allPosts = await getAllBlogPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug);
  
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  
  // Get related posts based on tags
  const relatedPosts = await getRelatedPosts(params.slug, post.tags);
  
  // Estimated reading time
  const readingTime = estimateReadingTime(post.content);

  // Check if post content is long enough to warrant a table of contents
  // A simple heuristic: if the content has more than 1000 words
  const isLongPost = post.content.split(/\s+/).length > 1000;

  // No need to call a function, mdxComponents is the object itself

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <AnimatedSection className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Link 
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              ← Back to all articles
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags && post.tags.map(tag => (
                  <span 
                    key={tag}
                    className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{readingTime} read</span>
                </div>
                <div className="flex items-center">
                  <span>By Ahmed Gharib</span>
                </div>
              </div>
              
              {post.coverImage && (
                <div className="my-8">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={1200}
                    height={630}
                    className="rounded-lg w-full object-cover"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="lg:w-3/4">
                  {/* Share and save buttons - client interaction */}
                  <div className="flex justify-end mb-8 space-x-4">
                    <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <Share2 className="h-5 w-5 mr-1" />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <Bookmark className="h-5 w-5 mr-1" />
                      <span className="text-sm">Save</span>
                    </button>
                  </div>
                  
                  {/* MDX Content - Using MDXRemote with Next.js 14 compatible approach */}
                  <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg">
                    <MDXRemote 
                      source={post.content}
                      options={{
                        mdxOptions: {
                          development: process.env.NODE_ENV === 'development',
                          remarkPlugins: [remarkGfm],
                          rehypePlugins: [rehypeHighlight, rehypeSlug],
                          format: 'mdx',
                        },
                      }}
                      components={mdxComponents} // Pass the imported object directly
                    />
                  </article>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-10">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Link 
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Author info */}
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      About the Author
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-bold">
                        AG
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">Ahmed Gharib</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Data Engineer & Analytics Professional with expertise in data engineering, machine learning, and AI integration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="lg:w-1/4">
                  <div className="sticky top-24 space-y-6">
                    {/* Table of Contents - client component, will be loaded separately */}
                    {isLongPost && (
                      <TableOfContents className="mb-6" />
                    )}
                    
                    {/* Newsletter Signup */}
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
              </div>
              
              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    You might also like
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <BlogCard key={relatedPost.slug} post={relatedPost} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Previous/Next article navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between">
                  {prevPost && (
                    <Link href={`/blog/${prevPost.slug}`} className="group mb-4 md:mb-0">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        <div>
                          <div className="text-sm">Previous Article</div>
                          <div className="text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {prevPost.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                  
                  {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`} className="group md:text-right">
                      <div className="flex items-center justify-end text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <div>
                          <div className="text-sm">Next Article</div>
                          <div className="text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {nextPost.title}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}