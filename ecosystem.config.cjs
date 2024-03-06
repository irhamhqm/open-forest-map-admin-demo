module.exports = {
  apps: [
    {
      name: "react-app",
      script: "vite", // Assuming you have 'vite' as npm script for running Vite
      cwd: "./", // Path to your project directory
      watch: true, // Enable watch mode
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      instances: 1, // Number of instances to be started
      autorestart: true, // Restart the app if it crashes
      max_memory_restart: "1G", // Maximum memory threshold for restarting
      exec_mode: "fork", // Execution mode
      log_date_format: "YYYY-MM-DD HH:mm Z", // Log date format
      error_file: "./logs/error.log", // Path to error log file
      out_file: "./logs/out.log", // Path to out log file
      merge_logs: true, // Merge logs
      log_type: "json", // Log type
    },
  ],
};
