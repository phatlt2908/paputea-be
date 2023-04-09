module.exports = {
  apps : [{
    name: 'paputea-be-nodejs',
    script: 'index.js',
    max_memory_restart: '500M',
    restart_delay: 20000,
    exp_backoff_restart_delay: 100,
    max_restarts: 16,
    min_uptime: 5000
  }],
};
