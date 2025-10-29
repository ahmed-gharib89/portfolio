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
      { name: 'Data Integration', level: 95 },
      { name: 'Data Pipeline Development', level: 90 },
      { name: 'ETL Processes (SSIS)', level: 85 },
      { name: 'Data Warehousing', level: 90 },
      { name: 'Data Modeling and Architecture', level: 85 }
    ]
  },
  {
    category: 'Programming & Databases',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'SQL', level: 95 },
      { name: 'SQL Server', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 }
    ]
  },
  {
    category: 'Cloud Platforms',
    skills: [
      { name: 'Microsoft Azure', level: 90 },
      { name: 'AWS', level: 85 },
      { name: 'Google Cloud', level: 80 }
    ]
  },
  {
    category: 'Visualization & Reporting',
    skills: [
      { name: 'Power BI', level: 95 },
      { name: 'SSRS', level: 90 },
      { name: 'Paginated Reports', level: 85 },
      { name: 'Data Analytics and Visualization', level: 90 }
    ]
  },
  {
    category: 'Machine Learning & AI',
    skills: [
      { name: 'TensorFlow', level: 80 },
      { name: 'PyTorch', level: 75 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Predictive Analytics', level: 80 }
    ]
  },
  {
    category: 'Big Data Technologies',
    skills: [
      { name: 'PySpark', level: 85 },
      { name: 'Delta Lake', level: 80 },
      { name: 'Azure Synapse Analytics', level: 85 }
    ]
  }
];

export const tools: string[] = [
  'Visual Studio Code',
  'Azure Data Studio',
  'SQL Server Management Studio',
  'Azure Portal',
  'PowerShell',
  'Power BI Desktop',
  'Power BI Report Builder',
  'PG Admin',
  'Docker',
  'Kubernetes',
  'Git',
  'Excel',
  'PyQT6',
  'Selenium',
  'Win32com API',
  'Azure Data Factory'
];
