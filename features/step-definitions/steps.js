const { Given, When, Then } = require('@wdio/cucumber-framework');
const { default: waitForClickable } = require('webdriverio/build/commands/element/waitForClickable');

const LoginPage = require('../pageobjects/login.page');
const TodayPage = require('../pageobjects/today.page');

const pages = {
    login: LoginPage,
    today: TodayPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (.+) and (.+)$/, async (email, password) => {
    await LoginPage.login(email, password)
});

Then(/^I should see an error message saying (.*)$/, async (message) => {
    await expect(LoginPage.errorMsg).toBeExisting();
    await expect(LoginPage.errorMsg).toHaveTextContaining(message);
});

Then(/^I should see a page with title (.*)$/, async (message) => {
    await expect(browser).toHaveTitle(message);
});

Then(/^I should be able to create (\d+) task successfully$/, async (nbrOfTasks) => {
    await TodayPage.createTask(nbrOfTasks);
});

