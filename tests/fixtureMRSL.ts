import { test as base } from "@playwright/test";

// Define custom fixtures
const test = base.extend<{
  baseUrl: string;
  apiEndpoint: string;
  apiEndpointCart: string;
  zipCode: string;
  whitelistedRetailers: string[];
}>({
  baseUrl: async ({}, use) => {
    await use("https://qa-link.chicoryapp.com/ra/PZv6?open_as_modal=1");
  },
  apiEndpoint: async ({}, use) => {
    await use("/api/retailers");
  },
  apiEndpointCart: async ({}, use) => {
    await use("/api/cart");
  },
  zipCode: async ({}, use) => {
    await use("10101");
  },
  whitelistedRetailers: async ({}, use) => {
    await use([
      "7-eleven",
      "acmemarkets",
      "acmemarkets_direct",
      "albertsons",
      "albertsons_direct",
      "aldi",
      "amazon",
      "amazonfresh",
      "andronicos_direct",
      "balduccis_direct",
      "bevmo",
      "bjs",
      "carrsqc_direct",
      "costco",
      "cvs",
      "food-city",
      "foodtown",
      "freshthyme",
      "gelsons",
      "gianteagle",
      "giantfood",
      "giantfoodstores",
      "haggen_direct",
      "hannaford",
      "heb",
      "hy-vee",
      "ingles",
      "instacart",
      "jewelosco",
      "jewelosco_direct",
      "kingsfoodmarkets_direct",
      "kroger",
      "kroger_BAKERS",
      "kroger_CITYMARKET",
      "kroger_DILLONS",
      "kroger_FOOD4LESS",
      "kroger_FRED",
      "kroger_FRYS",
      "kroger_GERBES",
      "kroger_HARRISTEETER",
      "kroger_KINGSOOPERS",
      "kroger_MARIANOS",
      "kroger_METRO_MARKET",
      "kroger_OWENS",
      "kroger_PAYLESS",
      "kroger_PICK_N_SAVE",
      "kroger_QFC",
      "kroger_RALPHS",
      "kroger_SMITHS",
      "krogerinstacart",
      "lowes",
      "marketbasket",
      "marketdistrict",
      "martins",
      "martinsfood",
      "meijerinstacart",
      "noretailer",
      "northgate",
      "pavilions",
      "pavilions_direct",
      "peapod",
      "publix",
      "raleys",
      "randalls_direct",
      "rite-aid",
      "safeway",
      "safeway_direct",
      "samsclub",
      "schnucks",
      "shaws",
      "shaws_direct",
      "shoprite",
      "smartandfinal",
      "sprouts",
      "starmarket",
      "starmarket_direct",
      "staterbros",
      "stopandshop",
      "targetfresh",
      "targetshipping",
      "test",
      "test_retailer",
      "thefreshmarket",
      "tomthumb_direct",
      "totalwine",
      "vons",
      "vons_direct",
      "walgreens",
      "walmartgrocery",
      "wegmans",
      "wholefoods",
      "wholefoodsmarket",
      "winndixie",
    ]);
  },
});

export { test };