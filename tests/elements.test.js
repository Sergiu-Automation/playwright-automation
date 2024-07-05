/* eslint-disable no-undef */
const base = require("@playwright/test");
const { ElementsPage } = require("../fixturies/elements.js");

// Extend basic test by providing a "todoPage" fixture.
const test = base.test.extend({
  elementsPage: async ({ page }, use) => {
    const elementsPage = new ElementsPage(page);
    await elementsPage.goto();
    await use(elementsPage);
  },
});

test("Submit form with valid values", async ({ elementsPage }) => {
  const data = new Map([
    ["userName", "Sergiu Contevici"],
    ["userEmail", "sergiu@mailinator.com"],
    ["currentAddress", "7114 High Ridge St.Winter Springs, FL 32708"],
    ["permanentAddress", "932 Lakeview St.Monsey, NY 10952"],
  ]);
  await elementsPage.clickOnElementType("Text Box");
  await test.expect(elementsPage.page).toHaveURL(/.*text-box/);
  await elementsPage.fillInputField("userName", data.get("userName"));
  await elementsPage.fillInputField("userEmail", data.get("userEmail"));
  await elementsPage.fillInputField(
    "currentAddress",
    data.get("currentAddress")
  );
  await elementsPage.fillInputField(
    "permanentAddress",
    data.get("permanentAddress")
  );
  await elementsPage.clickOnSubmitButton();
  await test
    .expect(elementsPage.page.locator("#output > div > p"))
    .toHaveText([
      "Name:" + data.get("userName"),
      "Email:" + data.get("userEmail"),
      "Current Address :" + data.get("currentAddress") + " ",
      "Permananet Address :" + data.get("permanentAddress"),
    ]);
});

test("Check expand Home element", async ({ elementsPage }) => {
  await elementsPage.clickOnElementType("Check Box");
  await test.expect(elementsPage.page).toHaveURL(/.*checkbox/);
  await elementsPage.clickOnCollapseButtonOfElement("home");
  await test.expect(elementsPage.page.locator("ol li ol li")).toHaveCount(3);
});
