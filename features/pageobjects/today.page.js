

const Page = require('./page');
const LoginPage = require('../pageobjects/login.page');
require('dotenv').config();

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TodayPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnAddNewTask() {
        return $('//button[@type="button" and contains(@class,"plus_add")]');
    }
    get btnSubmitTask() {
        return $('//button[@type="submit"]');
    }

    get inputTaskName() {
        return $('//div[@class="task_editor__input_fields"]//span//br');
    }

    get listTasks() {
        return $$('//ul[@class="items"]//li');
    }

    get listTasks() {
        return $$('//ul[@class="items"]//li');
    }

    get modalTimeZone() {
        return $('//div[@class="timezone_alert"]');
    }
    get modalTimeZoneClose() {
        return $('//div[@class="timezone_alert"]//a[@class="timezone_link timezone_link_block"]');
    }

    async createTask (nbrOfTasks) {
        var today = new Date();
        var date = today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate();
        var time = today.getHours() + "." + today.getMinutes() + "." + today.getSeconds();
        var random = date+'.'+time;

        await browser.waitUntil(
            async () => (await browser.getTitle()) !== 'Todoist',
            {
                timeout: 5000,
                timeoutMsg: 'expected text to be different after 5s'
            }
        );

        if ( await this.modalTimeZone.isDisplayed()){
            await this.modalTimeZoneClose.click();
        }

        await this.btnAddNewTask.click();

        for (let i=0; i<nbrOfTasks;i++){
            var taskName = random+'.'+i;
            await expect(this.inputTaskName).toBeExisting();
            await this.inputTaskName.addValue(taskName);
            await expect(this.btnSubmitTask).toBeEnabled();
            await this.btnSubmitTask.click();
            await browser.pause(2000);
            var results = await this.listTasks;
            await expect(results[parseFloat(results.length) - parseFloat(2)]).toHaveTextContaining(taskName);
        }
    }


    async open() {
        await super.open('app/today');

        await browser.waitUntil(
            async () => (await browser.getTitle()) !== 'Todoist',
            {
                timeout: 5000,
                timeoutMsg: 'expected text to be different after 5s'
            }
        );

        var currentTitle = await browser.getTitle();
        console.log("TITLE " + currentTitle);
        if (!currentTitle.includes("Today") && currentTitle.includes("Log in")){
            await LoginPage.login(process.env.EMAIL,process.env.PASSWORD);
        }

        return super.open('app/today');
    }
}

module.exports = new TodayPage();
