import { test, expect } from '@playwright/test';
import { BigQueryManager } from '../utils/bigQueryManager';
test('inline Ad verification', async ({ page }) => {
  await page.goto('https://qa-test.chicoryapp.com/test-recipe-inline/');
  await page.waitForSelector('[id="\\31 646"]');
  await page.waitForSelector('[id="\\31 652"]');
  const page1Promise = page.waitForEvent('popup');  
  
  await page.locator('[id="\\31 652"]').getByRole('link', { name: 'tap here' }).click();

  BigQueryManager.createDataset("GetAdsData");
  var dataset = BigQueryManager.getData('YOUR_GCP_PROJECT_ID', 'GetAdsData', 'adsData');
 
  // Implement dataset data retriction logic here



  const page1 = await page1Promise;
  
});