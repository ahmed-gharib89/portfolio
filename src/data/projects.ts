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
