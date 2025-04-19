'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from './CodeBlock';
import YouTubeEmbed from './YouTubeEmbed';
import TwitterEmbed from './TwitterEmbed';
import GistEmbed from './GistEmbed';
import Chart from './Chart';
import ImageGallery from './ImageGallery';

// Custom heading components
const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
    {children}
  </h1>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
    {children}
  </h3>
);

const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-lg md:text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
    {children}
  </h4>
);

// Custom paragraph component
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed">
    {children}
  </p>
);

// Custom link component
const CustomLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline"
    >
      {children}
    </a>
  );
};

// Custom image component
const CustomImage = ({ src, alt, width = 800, height = 500 }: { src: string; alt: string; width?: number; height?: number }) => {
  return (
    <div className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg mx-auto"
      />
      {alt && <p className="text-sm text-center text-gray-500 mt-2">{alt}</p>}
    </div>
  );
};

// Custom blockquote component
const BlockQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="pl-4 border-l-4 border-blue-500 italic my-6 text-gray-700 dark:text-gray-300">
    {children}
  </blockquote>
);

// Custom inline code component
const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono">
    {children}
  </code>
);

// Custom list components
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 my-4 text-gray-700 dark:text-gray-300">
    {children}
  </ul>
);

const OL = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal pl-6 my-4 text-gray-700 dark:text-gray-300">
    {children}
  </ol>
);

const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="my-1">{children}</li>
);

// Custom table components
const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </table>
  </div>
);

const THead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
);

const TBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
);

const TR = ({ children }: { children: React.ReactNode }) => (
  <tr>{children}</tr>
);

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
    {children}
  </th>
);

const TD = ({ children }: { children: React.ReactNode }) => (
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
    {children}
  </td>
);

// Custom callout component
const Callout = ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' }) => {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-300',
    warning: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500 text-yellow-800 dark:text-yellow-300',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-300',
  };

  return (
    <div className={`p-4 my-6 border-l-4 rounded-r-lg ${styles[type]}`}>
      {children}
    </div>
  );
};

// Export all components
export const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: CustomLink,
  img: CustomImage,
  blockquote: BlockQuote,
  pre: CodeBlock, // Updated to use the new CodeBlock component
  code: InlineCode,
  ul: UL,
  ol: OL,
  li: LI,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD,
  Callout,
  YouTubeEmbed,
  TwitterEmbed,
  GistEmbed,
  Chart,
  ImageGallery,
};

export default MDXComponents;
