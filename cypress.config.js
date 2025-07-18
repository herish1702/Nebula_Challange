const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  projectId: "58464a41-9f3e-4cbb-bea2-ebf4b401d725",
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // Attach Allure plugin
      allureWriter(on, config);

      // Your existing custom tasks
      on('task', {
        'Response Body:': (message) => {
          console.log("Response Body:", message);
          return null;
        },
        'Log:': (message) => {
          console.log(message);
          return null;
        }
      });

      return config; // return this to avoid config errors
    }
  }
});