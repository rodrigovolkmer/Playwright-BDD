import { When, Then } from "@cucumber/cucumber";
import { page } from "../config/global-setup";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

let cartPage: CartPage;
let checkoutPage: CheckoutPage;

When("I proceed to checkout", async function () {
  cartPage = new CartPage(page);
  await cartPage.proceedToCheckout();
});

When(
  "I enter shipping details {string}, {string}, {string}",
  async function (firstName: string, lastName: string, zipCode: string) {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.enterDetails(firstName, lastName, zipCode);
  }
);

When("I complete the purchase", async function () {
  await checkoutPage.finishOrder();
});

Then("the order confirmation should be displayed", async function () {
  await checkoutPage.verifyOrderComplete();
});
