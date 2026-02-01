/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "only-on-failure",
    viewport: { width: 1280, height: 720 }
  },
  timeout: 60000
};
