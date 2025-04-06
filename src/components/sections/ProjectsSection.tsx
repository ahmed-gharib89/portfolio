'use client';

import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Core42 - ADX Digital Transformation',
      period: 'Jan 2024 - Dec 2024',
      description: 'Digital transformation initiative for Abu Dhabi Securities Exchange (ADX) to modernize infrastructure and enhance market accessibility.',
      achievements: [
        'Enhanced Azure SQL Database performance by optimizing read queries',
        'Refined Azure Synapse Dedicated SQL Pool Data Warehouse structure',
        'Designed Power BI report for real-time performance monitoring',
        'Developed Python library and CLI to automate Power BI Paginated Reports standardization'
      ],
      technologies: ['Azure Synapse Analytics', 'Power BI', 'PostgreSQL', 'SQL Server', 'Azure SQL Database', 'Python'],
      tools: ['Visual Studio Code', 'Azure Data Studio', 'SQL Server Management Studio', 'Azure Portal', 'PowerShell', 'Power BI Desktop']
    },
    {
      title: 'Abraxes + MED@P Workflow Automation',
      period: 'Oct 2023 – Jan 2024',
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
      title: 'Building a Delta Lakehouse for U.S. Flights',
      period: 'Jun 2021',
      description: 'End-to-end data solution for flight data processing and analysis.',
      achievements: [
        'Developed simulation script to generate and stream flight data',
        'Created automated data pipeline for streaming data processing',
        'Delivered comprehensive solution with Power BI dashboards'
      ],
      technologies: ['Python', 'PySpark', 'Delta Lake'],
      tools: ['Power BI']
    },
    {
      title: 'Dog Breed Classifier Application',
      period: 'Oct 2020',
      description: 'Machine learning application that processes input images to identify dog breeds or suggest matching dog breeds for human images.',
      achievements: [
        'Designed CNN using transfer learning with 83% accuracy',
        'Developed application for dog breed classification'
      ],
      technologies: ['Python', 'TensorFlow', 'CNN', 'Transfer Learning'],
      tools: []
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
