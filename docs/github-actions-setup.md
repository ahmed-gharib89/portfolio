# GitHub Actions Deployment Setup Guide

This guide explains how to set up the GitHub Actions workflow for automatic deployment of the portfolio website to your Ubuntu server.

## Prerequisites

1. A GitHub repository for your portfolio website
2. An Ubuntu server with:
   - Node.js (v18+) installed
   - PM2 process manager installed
   - Git installed
   - SSH access

## Setting Up GitHub Secrets

You need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add the following secrets:

   - `HOST`: Your server's IP address or domain name
   - `USERNAME`: SSH username for your server
   - `SSH_PRIVATE_KEY`: Your private SSH key for authentication
   - `PORT`: SSH port (usually 22)
   - `DEPLOY_PATH`: Path to your website directory on the server (e.g., `/var/www/portfolio`)

### Generating SSH Keys for Deployment

If you don't have SSH keys set up for automated deployment:

```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy

# Copy the public key to your server
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub your-username@your-server-ip

# View the private key to copy into GitHub secrets
cat ~/.ssh/github_actions_deploy
```

Copy the entire output (including headers) into the `SSH_PRIVATE_KEY` secret in GitHub.

## Server Setup

On your Ubuntu server:

1. Install PM2 if not already installed:
   ```bash
   npm install -g pm2
   ```

2. Clone your repository:
   ```bash
   mkdir -p /var/www
   cd /var/www
   git clone https://github.com/yourusername/portfolio-website.git portfolio
   cd portfolio
   ```

3. Install dependencies and build:
   ```bash
   npm ci --production
   npm run build
   ```

4. Start the application with PM2:
   ```bash
   pm2 start npm --name "portfolio" -- start
   pm2 save
   ```

5. Set up PM2 to start on boot:
   ```bash
   pm2 startup
   ```
   (Follow the instructions from the output)

## Testing the Deployment

1. Make a change to your code
2. Commit and push to the main branch
3. Go to the "Actions" tab in your GitHub repository to see the workflow running

The site should automatically deploy to your production server after each push to the main branch.

## Troubleshooting

If the deployment fails:

1. Check the GitHub Actions logs for errors
2. Verify that all secrets are correctly set
3. Ensure your server's firewall allows SSH connections
4. Check if the deployment user has sufficient permissions in the deployment directory
5. Try running the deploy script manually on your server