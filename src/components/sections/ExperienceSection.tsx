'use client';

import { Briefcase, Calendar } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      company: 'ITWorx - Free Zone, Cairo',
      position: 'Principal Advanced Analytics Engineer',
      period: 'Oct 2023 - Present',
      responsibilities: [
        'Architected data infrastructure for Abu Dhabi Securities Exchange (ADX) digital transformation, optimizing Azure SQL and Synapse data warehouse for trading platform performance.',
        'Built Agentic AI-powered competitor intelligence system using N8N, Azure OpenAI GPT, LangChain, star-schema Azure SQL, Docker Compose, Playwright, and FlareSolverr.',
        'Standardized 190+ Power BI Paginated Reports across 4 environments (Dev, Test, UAT, Prod) with a custom Python CLI tool, reducing processing time from 4 hours to 15 minutes.',
        'Delivered multiple training sessions on AI coding assistants (Claude Code, GitHub Copilot) to engineering teams, driving adoption of AI-augmented development workflows.',
        'Led presales activities and POCs in Agentic AI, data engineering, and analytics for enterprise clients in financial services and healthcare.'
      ]
    },
    {
      company: 'Raisa Energy LLC - Cairo, Egypt',
      position: 'Senior Data Engineer',
      period: 'Dec 2021 - Oct 2023',
      responsibilities: [
        'Led a team of 4 engineers, migrating legacy multi-layer architecture to a proper Medallion architecture (Bronze/Silver/Gold) using Snowflake and DBT.',
        'Developed an Entity Correction Model using DBT with exact and fuzzy matching, improving financial attribution accuracy from ~70% to ~98%.',
        'Built WEnergyDocsEL — an async Python ETL pipeline (asyncio) for document processing, achieving a 68x performance improvement over the synchronous version.',
        'Delivered training sessions on AI tools and coding assistants to the engineering team.',
        'Implemented data governance strategies ensuring data quality, security, and compliance across all data assets.'
      ]
    },
    {
      company: '_VOIS - Smart Village, Giza',
      position: 'Business Insights Sr. Lead',
      period: 'Jan 2019 - Dec 2021',
      responsibilities: [
        'Built a Python desktop application (PyQT6 + Selenium + Win32com API) that automated daily operations, reducing manual effort by 25%.',
        'Directed the creation and maintenance of comprehensive Power BI dashboards for Pre-sales, Demand and Utilization, and Work in Progress analysis.',
        'Played a pivotal role in designing and maintaining a scalable Oracle SQL Data Warehouse.',
        'Migrated datasets to AWS Redshift and Google BigQuery, enhancing scalability and performance.',
        'Collaborated with cross-departmental teams to embed analytics-driven strategies within organizational workflows.'
      ]
    },
    {
      company: 'Atos - Cairo, Egypt',
      position: 'Senior Business Intelligence Developer',
      period: 'Dec 2017 - Jan 2019',
      responsibilities: [
        'Technical lead for pre-sales on Enterprise BI and data platform projects, contributing to new client acquisition and relationship expansion.',
        'Developed and optimized analytical frameworks using Python, Scikit-learn, and TensorFlow.',
        'Implemented MongoDB-based IaaS on Azure, enabling scalable and efficient data storage.',
        'Established Elastic Cloud on Kubernetes (ECK) infrastructure on AKS to enhance application monitoring.',
        'Provided critical analytical insights and data visualization solutions leveraging Power BI, Excel, and SQL Server.'
      ]
    },
    {
      company: 'ALSAFY GROUP - Fifth Settlement, New Cairo',
      position: 'Data Analyst',
      period: 'May 2015 - Dec 2017',
      responsibilities: [
        'Created a sales dashboard using Excel Power Query, DAX functions, and VBA to analyze and compare branch performance.',
        'Facilitated analysis and reporting of key performance indicators across multiple departments.',
        'Designed and executed complex SQL queries to retrieve and analyze data from enterprise databases.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Professional Experience
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 z-10"></div>
                
                {/* Content */}
                <div className="md:w-1/2 pl-8 md:pl-0 md:pr-12">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2">{exp.company}</h4>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    
                    {exp.responsibilities.length > 0 && (
                      <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm text-left">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
