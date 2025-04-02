'use client';

import { Briefcase, Calendar, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const AboutSection = () => {
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const certificates = [
    { 
      name: "Data Engineering Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/DUSDKNJE/download" 
    },
    { 
      name: "Google IT Automation with Python Certificate", 
      issuer: "Coursera", 
      url: "https://www.credly.com/badges/c6328983-45bb-4eaa-a3fe-0ce740a23ed0?" 
    },
    { 
      name: "Academy Accreditation - SQL Analyst Associate", 
      issuer: "Databricks", 
      url: "https://credentials.databricks.com/4d71b6ba-d301-4e68-aeab-d29fa7f6a086" 
    },
    { 
      name: "Microsoft Certified: Data Analyst Associate", 
      issuer: "Microsoft", 
      url: "https://www.credly.com/badges/e2dc706f-c0b1-4c65-8436-27186337843b" 
    },
    { 
      name: "AI Programming with Python Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/3YKJDWHD/download" 
    },
    { 
      name: "Machine Learning Engineer Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/GSAQAGGJ/download" 
    },
    { 
      name: "Advanced Data Analysis Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/J7PRGLZQ/download" 
    },
    { 
      name: "Deep Learning Specialization", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/LEUNCGT2KXCV" 
    },
    { 
      name: "Mathematics for Machine Learning Specialization", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/BRY439L2CQD7" 
    },
    { 
      name: "Azure Data Engineering Associate (DP-203)", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/8IW45DZY2QYC" 
    },
    { 
      name: "Google Cloud Data Engineer Certificate", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/W37LRK7K9D5J" 
    },
    { 
      name: "Data Streaming Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation.udacity.com/api/graduation/certificate/TYPXPKAD/download" 
    },
    { 
      name: "Cloud DevOps Engineer Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation.udacity.com/api/graduation/certificate/WFDAKNXY/download" 
    },
    { 
      name: "Microsoft Azure Fundamentals AZ-900", 
      issuer: "Microsoft", 
      url: "https://www.credly.com/badges/09047a39-9207-4d95-9ec2-5f0f597ab89c?source=linked_in_profile" 
    },
    { 
      name: "Data Science Professional Certificate (V2)", 
      issuer: "Coursera", 
      url: "https://www.credly.com/badges/b5db1d4a-29fd-4455-acd1-c0829e8ca3d8/public_url" 
    },
    { 
      name: "Google Data Analytics Professional Certificate", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/LQRJXXJYK4V8" 
    },
    { 
      name: "Machine Learning Cross-Skilling Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation.udacity.com/api/graduation/certificate/TAELCEYS/download" 
    },
    { 
      name: "Linux Academy Elastic Certification", 
      issuer: "A Cloud Guru", 
      url: "https://verify.acloud.guru/20F285D2422D" 
    },
    { 
      name: "Intermediate Python Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation.udacity.com/api/graduation/certificate/ZYPFCA3J/download" 
    },
    { 
      name: "Architecting with Google Kubernetes Engine", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/F6JE79KH4NJB" 
    },
    { 
      name: "AWS Fundamentals Specialization", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/RKP2JSLAKB7D" 
    },
    { 
      name: "Web Design for Everybody Specialization", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/SKK9HLP8YAHY" 
    },
    { 
      name: "Building Cloud Computing Solutions at Scale", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/YAPTXUYL7CBD" 
    },
    { 
      name: "Machine Learning: Algorithms in the Real World", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/HCBZXBV5Z2N5" 
    },
    { 
      name: "Data Engineer with Python Track", 
      issuer: "DataCamp", 
      url: "https://www.datacamp.com/statement-of-accomplishment/track/7a1d3417ec7e5d12f72d4cdff8e8295d18df585a" 
    },
    { 
      name: "Python Programmer Track", 
      issuer: "DataCamp", 
      url: "https://www.datacamp.com/statement-of-accomplishment/track/d5902d769555242c9e47e0881ea2834931f33b20" 
    },
    { 
      name: "TensorFlow Developer Professional Certificate", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/WUBPEHKLA93U" 
    },
    { 
      name: "Practical Data Science", 
      issuer: "Coursera", 
      url: "https://www.coursera.org/account/accomplishments/specialization/certificate/WUQDQTG265TL" 
    },
    { 
      name: "Academy Accreditation - Delta Lake Essentials", 
      issuer: "Databricks", 
      url: "https://credentials.databricks.com/a30d5815-848d-4384-938f-a97d6eebd84c" 
    },
    { 
      name: "Academy Accreditation - Unified Data Analytics", 
      issuer: "Databricks", 
      url: "https://credentials.databricks.com/98d2dac3-3be4-40f7-b5c2-dce4ad3ceb22" 
    },
    { 
      name: "Data Analysis and Visualization with Power BI", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/ZCREQMK6/download" 
    },
    { 
      name: "Data Analyst with SQL Server Track", 
      issuer: "DataCamp", 
      url: "https://www.datacamp.com/statement-of-accomplishment/track/0939af8d203093c470cd8551dfa22cf454610ba9" 
    },
    { 
      name: "Agile Software Developer Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/K5FFHVYU/download" 
    },
    { 
      name: "Advanced Web Development Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/WNY57CWJ/download" 
    },
    { 
      name: "Web Development Professional Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/VCGRCAFZ/download" 
    },
    { 
      name: "Data Analysis Professional Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/HPKMNDHK/download" 
    },
    { 
      name: "Programming for Data Science Nanodegree", 
      issuer: "Udacity", 
      url: "https://graduation-api.udacity.com/api/certificate/HUZMETNC/download" 
    },
    { 
      name: "Data Scientist with Python Track", 
      issuer: "DataCamp", 
      url: "https://www.datacamp.com/statement-of-accomplishment/track/735a5253913e17fc3c0ad15d11d897a565172bd5" 
    },
    { 
      name: "Data Analyst with Python Track", 
      issuer: "DataCamp", 
      url: "https://www.datacamp.com/statement-of-accomplishment/track/d445c2b843e76eb06e95884e8863312cb4edce89" 
    },
  ];

  const toggleCertificates = () => {
    setShowAllCertificates(!showAllCertificates);
  };

  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, 6);

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Info</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">Name</h4>
                  <p className="text-gray-900 dark:text-white">Ahmed Gharib</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">Location</h4>
                  <p className="text-gray-900 dark:text-white">Cairo, Egypt</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">Email</h4>
                  <a href="mailto:a.gharib89@yahoo.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    a.gharib89@yahoo.com
                  </a>
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">Phone</h4>
                  <p className="text-gray-900 dark:text-white">+2010 96995535</p>
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-500 dark:text-gray-400">Languages</h4>
                  <div className="mt-2 space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Arabic</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Native</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">English</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Professional Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Experienced Data Engineer with over 6 years of expertise in designing and implementing scalable data solutions across Microsoft Azure, AWS, and Google Cloud platforms. Skilled in building robust data pipelines and ETL processes using SSIS, Azure Data Factory, and Python, as well as optimizing databases like Azure SQL, PostgreSQL, MongoDB, and SQL Server to enhance performance and ensure seamless data management. Proficient in developing interactive dashboards and advanced reports using Power BI, SSRS, and Paginated Reports, enabling real-time insights and data-driven decision-making.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Leveraged advanced frameworks like PySpark, Delta Lake, TensorFlow, and PyTorch to create end-to-end data architectures, automate workflows, and enhance predictive analytics. Known for collaborating with cross-functional teams to standardize workflows, improve data governance, and drive operational excellence through innovative and scalable data solutions.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Education
              </h3>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    Bachelor's Degree of Commerce
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">Ain Shams University</p>
                  <p className="text-gray-500 dark:text-gray-400">2008 - 2011</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedCertificates.map((cert, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-md">
                    <a 
                      href={cert.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {cert.name}
                    </a>
                    <p className="text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button 
                  onClick={toggleCertificates}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {showAllCertificates ? (
                    <>
                      Show fewer certifications <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View all certifications <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
