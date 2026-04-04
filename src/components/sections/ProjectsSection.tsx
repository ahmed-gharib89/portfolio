'use client';

import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Competitor AI Insight — Agentic AI System',
      period: 'Jan 2025 - Present',
      description: 'Agentic AI-powered competitor intelligence system that autonomously scrapes, processes, and analyzes market data to generate actionable business insights.',
      achievements: [
        'Designed star-schema Azure SQL data warehouse for structured competitor data storage',
        'Built autonomous scraping pipeline using Playwright and FlareSolverr for dynamic web content',
        'Integrated Azure OpenAI GPT and LangChain for intelligent data extraction and summarization',
        'Orchestrated end-to-end workflows with N8N, containerized with Docker Compose'
      ],
      technologies: ['N8N', 'Azure OpenAI GPT', 'LangChain', 'Azure SQL', 'Docker Compose', 'Playwright', 'FlareSolverr'],
      tools: ['Visual Studio Code', 'Azure Portal', 'Docker', 'N8N']
    },
    {
      title: 'Core42 — ADX Digital Transformation',
      period: 'Jan 2024 - Dec 2024',
      description: 'Digital transformation initiative for Abu Dhabi Securities Exchange (ADX) to modernize data infrastructure, optimize trading platform performance, and enhance market accessibility.',
      achievements: [
        'Optimized Azure SQL Database read queries and refined Synapse Dedicated SQL Pool warehouse structure',
        'Standardized 190+ Power BI Paginated Reports across 4 environments with custom Python CLI, reducing processing from 4 hours to 15 minutes',
        'Designed real-time Power BI dashboards for trading performance monitoring',
        'Migrated data infrastructure to Azure Synapse, improving query performance and scalability'
      ],
      technologies: ['Azure Synapse Analytics', 'Power BI', 'PostgreSQL', 'SQL Server', 'Azure SQL Database', 'Python'],
      tools: ['Visual Studio Code', 'Azure Data Studio', 'SQL Server Management Studio', 'Azure Portal', 'PowerShell', 'Power BI Desktop']
    },
    {
      title: 'Abraxes + MED@P Workflow Automation',
      period: 'Oct 2023 - Jan 2024',
      description: 'Automated workflow system to manage patient request handling across clinics in German, French, and Italian, anonymizing patient data while distributing requests based on predefined criteria.',
      achievements: [
        'Designed data pipelines and ETL processes using SSIS',
        'Developed sophisticated SSRS reports for in-depth insights',
        'Deployed SSIS packages across various environments',
        'Automated public list report generation'
      ],
      technologies: ['SSRS', 'SSIS', 'SQL Server'],
      tools: ['Visual Studio', 'Excel']
    },
    {
      title: 'Entity Correction Model',
      period: 'Feb 2023 - Sep 2023',
      description: 'DBT-based data quality model for Raisa Energy that corrects entity attribution errors in financial data using exact and fuzzy matching algorithms.',
      achievements: [
        'Improved financial attribution accuracy from ~70% to ~98%',
        'Implemented multi-stage matching pipeline: exact match, fuzzy match, and manual review',
        'Built with DBT on Snowflake, integrated into the Medallion architecture Silver layer'
      ],
      technologies: ['DBT', 'Snowflake', 'Python', 'SQL'],
      tools: ['Visual Studio Code', 'Snowflake Console', 'DBT CLI']
    },
    {
      title: 'WEnergyDocsEL — Async Document ETL Pipeline',
      period: 'Mar 2022 - Nov 2022',
      description: 'High-performance async Python ETL pipeline for processing energy sector documents from Azure Blob Storage into Snowflake, built for Raisa Energy.',
      achievements: [
        'Achieved 68x performance improvement over the synchronous version using asyncio',
        'Processed documents from Azure Blob Storage into structured Snowflake tables',
        'Implemented secure credential management with Azure Key Vault',
        'Built comprehensive logging and error handling for production reliability'
      ],
      technologies: ['Python', 'asyncio', 'Azure Blob Storage', 'Snowflake', 'Azure Key Vault'],
      tools: ['Visual Studio Code', 'Azure Portal', 'Snowflake Console']
    }
  ];

  return (
    <section id="projects" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Major Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    <Link 
                      href="#" 
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                    <Link 
                      href="#" 
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 mb-4">{project.period}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300 space-y-1">
                  {project.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {project.tools.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tools:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
