module.exports = {
  apps : [{
    script: 'index.js',
    max_memory_restart: '500M',
    restart_delay: 20000,
    exp_backoff_restart_delay: 100,
    max_restarts: 16,
    min_uptime: 5000,

    env: {
      NODE_ENV: "development",
      name: 'paputea be development',
      ...require("dotenv").config({ path: ".env.development" }).parsed,
    },
    env_production: {
      NODE_ENV: "production",
      name: 'paputea be production',
      ...require("dotenv").config({ path: ".env.production" }).parsed,
    },
  }],
};
