const { By, until } = require ('selenium-webdriver');

class DashboardPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//img[@alt='Website for automation practice']");
        this.signUpOrLoginButton = By.xpath("//a[contains(.,'Signup / Login')]");
        this.deleteAccountButton = By.xpath("//a[contains(.,'Delete Account')]");
        this.timeout = 5000;
    }

    async navigate(){
        await this.driver.get("https://automationexercise.com/")
    }

    async waitAndClick(element) {
        try {
            await this.driver.wait(until.elementLocated(element), this.timeout);
            await this.driver.findElement(element).click();
        } catch (error) {
            console.error(`Error in waitAndClick: Could not click the element.`, error);
        }
    }

    async isOnDashboard (){
        try{
            await this.driver.wait(until.elementLocated(this.pageTitle), this.timeout);
            const titleElement = await this.driver.findElement(this.pageTitle);
            return await titleElement.isDisplayed();
        }catch(error){
            console.error("Error in isOnDashboard: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async navigateToLoginOrSignUpPage (){
        await this.waitAndClick(this.signUpOrLoginButton);
        return new (require('./SignUpOrLoginPage'))(this.driver);
    }

    async clickDeleteAccountButton (){
        try{
            await this.driver.wait(until.elementLocated(this.deleteAccountButton), this.timeout);
            await this.driver.findElement(this.deleteAccountButton).click();
        }catch(error){
            console.error("Error in clickDeleteAccountButton: Could not find or interact with element.", error);
            return false;
        }
    }
}

module.exports = DashboardPage