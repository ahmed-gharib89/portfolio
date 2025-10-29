module.exports = {
  apps: [{
    name: 'portfolio',
    script: './server.js',
    cwd: './.next/standalone',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0',
    },
    // Environment variables will be loaded from .env file
    // or set via PM2 environment configuration
  }]
}
