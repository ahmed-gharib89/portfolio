'use client';

import { useEffect, useState } from 'react';

/**
 * Component that renders JSON-LD structured data scripts in the document head
 */
const StructuredData = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client-side to avoid hydration mismatch
  if (!mounted) return null;

  // Person schema for Ahmed Gharib
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://agharib.com/#person',
    'name': 'Ahmed Gharib',
    'jobTitle': 'Senior Data Engineer',
    'worksFor': {
      '@type': 'Organization',
      'name': 'Raisa Energy'
    },
    'description': 'Experienced Data Engineer with over 6 years of expertise in designing and implementing scalable data solutions across Microsoft Azure, AWS, and Google Cloud platforms.',
    'image': 'https://agharib.com/assets/images/AhmedGharib.png',
    'url': 'https://agharib.com',
    'sameAs': [
      'https://www.linkedin.com/in/agharib',
      'https://github.com/agharib'
    ],
    'knowsAbout': [
      'Data Engineering', 
      'Data Integration', 
      'ETL Processes', 
      'Data Warehousing', 
      'Python', 
      'SQL', 
      'Microsoft Azure', 
      'AWS', 
      'Google Cloud',
      'Power BI', 
      'Machine Learning'
    ]
  };

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://agharib.com/#website',
    'name': 'Ahmed Gharib | Data Engineer & Analytics Professional',
    'description': 'Portfolio website of Ahmed Gharib, an experienced Data Engineer with expertise in Microsoft Azure, AWS, and Google Cloud platforms.',
    'url': 'https://agharib.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://agharib.com/blog?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

export default StructuredData;
