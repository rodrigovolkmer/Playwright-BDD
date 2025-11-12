# PlaywrightBDD

Lightweight Playwright + Cucumber (BDD) TypeScript test suite for Sauce Demo (example repo).

Please note that for this project, the username and password used by the feature test files are being presented on the login page by Sauce Demo website so there's no need for security measures where the password should not be exposed.

## Contents

- src/features/… (Cucumber .feature files)
- src/steps/… (step definitions)
- src/pages/… (page objects, Playwright Page usage)
- src/config/global-setup.ts (Playwright launcher / Cucumber Before/After hooks)
- cucumber.js (cucumber-js profile)

## Prerequisites

- Node.js (>= 16 recommended)
- npm or pnpm
- Playwright browsers (installed with Playwright CLI)

## Install

Run from project root:

```bash
# install dependencies
npm ci

# install Playwright browsers (if not installed)

npx playwright install
```

## Running tests and Generate Report

The command below will generate the tests and the report right after, tests will run in parallel of 4:

```bash
# run tests and generate report
npm test
```

You can also just run the tests by running Cucumber directly (the repo uses ts-node to run TS step defs):

```bash
# run tests only
npx cucumber-js
```

To run a single feature or scenario:

```bash
# run a single feature file
npx cucumber-js [loginTest.feature]

# run with tags (if you use tags)
npx cucumber-js --tags "@valid_login"
```

## For Headed Mode

The repo executes tests in headless mode, if headless mode is necessay, please change the settings below
file: src/config/global-setup.ts

```bash
#line 9
browser = await chromium.launch({ headless: false });
```

## Reports

JSON report will be generated at reports/cucumber_report.json when using the profile shown above.

To generate the report, please run the following command

```bash
npm run generate-report
```

## cucumber.js profile (recommended array form)

cucumber-js expects CLI-like args in the profile. Example that works:

```bash
module.exports = {
  default: `
  --format json:reports/cucumber_report.json
  --format-options '{"snippetInterface": "synchronous"}'
  --require-module ts-node/register
  --require src/steps/*.ts src/features/*.feature
  --parallel 4`,
};
```
