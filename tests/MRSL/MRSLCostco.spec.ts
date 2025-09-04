import { test } from "../fixtureMRSL"; 
import { expect } from "@playwright/test";

test("MRSL Costco API/Requests test", async ({
  page,
  baseUrl,
  apiEndpoint,
  zipCode,
  whitelistedRetailers,
}) => {
  const [request, response] = await Promise.all([
    page.waitForRequest(
      (req) => req.url().includes(apiEndpoint) && req.method() === "POST"
    ),
    page.waitForResponse(
      (resp) => resp.url().includes(apiEndpoint) && resp.status() === 200
    ),
    await page.goto(baseUrl),
  ]);

  const page1Promise = page.waitForEvent("popup");
  const requestBody = request.postData();
  expect(response.status()).toBe(200);
  expect(requestBody).toContain(
    JSON.stringify({ zipCode, whitelistedRetailers })
  );

  await page
    .locator('iframe[name="shopperselect"]')
    .contentFrame()
    .getByRole("img", { name: "costco" })
    .click();
  const page1 = await page1Promise;
});

test("MRSL Costco API/Cart test", async ({ page, apiEndpointCart, baseUrl}) => {
  await page.goto(baseUrl);

  const [request, response] = await Promise.all([
    page.waitForRequest(
      (req) => req.url().includes(apiEndpointCart) && req.method() === "POST"
    ),
    page.waitForResponse(
      (resp) => resp.url().includes(apiEndpointCart) && resp.status() === 200
    ),
    await page
      .locator('iframe[name="shopperselect"]')
      .contentFrame()
      .getByRole("img", { name: "costco" })
      .click(),
  ]);

  const page1Promise = page.waitForEvent("popup");
  const requestBody = request.postData();
  expect(response.status()).toBe(200);
  expect(requestBody).toContain(
    '{"cart":{"items":[{"productSpecs":[{"searchQuery":"playstation","quantity":1,"priority":1}]}],"options":{"retailer":{"slug":"costco"},"zipCode":"10101","longitude":"-84.0706","latitude":"9.9346"},"analytics":{"ad_experiment_id":null,"event":"sslp_retailer_redirect","oauth_event":"sslp_retailer_oauth","name":"MRSL Automation Test","title":"Play better","body":"test test test","zip_code":"10101","link_id":7270,"is_mobile":false,"referrer":"https://qa-link.chicoryapp.com/","ab_test_id":null,"metadata":{"chi_site_id":"direct-navigation"},"open_as_modal":true}}}'
  );

  const page1 = await page1Promise;
});