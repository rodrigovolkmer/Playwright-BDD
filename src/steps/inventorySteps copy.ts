import { When, Then } from "@cucumber/cucumber";
import { page } from "../config/global-setup";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;
let cartPage: CartPage;

Then("the browser navigates to the Inventory page", async function () {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.verifyOnInventoryPage();
});

When("I sort items by {string}", async function (sortOption: string) {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.sortItems(sortOption);
});

Then("the items should be sorted accordingly to {string}", async function (sortOption: string) {
  await inventoryPage.verifySorting(sortOption);
});

When("I add the {string} and {string} to the cart", async function (item1: string, item2: string) {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart(item1);
  await inventoryPage.addItemToCart(item2);
});

When("I navigate to the cart page", async function () {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.navigateToCart();
  cartPage = new CartPage(page);
  await cartPage.verifyInCart();
});
