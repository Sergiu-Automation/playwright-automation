export class ElementsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.textBoxElement = this.page.locator("li");
    this.submitButton = this.page.locator("#submit");
    this.rctText = this.page.locator(".rct-text");
  }

  async goto() {
    await this.page.goto("https://demoqa.com/elements");
  }

  /**
   * @param {string} elementType
   */
  async clickOnElementType(elementType) {
    await this.textBoxElement.filter({ hasText: elementType }).click();
  }

  /**
   * @param {string} inputFieldId - The test ID of the input field.
   * @param {string} value - The value to be filled into the input field.
   */
  async fillInputField(inputFieldId, value) {
    try {
      const input = this.page.locator("#" + inputFieldId);
      if (!input) {
        throw new Error(`Input field with test ID "${inputFieldId}" not found`);
      }
      await input.click();
      await input.clear();
      await input.fill(value);
    } catch (error) {
      console.error(
        `Failed to fill input field with test ID "${inputFieldId}":`,
        error
      );
    }
  }

  async clickOnSubmitButton() {
    await this.submitButton.click();
  }

  /**
   * @param {string} elementToCollapse
   */
  async clickOnCollapseButtonOfElement(elementToCollapse) {
    await this.page
      .locator("li")
      .filter({ has: this.page.locator("#tree-node-" + elementToCollapse) })
      .getByLabel("Toggle")
      .click();
  }
}
