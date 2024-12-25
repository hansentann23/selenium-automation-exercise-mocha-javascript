const { By, until } = require ('selenium-webdriver');

class AccountDeletedPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//b[.='Account Deleted!']");
        this.continueButton = By.xpath("//a[.='Continue']");
    }

    async scrollIntoSelectedElement(desiredElement){
        await driver.executeScript("arguments[0].scrollIntoView(true);", desiredElement);
    }

    async isOnAccountDeletedPage(){
        try{
            await this.driver.wait(until.elementLocated(this.pageTitle), this.timeout);
            const title = await this.driver.findElement(this.pageTitle);
            return title.getText();
        }catch(error){
            console.error("Error in isOnAccountDeletedPage: Could not find the Sign Up Title", error);
            return false
        }
    }

    async clickContinueButton(){
        this.scrollIntoSelectedElement(this.continueButton);
        try{
            await this.driver.wait(until.elementLocated(this.continueButton), this.timeout);
            await this.driver.findElement(this.continueButton).click();
        }catch(error){
            console.error("Error in clickContinueButton: Could not find or interact with element.", error);
            return false;
        }
    }
}

module.exports = AccountDeletedPage