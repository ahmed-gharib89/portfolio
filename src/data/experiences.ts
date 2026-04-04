export interface Experience {
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
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
