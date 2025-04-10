'use client';

import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check, Share2 } from 'lucide-react';

type ShareLayout = 'vertical' | 'horizontal';

interface SocialShareProps {
  title: string;
  slug: string;
  layout?: ShareLayout;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, slug, layout = 'horizontal' }) => {
  const [copied, setCopied] = useState(false);

  // Base URL for the blog
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://agharib.com';

  const url = `${baseUrl}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyLink();
    }
  };

  // Determine if we're in mobile view based on screen width
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // For horizontal layout (used in the title section)
  if (layout === 'horizontal') {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2 hidden md:inline-flex items-center">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </span>

        <div className="flex items-center space-x-2">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors"
            aria-label="Share on Twitter"
          >
            <Twitter size={16} />
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-800 transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={16} />
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-900 transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook size={16} />
          </a>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white dark:hover:bg-green-600 transition-colors"
            aria-label="Copy link"
          >
            {copied ? <Check size={16} /> : <LinkIcon size={16} />}
          </button>

          {/* Mobile Web Share API button */}
          {isMobile && typeof navigator !== 'undefined' && navigator.share && (
            <button
              onClick={handleShare}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
              aria-label="Share this article"
            >
              <Share2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // For vertical layout (used in the sidebar)
  return (
    <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </h4>

      <div className="flex flex-col space-y-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-800 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-900 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
        </a>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-500 hover:text-white dark:hover:bg-green-600 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check size={18} /> : <LinkIcon size={18} />}
        </button>
      </div>
    </div>
  );

};

export default SocialShare;
