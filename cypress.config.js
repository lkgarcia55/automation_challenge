const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1440, // Screen width
    viewportHeight: 770, // Screen height

    // Enables support for the WebKit browser (Safari engine) in Cypress for cross-browser testing.
    experimentalWebKitSupport: true, // This feature is experimental and may have limited support for some Cypress commands.

    baseUrl: "https://www.laboratoriodetesting.com",
    // defaultCommandTimeout: 30000,
    // pageLoadTimeout: 60000,

    setupNodeEvents(on, config) {
      // Logging setup: create logs folder and manage output per test run
      const logDir = "cypress/logs";
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true }); // Create logs directory if it does not exist
      }

      const logFile = path.join(logDir, `test-log-${Date.now()}.txt`);

      // Custom log task: log to file and terminal
      on("task", {
        logMessage(message) {
          const logEntry = `[${new Date().toISOString()}] ${message}\n`;
          fs.appendFileSync(logFile, logEntry, "utf8");
          console.log(message);
          return null;
        },
      });

      // Log when a test file starts
      on("before:spec", (spec) => {
        const message = `STARTING TEST FILE: ${spec.name}`;
        fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${message}\n`, "utf8");
        console.log(message);
      });

      // Log when a test file finishes
      on("after:spec", (spec, results) => {
        const message = `FINISHED TEST FILE: ${spec.name} - Status: ${
          results.stats.failures > 0 ? "FAILED" : "PASSED"
        }`;
        fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${message}\n`, "utf8");
        console.log(message);
      });

      return config;
    },
  },
});
