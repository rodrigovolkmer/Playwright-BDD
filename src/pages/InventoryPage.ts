import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;
  private readonly inventoryPageContainer: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryPageContainer = page.locator('[data-test="inventory-container"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
  }

  async verifyOnInventoryPage() {
    await this.inventoryPageContainer.waitFor();
    await expect(this.page).toHaveURL(/.*\/inventory.html/);
  }

  async sortItems(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async verifySorting(option: string) {
    const itemNames = this.page.locator(".inventory_item_name");
    const itemPrices = this.page.locator(".inventory_item_price");
    const count = await itemNames.count();
    let names: string[] = [];
    let prices: number[] = [];

    for (let i = 0; i < count; i++) {
      names.push(await itemNames.nth(i).innerText());
      const priceText = await itemPrices.nth(i).innerText();
      prices.push(parseFloat(priceText.replace("$", "")));
    }

    if (option === "Name (A to Z)") {
      const sortedNames = [...names].sort();
      expect(names).toEqual(sortedNames);
    } else if (option === "Name (Z to A)") {
      const sortedNames = [...names].sort().reverse();
      expect(names).toEqual(sortedNames);
    } else if (option === "Price (low to high)") {
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    } else if (option === "Price (high to low)") {
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    }
  }

  async addItemToCart(itemName: string) {
    const itemNameSlugified = itemName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove punctuation
      .replace(/\s+/g, "-"); // spaces -> hyphens;
    await this.page.locator(`[data-test="add-to-cart-${itemNameSlugified}"]`).click();
  }

  async navigateToCart() {
    await this.cartIcon.click();
  }
}
