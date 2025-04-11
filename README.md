# Ahmed Gharib Portfolio Website

A modern, responsive personal portfolio website for Ahmed Gharib, Senior Data Engineer, built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases professional experience, projects, skills, and a blog focused on data engineering and analytics.

## Live Demo

Visit the portfolio at [agharib.com](https://agharib.com)

## Features

- 📱 Fully responsive design with mobile-first approach
- 🚀 Server-side rendering with Next.js 14+ (App Router)
- 💅 Styled with Tailwind CSS for consistent design
- 🔄 Interactive animations using Framer Motion
- 🖼️ Optimized image loading with Next.js Image component
- 📝 Blog section with MDX support
- 📊 Project showcase with detailed case studies
- 🔍 SEO optimized with metadata and structured data
- 📬 Functional contact form with validation
- 📱 Social media integration
- 📈 Analytics integration ready
- 🧩 Component-based architecture for maintainability
- ⚡ Fast page loads with code splitting and lazy loading

## About Ahmed Gharib

Senior Data Engineer with over 6 years of expertise in designing and implementing scalable data solutions across Microsoft Azure, AWS, and Google Cloud platforms. Currently building data infrastructure and analytics solutions at Raisa Energy.

Core expertise includes:
- Data Integration
- Data Pipeline Development
- Data Modeling
- ETL Processes
- Cloud Platforms (Azure, AWS, GCP)
- Business Intelligence with Power BI
- Machine Learning implementation

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git for version control

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ahmed-gharib89/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
portfolio/
├── public/                  # Static assets
│   ├── assets/              # Images, files, etc.
│   ├── blog-content/        # Blog HTML content
│   └── fonts/               # Font files
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes
│   │   ├── blog/            # Blog pages
│   │   └── ...              # Other app routes
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Layout components
│   │   ├── sections/        # Page sections
│   │   ├── blog/            # Blog-specific components
│   │   └── shared/          # Shared components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   │   ├── api/             # API-related functions
│   │   ├── blog/            # Blog-related functions
│   │   └── utils/           # General utilities
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles
│   └── config/              # Configuration files
├── scripts/                 # Build and deployment scripts
└── config files (.gitignore, package.json, etc.)
```

## Blog Section

The portfolio includes a blog section built with:
- MDX for rich content authoring
- Syntax highlighting for code snippets
- Categories and tags for organization
- Social sharing functionality
- Related post suggestions

## Environment Variables

Create a `.env.local` file with the following variables:

```
# Email Configuration
EMAIL_HOST=your-smtp-host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
EMAIL_FROM=portfolio@example.com
EMAIL_TO=your-email@example.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Deployment

This project is set up with GitHub Actions for automated CI/CD:

- Pushes to the main branch trigger automatic builds and deployment
- Deployment is managed through SSH to a Ubuntu server running PM2
- Automated testing and linting checks run before deployment

To set up your own deployment:

1. Configure the following GitHub secrets:
   - `HOST`: Your server's IP address
   - `USERNAME`: SSH username
   - `SSH_PRIVATE_KEY`: Your SSH private key
   - `PORT`: SSH port (optional, defaults to 22)
   - `DEPLOY_PATH`: Path to deploy on the server (optional)

2. Ensure PM2 is installed on your server to manage the Node.js process.

For detailed deployment instructions, see [GitHub Actions Deployment Setup Guide](github-actions-setup.md).

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run analyze` - Analyze bundle size

## Technologies

- **Framework**: [Next.js](https://nextjs.org/) - React framework for server-side rendering
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- **Icons**: [Lucide React](https://lucide.dev/) - Icon library
- **Forms**: [React Hook Form](https://react-hook-form.com/) - Form validation
- **Content**: [MDX](https://mdxjs.com/) - Markdown for the component era
- **Deployment**: [PM2](https://pm2.keymetrics.io/) - Process manager for Node.js applications
- **Data Fetching**: [SWR](https://swr.vercel.app/) - React Hooks for data fetching
- **Code Formatting**: [Prettier](https://prettier.io/) - Code formatter
- **Linting**: [ESLint](https://eslint.org/) - Code quality tool

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Server-side rendering for fast initial loads
- Static generation for blog posts
- Optimized fonts with next/font

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Ahmed Gharib - Senior Data Engineer

- [LinkedIn](https://www.linkedin.com/in/ahmedgharib89)
- [GitHub](https://github.com/ahmed-gharib89)
- [Twitter](https://twitter.com/ahmed_gharib89)