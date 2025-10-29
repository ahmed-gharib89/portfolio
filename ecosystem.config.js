module.exports = {
  apps: [{
    name: 'portfolio',
    script: './server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0',
    },
  }]
}
