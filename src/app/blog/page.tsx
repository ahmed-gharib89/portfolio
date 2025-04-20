'use client';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Search, SortAsc, SortDesc, Star, Share2, Tag, Filter } from 'lucide-react';
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

// Function to get category badge color
const getCategoryBadgeColor = (category: string) => {
  const categoryColors: Record<string, string> = {
    'Data Engineering': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'AI & Data Engineering': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Data Architecture': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Data Governance': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'AI & Large Action Models': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  return categoryColors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
  tags?: string[];
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [sortField, setSortField] = useState<'date' | 'title'>('date');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const postsPerPage = 6;
  
  // Extract all categories and tags
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    blogPosts.forEach(post => {
      if (post.category) {
        categorySet.add(post.category);
      }
    });
    return Array.from(categorySet);
  }, [blogPosts]);
  
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [blogPosts]);
  
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
            featured: post.featured || false,
            tags: post.tags || generateRandomTags(post.category)
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
  
  // Generate random tags for posts that don't have them
  const generateRandomTags = (category: string): string[] => {
    const tagsByCategory: Record<string, string[]> = {
      'Data Engineering': ['ETL', 'Data Pipeline', 'Data Modeling', 'SQL', 'Python'],
      'AI & Data Engineering': ['Machine Learning', 'NLP', 'Deep Learning', 'Neural Networks', 'TensorFlow'],
      'Data Architecture': ['Data Warehouse', 'Data Lake', 'Cloud Architecture', 'Microservices', 'Serverless'],
      'Data Governance': ['Data Quality', 'Data Security', 'Compliance', 'GDPR', 'Data Privacy'],
      'AI & Large Action Models': ['GPT', 'LLM', 'Transformers', 'Reinforcement Learning', 'AI Ethics']
    };
    
    const defaultTags = ['Data', 'Analytics', 'Big Data', 'Cloud'];
    const categoryTags = tagsByCategory[category] || defaultTags;
    
    // Select 2-4 random tags
    const numTags = Math.floor(Math.random() * 3) + 2; // 2 to 4 tags
    const selectedTags: string[] = [];
    
    while (selectedTags.length < numTags && categoryTags.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryTags.length);
      selectedTags.push(categoryTags[randomIndex]);
      categoryTags.splice(randomIndex, 1);
    }
    
    return selectedTags;
  };
  
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
  
  // Filter posts based on search term, category, and tags
  const filteredPosts = useMemo(() => {
    return sortPosts(blogPosts.filter(post => {
      // Search term filter
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      
      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        (post.tags && selectedTags.every(tag => post.tags!.includes(tag)));
      
      return matchesSearch && matchesCategory && matchesTags;
    }));
  }, [blogPosts, searchTerm, selectedCategory, selectedTags, sortField, sortOrder]);
  
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
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };
  
  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
    setCurrentPage(1);
  };
  
  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Simulate subscription
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
    }, 1000);
  };
  
  // Share post
  const sharePost = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `${window.location.origin}/blog/${post.slug}`
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      const url = `${window.location.origin}/blog/${post.slug}`;
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy link: ', err);
        });
    }
  };
  
  // Featured posts carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    if (featuredPosts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredPosts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [featuredPosts.length]);
  
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
            
            {/* Featured Posts Carousel */}
            {featuredPosts.length > 0 && !searchTerm && currentPage === 1 && !selectedCategory && selectedTags.length === 0 && (
              <div className="mb-16 relative overflow-hidden rounded-xl shadow-lg">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredPosts.map((post, index) => (
                    <div key={post.slug} className="w-full flex-shrink-0">
                      <div className="relative h-96 w-full">
                        <Image 
                          src={post.image || '/assets/images/default-blog.jpg'}
                          alt={post.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                          priority={index === 0}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 600))}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                          <div className="flex items-center mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryBadgeColor(post.category)}`}>
                              {post.category}
                            </span>
                            <Star className="h-5 w-5 text-yellow-400 ml-3" />
                            <span className="text-white text-sm ml-1">Featured</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            {post.title}
                          </h2>
                          <p className="text-gray-200 mb-4 max-w-3xl line-clamp-2 md:line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-300 text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span className="mr-4">{post.date}</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{post.readingTime}</span>
                            </div>
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                            >
                              Read Article
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Carousel Controls */}
                {featuredPosts.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                      onClick={() => setCurrentSlide(prev => (prev - 1 + featuredPosts.length) % featuredPosts.length)}
                      aria-label="Previous slide"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                      onClick={() => setCurrentSlide(prev => (prev + 1) % featuredPosts.length)}
                      aria-label="Next slide"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {featuredPosts.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                          }`}
                          onClick={() => setCurrentSlide(index)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Newsletter Subscription */}
            <div className="max-w-4xl mx-auto mb-16 bg-blue-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-md">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8 md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Subscribe to our Newsletter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get the latest articles, tutorials, and updates delivered straight to your inbox.
                  </p>
                </div>
                
                <div className="w-full md:w-1/2">
                  {isSubscribed ? (
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center">
                      <p className="text-green-700 dark:text-green-300 font-medium">
                        Thank you for subscribing! You'll receive our next newsletter soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3">
                      <div>
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                          }}
                          className={`w-full px-4 py-3 rounded-md border ${
                            emailError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                        />
                        {emailError && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{emailError}</p>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            {/* Search and Sort Controls */}
            <div className="max-w-4xl mx-auto mb-8">
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
            
            {/* Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <button
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  className={`flex items-center px-4 py-2 rounded-md border ${
                    selectedCategory 
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedCategory || 'Filter by Category'}
                  <span className="ml-2 text-xs">
                    {showCategoryFilter ? '▲' : '▼'}
                  </span>
                </button>
                
                <button
                  onClick={() => setShowTagFilter(!showTagFilter)}
                  className={`flex items-center px-4 py-2 rounded-md border ${
                    selectedTags.length > 0
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  {selectedTags.length > 0 ? `${selectedTags.length} Tags Selected` : 'Filter by Tags'}
                  <span className="ml-2 text-xs">
                    {showTagFilter ? '▲' : '▼'}
                  </span>
                </button>
                
                {(selectedCategory || selectedTags.length > 0) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedTags([]);
                    }}
                    className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
              
              {/* Category Filter */}
              {showCategoryFilter && (
                <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? getCategoryBadgeColor(category)
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags Filter */}
              {showTagFilter && (
                <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mb-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Tag Cloud */}
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 15).map(tag => {
                  // Calculate tag size based on frequency
                  const tagFrequency = blogPosts.filter(post => post.tags?.includes(tag)).length;
                  const tagSize = Math.max(0.8, Math.min(1.5, 0.8 + tagFrequency / 10));
                  
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      style={{ fontSize: `${tagSize}rem` }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* All Blog Posts */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
                <span>
                  {searchTerm ? 'Search Results' : selectedCategory ? `Category: ${selectedCategory}` : selectedTags.length > 0 ? 'Filtered Articles' : 'All Articles'}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                </span>
              </h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 dark:text-gray-400">No articles found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setSelectedTags([]);
                    }}
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((post) => (
                      <div key={post.slug} className="group relative">
                        <Link href={`/blog/${post.slug}`} className="block">
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
                              {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {post.tags.slice(0, 3).map(tag => (
                                    <span 
                                      key={tag} 
                                      className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleTagSelect(tag);
                                      }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {post.tags.length > 3 && (
                                    <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                                      +{post.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                        
                        {/* Share Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sharePost(post);
                          }}
                          className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                          aria-label="Share article"
                        >
                          <Share2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>
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
