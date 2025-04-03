'use client';

import { Briefcase, Calendar } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      company: 'Raisa Energy',
      position: 'Senior Data Engineer',
      period: 'Mar 2025 - Present',
      responsibilities: [
        'Lead the design and implementation of scalable data infrastructure and pipelines to support business intelligence and analytics initiatives.',
        'Architect and optimize ETL processes to handle large-scale data integration across multiple sources and platforms.',
        'Collaborate with data science teams to build robust data pipelines for machine learning models and advanced analytics.',
        'Implement data governance strategies ensuring data quality, security, and compliance.',
        'Drive the adoption of modern data engineering practices and technologies across the organization.'
      ]
    },
    {
      company: 'ITWorx - Free Zone, Cairo',
      position: 'Principal Advanced Analytics Engineer',
      period: 'Oct 2023 - Feb 2025',
      responsibilities: [
        'Spearhead the execution of complex analytics initiatives, leveraging expertise in data modeling, algorithm design, and advanced computational techniques.',
        'Provide thought leadership in the application of machine learning, statistical methodologies, and dynamic data visualization tools to solve business-critical challenges.',
        'Collaborate extensively with multidisciplinary teams to identify strategic opportunities and architect innovative data-driven solutions.',
        'Cultivate a culture of excellence by mentoring and empowering junior professionals, driving the adoption of cutting-edge analytics practices.',
        'Pioneer advancements by staying attuned to emerging technologies and industry trends, fostering innovation across analytics functions.'
      ]
    },
    {
      company: 'VOIS - Smart Village, Giza',
      position: 'Business Insights Senior Lead',
      period: 'May 2022 - Oct 2023',
      responsibilities: [
        'Engineered a sophisticated desktop application to automate recurring operational processes, significantly decreasing manual intervention by 25%. Demonstrated mastery of Python, PyQT6, Selenium, and Win32com API.',
        'Directed the creation, enhancement, and maintenance of comprehensive Power BI dashboards, delivering actionable insights for Pre-sales, Demand and Utilization, and Work in Progress analysis.',
        'Collaborated with cross-departmental teams to embed analytics-driven strategies within organizational workflows, optimizing decision-making efficiency.',
        'Played a pivotal role in the design and maintenance of a scalable Oracle SQL Data Warehouse, ensuring reliable and efficient data management.',
        'Migrated datasets to AWS Redshift and Google BigQuery, enhancing scalability and performance.'
      ]
    },
    {
      company: 'Atos - Nasr City, Cairo',
      position: 'Data Scientist',
      period: 'May 2021 - May 2022',
      responsibilities: [
        'Developed and optimized advanced machine learning models and analytical frameworks using Python, Scikit-learn, and TensorFlow to address key organizational challenges.',
        'Streamlined operational workflows by deploying predictive models within production environments, utilizing Docker and Kubernetes to ensure smooth integration and robust scalability.',
        'Implemented MongoDB-based IaaS on Azure, enabling scalable and efficient data storage.',
        'Established an Elastic Cloud on Kubernetes (ECK) infrastructure on AKS to enhance application monitoring and ensure optimal resource utilization.',
        'Improved access security by integrating advanced Azure authentication mechanisms into custom Python packages.',
        'Provided critical analytical insights and developed data visualization solutions for the Microsoft Practice Team, leveraging Power BI, Excel, and SQL Server.'
      ]
    },
    {
      company: 'Coca-Cola - Nasr City, Cairo',
      position: 'Senior BI Developer',
      period: 'Dec 2020 - May 2021',
      responsibilities: [
        'Developed a dynamic and interactive sales performance dashboard leveraging advanced Excel Power Query, DAX functions, and VBA to deliver in-depth comparative insights across company branches.',
        'Innovated an automated commission calculation system using advanced Excel techniques, including Power Query and complex formulas.',
        'Designed and executed complex SQL queries to retrieve and analyze sales data from the Microsoft Dynamics AX database.',
        'Automated the cheque issuance process with a custom-built Excel solution, streamlining printing for multiple banks.',
        'Standardized departmental documents, improving consistency, quality, and operational efficiency.'
      ]
    },
    {
      company: 'Al Safy Group - Fifth Settlement, New Cairo',
      position: 'Data Analyst',
      period: 'May 2018 - Dec 2020',
      responsibilities: []
    },
    {
      company: 'Master\'s Food - Zamalek, Giza',
      position: 'Accounts Payable Supervisor',
      period: 'May 2014 - May 2018',
      responsibilities: []
    },
    {
      company: 'Al Fares Egyptian Co. (Cottonil) - Nozha, Cairo',
      position: 'Accountant',
      period: 'Feb 2013 - May 2014',
      responsibilities: []
    },
    {
      company: 'The International Hospital for Urology and Nephrology - Mohandessin, Giza',
      position: 'Collector',
      period: 'Jan 2009 - Feb 2013',
      responsibilities: []
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
                <div className="md:w-1/2 pl-8 md:pl-0 md:pr-12 md:text-right">
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
                      <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
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
