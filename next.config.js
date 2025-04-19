// This file is using a mix of CommonJS and dynamic imports for ES modules
// We'll use a special configuration to handle both types
const nextMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['source.unsplash.com'],
  },
};

// Use async IIFE to handle async imports
module.exports = async () => {
  // Dynamic imports for ES Modules
  const remarkGfm = (await import('remark-gfm')).default;
  const rehypePrism = (await import('rehype-prism-plus')).default;
  const rehypeSlug = (await import('rehype-slug')).default;
  const rehypeAutolinkHeadings = (await import('rehype-autolink-headings')).default;

  const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypePrism,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
      providerImportSource: "@mdx-js/react",
    },
  });

  return withMDX(nextConfig);
}
