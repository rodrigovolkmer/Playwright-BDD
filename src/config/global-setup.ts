import { After, Before } from "@cucumber/cucumber";
import { Page, Browser, chromium, BrowserContext, expect } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async () => {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await context.close();
  await browser.close();
});

export { page, expect, browser };
