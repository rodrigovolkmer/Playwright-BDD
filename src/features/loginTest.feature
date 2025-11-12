Feature: Login Page  
  As a SaudeDemo User, I should be able to login with valid credentials

  @valid_login
  Scenario: Should be able to login with valid credentials
    Given I am a user on the Sauce Demo login page
    When I log in with credentials "standard_user", "secret_sauce"
    Then the browser navigates to the Inventory page

  @invalid_login
  Scenario: Invalid login attempt - username field empty
    Given I am a user on the Sauce Demo login page
    When I leave the username field empty and enter valid password "secret_sauce"
    Then an error message "Epic sadface: Username is required" should be displayed
  
  @invalid_login
  Scenario: Invalid login attempt - password field empty
    Given I am a user on the Sauce Demo login page
    When I enter valid username "standard_user" and leave the password field empty
    Then an error message "Epic sadface: Password is required" should be displayed

  @invalid_login
  Scenario: Invalid login credentials attempt
    Given I am a user on the Sauce Demo login page
    When I log in with credentials <username>, <password>
    Then an error message <message> should be displayed

  Examples:
    | username           | password          | message                                                                     |
    | "locked_out_user"  | "secret_sauce"    | "Epic sadface: Sorry, this user has been locked out."                       |
    | "invalid"          | "wrong_passwrd"   | "Epic sadface: Username and password do not match any user in this service" |
  