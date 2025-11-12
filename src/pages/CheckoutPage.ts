import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;
  private readonly checkoutButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly completeHeader: Locator;
  private readonly inventoryItemPrice: Locator;
  private readonly summarySubTotalLabel: Locator;
  private readonly summaryTaxLabel: Locator;
  private readonly summaryTotalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator(".complete-header");
    this.inventoryItemPrice = page.locator(".inventory_item_price");
    this.summarySubTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.summaryTaxLabel = page.locator('[data-test="tax-label"]');
    this.summaryTotalLabel = page.locator('[data-test="total-label"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async enterDetails(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  async reviewOrder() {
    // information verification can be added here
    // ideally at this point we would fetch and verify the displayed information using API calls to make sure the product information is correct
    // for now, we will just check that the Total price is displayed correctly

    // Calculate total price based on items in the cart
    let subTotal = 0;
    for (let i = 0; i < (await this.inventoryItemPrice.count()); i++) {
      const priceText = await this.inventoryItemPrice.nth(i).innerText();
      const itemPrice = parseFloat(priceText.replace("$", ""));
      subTotal += itemPrice;
    }

    // Total calculation with tax (assuming 8% tax for example)
    const tax = subTotal * 0.08; // 8% tax
    const total = subTotal + tax;
    await expect(this.summarySubTotalLabel).toContainText("Item total: $" + subTotal.toFixed(2));
    await expect(this.summaryTaxLabel).toContainText("Tax: $" + tax.toFixed(2));
    await expect(this.summaryTotalLabel).toContainText("Total: $" + total.toFixed(2));
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async verifyOrderComplete() {
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }
}
