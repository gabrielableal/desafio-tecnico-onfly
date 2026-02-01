module.exports = {
  default: {
    require: [
      "tests/steps/**/*.js",
      "tests/supports/world.js"
    ],
    paths: [
      "tests/features/**/*.feature"
    ],
    format: [
      "progress",
      "html:reports/cucumber-report.html"
    ]
  }
};