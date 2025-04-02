'use client';

const SkillsSection = () => {
  const skillCategories = [
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

  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Technical Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Tools & Technologies
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {[
              'Visual Studio Code', 'Azure Data Studio', 'SQL Server Management Studio', 
              'Azure Portal', 'PowerShell', 'Power BI Desktop', 'Power BI Report Builder', 
              'PG Admin', 'Docker', 'Kubernetes', 'Git', 'Excel', 'PyQT6', 'Selenium', 
              'Win32com API', 'Azure Data Factory'
            ].map((tool, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
