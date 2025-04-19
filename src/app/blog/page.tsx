'use client';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Search, SortAsc, SortDesc, Star } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog-api';

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

// Function to get category color
const getCategoryColor = (category: string) => {
  const categoryColors: Record<string, string> = {
    'Data Engineering': 'from-blue-500 to-blue-700',
    'AI & Data Engineering': 'from-purple-500 to-purple-700',
    'Data Architecture': 'from-green-500 to-green-700',
    'Data Governance': 'from-orange-500 to-orange-700',
    'AI & Large Action Models': 'from-red-500 to-red-700',
  };
  
  return categoryColors[category] || 'from-gray-500 to-gray-700';
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  readingTime?: string;
  image?: string;
  excerpt?: string;
  featured?: boolean;
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [sortField, setSortField] = useState<'date' | 'title'>('date');
  const postsPerPage = 6;
  
  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        
        // Get all post slugs
        const slugs = await getAllPostSlugs();
        
        // Fetch each post
        const postsPromises = slugs.map(async (slug: string) => {
          const post = await getPostBySlug(slug);
          if (!post) return null;
          
          return {
            slug,
            title: post.title,
            date: post.date,
            author: post.author,
            category: post.category,
            readingTime: post.readingTime || '5 min',
            image: post.image || '/assets/images/default-blog.jpg',
            excerpt: post.excerpt || 'Read this article to learn more about the latest developments in data engineering and AI.',
            featured: post.featured || false
          };
        });
        
        const posts = (await Promise.all(postsPromises)).filter(Boolean) as BlogPost[];
        
        // Set featured posts
        const featured = posts.filter(post => post.featured);
        setFeaturedPosts(featured);
        
        // Set all posts
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);
  
  // Sort posts
  const sortPosts = (posts: BlogPost[]) => {
    return [...posts].sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === 'newest' 
          ? b.title.localeCompare(a.title) 
          : a.title.localeCompare(b.title);
      }
    });
  };
  
  // Filter posts based on search term
  const filteredPosts = sortPosts(blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  ));
  
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
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };
  
  // Change sort field
  const changeSortField = (field: 'date' | 'title') => {
    setSortField(field);
  };
  
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
            
            {/* Search and Sort Controls */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex items-center flex-grow">
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
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={sortField}
                      onChange={(e) => changeSortField(e.target.value as 'date' | 'title')}
                      className="appearance-none px-4 py-3 pr-10 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="date">Date</option>
                      <option value="title">Title</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <button
                    onClick={toggleSortOrder}
                    className="p-3 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    aria-label={sortOrder === 'newest' ? 'Sort oldest first' : 'Sort newest first'}
                  >
                    {sortOrder === 'newest' ? (
                      <SortDesc className="h-5 w-5" />
                    ) : (
                      <SortAsc className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Featured Posts */}
            {featuredPosts.length > 0 && !searchTerm && currentPage === 1 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Featured Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                      <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg border-2 border-yellow-400 dark:border-yellow-600 flex flex-col">
                        <div className="h-48 relative">
                          <Image 
                            src={post.image || '/assets/images/default-blog.jpg'}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(post.category)} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 rounded-full p-1">
                            <Star className="h-4 w-4" />
                          </div>
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
                              {post.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Blog Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {searchTerm ? 'Search Results' : 'All Articles'}
              </h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 dark:text-gray-400">No articles found matching your search.</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((post) => (
                      <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                        <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                          <div className="h-48 relative">
                            <Image 
                              src={post.image || '/assets/images/default-blog.jpg'}
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
                                {post.readingTime}
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
