'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Info, AlertTriangle, Check, AlertCircle, ExternalLink } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';

// Define types for MDX components
type ComponentProps = {
  children?: ReactNode;
  className?: string;
  src?: string;
  alt?: string;
  href?: string;
  type?: string;
  title?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
};

// Define more specific props for HTML elements with restricted attributes
type HtmlElementProps = Omit<ComponentProps, 'type'> & {
  [key: string]: any;
};

// Custom alert component with multiple styles
const Alert = ({ children, type = 'info', title, className }: ComponentProps) => {
  // Determine the appropriate styling based on the alert type
  let Icon;
  let styles;

  switch (type) {
    case 'warning':
      Icon = AlertTriangle;
      styles = 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700';
      break;
    case 'success':
      Icon = Check;
      styles = 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700';
      break;
    case 'error':
      Icon = AlertCircle;
      styles = 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700';
      break;
    case 'info':
    default:
      Icon = Info;
      styles = 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700';
      break;
  }

  return (
    <div className={`p-4 border-l-4 rounded-md my-6 ${styles} ${className || ''}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-3">
          {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
          <div className="text-gray-700 dark:text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Custom image component with optional caption
const ImageWithCaption = ({ src, alt, caption, width, height, className }: ComponentProps) => {
  if (!src) return null;
  
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <Image
          src={src}
          alt={alt || 'Blog image'}
          width={width ? Number(width) : 1200}
          height={height ? Number(height) : 630}
          className={`w-full object-cover ${className || ''}`}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

// Custom link component that handles both internal and external links
const CustomLink = ({ href, children, className }: ComponentProps) => {
  if (!href) return <span>{children}</span>;
  
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline ${className || ''}`}
      >
        {children}
        <ExternalLink className="ml-1 h-3 w-3" />
      </a>
    );
  }
  
  return (
    <Link 
      href={href} 
      className={`text-blue-600 dark:text-blue-400 hover:underline ${className || ''}`}
    >
      {children}
    </Link>
  );
};

// Custom code block component
const CodeBlock = ({ children, className }: ComponentProps) => {
  return (
    <div className="relative my-6 rounded-lg overflow-hidden">
      <pre className={`p-4 overflow-x-auto bg-gray-900 text-white ${className || ''}`}>
        {children}
      </pre>
    </div>
  );
};

// Custom callout component
const Callout = ({ children, className }: ComponentProps) => {
  return (
    <blockquote className={`p-6 my-6 bg-gray-50 dark:bg-gray-800 border-l-4 border-blue-500 rounded-md ${className || ''}`}>
      <div className="text-lg font-medium text-gray-900 dark:text-white">
        {children}
      </div>
    </blockquote>
  );
};

// This is the main MDX components export for Next.js 14
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components
    Alert,
    ImageWithCaption,
    Callout,
    // Override HTML elements with custom styling
    a: (props) => <CustomLink {...props} />,
    code: (props) => <CodeBlock {...props} />,
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-bold mt-6 mb-3" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-lg font-bold mt-6 mb-2" {...props}>
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="my-4" {...props}>
        {children}
      </p>
    ),
    ol: ({ children, className, ...props }) => (
      <ol className={`list-decimal list-inside my-4 space-y-2 ${className || ''}`} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="ml-4" {...props}>
        {children}
      </li>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th 
        className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800" 
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td 
        className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" 
        {...props}
      >
        {children}
      </td>
    ),
    hr: ({ ...props }) => (
      <hr 
        className="my-8 border-gray-200 dark:border-gray-700" 
        {...props} 
      />
    ),
    img: ({ src, alt, ...props }) => (
      <img 
        src={src} 
        alt={alt || 'Image'} 
        className="rounded-lg my-6 max-w-full" 
        {...props} 
      />
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="pl-4 border-l-4 border-gray-200 dark:border-gray-700 my-6 italic text-gray-700 dark:text-gray-300" 
        {...props}
      >
        {children}
      </blockquote>
    ),
    ...components,
  };
}