import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  private readonly cartPageContainer: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;
  private readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartPageContainer = page.locator('[data-test="cart-contents-container"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async verifyInCart() {
    await this.cartPageContainer.waitFor();
    await expect(this.page).toHaveURL(/.*\/cart.html/);
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async verifyCartCount(expectedCount: number) {
    await expect(await this.cartItems.count()).toBe(expectedCount);
  }

  async removeItemFromCart(itemName: string) {
    const itemNameSlugified = itemName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove punctuation
      .replace(/\s+/g, "-"); // spaces -> hyphens;
    await this.page.locator(`[data-test="remove-${itemNameSlugified}"]`).click();
  }
}
