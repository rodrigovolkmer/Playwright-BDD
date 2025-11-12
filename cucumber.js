module.exports = {
  default: `
  --format json:reports/cucumber_report.json
  --format-options '{"snippetInterface": "synchronous"}'
  --require-module ts-node/register
  --require src/steps/*.ts src/features/*.feature
  --parallel 4`,
};
