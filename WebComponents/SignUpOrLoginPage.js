const { By, until } = require ('selenium-webdriver');

class SignUpOrLoginPage {
    constructor(driver){
        this.driver = driver;
        this.newUserElement = By.xpath("//h2[.='New User Signup!']");
    }

    async isOnSignUpOrLoginPage(){
        await this.driver.wait(until.elementLocated(this.newUserElement), 5000);
        const newUserElement = await this.driver.findElement(this.newUserElement);
        return newUserElement.getText();
    }
}

module.exports = SignUpOrLoginPage