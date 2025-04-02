'use client';

import { Briefcase, Calendar, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const AboutSection = () => {
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const certificates = [
    { name: "Data Engineering Nanodegree", issuer: "Udacity" },
    { name: "Google IT Automation with Python Certificate", issuer: "Coursera" },
    { name: "Academy Accreditation - SQL Analyst Associate", issuer: "Databricks" },
    { name: "Microsoft Certified: Power BI Data Analyst Associate PL-300", issuer: "Microsoft" },
    { name: "AI Programming with Python Nanodegree", issuer: "Udacity" },
    { name: "Machine Learning Engineer Nanodegree", issuer: "Udacity" },
    { name: "Advanced-Data Analysis Nanodegree", issuer: "Udacity" },
    { name: "Deep Learning Specialization", issuer: "Coursera" },
    { name: "Mathematics for Machine Learning Specialization", issuer: "Coursera" },
    { name: "Azure Data Engineering Associate (DP-203)", issuer: "Coursera" },
    { name: "Google Cloud Data Engineer Certificate", issuer: "Coursera" },
    { name: "Data Streaming Nanodegree", issuer: "Udacity" },
    { name: "Cloud DevOps Engineer Nanodegree", issuer: "Udacity" },
    { name: "Microsoft Azure Fundamentals AZ-900", issuer: "Microsoft" },
  ];

  const toggleCertificates = () => {
    setShowAllCertificates(!showAllCertificates);
  };

  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, 4);

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
                    <h4 className="font-medium text-gray-900 dark:text-white">{cert.name}</h4>
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
