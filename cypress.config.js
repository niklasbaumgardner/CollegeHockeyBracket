const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5000",
  },
  viewportWidth: 1100,
  viewportHeight: 1100,
  allowCypressEnv: true,
});
