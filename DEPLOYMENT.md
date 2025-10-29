# Deployment Guide

## Overview

This portfolio website uses a GitHub Actions-based deployment strategy that builds the application in CI and deploys the compiled artifacts to an Ubuntu server running PM2.

## Deployment Strategy

**Build Phase (GitHub Actions):**

- Builds Next.js application with standalone output mode
- Creates optimized, self-contained build package
- Packages `.next/standalone`, static files, and PM2 config into tarball

**Deploy Phase (Ubuntu Server):**

- Transfers build artifact via SCP
- Extracts to deployment directory with backup/rollback support
- Configures environment variables from GitHub secrets
- Restarts application using PM2

## Required GitHub Secrets

Configure these secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):

### Server Connection

- `HOST` - Server IP address or domain
- `USERNAME` - SSH username (e.g., `ubuntu`)
- `SSH_PRIVATE_KEY` - Private SSH key for authentication
- `PORT` - SSH port (optional, defaults to 22)
- `DEPLOY_PATH` - Deployment directory (optional, defaults to `/home/ubuntu/portfolio`)

### Email Configuration

- `EMAIL_HOST` - SMTP host (optional, defaults to `smtp.gmail.com`)
- `EMAIL_PORT` - SMTP port (optional, defaults to `587`)
- `EMAIL_SECURE` - Use TLS (optional, defaults to `false`)
- `EMAIL_USER` - Email account username
- `EMAIL_PASS` - Email account password or app password
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address for contact form

## Server Requirements

- **Node.js**: v18 or higher
- **PM2**: Process manager (`npm install -g pm2`)
- **Nginx**: Reverse proxy (optional but recommended)
- **Disk Space**: Minimal (~100MB for deployment)
- **Memory**: Low requirements (~256MB)

## Deployment Process

### Automatic Deployment

Pushes to `main` branch trigger automatic deployment:

```bash
git push origin main
```

### Manual Deployment

Trigger manually via GitHub Actions:

1. Go to `Actions` tab in GitHub
2. Select `Deploy Portfolio Website` workflow
3. Click `Run workflow`

### Deployment Steps

1. **Build** - GitHub Actions builds the application
2. **Package** - Creates tarball with standalone output and static files
3. **Transfer** - Uploads build artifact to server via SCP
4. **Backup** - Backs up current deployment for rollback
5. **Extract** - Extracts new build to deployment directory
6. **Configure** - Sets up environment variables from secrets
7. **Restart** - Restarts application with PM2

## Rollback

If deployment fails or issues are detected:

```bash
# SSH into server
ssh user@server

# Navigate to deployment directory
cd /home/ubuntu/portfolio

# Stop current deployment
pm2 stop portfolio

# Restore backup
rm -rf current
mv backup current

# Restart with backup
cd current
pm2 start ecosystem.config.js
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (test standalone output)
npm run build

# Start production server locally
cd .next/standalone
node server.js
```

## PM2 Management

```bash
# View application status
pm2 status

# View logs
pm2 logs portfolio

# Restart application
pm2 restart portfolio

# Stop application
pm2 stop portfolio

# Delete from PM2
pm2 delete portfolio

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

## Nginx Configuration

If using Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Troubleshooting

### Build Fails on GitHub Actions

- Check GitHub Actions logs
- Verify all dependencies are in `package.json`
- Ensure TypeScript types are correct

### Deployment Fails

- Verify GitHub secrets are configured correctly
- Check SSH key has proper permissions
- Ensure deployment path exists and is writable

### Application Won't Start

- Check PM2 logs: `pm2 logs portfolio`
- Verify environment variables are set correctly
- Ensure Node.js version compatibility

### Contact Form Not Working

- Verify email secrets are configured
- Check `.env` file was created on server
- Review PM2 logs for email errors

## Architecture Benefits

**Previous Strategy (Server-Side Build):**

- ❌ Builds twice (CI + Server)
- ❌ High memory usage on server
- ❌ Slow deployments
- ❌ Build failures on small servers

**New Strategy (CI Build + Artifact Deploy):**

- ✅ Builds once in GitHub Actions
- ✅ Minimal server resources needed
- ✅ Fast deployments (~30 seconds)
- ✅ Automatic rollback capability
- ✅ Build artifact versioning
- ✅ Works on smallest server instances
