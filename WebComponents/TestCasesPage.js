const { By, until } = require ('selenium-webdriver');

class TestCasesPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//b[.='Test Cases']");
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

    async isOnTestCasesPage (){
        try{
            await this.driver.wait(until.elementLocated(this.pageTitle), this.timeout);
            const titleElement = await this.driver.findElement(this.pageTitle);
            return await titleElement.getText();
        }catch(error){
            console.error("Error in isOnDashboard: Could not find or interact with the page title.", error);
            return false;
        }
    }
}

module.exports = TestCasesPage