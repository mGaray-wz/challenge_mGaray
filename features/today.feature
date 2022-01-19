Feature: Todoist login page

  Scenario Outline: As a user, I am able to create 1 task

    Given I am on the today page
    Then I should be able to create 1 task successfully

Scenario Outline: As a user, I am able to create 10 task

    Given I am on the today page
    Then I should be able to create 10 task successfully