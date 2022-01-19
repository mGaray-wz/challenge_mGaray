

const Page = require('./page');
require('dotenv').config();

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail() {
        return $('//input[@id="email"]');
    }

    get inputPassword() {
        return $('//input[@id="password"]');
    }

    get btnLogin() {
        return $('//button[contains(@class,"submit")]');
    }

    get errorMsg() {
        return $('//div[@class="error_msg"]//span[1]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (email, password) {
        if (email == "correct email"){
            email = process.env.EMAIL
        }
        if (password == "correct password"){
            password = process.env.PASSWORD
        }
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('users/showlogin');
    }
}

module.exports = new LoginPage();
