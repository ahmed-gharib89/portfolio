'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import Link from 'next/link';

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
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  // Get the current post data
  const post = blogPosts[slug];
  
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
              
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 mb-8">
                <div className="flex items-center">
                  <span>{post.date}</span>
                </div>
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
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              
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
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}