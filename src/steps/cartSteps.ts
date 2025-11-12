import { When, Then } from "@cucumber/cucumber";
import { page } from "../config/global-setup";
import { CartPage } from "../pages/CartPage";

let cartPage: CartPage;

Then("the cart should contain {int} item(s)", async function (expectedCount: number) {
  cartPage = new CartPage(page);
  await cartPage.verifyCartCount(expectedCount);
});

When("I remove the {string} from the cart", async function (itemName: string) {
  cartPage = new CartPage(page);
  await cartPage.removeItemFromCart(itemName);
});
