import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../config/global-setup";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

Given("I am a user on the Sauce Demo login page", async function () {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

When("I log in with valid credentials {string}, {string}", async function (username: string, password: string) {
  await loginPage.login(username, password);
  inventoryPage = new InventoryPage(page);
  await inventoryPage.verifyOnInventoryPage();
});

When("I leave the username field empty and enter valid password {string}", async function (password: string) {
  await loginPage.login("", "secret_sauce");
});

When("I enter valid username {string} and leave the password field empty", async function (username: string) {
  await loginPage.login("standard_user", "");
});

When("I log in with invalid credentials", async function () {
  await loginPage.login("invalid", "secret_sauce");
});

Then("an error message {string} should be displayed", async function (message: string) {
  await loginPage.checkErrorMessage(message);
});

Then("the error message display in red backdground color with white font color", async function (message: string) {
  await loginPage.checkErrorMessage(message);
});

Then("the username and password fields are highlighted in red with a red", async function (message: string) {
  await loginPage.checkErrorMessage(message);
});
