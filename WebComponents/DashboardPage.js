const { By, until } = require ('selenium-webdriver');

class DashboardPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//img[@alt='Website for automation practice']");
        this.signUpOrLoginButton = By.xpath("//a[contains(.,'Signup / Login')]");
    }

    async navigate(){
        await this.driver.get("https://automationexercise.com/")
    }

    async isOnDashboard (){
        try{
            await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
            const titleElement = await this.driver.findElement(this.pageTitle);
            return await titleElement.isDisplayed();
        }catch(error){
            console.error("Error in isOnDashboard:", error);
            return false;
        }
    }

    async navigateToLoginOrSignUpPage (){
        await this.driver.findElement(this.signUpOrLoginButton).click();
        return new (require('./SignUpOrLoginPage'))(this.driver);
    }
}

module.exports = DashboardPage