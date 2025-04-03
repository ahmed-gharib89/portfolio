# Portfolio Website

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🚀 Server-side rendering with Next.js
- 💅 Styled with Tailwind CSS
- 🔄 Interactive animations
- 📝 Blog section
- 📬 Contact form functionality
- 🔍 SEO optimized

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

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
src/
├── app/              # Next.js App Router files
│   ├── api/          # API routes (e.g., contact form)
│   ├── blog/         # Blog section pages
│   └── ...           # Main app pages
├── components/       # React components
│   ├── animation/    # Animation components
│   ├── layout/       # Layout components (Header, Footer)
│   └── sections/     # Page section components
└── lib_cv-utils.ts   # Utilities for CV functionality
```

## Deployment

This project is set up with GitHub Actions for automated deployment:

- Pushes to the main branch trigger automatic builds and deployment
- Deployment is managed through SSH to a Ubuntu server running PM2

To set up your own deployment:

1. Configure the following GitHub secrets:
   - `HOST`: Your server's IP address
   - `USERNAME`: SSH username
   - `SSH_PRIVATE_KEY`: Your SSH private key
   - `PORT`: SSH port (optional, defaults to 22)
   - `DEPLOY_PATH`: Path to deploy on the server (optional)

2. Ensure PM2 is installed on your server to manage the Node.js process.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Technologies

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [PM2](https://pm2.keymetrics.io/) - Process manager for Node.js applications

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Ahmed Gharib