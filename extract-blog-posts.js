const fs = require('fs');
const path = require('path');

// Read the blog-api.ts file
const filePath = path.join(__dirname, 'src', 'lib', 'blog-api.ts');
const content = fs.readFileSync(filePath, 'utf-8');

// Regular expression to extract blog post entries from the object
const blogPostRegex = /'([^']+)':\s*{([^}]*)content:\s*`([^`]*)`/g;

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'public', 'blog-content');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Find all blog posts
let match;
while ((match = blogPostRegex.exec(content)) !== null) {
  const slug = match[1];
  const htmlContent = match[3].trim();
  
  // Create output file
  const outputPath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(outputPath, htmlContent);
  console.log(`Extracted: ${slug}`);
}

console.log('All blog posts have been extracted to separate HTML files');
