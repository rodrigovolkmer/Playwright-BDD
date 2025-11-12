import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../config/global-setup";
import { LoginPage } from "../pages/LoginPage";

let loginPage: LoginPage;

Given("I am a user on the Sauce Demo login page", async function () {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

When("I log in with credentials {string}, {string}", async function (username: string, password: string) {
  await loginPage.login(username, password);
});

When("I leave the username field empty and enter valid password {string}", async function (password: string) {
  await loginPage.login("", "secret_sauce");
});

When("I enter valid username {string} and leave the password field empty", async function (username: string) {
  await loginPage.login("standard_user", "");
});

Then("an error message {string} should be displayed", async function (message: string) {
  await loginPage.checkErrorMessage(message);
});
