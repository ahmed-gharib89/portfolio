'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import Link from 'next/link';
import { Calendar, Clock, Share2, Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample blog posts data - in a real app this would be fetched from a database or API
const blogPosts = {
  'modern-data-engineering-practices': {
    title: 'Modern Data Engineering Practices in 2025',
    date: 'April 1, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Engineering',
    content: `
      <p>The field of data engineering has evolved significantly over the past few years. In 2025, organizations are embracing several modern practices to handle the increasing volume, variety, and velocity of data.</p>
      
      <h2>The Rise of Decentralized Data Architecture</h2>
      <p>Data Mesh has emerged as a dominant architectural pattern, moving away from centralized data lakes and warehouses. Organizations are now treating data as a product, with domain-oriented ownership and distributed governance.</p>
      
      <p>Key components of this approach include:</p>
      <ul>
        <li>Domain-oriented data ownership and architecture</li>
        <li>Data as a product</li>
        <li>Self-serve data infrastructure</li>
        <li>Federated computational governance</li>
      </ul>
      
      <h2>Real-time Processing as the New Standard</h2>
      <p>Batch processing is increasingly being replaced by real-time streaming architectures. Modern data stacks now routinely incorporate technologies like:</p>
      <ul>
        <li>Apache Kafka for event streaming</li>
        <li>Apache Flink for stateful stream processing</li>
        <li>Materialize for real-time materialized views</li>
        <li>ksqlDB for stream processing with SQL</li>
      </ul>
      
      <h2>Observability and Testing</h2>
      <p>Data quality issues can have significant downstream impacts. Modern data engineering practices now include comprehensive testing and monitoring:</p>
      <ul>
        <li>Data contract testing to validate producer-consumer relationships</li>
        <li>Great Expectations for automated testing of data quality</li>
        <li>dbt for transformation tests</li>
        <li>Monte Carlo and other tools for data observability</li>
      </ul>
      
      <h2>Infrastructure as Code and DataOps</h2>
      <p>DevOps practices have been fully embraced by data teams, with infrastructure-as-code becoming standard:</p>
      <ul>
        <li>Terraform for provisioning data infrastructure</li>
        <li>CI/CD pipelines for data transformations</li>
        <li>Version control for all data assets</li>
        <li>Automated testing in staging environments before production deployment</li>
      </ul>
      
      <h2>Polyglot Persistence</h2>
      <p>The rise of purpose-built databases means organizations are increasingly using different database technologies for different use cases:</p>
      <ul>
        <li>Vector databases for machine learning feature storage (e.g., Pinecone, Weaviate)</li>
        <li>Graph databases for relationship analysis (e.g., Neo4j, Amazon Neptune)</li>
        <li>Time-series databases for IoT and monitoring data (e.g., InfluxDB, TimescaleDB)</li>
        <li>Document databases for semi-structured data (e.g., MongoDB, Firestore)</li>
      </ul>
      
      <h2>Cost Optimization</h2>
      <p>As data volumes grow, cost management has become a critical concern:</p>
      <ul>
        <li>Data virtualization to query data in place without movement</li>
        <li>Tiered storage strategies with automatic archiving</li>
        <li>Query optimization and caching layers</li>
        <li>Usage-based resource allocation</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The modern data engineering landscape is characterized by decentralization, real-time processing, robust testing, and specialized storage solutions. Organizations that adopt these practices are better positioned to extract value from their data assets while maintaining governance, reliability, and cost-effectiveness.</p>
    `
  },
  'llms-in-data-pipelines': {
    title: 'Integrating LLMs into Data Engineering Pipelines',
    date: 'March 15, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Data Engineering',
    content: `
      <p>Large Language Models (LLMs) have revolutionized many aspects of software development, and data engineering is no exception. In this article, we'll explore practical ways to integrate LLMs into data engineering pipelines to enhance productivity and create more intelligent data systems.</p>
      
      <h2>Automated Data Quality Checks</h2>
      <p>LLMs can be trained to identify patterns and anomalies in data that traditional rule-based systems might miss:</p>
      <ul>
        <li>Detecting semantic inconsistencies in text data</li>
        <li>Identifying problematic data patterns through natural language descriptions</li>
        <li>Generating data quality rules based on historical issues</li>
      </ul>
      
      <p>Example implementation using LangChain and great_expectations:</p>
      <pre class="code-block">
      from langchain.llms import OpenAI
      from great_expectations.core import ExpectationSuite
      
      def generate_data_quality_rules(dataset_description, sample_data):
          llm = OpenAI(model_name="gpt-4")
          prompt = f"""
          Given the following dataset description and sample:
          
          Description: {dataset_description}
          
          Sample data:
          {sample_data}
          
          Generate a comprehensive list of data quality rules that would 
          be important to enforce, expressed as Great Expectations expectations.
          """
          
          rules = llm.generate(prompt)
          # Convert to Great Expectations format
          # ...
          
          return expectation_suite
      </pre>
      
      <h2>Automated Documentation Generation</h2>
      <p>Documentation is often the most neglected aspect of data engineering. LLMs can help by:</p>
      <ul>
        <li>Generating comprehensive data dictionaries</li>
        <li>Creating documentation for complex SQL queries and transformations</li>
        <li>Explaining data lineage in natural language</li>
      </ul>
      
      <p>Example using LLM to document dbt models:</p>
      <pre class="code-block">
      import os
      import yaml
      from langchain.llms import Anthropic
      
      def document_dbt_model(model_sql_path):
          with open(model_sql_path, 'r') as f:
              sql_code = f.read()
          
          llm = Anthropic(model="claude-2")
          prompt = f"""
          Here is a dbt SQL model:
          
          {sql_code}
          
          Please provide:
          1. A clear description of what this model does
          2. Documentation for each column
          3. Any business logic encoded in this transformation
          4. Dependencies and downstream effects
          
          Format as YAML for a dbt schema.yml file.
          """
          
          documentation = llm.generate(prompt)
          
          # Save as schema.yml
          # ...
      </pre>
      
      <h2>Data Transformation Assistance</h2>
      <p>LLMs can help write and optimize complex data transformations:</p>
      <ul>
        <li>Converting business requirements into SQL or Python code</li>
        <li>Optimizing existing transformations for performance</li>
        <li>Translating between different transformation languages (SQL to Spark, etc.)</li>
      </ul>
      
      <h2>Semantic Data Discovery</h2>
      <p>Finding the right data in large organizations is challenging. LLMs can enable natural language search across data assets:</p>
      <ul>
        <li>Creating and maintaining embeddings of data catalog entries</li>
        <li>Enabling natural language querying of data catalogs</li>
        <li>Suggesting related datasets based on semantic similarity</li>
      </ul>
      
      <p>Implementation example with a vector database:</p>
      <pre class="code-block">
      from langchain.embeddings import OpenAIEmbeddings
      from langchain.vectorstores import Pinecone
      import pinecone
      
      # Initialize embeddings model
      embeddings = OpenAIEmbeddings()
      
      # Initialize Pinecone
      pinecone.init(api_key="YOUR_API_KEY", environment="YOUR_ENV")
      index_name = "data-catalog"
      
      # Store dataset descriptions and metadata
      texts = ["This dataset contains daily sales transactions from our retail stores",
               "Customer demographic information including age, location, and preferences",
               "Product inventory and supply chain tracking data"]
               
      metadatas = [
          {"name": "retail_sales", "owner": "Sales Team", "update_frequency": "Daily"},
          {"name": "customer_demographics", "owner": "Marketing", "update_frequency": "Monthly"},
          {"name": "inventory", "owner": "Operations", "update_frequency": "Hourly"}
      ]
      
      # Create vectorstore
      vector_db = Pinecone.from_texts(texts, embeddings, metadatas=metadatas, index_name=index_name)
      
      # Later, search using natural language
      query = "Where can I find data about what products customers are buying?"
      results = vector_db.similarity_search(query, k=2)
      </pre>
      
      <h2>Intelligent Data Lineage</h2>
      <p>Understanding how data flows through an organization is critical. LLMs can help:</p>
      <ul>
        <li>Extracting lineage information from code and documentation</li>
        <li>Explaining complex lineage graphs in natural language</li>
        <li>Predicting the impact of schema changes</li>
      </ul>
      
      <h2>Challenges and Best Practices</h2>
      <p>While LLMs offer significant benefits for data engineering, there are important considerations:</p>
      <ul>
        <li>Always validate LLM-generated code before executing it in production</li>
        <li>Implement proper governance for LLM usage with sensitive data</li>
        <li>Be aware of potential biases in LLM outputs</li>
        <li>Use domain-specific fine-tuned models for specialized tasks</li>
        <li>Implement human-in-the-loop workflows for critical processes</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>LLMs are transforming data engineering by automating routine tasks, enhancing documentation, and enabling more intuitive ways to work with data. By thoughtfully integrating these technologies into data pipelines, organizations can improve productivity, data quality, and the overall user experience of data systems.</p>
    `
  },
  'streaming-architecture': {
    title: 'Building Robust Streaming Data Architectures',
    date: 'February 28, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Architecture',
    content: `
      <p>As organizations increasingly need to process data in real-time, streaming data architectures have become essential. This article provides a comprehensive guide to designing and implementing robust streaming architectures using Apache Kafka, Apache Spark, and modern cloud services.</p>
      
      <h2>Understanding Streaming Data Architecture</h2>
      <p>A streaming data architecture enables the continuous processing of data in real-time, as opposed to batch processing which operates on chunks of data at scheduled intervals. Key components include:</p>
      <ul>
        <li>Event sources that generate data streams</li>
        <li>Stream processing engines that transform and analyze data</li>
        <li>Storage systems for both raw and processed data</li>
        <li>Serving layers for query and analysis</li>
      </ul>
      
      <h2>Building Blocks of Modern Streaming Architecture</h2>
      
      <h3>1. Apache Kafka as the Central Nervous System</h3>
      <p>Apache Kafka has become the de facto standard for implementing streaming data platforms:</p>
      <ul>
        <li>High throughput message broker</li>
        <li>Durable storage with configurable retention</li>
        <li>Scalability through partitioning</li>
        <li>Connect API for integrating with external systems</li>
      </ul>
      
      <p>Sample Kafka producer code in Python:</p>
      <pre class="code-block">
      from kafka import KafkaProducer
      import json
      
      # Configure the producer
      producer = KafkaProducer(
          bootstrap_servers=['kafka-broker:9092'],
          value_serializer=lambda x: json.dumps(x).encode('utf-8')
      )
      
      # Send messages
      def send_event(event):
          producer.send('events-topic', value=event)
          
      # Example event
      event = {
          'user_id': '12345',
          'event_type': 'page_view',
          'timestamp': '2025-02-28T15:22:31Z',
          'page': '/products/1234',
          'metadata': {
              'user_agent': 'Mozilla/5.0...',
              'referrer': 'https://www.google.com'
          }
      }
      
      send_event(event)
      </pre>
      
      <h3>2. Stream Processing with Spark Structured Streaming</h3>
      <p>Apache Spark's Structured Streaming provides a powerful SQL-based API for processing streams:</p>
      
      <pre class="code-block">
      from pyspark.sql import SparkSession
      from pyspark.sql.functions import window, col
      
      # Initialize Spark
      spark = SparkSession.builder \
          .appName("StreamProcessor") \
          .getOrCreate()
      
      # Read from Kafka
      events_df = spark \
          .readStream \
          .format("kafka") \
          .option("kafka.bootstrap.servers", "kafka-broker:9092") \
          .option("subscribe", "events-topic") \
          .load()
      
      # Parse JSON payload
      from pyspark.sql.types import StructType, StringType, TimestampType
      from pyspark.sql.functions import from_json
      
      schema = StructType() \
          .add("user_id", StringType()) \
          .add("event_type", StringType()) \
          .add("timestamp", TimestampType()) \
          .add("page", StringType())
      
      parsed_events = events_df \
          .select(from_json(col("value").cast("string"), schema).alias("data")) \
          .select("data.*")
      
      # Calculate page views per minute
      page_counts = parsed_events \
          .withWatermark("timestamp", "10 minutes") \
          .groupBy(
              window(col("timestamp"), "1 minute"),
              col("page")
          ) \
          .count()
      
      # Write to output sink
      query = page_counts \
          .writeStream \
          .outputMode("complete") \
          .format("memory") \
          .queryName("page_counts") \
          .start()
      
      query.awaitTermination()
      </pre>
      
      <h3>3. Event Sourcing and CQRS Patterns</h3>
      <p>Event Sourcing and Command Query Responsibility Segregation (CQRS) are powerful patterns for building streaming architectures:</p>
      <ul>
        <li>Store state changes as an immutable sequence of events</li>
        <li>Rebuild state by replaying events</li>
        <li>Separate read and write models for optimized performance</li>
      </ul>
      
      <h2>Cloud-Native Streaming Solutions</h2>
      
      <h3>AWS Streaming Stack</h3>
      <ul>
        <li>Amazon Kinesis Data Streams for event ingestion</li>
        <li>Amazon Kinesis Data Firehose for delivery to storage</li>
        <li>Amazon Kinesis Data Analytics for SQL-based processing</li>
        <li>AWS Lambda for serverless event processing</li>
      </ul>
      
      <h3>Azure Streaming Stack</h3>
      <ul>
        <li>Azure Event Hubs for event ingestion</li>
        <li>Azure Stream Analytics for processing</li>
        <li>Azure Functions for serverless event handling</li>
      </ul>
      
      <h3>Google Cloud Streaming Stack</h3>
      <ul>
        <li>Google Cloud Pub/Sub for event ingestion</li>
        <li>Google Cloud Dataflow for processing</li>
        <li>Google Cloud Functions for serverless event handling</li>
      </ul>
      
      <h2>Handling Common Challenges</h2>
      
      <h3>Exactly-Once Processing</h3>
      <p>Ensuring that each event is processed exactly once is critical for many applications:</p>
      <ul>
        <li>Use idempotent consumers</li>
        <li>Implement deduplication mechanisms</li>
        <li>Leverage transaction support in modern streaming platforms</li>
      </ul>
      
      <h3>Late-Arriving Data</h3>
      <p>Data can arrive out of order or late in distributed systems:</p>
      <ul>
        <li>Implement watermarking to handle late data</li>
        <li>Use event time rather than processing time</li>
        <li>Configure appropriate time windows for aggregations</li>
      </ul>
      
      <h3>Schema Evolution</h3>
      <p>As systems evolve, data schemas change:</p>
      <ul>
        <li>Use a schema registry to manage schema versions</li>
        <li>Implement forward and backward compatibility</li>
        <li>Consider using formats like Avro or Protobuf</li>
      </ul>
      
      <h2>Monitoring and Observability</h2>
      <p>Robust streaming systems require comprehensive monitoring:</p>
      <ul>
        <li>End-to-end latency tracking</li>
        <li>Consumer lag monitoring</li>
        <li>Error rate tracking</li>
        <li>Throughput metrics</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building robust streaming data architectures requires careful consideration of components, patterns, and challenges. By leveraging modern tools like Kafka and Spark, alongside cloud-native services, organizations can create scalable, resilient systems that deliver real-time insights and capabilities.</p>
    `
  },
  'llm-data-extraction': {
    title: 'Using LLMs for Automated Data Extraction and Classification',
    date: 'February 10, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Data Engineering',
    content: `
      <p>Extracting structured data from unstructured text is a common challenge in data engineering. Large Language Models (LLMs) have revolutionized this task, enabling more accurate and flexible extraction compared to traditional methods.</p>
      
      <h2>The Evolution of Data Extraction</h2>
      <p>Data extraction has evolved through several phases:</p>
      <ol>
        <li>Rule-based systems with regular expressions</li>
        <li>Machine learning classifiers with feature engineering</li>
        <li>Deep learning approaches like BERT and RoBERTa</li>
        <li>Large Language Models with in-context learning and task-specific fine-tuning</li>
      </ol>
      
      <h2>LLMs for Structured Data Extraction</h2>
      
      <h3>1. Zero-Shot Information Extraction</h3>
      <p>Modern LLMs can extract structured information without explicit training:</p>
      
      <pre class="code-block">
      from langchain.llms import OpenAI
      
      llm = OpenAI(model_name="gpt-4")
      
      text = """
      In the quarterly earnings call on March 15, 2025, CEO Jane Smith announced 
      that XYZ Corporation achieved $1.2 billion in revenue, representing a 15% 
      year-over-year growth. The company's EBITDA margin improved to 28%, and 
      they plan to invest $300 million in R&D for their new AI product line.
      """
      
      prompt = f"""
      Extract the following information from the text as JSON:
      - Company name
      - CEO name
      - Revenue amount
      - Revenue growth percentage
      - EBITDA margin
      - R&D investment amount
      - Date of announcement
      
      Text: {text}
      
      JSON:
      """
      
      result = llm.generate(prompt)
      print(result)
      </pre>
      
      <p>Expected output:</p>
      <pre class="code-block">
      {
        "company_name": "XYZ Corporation",
        "ceo_name": "Jane Smith",
        "revenue_amount": "$1.2 billion",
        "revenue_growth": "15%",
        "ebitda_margin": "28%",
        "rd_investment": "$300 million",
        "announcement_date": "March 15, 2025"
      }
      </pre>
      
      <h3>2. Document Parsing and Table Extraction</h3>
      <p>LLMs can extract structured tables from text, even when formatting is inconsistent:</p>
      
      <pre class="code-block">
      from langchain.llms import Anthropic
      
      llm = Anthropic(model="claude-2")
      
      text = """
      Product Performance Summary - Q1 2025
      
      Product A: 12,500 units sold, $2.5M revenue, 22% margin
      Product B: 8,300 units sold, $1.8M revenue, 31% margin
      Product C: 15,750 units sold, $3.2M revenue, 18% margin
      """
      
      prompt = f"""
      Convert the following product performance text into a structured JSON array with 
      each product having units_sold, revenue, and margin fields:
      
      {text}
      """
      
      result = llm.generate(prompt)
      print(result)
      </pre>
      
      <h3>3. Classification and Categorization</h3>
      <p>LLMs excel at classifying text into categories based on content:</p>
      
      <pre class="code-block">
      customer_feedback = """
      I've been using your analytics dashboard for three months now, and while I love the 
      visualizations, the data refresh is too slow. Sometimes I wait 30 seconds for the 
      dashboard to update when I change date ranges. Could you optimize this?
      """
      
      prompt = f"""
      Categorize the following customer feedback into the most appropriate categories 
      from: UI/UX, Performance, Feature Request, Bug Report, Data Quality, or Security.
      
      Also assign a sentiment score from 1-5 where 1 is very negative and 5 is very positive.
      
      Provide your answer as JSON with 'categories' and 'sentiment_score' fields.
      
      Feedback: {customer_feedback}
      """
      
      result = llm.generate(prompt)
      print(result)
      </pre>
      
      <h2>Building a Production-Ready Data Extraction Pipeline</h2>
      
      <h3>1. Pre-processing for Optimal Extraction</h3>
      <p>Before sending text to LLMs, consider these preprocessing steps:</p>
      <ul>
        <li>Document segmentation to handle context length limitations</li>
        <li>Noise removal (headers, footers, watermarks)</li>
        <li>Table and layout recognition for structured documents</li>
        <li>Language detection for multilingual corpora</li>
      </ul>
      
      <h3>2. Prompt Engineering for Accuracy</h3>
      <p>Well-designed prompts significantly improve extraction quality:</p>
      <ul>
        <li>Include examples of desired output format</li>
        <li>Specify expected data types and formats</li>
        <li>Add constraints and validation rules</li>
        <li>Use chain-of-thought prompting for complex reasoning</li>
      </ul>
      
      <h3>3. Post-processing and Validation</h3>
      <p>LLM outputs require validation and normalization:</p>
      <ul>
        <li>JSON schema validation</li>
        <li>Data type conversion and normalization</li>
        <li>Business rule validation</li>
        <li>Outlier detection</li>
      </ul>
      
      <pre class="code-block">
      import json
      from jsonschema import validate
      
      # Define schema for validation
      schema = {
          "type": "object",
          "required": ["company_name", "revenue_amount", "announcement_date"],
          "properties": {
              "company_name": {"type": "string"},
              "revenue_amount": {"type": "string", "pattern": "^\\$[0-9]+(\\.[0-9]+)? (billion|million)$"},
              "announcement_date": {"type": "string", "format": "date"}
          }
      }
      
      # Parse LLM output
      try:
          extracted_data = json.loads(llm_output)
          validate(instance=extracted_data, schema=schema)
          # Further processing...
      except json.JSONDecodeError:
          print("Failed to parse LLM output as JSON")
      except Exception as e:
          print(f"Validation error: {e}")
      </pre>
      
      <h3>4. Human-in-the-Loop for Edge Cases</h3>
      <p>For critical applications, implement human review workflows:</p>
      <ul>
        <li>Confidence scoring to flag uncertain extractions</li>
        <li>Review queues for human validation</li>
        <li>Feedback loops to improve extraction over time</li>
      </ul>
      
      <h2>Fine-tuning for Domain-Specific Extraction</h2>
      <p>For specialized domains, fine-tuning LLMs can improve accuracy:</p>
      <ul>
        <li>Create domain-specific training data</li>
        <li>Fine-tune smaller models for production deployment</li>
        <li>Consider instruction tuning for specific extraction tasks</li>
      </ul>
      
      <h2>Cost and Performance Optimization</h2>
      <p>LLM-based extraction can be expensive at scale. Consider:</p>
      <ul>
        <li>Using smaller models for simple extraction tasks</li>
        <li>Implementing caching for repeated extractions</li>
        <li>Batching requests where possible</li>
        <li>Using embeddings + retrieval for large document sets</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>LLMs have transformed data extraction capabilities, enabling more flexible and accurate processing of unstructured data. By implementing proper pre-processing, prompt engineering, validation, and optimization techniques, data engineers can build robust extraction pipelines that unlock value from previously inaccessible data sources.</p>
    `
  },
  'data-governance-ai-era': {
    title: 'Data Governance in the AI Era',
    date: 'January 25, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Governance',
    content: `
      <p>The rise of Large Language Models (LLMs) and generative AI technologies presents new challenges and opportunities for data governance. Organizations must adapt their governance practices to address the unique characteristics of these technologies.</p>
      
      <h2>Evolving Data Governance for AI</h2>
      <p>Traditional data governance focused on structured data in databases and data warehouses. The AI era requires expanding governance to cover:</p>
      <ul>
        <li>Training data for AI models</li>
        <li>Model outputs and artifacts</li>
        <li>Prompt engineering and management</li>
        <li>Generated content and synthetic data</li>
      </ul>
      
      <h2>Key Governance Challenges with LLMs</h2>
      
      <h3>1. Data Lineage and Provenance</h3>
      <p>Understanding what data was used to train models and where generated content originated from is critical:</p>
      <ul>
        <li>Documenting training data sources and preprocessing steps</li>
        <li>Tracking prompt history and model versions</li>
        <li>Maintaining clear lineage between inputs and outputs</li>
      </ul>
      
      <h3>2. Privacy and Compliance</h3>
      <p>LLMs create new privacy challenges:</p>
      <ul>
        <li>Risk of memorization of sensitive training data</li>
        <li>Potential for re-identification of anonymized data</li>
        <li>Compliance with regulations like GDPR, HIPAA, and CCPA</li>
      </ul>
      
      <p>Implementation example for privacy-preserving prompt logging:</p>
      <pre class="code-block">
      import hashlib
      import json
      from datetime import datetime
      
      class PrivacyPreservingLogger:
          def __init__(self, connection_string):
              self.conn = establish_connection(connection_string)
              
          def log_interaction(self, user_id, prompt, response, model_id):
              # Hash personally identifiable information
              hashed_user_id = hashlib.sha256(user_id.encode()).hexdigest()
              
              # Redact sensitive information from prompt and response
              redacted_prompt = self.redact_sensitive_info(prompt)
              redacted_response = self.redact_sensitive_info(response)
              
              # Create log entry
              log_entry = {
                  "hashed_user_id": hashed_user_id,
                  "interaction_time": datetime.utcnow().isoformat(),
                  "redacted_prompt": redacted_prompt,
                  "redacted_response": redacted_response,
                  "model_id": model_id,
                  "metadata": {
                      "prompt_tokens": len(prompt.split()),
                      "response_tokens": len(response.split())
                  }
              }
              
              # Store log
              self.conn.store_log(json.dumps(log_entry))
              
          def redact_sensitive_info(self, text):
              # Implement PII detection and redaction
              # ...
              return redacted_text
      </pre>
      
      <h3>3. Bias and Fairness</h3>
      <p>LLMs can reflect and amplify biases in training data:</p>
      <ul>
        <li>Regular bias auditing and testing</li>
        <li>Documenting known limitations and biases</li>
        <li>Implementing fairness metrics and thresholds</li>
      </ul>
      
      <h3>4. Access Control and Authorization</h3>
      <p>Managing who can access AI capabilities:</p>
      <ul>
        <li>Role-based access to different model capabilities</li>
        <li>Approval workflows for high-risk operations</li>
        <li>Usage quotas and rate limiting</li>
      </ul>
      
      <h2>Implementing AI Governance Frameworks</h2>
      
      <h3>1. Model Cards and Documentation</h3>
      <p>Comprehensive documentation of AI models is essential:</p>
      
      <pre class="code-block">
      # Sample Model Card Structure
      {
        "model_id": "text-generation-v3",
        "version": "1.2.5",
        "description": "General purpose text generation model",
        "date_created": "2025-01-10",
        "model_type": "Transformer-based LLM",
        "parameters": 13000000000,
        "training_data": {
          "sources": ["Curated web text", "Books corpus", "Code repositories"],
          "date_range": "Up to December 2024",
          "preprocessing": ["Deduplication", "Quality filtering", "Toxicity removal"]
        },
        "performance_metrics": {
          "perplexity": 3.2,
          "accuracy_benchmarks": {...},
          "bias_evaluations": {...}
        },
        "intended_use": {
          "primary_uses": ["Content creation", "Summarization"],
          "out_of_scope_uses": ["Medical advice", "Legal advice"]
        },
        "limitations": [
          "May produce factually incorrect information",
          "Limited knowledge of events after December 2024",
          "May exhibit social biases and stereotypes"
        ],
        "ethical_considerations": {...},
        "updates": [
          {"date": "2025-01-05", "description": "Reduced bias in gender representation"}
        ]
      }
      </pre>
      
      <h3>2. Prompt Management</h3>
      <p>Treating prompts as governed assets:</p>
      <ul>
        <li>Prompt versioning and change management</li>
        <li>Testing and validation of prompt updates</li>
        <li>Centralized prompt libraries with access controls</li>
      </ul>
      
      <h3>3. Output Monitoring and Auditing</h3>
      <p>Maintaining visibility into AI system outputs:</p>
      <ul>
        <li>Content moderation for generated outputs</li>
        <li>Factuality checking where applicable</li>
        <li>Monitoring for data leakage and privacy violations</li>
      </ul>
      
      <h3>4. Synthetic Data Governance</h3>
      <p>Managing AI-generated synthetic data:</p>
      <ul>
        <li>Classification and labeling of synthetic assets</li>
        <li>Quality metrics for synthetic data</li>
        <li>Controls to prevent misuse or misrepresentation</li>
      </ul>
      
      <h2>Organizational Structure for AI Governance</h2>
      
      <h3>1. Cross-functional Governance Teams</h3>
      <p>Effective AI governance requires multiple perspectives:</p>
      <ul>
        <li>Data scientists and AI engineers</li>
        <li>Legal and compliance experts</li>
        <li>Ethics specialists</li>
        <li>Domain experts</li>
        <li>Privacy officers</li>
      </ul>
      
      <h3>2. AI Governance Roles</h3>
      <p>New roles are emerging to manage AI governance:</p>
      <ul>
        <li>AI Ethics Officer</li>
        <li>Prompt Engineer</li>
        <li>AI Compliance Manager</li>
        <li>AI Documentation Specialist</li>
      </ul>
      
      <h3>3. Governance Tooling</h3>
      <p>Technologies to support AI governance:</p>
      <ul>
        <li>Model registries and catalogs</li>
        <li>Prompt management systems</li>
        <li>Automated testing and evaluation frameworks</li>
        <li>Output monitoring systems</li>
      </ul>
      
      <h2>Regulatory Landscape</h2>
      <p>AI governance must adapt to emerging regulations:</p>
      <ul>
        <li>EU AI Act requirements for high-risk AI systems</li>
        <li>NIST AI Risk Management Framework</li>
        <li>Industry-specific AI regulations</li>
        <li>Transparency and disclosure requirements</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Data governance in the AI era requires expanding traditional frameworks to address the unique challenges of LLMs and generative AI. By implementing comprehensive documentation, monitoring, testing, and organizational structures, organizations can harness the power of AI while managing risks and maintaining compliance.</p>
    `
  },
  'vector-databases-practical-guide': {
    title: 'Vector Databases: A Practical Guide for Data Engineers',
    date: 'April 3, 2025',
    author: 'Ahmed Gharib',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/vector-databases.jpg',
    featured: true,
    content: `
      <p>As AI applications become increasingly prevalent, traditional databases are struggling to efficiently handle AI-specific data types, particularly vector embeddings. This guide explores vector databases and how data engineers can implement them effectively.</p>
      
      <h2>What Are Vector Databases?</h2>
      <p>Vector databases are specialized database systems designed to store, index, and query high-dimensional vector embeddings efficiently. These embeddings are numerical representations of data (text, images, audio) that capture semantic meaning in a way that machines can understand and process.</p>
      
      <p>Unlike traditional databases that excel at exact matches and range queries, vector databases optimize for:</p>
      <ul>
        <li>Similarity searches (finding vectors that are "close to" a query vector)</li>
        <li>High-dimensional space operations</li>
        <li>Approximate nearest neighbor (ANN) algorithms</li>
        <li>Efficient scaling of vector operations</li>
      </ul>
      
      <h2>Key Components of Vector Databases</h2>
      
      <h3>1. Vector Embeddings</h3>
      <p>Vector embeddings are the core data structures stored in vector databases. These are typically dense arrays of floating-point numbers generated by:</p>
      <ul>
        <li>Language models (for text data)</li>
        <li>Image encoders (for visual data)</li>
        <li>Audio encoders (for sound data)</li>
        <li>Multi-modal models (for mixed data types)</li>
      </ul>
      
      <p>Example of generating text embeddings using OpenAI's embedding API:</p>
      
      <pre class="code-block">
      import openai
      
      # Set your API key
      openai.api_key = "your-api-key"
      
      def get_embedding(text):
          response = openai.Embedding.create(
              input=text,
              model="text-embedding-ada-002"
          )
          return response['data'][0]['embedding']
      
      # Generate vector embedding for a document
      document = "Vector databases are specialized database systems designed to store and query vector embeddings efficiently."
      embedding = get_embedding(document)
      
      # The embedding is a high-dimensional vector (e.g., 1536 dimensions)
      print(f"Embedding dimensions: {len(embedding)}")
      print(f"First few values: {embedding[:5]}")
      </pre>
      
      <h3>2. Indexing Strategies</h3>
      <p>Efficient indexing is critical for vector databases. Common indexing algorithms include:</p>
      
      <h4>Approximate Nearest Neighbor (ANN) Indexes:</h4>
      <ul>
        <li><strong>Hierarchical Navigable Small World (HNSW)</strong>: Creates a multi-layered graph structure that allows for fast navigation between similar vectors</li>
        <li><strong>Inverted File Index (IVF)</strong>: Partitions the vector space into clusters to reduce search space</li>
        <li><strong>Product Quantization (PQ)</strong>: Compresses vectors by splitting them into subvectors, enabling memory-efficient storage</li>
        <li><strong>Locality-Sensitive Hashing (LSH)</strong>: Uses hash functions that map similar vectors to the same buckets</li>
      </ul>
      
      <p>Each indexing approach offers different trade-offs between:</p>
      <ul>
        <li>Query speed</li>
        <li>Recall accuracy</li>
        <li>Memory consumption</li>
        <li>Build time</li>
      </ul>
      
      <h3>3. Distance Metrics</h3>
      <p>Vector databases support various distance/similarity metrics:</p>
      <ul>
        <li><strong>Euclidean Distance (L2)</strong>: Measures the straight-line distance between two points in Euclidean space</li>
        <li><strong>Cosine Similarity</strong>: Measures the cosine of the angle between vectors, focusing on their direction rather than magnitude</li>
        <li><strong>Dot Product</strong>: Measures the product of corresponding values in the vectors</li>
        <li><strong>Manhattan Distance (L1)</strong>: Measures the sum of absolute differences between vector components</li>
      </ul>
      
      <p>The choice of distance metric depends on the specific application and how the embeddings were generated.</p>
      
      <h2>Leading Vector Database Solutions</h2>
      
      <h3>1. Pinecone</h3>
      <p>Pinecone is a fully managed vector database with:</p>
      <ul>
        <li>Easy-to-use API</li>
        <li>Serverless architecture</li>
        <li>Strong filtering capabilities alongside vector search</li>
        <li>Support for high throughput and low latency</li>
      </ul>
      
      <p>Example of using Pinecone with Python:</p>
      <pre class="code-block">
      import pinecone
      
      # Initialize Pinecone
      pinecone.init(api_key="your-api-key", environment="your-environment")
      
      # Create an index (or connect to existing one)
      index_name = "document-embeddings"
      
      # Check if index exists
      if index_name not in pinecone.list_indexes():
          # Create a new index
          pinecone.create_index(
              name=index_name,
              dimension=1536,  # Depends on your embedding model
              metric="cosine"
          )
      
      # Connect to the index
      index = pinecone.Index(index_name)
      
      # Upsert vectors
      index.upsert([
          ("doc1", embedding, {"category": "technology", "author": "Smith"}),
          # More vectors...
      ])
      
      # Query the index
      results = index.query(
          vector=query_embedding,
          top_k=5,
          include_values=True,
          include_metadata=True,
          filter={"category": "technology"}
      )
      </pre>
      
      <h3>2. Weaviate</h3>
      <p>Weaviate is an open-source vector search engine with:</p>
      <ul>
        <li>GraphQL-based API</li>
        <li>Multi-modal support</li>
        <li>Built-in vectorization services</li>
        <li>Support for hybrid search (combining vector and keyword search)</li>
      </ul>
      
      <h3>3. Milvus</h3>
      <p>Milvus is an open-source vector database focused on:</p>
      <ul>
        <li>Scalability with cloud-native architecture</li>
        <li>Support for multiple indexing algorithms</li>
        <li>Advanced filtering capabilities</li>
        <li>Strong consistency guarantees</li>
      </ul>
      
      <h3>4. Qdrant</h3>
      <p>Qdrant is a vector similarity search engine with:</p>
      <ul>
        <li>Lightweight and fast implementation</li>
        <li>Filtering with payload</li>
        <li>REST API and gRPC interfaces</li>
        <li>Support for custom scoring functions</li>
      </ul>
      
      <h3>5. Chroma</h3>
      <p>Chroma is an open-source embedding database designed for:</p>
      <ul>
        <li>AI applications</li>
        <li>Easy integration with LLM frameworks like LangChain</li>
        <li>Local development workflows</li>
        <li>Simple, developer-friendly API</li>
      </ul>
      
      <h2>Practical Implementations and Use Cases</h2>
      
      <h3>1. Semantic Document Search</h3>
      <p>By storing document embeddings in a vector database, you can implement semantic search that understands the meaning of queries beyond keyword matching.</p>
      
      <pre class="code-block">
      from langchain.embeddings import OpenAIEmbeddings
      from langchain.vectorstores import Chroma
      from langchain.text_splitter import RecursiveCharacterTextSplitter
      from langchain.chains import RetrievalQA
      from langchain.llms import OpenAI
      
      # Process documents
      with open("company_handbook.pdf", "r") as f:
          text = f.read()
          
      text_splitter = RecursiveCharacterTextSplitter(
          chunk_size=1000,
          chunk_overlap=200
      )
      documents = text_splitter.split_text(text)
      
      # Create embeddings and vector store
      embeddings = OpenAIEmbeddings()
      vectorstore = Chroma.from_texts(
          documents,
          embeddings,
          collection_name="company_handbook"
      )
      
      # Create retrieval chain
      qa_chain = RetrievalQA.from_chain_type(
          llm=OpenAI(),
          chain_type="stuff",
          retriever=vectorstore.as_retriever()
      )
      
      # Query the knowledge base
      result = qa_chain.run("What's our company's parental leave policy?")
      print(result)
      </pre>
      
      <h3>2. Recommendation Systems</h3>
      <p>Vector databases can power recommendation systems by finding items with embeddings similar to those a user has shown interest in.</p>
      
      <pre class="code-block">
      import numpy as np
      from sklearn.metrics.pairwise import cosine_similarity
      
      def recommend_products(user_id, product_embeddings, user_history, top_n=5):
          # Get embeddings of products the user has interacted with
          user_product_embeddings = [
              product_embeddings[product_id] for product_id in user_history
          ]
          
          # Calculate user profile as the average of product embeddings
          user_profile = np.mean(user_product_embeddings, axis=0)
          
          # Find similar products using vector database
          results = vector_db.query(
              vector=user_profile,
              top_k=top_n + len(user_history),  # Get extra results to filter history
              filter={"in_stock": True}
          )
          
          # Filter out products the user has already seen
          recommendations = [
              result_id for result_id in results.ids 
              if result_id not in user_history
          ][:top_n]
          
          return recommendations
      </pre>
      
      <h3>3. Image and Multi-modal Search</h3>
      <p>Vector databases can store embeddings from multiple modalities, enabling powerful cross-modal search capabilities.</p>
      
      <pre class="code-block">
      from PIL import Image
      import torch
      from transformers import CLIPProcessor, CLIPModel
      
      # Load CLIP model
      model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
      processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
      
      def get_image_embedding(image_path):
          image = Image.open(image_path)
          inputs = processor(images=image, return_tensors="pt", padding=True)
          with torch.no_grad():
              outputs = model.get_image_features(**inputs)
          return outputs[0].numpy()
      
      def get_text_embedding(text):
          inputs = processor(text=text, return_tensors="pt", padding=True)
          with torch.no_grad():
              outputs = model.get_text_features(**inputs)
          return outputs[0].numpy()
      
      # Store image embeddings in vector database
      for image_path in image_paths:
          image_id = get_image_id(image_path)
          embedding = get_image_embedding(image_path)
          vector_db.upsert([(image_id, embedding, {"type": "image"})])
      
      # Query images using text
      text_query = "a cat playing with a ball of yarn"
      query_embedding = get_text_embedding(text_query)
      
      results = vector_db.query(
          vector=query_embedding,
          top_k=5,
          filter={"type": "image"}
      )
      </pre>
      
      <h2>Performance Optimization Techniques</h2>
      
      <h3>1. Dimensionality Reduction</h3>
      <p>High-dimensional vectors can be computationally expensive. Techniques to reduce dimensions include:</p>
      <ul>
        <li>Principal Component Analysis (PCA)</li>
        <li>t-SNE (t-Distributed Stochastic Neighbor Embedding)</li>
        <li>UMAP (Uniform Manifold Approximation and Projection)</li>
        <li>Random Projection</li>
      </ul>
      
      <h3>2. Hybrid Search</h3>
      <p>Combining vector search with traditional keyword search can improve accuracy and relevance:</p>
      <pre class="code-block">
      def hybrid_search(query, vector_db, text_db, alpha=0.7):
          # Get vector search results
          query_embedding = get_embedding(query)
          vector_results = vector_db.query(
              vector=query_embedding,
              top_k=20
          )
          
          # Get keyword search results
          keyword_results = text_db.search(
              query=query,
              top_k=20
          )
          
          # Combine and rerank results
          combined_results = {}
          for doc_id, score in vector_results.items():
              combined_results[doc_id] = alpha * score
              
          for doc_id, score in keyword_results.items():
              if doc_id in combined_results:
                  combined_results[doc_id] += (1 - alpha) * score
              else:
                  combined_results[doc_id] = (1 - alpha) * score
                  
          # Sort by combined score
          sorted_results = sorted(
              combined_results.items(), 
              key=lambda x: x[1], 
              reverse=True
          )
          
          return sorted_results[:10]
      </pre>
      
      <h3>3. Sharding and Distributed Architectures</h3>
      <p>For large-scale applications, distributing vector search across multiple nodes can improve performance:</p>
      <ul>
        <li>Horizontal sharding based on vector clustering</li>
        <li>Replicas for high availability and throughput</li>
        <li>Distributed index building for faster indexing of large datasets</li>
      </ul>
      
      <h3>4. Quantization</h3>
      <p>Vector quantization reduces the memory footprint by approximating vectors with fewer bits:</p>
      <ul>
        <li>Scalar quantization: reducing precision of individual values</li>
        <li>Product quantization: dividing vectors into subvectors</li>
        <li>Binary quantization: converting floating-point values to binary</li>
      </ul>
      
      <h2>Common Challenges and Solutions</h2>
      
      <h3>1. The Curse of Dimensionality</h3>
      <p>As dimensions increase, the effectiveness of similarity metrics decreases:</p>
      <ul>
        <li><strong>Challenge</strong>: In high dimensions, all points tend to be equidistant from each other</li>
        <li><strong>Solution</strong>: Use dimensionality reduction techniques or specialized distance metrics</li>
      </ul>
      
      <h3>2. Scaling with Data Volume</h3>
      <p>Vector search can become resource-intensive with large collections:</p>
      <ul>
        <li><strong>Challenge</strong>: Maintaining low latency with millions or billions of vectors</li>
        <li><strong>Solution</strong>: Implement hierarchical indexing, clustering, or quantization</li>
      </ul>
      
      <h3>3. Managing Vector Drift</h3>
      <p>As embedding models evolve or are fine-tuned:</p>
      <ul>
        <li><strong>Challenge</strong>: Maintaining consistency between vectors created with different model versions</li>
        <li><strong>Solution</strong>: Version embedding spaces and re-embed data when models change significantly</li>
      </ul>
      
      <h2>Data Engineering Best Practices</h2>
      
      <h3>1. Monitoring and Metrics</h3>
      <p>Key metrics to monitor for vector databases include:</p>
      <ul>
        <li>Query latency (p50, p95, p99)</li>
        <li>Recall accuracy (percentage of relevant items retrieved)</li>
        <li>Index build time</li>
        <li>Memory and storage usage</li>
      </ul>
      
      <h3>2. ETL for Vector Data</h3>
      <p>Building robust data pipelines for vector databases:</p>
      <ul>
        <li>Batch processing for historical data</li>
        <li>Streaming updates for real-time applications</li>
        <li>Handling embedding model updates</li>
        <li>Pre-computing embeddings for large datasets</li>
      </ul>
      
      <h3>3. Testing and Validation</h3>
      <p>Approaches for validating vector search quality:</p>
      <ul>
        <li>Ground truth test sets with known relevant items</li>
        <li>A/B testing different indexing algorithms</li>
        <li>Human evaluation of search results</li>
        <li>Domain-specific relevance metrics</li>
      </ul>
      
      <h2>Future Trends</h2>
      <p>The vector database landscape continues to evolve rapidly:</p>
      <ul>
        <li>Integration with multi-modal embedding models</li>
        <li>More efficient indexing algorithms for ultra-high dimensions</li>
        <li>Specialized hardware acceleration (GPUs, TPUs)</li>
        <li>Tighter integration with large language model workflows</li>
        <li>Federated vector search across distributed data sources</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Vector databases have become an essential component of the modern AI infrastructure stack. As a data engineer, understanding how to effectively implement, optimize, and maintain these systems will be increasingly valuable as organizations adopt AI capabilities. By mastering vector database technologies, you can enable powerful semantic search, recommendation systems, and other applications that were previously difficult or impossible with traditional databases.</p>
    `
  },
  'multimodal-llms-data-integration': {
    title: 'Multimodal LLMs and Their Impact on Data Integration',
    date: 'March 28, 2025',
    author: 'Ahmed Gharib',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/multimodal-llms.jpg',
    content: `
      <p>Multimodal Large Language Models (LLMs) represent the next evolution in AI, capable of processing and generating content across different data types - text, images, audio, and potentially video. This technological leap is transforming how we approach data integration, enabling more sophisticated ways to connect and derive insights from heterogeneous data sources.</p>

      <h2>Understanding Multimodal LLMs</h2>
      <p>Unlike traditional LLMs that process only text, multimodal models can understand relationships across different data types:</p>

      <ul>
        <li><strong>Text-Image Understanding</strong>: Models like GPT-4 with Vision, DALL-E 3, and Midjourney can understand images and their relationship to text</li>
        <li><strong>Audio Processing</strong>: Models can transcribe, understand, and generate speech and other audio</li>
        <li><strong>Cross-modal Reasoning</strong>: The ability to draw connections between concepts across different modalities</li>
      </ul>

      <p>These capabilities emerge from architectures that combine specialized encoders for different data types with a unified representation space where relationships can be established.</p>

      <h2>Transforming Data Integration</h2>
      <p>Traditional data integration faces several challenges:</p>

      <ul>
        <li>Schema mapping and normalization across diverse sources</li>
        <li>Handling unstructured or semi-structured data</li>
        <li>Extracting insights from non-text data formats</li>
        <li>Resolving semantic inconsistencies</li>
      </ul>

      <p>Multimodal LLMs address these challenges by providing novel approaches:</p>

      <h3>1. Unified Data Representation</h3>
      <p>Multimodal LLMs convert different data types into a shared embedding space, creating a "universal translator" for your data. This allows:</p>

      <ul>
        <li>Direct comparison of concepts across modalities</li>
        <li>Joint querying of heterogeneous data sources</li>
        <li>Revealing connections that might be missed in single-modality approaches</li>
      </ul>

      <pre class="code-block">
      from transformers import CLIPProcessor, CLIPModel
      import torch
      from PIL import Image

      # Load CLIP (Contrastive Language-Image Pre-Training) model
      model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
      processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

      # Function to get embeddings in the shared space
      def get_multimodal_embeddings(texts=None, images=None):
          inputs = processor(
              text=texts if texts else None,
              images=images if images else None,
              return_tensors="pt", 
              padding=True
          )
          
          with torch.no_grad():
              if texts and images:
                  outputs = model(**inputs)
                  text_embeds = outputs.text_embeds
                  image_embeds = outputs.image_embeds
                  return {"text": text_embeds, "image": image_embeds}
              elif texts:
                  text_features = model.get_text_features(**inputs)
                  return {"text": text_features}
              elif images:
                  image_features = model.get_image_features(**inputs)
                  return {"image": image_features}

      # Example: Process mixed data 
      product_text = "Ergonomic office chair with lumbar support"
      product_image = Image.open("office_chair.jpg")
      
      embeddings = get_multimodal_embeddings(
          texts=[product_text], 
          images=[product_image]
      )
      
      # Now text and image are in the same vector space
      similarity = torch.cosine_similarity(
          embeddings["text"], 
          embeddings["image"]
      ).item()
      
      print(f"Text-image concept similarity: {similarity}")
      </pre>

      <h3>2. Cross-modal Entity Resolution</h3>
      <p>Identifying the same entity across different data types has traditionally been challenging. Multimodal LLMs excel at:</p>

      <ul>
        <li>Matching products across text descriptions, images, and audio reviews</li>
        <li>Identifying people across documents, images, and voice recordings</li>
        <li>Linking physical assets between technical specifications and visual inspections</li>
      </ul>

      <h3>3. Automated Information Extraction</h3>
      <p>Extracting structured data from unstructured sources becomes more powerful:</p>

      <pre class="code-block">
      from transformers import AutoProcessor, AutoModelForVision2Seq
      import requests
      from PIL import Image

      # Load a multimodal model for visual text understanding
      processor = AutoProcessor.from_pretrained("microsoft/kosmos-2-patch14-224")
      model = AutoModelForVision2Seq.from_pretrained("microsoft/kosmos-2-patch14-224")

      def extract_form_data(image_path):
          # Load image
          image = Image.open(image_path)
          
          # Generate prompt for form extraction
          prompt = "<grounding>Extract all fields and values from this form document.</grounding>"
          
          # Process image and prompt
          inputs = processor(text=prompt, images=image, return_tensors="pt")
          
          # Generate extraction
          with torch.no_grad():
              outputs = model.generate(
                  **inputs,
                  max_new_tokens=128,
                  num_beams=5
              )
          
          # Decode and format results
          extracted_text = processor.decode(outputs[0], skip_special_tokens=True)
          
          # Parse into structured format
          # (In a real implementation, would parse the extracted_text into key-value pairs)
          
          return extracted_text

      # Extract data from a form image
      form_data = extract_form_data("invoice_document.jpg")
      print(form_data)
      </pre>

      <h3>4. Content-Based Integration of Diverse Media</h3>
      <p>Rather than relying solely on metadata, multimodal LLMs allow for content-based integration:</p>

      <ul>
        <li>Connecting customer feedback across text reviews, social media images, and call center recordings</li>
        <li>Integrating technical documentation with maintenance images and sensor data</li>
        <li>Linking news articles with related video content and social media discussions</li>
      </ul>

      <h2>Real-World Applications in Data Engineering</h2>

      <h3>1. Enhanced ETL Pipelines</h3>
      <p>Modern ETL processes can leverage multimodal capabilities for:</p>

      <ul>
        <li><strong>Data Extraction</strong>: Pulling structured information from documents, images, and audio files</li>
        <li><strong>Data Transformation</strong>: Converting between modalities when needed (e.g., generating text descriptions of images)</li>
        <li><strong>Data Validation</strong>: Cross-checking information across modalities to ensure consistency</li>
      </ul>

      <p>Example architecture for a multimodal ETL pipeline:</p>

      <pre class="code-block">
      # Conceptual multimodal ETL pipeline
      class MultimodalETLPipeline:
          def __init__(self, models, storage_client):
              self.text_processor = models["text"]
              self.image_processor = models["image"]
              self.audio_processor = models["audio"]
              self.multimodal_model = models["multimodal"]
              self.storage = storage_client
              
          def extract(self, sources):
              extracted_data = []
              
              for source in sources:
                  if source.type == "text":
                      data = self.text_processor.extract(source.content)
                  elif source.type == "image":
                      data = self.image_processor.extract(source.content)
                  elif source.type == "audio":
                      data = self.audio_processor.extract(source.content)
                  
                  extracted_data.append({
                      "source_id": source.id,
                      "content": data,
                      "modality": source.type
                  })
              
              return extracted_data
              
          def transform(self, extracted_data):
              # Convert all to unified representation
              unified_data = []
              
              for item in extracted_data:
                  # Get embeddings in shared space
                  embedding = self.multimodal_model.embed(
                      content=item["content"], 
                      modality=item["modality"]
                  )
                  
                  # Generate cross-modal metadata
                  metadata = self.multimodal_model.generate_metadata(
                      content=item["content"],
                      modality=item["modality"]
                  )
                  
                  unified_data.append({
                      "source_id": item["source_id"],
                      "original_content": item["content"],
                      "embedding": embedding,
                      "metadata": metadata,
                      "modality": item["modality"]
                  })
              
              return unified_data
              
          def load(self, transformed_data):
              # Store in vector database for cross-modal retrieval
              for item in transformed_data:
                  self.storage.store(
                      id=item["source_id"],
                      vector=item["embedding"],
                      metadata={
                          "original_modality": item["modality"],
                          **item["metadata"]
                      },
                      content=item["original_content"]
                  )
                  
          def run(self, sources):
              extracted = self.extract(sources)
              transformed = self.transform(extracted)
              self.load(transformed)
      </pre>

      <h3>2. Multi-modal Knowledge Graphs</h3>
      <p>Traditional knowledge graphs can be extended with multimodal nodes and relationships:</p>

      <ul>
        <li>Product knowledge graphs with text specifications, images, and tutorial videos</li>
        <li>Scientific knowledge graphs connecting research papers, experimental images, and lecture recordings</li>
        <li>Customer knowledge graphs linking transactions, support calls, and social media interactions</li>
      </ul>

      <h3>3. Data Quality and Enrichment</h3>
      <p>Multimodal LLMs provide powerful ways to improve data quality:</p>

      <ul>
        <li><strong>Cross-modal Validation</strong>: Verifying that product descriptions match product images</li>
        <li><strong>Data Enrichment</strong>: Generating text descriptions from images or visualization recommendations for data tables</li>
        <li><strong>Missing Value Imputation</strong>: Using information from one modality to fill gaps in another</li>
      </ul>

      <h2>Implementation Considerations</h2>

      <h3>1. Model Selection and Deployment</h3>
      <p>Choosing the right multimodal model depends on your specific requirements:</p>

      <ul>
        <li><strong>Accuracy vs. Performance</strong>: Larger models like GPT-4V offer better accuracy but at higher computational cost</li>
        <li><strong>Specialized vs. General</strong>: Some models excel at specific modality pairs (text-image) but not others</li>
        <li><strong>Deployment Options</strong>: Consider API services vs. self-hosted models based on latency requirements and data privacy concerns</li>
      </ul>

      <h3>2. Data Storage and Retrieval</h3>
      <p>Unified vector representations enable new storage approaches:</p>

      <ul>
        <li>Vector databases storing embeddings from all modalities</li>
        <li>Hybrid search combining vector similarity with metadata filtering</li>
        <li>Maintaining relationships between different representations of the same entity</li>
      </ul>

      <h3>3. Addressing Bias and Fairness</h3>
      <p>Multimodal models can inherit and potentially amplify biases present in training data:</p>

      <ul>
        <li>Conduct bias audits across different data types</li>
        <li>Implement fairness metrics specifically designed for multimodal contexts</li>
        <li>Consider potential differential performance across demographic groups</li>
      </ul>

      <h2>Future Directions</h2>

      <h3>1. Real-time Multimodal Data Processing</h3>
      <p>As models become more efficient, we'll see more real-time applications:</p>

      <ul>
        <li>Streaming integration of video feeds with text data</li>
        <li>Live audio transcription and integration with knowledge bases</li>
        <li>Edge computing for multimodal data processing</li>
      </ul>

      <h3>2. Multimodal Data Catalogs</h3>
      <p>Next-generation data catalogs will organize information across modalities:</p>

      <ul>
        <li>Natural language search for images, audio, and video content</li>
        <li>Content-based discovery of related assets across modalities</li>
        <li>Automated tagging and metadata generation</li>
      </ul>

      <h3>3. Synthetic Data Generation</h3>
      <p>Multimodal models will enable sophisticated synthetic data:</p>

      <ul>
        <li>Generating paired text-image-audio data for testing integration workflows</li>
        <li>Creating synthetic examples for edge cases</li>
        <li>Data augmentation across modalities</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Multimodal LLMs are reshaping data integration by unifying previously disparate data types into coherent representations and workflows. For data engineers, these technologies offer powerful new tools to build more intelligent, comprehensive data systems that better reflect how humans naturally process information across multiple senses.</p>

      <p>As these models continue to evolve, organizations that effectively harness their capabilities will gain significant advantages in extracting value from their diverse data assets. The future of data integration is not just about connecting structured databases, but about building systems that can reason across all the ways information is represented in the world.</p>
    `
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Get the current post data
  const post = blogPosts[slug];
  
  // Find next and previous posts
  const getAllSlugs = () => Object.keys(blogPosts);
  const slugs = getAllSlugs();
  const currentIndex = slugs.findIndex(s => s === slug);
  
  const prevPost = currentIndex > 0 ? 
    { slug: slugs[currentIndex - 1], title: blogPosts[slugs[currentIndex - 1]].title } : 
    null;
    
  const nextPost = currentIndex < slugs.length - 1 ? 
    { slug: slugs[currentIndex + 1], title: blogPosts[slugs[currentIndex + 1]].title } : 
    null;
  
  // If post doesn't exist, redirect to blog index
  useEffect(() => {
    if (!post) {
      router.push('/blog');
    }
  }, [post, router]);
  
  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="pt-24 pb-16">
        <AnimatedSection className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Link 
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              ← Back to all articles
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readingTime} read</span>
                  </div>
                )}
                <div className="flex items-center">
                  <span>By {post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Share and save buttons */}
              <div className="flex justify-end mb-8 space-x-4">
                <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Share2 className="h-5 w-5 mr-1" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Bookmark className="h-5 w-5 mr-1" />
                  <span className="text-sm">Save</span>
                </button>
              </div>
              
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              
              {/* Author info */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About the Author
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-bold">
                    AG
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{post.author}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Advanced Analytics Engineer with expertise in data engineering, machine learning, and AI integration.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Previous/Next article navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between">
                  {prevPost && (
                    <Link href={`/blog/${prevPost.slug}`} className="group mb-4 md:mb-0">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <ChevronLeft className="h-5 w-5 mr-2" />
                        <div>
                          <div className="text-sm">Previous Article</div>
                          <div className="text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {prevPost.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                  
                  {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`} className="group md:text-right">
                      <div className="flex items-center justify-end text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <div>
                          <div className="text-sm">Next Article</div>
                          <div className="text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {nextPost.title}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}