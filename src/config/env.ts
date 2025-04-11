/**
 * Environment variables configuration
 * This file centralizes access to environment variables
 */

/**
 * Email configuration for contact form
 */
export const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@example.com',
    pass: process.env.EMAIL_PASS || 'your-password',
  },
  from: process.env.EMAIL_FROM || 'portfolio@example.com',
  to: process.env.EMAIL_TO || 'a.gharib89@yahoo.com',
};

/**
 * Analytics configuration
 */
export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || 'G-0JS4YKCBHY',
};

/**
 * Site configuration
 */
export const siteConfig = {
  name: 'Ahmed Gharib | Data Engineer & Analytics Professional',
  description: 'Portfolio website of Ahmed Gharib, an experienced Data Engineer with expertise in Microsoft Azure, AWS, and Google Cloud platforms.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://agharib.com',
  author: 'Ahmed Gharib',
  defaultLocale: 'en',
};
