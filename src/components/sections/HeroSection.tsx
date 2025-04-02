'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../animation/AnimatedSection';

const HeroSection = () => {
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.8 + (custom * 0.1),
        duration: 0.5
      }
    })
  };

  return (
    <AnimatedSection id="hero" className="min-h-screen flex items-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20" delay={0}>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Ahmed Gharib
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-medium">
              Principal Advanced Analytics Engineer
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Experienced Data Engineer with over 6 years of expertise in designing and implementing scalable data solutions across Microsoft Azure, AWS, and Google Cloud platforms. Skilled in building robust data pipelines and ETL processes.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                custom={0}
              >
                <Link 
                  href="#projects" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                custom={1}
              >
                <a 
                  href="/assets/files/Ahmed Gharib.pdf" 
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-md transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </a>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                custom={2}
              >
                <Link 
                  href="#contact" 
                  className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-md transition-colors"
                >
                  Contact Me
                  <Mail className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-blue-600 dark:border-blue-400 overflow-hidden relative">
              <Image 
                src="/assets/images/AhmedGharib.png"
                alt="Ahmed Gharib"
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 md:mt-24">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Core Skills</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'Data Integration', 
              'Data Pipeline Development', 
              'Data Modeling', 
              'ETL Processes', 
              'Python', 
              'SQL', 
              'Power BI', 
              'Azure', 
              'AWS', 
              'Machine Learning'
            ].map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HeroSection;
