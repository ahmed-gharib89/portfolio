export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Data Engineering',
    skills: [
      { name: 'Data Pipeline Development', level: 95 },
      { name: 'ETL/ELT Processes', level: 95 },
      { name: 'Data Warehousing', level: 90 },
      { name: 'Data Modeling & Architecture', level: 90 },
      { name: 'Medallion Architecture (DBT)', level: 90 }
    ]
  },
  {
    category: 'Programming & Databases',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 95 },
      { name: 'Snowflake', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'Azure SQL / SQL Server', level: 90 }
    ]
  },
  {
    category: 'Cloud Platforms',
    skills: [
      { name: 'Microsoft Azure', level: 95 },
      { name: 'Snowflake', level: 90 },
      { name: 'AWS', level: 85 },
      { name: 'Google Cloud', level: 80 },
      { name: 'Databricks', level: 85 }
    ]
  },
  {
    category: 'Visualization & Reporting',
    skills: [
      { name: 'Power BI', level: 95 },
      { name: 'Paginated Reports', level: 90 },
      { name: 'SSRS', level: 85 },
      { name: 'Data Analytics & Visualization', level: 90 }
    ]
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      { name: 'Agentic AI (N8N, LangChain)', level: 90 },
      { name: 'Azure OpenAI GPT', level: 85 },
      { name: 'TensorFlow / PyTorch', level: 80 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Claude Code / GitHub Copilot', level: 90 }
    ]
  },
  {
    category: 'Big Data & DevOps',
    skills: [
      { name: 'PySpark', level: 85 },
      { name: 'Delta Lake', level: 80 },
      { name: 'Azure Synapse Analytics', level: 85 },
      { name: 'Docker', level: 85 },
      { name: 'asyncio', level: 85 }
    ]
  }
];

export const tools: string[] = [
  'Visual Studio Code',
  'Azure Data Studio',
  'SQL Server Management Studio',
  'Azure Portal',
  'Snowflake Console',
  'DBT Cloud / CLI',
  'Power BI Desktop',
  'Power BI Report Builder',
  'Docker',
  'N8N',
  'Git',
  'Claude Code',
  'GitHub Copilot',
  'Azure Data Factory',
  'PG Admin',
  'PowerShell',
  'Playwright',
  'Azure Key Vault'
];
