Feature: Medidations Listing
  As a user of blueprint SPA
  I should be able to see Medidations

  Scenario: See medidations
    Given I have 1 medidation
    And I am on the medidations listing page
    Then I should see 1 medidation table row
