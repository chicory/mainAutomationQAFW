import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qa-test.chicoryapp.com/test-recipe-inline/');
  await page.waitForSelector('[id="\\31 646"]');
  await page.waitForSelector('[id="\\31 652"]');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('[id="\\31 652"]').getByRole('link', { name: 'tap here' }).click();
  const page1 = await page1Promise;
  
});