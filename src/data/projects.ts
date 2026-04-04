export interface Project {
  title: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  tools: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
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
