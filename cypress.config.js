const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  projectId: "58464a41-9f3e-4cbb-bea2-ebf4b401d725",
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // Attach Allure plugin
      allureWriter(on, config);

      // Your custom tasks
      on('task', {
        'Response Body:': (message) => {
          console.log("Response Body:", message);
          return null;
        },
        'Log:': (message) => {
          console.log(message);
          return null;
        },
        writeToFixture({ fileName, data }) {
          const filePath = path.join(__dirname, "cypress", "fixtures", fileName);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Fixture written to: ${filePath}`);
          return null;
        }
      });
      return config; 
    }
  }
});
