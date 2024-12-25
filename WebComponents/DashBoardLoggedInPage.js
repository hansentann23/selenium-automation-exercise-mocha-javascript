const { By, until } = require ('selenium-webdriver');

class DashboardLoggedInPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//img[@alt='Website for automation practice']");
        this.deleteAccountButton = By.xpath("//a[contains(.,'Delete Account')]");
        this.timeout = 5000;
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

module.exports = DashboardLoggedInPage