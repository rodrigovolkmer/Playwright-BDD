Feature: Sauce Demo End-to-End Shopping
  As a standard user
  I want to log in, sort items, shop, and verify check out
  So that I can purchase items

  @sort_items
  Scenario: Sort items by Price and Name
    Given I am a user on the Sauce Demo login page
    When I log in with valid credentials "standard_user", "secret_sauce"
    And I sort items by "Price (low to high)"
    Then the items should be sorted accordingly to "Price (low to high)"
    And I sort items by "Name (Z to A)"
    Then the items should be sorted accordingly to "Name (Z to A)"

  @add_and_remove_to_cart
  Scenario: Add and remove multiple items to cart
    Given I am a user on the Sauce Demo login page
    When I log in with valid credentials "standard_user", "secret_sauce"
    And I add the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    And I navigate to the cart page
    Then the cart should contain 2 items
    When I remove the "Sauce Labs Bike Light" from the cart
    Then the cart should contain 1 item
    
  @e2e_purchase
  @complete_purchase
  Scenario: Complete end-to-end purchase with multiple items
    Given I am a user on the Sauce Demo login page
    When I log in with valid credentials "standard_user", "secret_sauce"
    And I sort items by "Price (low to high)"
    And I add the "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    And I navigate to the cart page
    And I proceed to checkout
    And I enter shipping details "John", "Doe", "12345"
    And I complete the purchase
    Then the order confirmation should be displayed