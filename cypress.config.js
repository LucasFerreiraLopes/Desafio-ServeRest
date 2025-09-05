const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: {
      runMode: 2,
      openMode: 0
    },
    watchForFileChanges: false,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
    },
  },
});