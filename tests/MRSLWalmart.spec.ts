import { test, expect } from "@playwright/test";

test("MRSL Walmart API/Requests test", async ({ page }) => {
  const [request, response] = await Promise.all([
    page.waitForRequest(
      (req) => req.url().includes("api/retailers") && req.method() === "POST"
    ),
    page.waitForResponse(
      (resp) => resp.url().includes("/api/retailers") && resp.status() === 200
    ),
    await page.goto("https://qa-link.chicoryapp.com/ra/PZv6?open_as_modal=1"),
  ]);

  const page1Promise = page.waitForEvent("popup");
  const requestBody = request.postData();
  expect(response.status()).toBe(200);
  expect(requestBody).toContain(
    '{"zipCode":"10101","whitelistedRetailers":["7-eleven","acmemarkets","acmemarkets_direct","albertsons","albertsons_direct","aldi","amazon","amazonfresh","andronicos_direct","balduccis_direct","bevmo","bjs","carrsqc_direct","costco","cvs","food-city","foodtown","freshthyme","gelsons","gianteagle","giantfood","giantfoodstores","haggen_direct","hannaford","heb","hy-vee","ingles","instacart","jewelosco","jewelosco_direct","kingsfoodmarkets_direct","kroger","kroger_BAKERS","kroger_CITYMARKET","kroger_DILLONS","kroger_FOOD4LESS","kroger_FRED","kroger_FRYS","kroger_GERBES","kroger_HARRISTEETER","kroger_KINGSOOPERS","kroger_MARIANOS","kroger_METRO_MARKET","kroger_OWENS","kroger_PAYLESS","kroger_PICK_N_SAVE","kroger_QFC","kroger_RALPHS","kroger_SMITHS","krogerinstacart","lowes","marketbasket","marketdistrict","martins","martinsfood","meijerinstacart","noretailer","northgate","pavilions","pavilions_direct","peapod","publix","raleys","randalls_direct","rite-aid","safeway","safeway_direct","samsclub","schnucks","shaws","shaws_direct","shoprite","smartandfinal","sprouts","starmarket","starmarket_direct","staterbros","stopandshop","targetfresh","targetshipping","test","test_retailer","thefreshmarket","tomthumb_direct","totalwine","vons","vons_direct","walgreens","walmartgrocery","wegmans","wholefoods","wholefoodsmarket","winndixie"]}'
  );

  await page
    .locator('iframe[name="shopperselect"]')
    .contentFrame()
    .getByRole("img", { name: "walmartgrocery" })
    .click();
  const page1 = await page1Promise;
});

test("MRSL Walmart API/Cart test", async ({ page }) => {
  await page.goto("https://qa-link.chicoryapp.com/ra/OyrE");

  const [request, response] = await Promise.all([
    page.waitForRequest(
      (req) => req.url().includes("api/cart") && req.method() === "POST"
    ),
    page.waitForResponse(
      (resp) => resp.url().includes("/api/cart") && resp.status() === 200
    ),
    await page
      .locator('iframe[name="shopperselect"]')
      .contentFrame()
      .getByRole("img", { name: "walmartgrocery" })
      .click(),
  ]);

  const page1Promise = page.waitForEvent("popup");
  const requestBody = request.postData();
  expect(response.status()).toBe(200);
  expect(requestBody).toContain(
    '{"cart":{"items":[{"productSpecs":[{"searchQuery":"670418489","quantity":1,"priority":1}]}],"options":{"retailer":{"slug":"walmartgrocery"},"zipCode":"10101","longitude":"-84.0706","latitude":"9.9346"},"analytics":{"ad_experiment_id":null,"event":"sslp_retailer_redirect","oauth_event":"sslp_retailer_oauth","name":"CH-3143 Amazon ATC Test t","title":null,"body":"","zip_code":"10101","link_id":7269,"is_mobile":false,"referrer":"https://qa-link.chicoryapp.com/","ab_test_id":null,"metadata":{"chi_site_id":"direct-navigation"},"open_as_modal":true}}}'
  );

  const page1 = await page1Promise;
});
