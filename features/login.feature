Feature: Todoist login page

  Scenario Outline: As a user, I can log into Todoist

    Given I am on the login page
    When I login with correct email and correct password
    Then I should see a page with title Today: Todoist


  Scenario Outline: Error message should display when login with incorrect credentials

    Given I am on the login page
    When I login with <email> and <password>
    Then I should see an error message saying <message>

    Examples:
    | email           | password         | message                  |
    | correct email   | CHALLENGEmario   | Wrong email or password. |
    | mario.garay     | correct password | Invalid email address.   |