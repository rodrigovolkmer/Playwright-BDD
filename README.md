# PlaywrightBDD

Lightweight Playwright + Cucumber (BDD) TypeScript test suite for Sauce Demo (example repo).

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

## Running tests

You can run Cucumber directly (the repo uses ts-node to run TS step defs):

```bash
# run cucumber with the default profile in [cucumber.js]
npx cucumber-js
```

To run a single feature or scenario:

```bash
# run a single feature file
npx cucumber-js [loginTest.feature]

# run with tags (if you use tags)
npx cucumber-js --tags "@valid-"
```

## cucumber.js profile (recommended array form)

cucumber-js expects CLI-like args in the profile. Example that works:

```bash
module.exports = {
  default: [
    "--format",
    "json:reports/cucumber_report.json",
    "--format-options",
    '{"snippetInterface":"synchronous"}',
    "--require-module",
    "ts-node/register",
    "--require",
    "src/steps/*.ts",
    "--require",
    "src/features/*.feature",
    "--world-parameters",
    '{"sauceDemoUrl":"https://www.saucedemo.com/"}',
    "--parallel",
    "6",
  ],
};
```

Note: the object-style nested keys you tried (formatOptions / requireModule / worldParameters) is not parsed by cucumber-js; use the string or array form above.

## Reports

JSON report will be generated at reports/cucumber_report.json when using the profile shown above.

To generate the report, please run the following command

```bash
npm run generate-report
```
