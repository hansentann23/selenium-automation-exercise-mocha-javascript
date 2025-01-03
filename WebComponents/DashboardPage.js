const { By, until } = require ('selenium-webdriver');

class DashboardPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//img[@alt='Website for automation practice']");
        this.signUpOrLoginButton = By.xpath("//a[contains(.,'Signup / Login')]");
        this.deleteAccountButton = By.xpath("//a[contains(.,'Delete Account')]");
        this.loggedInAs = By.xpath("//b[.='Hansen']");
        this.logOutButton = By.xpath("//a[contains(.,'Logout')]");
        this.contactUsButton = By.xpath("//a[contains(.,'Contact us')]");
        this.testCasesButton = By.xpath("//ul[@class='nav navbar-nav']//a[contains(.,'Test Cases')]");
        this.productsButton = By.css("[href='/products']");
        this.subscriptionTitle = By.xpath("//h2[.='Subscription']")
        this.subscriptionEmailField = By.xpath("//input[@id='susbscribe_email']");
        this.submitSubscriptionEmail = By.xpath("//i[@class='fa fa-arrow-circle-o-right']");
        this.subscriptionSuccessMessage = By.xpath("//div[@class='alert-success alert']");
        this.viewProduct1Button = By.xpath("//a[@href='/product_details/1']");
        this.timeout = 5000;
    }

    async scrollIntoSelectedElement(desiredElement){
        await driver.executeScript("arguments[0].scrollIntoView(true);", desiredElement);
    }

    async navigate(baseUrl){
        await this.driver.get(baseUrl)
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

    async isLoggedIn (){
        try{
            await this.driver.wait(until.elementLocated(this.loggedInAs), this.timeout);
            const loggedIn = await this.driver.findElement(this.loggedInAs);
            return await loggedIn.isDisplayed();
        }catch(error){
            console.error("Error in isLoggedIn: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async clickLogOutButton (){
        try{
            await this.driver.wait(until.elementLocated(this.logOutButton), this.timeout);
            await this.driver.findElement(this.logOutButton).click();
        }catch(error){
            console.error("Error in clickLogOutButton: Could not find or interact with element.", error);
            return false;
        }
    }

    async clickContactUsButton (){
        try{
            await this.driver.wait(until.elementLocated(this.contactUsButton), this.timeout);
            await this.driver.findElement(this.contactUsButton).click();
        }catch(error){
            console.error("Error in clickContactUsButton: Could not find or interact with element.", error);
            return false;
        }
    }

    async clickTestCasesButton (){
        try{
            await this.driver.wait(until.elementLocated(this.testCasesButton), this.timeout);
            await this.driver.findElement(this.testCasesButton).click();
        }catch(error){
            console.error("Error in clickTestCasesButton: Could not find or interact with element.", error);
            return false;
        }
    }

    async clickProductsButton (){
        await this.waitAndClick(this.productsButton);
    }

    async isSubscriptionTitleVisible (){
        this.scrollIntoSelectedElement(this.subscriptionTitle);
        try{
            await this.driver.wait(until.elementLocated(this.subscriptionTitle), this.timeout);
            const titleElement = await this.driver.findElement(this.subscriptionTitle);
            return await titleElement.isDisplayed();
        }catch(error){
            console.error("Error in isSubscriptionTitleVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async fillSubscriptionEmailField(email){
        this.scrollIntoSelectedElement(this.subscriptionEmailField);
        try{
            await this.driver.wait(until.elementLocated(this.subscriptionEmailField), this.timeout);
            await this.driver.findElement(this.subscriptionEmailField).sendKeys(email);
        } catch (error){
            console.error("Error in fillSubscriptionEmailField: Could not find or interact with the element", error);
            return false;
        }
    }   

    async clickSubmitSubscriptionEmailButton (){
        this.scrollIntoSelectedElement(this.submitSubscriptionEmail);
        await this.waitAndClick(this.submitSubscriptionEmail);
    }

    async isSubscriptionSuccessMessageVisible (){
        this.scrollIntoSelectedElement(this.subscriptionSuccessMessage);
        try{
            await this.driver.wait(until.elementLocated(this.subscriptionSuccessMessage), this.timeout);
            const titleElement = await this.driver.findElement(this.subscriptionSuccessMessage);
            return await titleElement.isDisplayed();
        }catch(error){
            console.error("Error in isSubscriptionSuccessMessageVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }
    
    async clickViewProduct1Button (){
        this.scrollIntoSelectedElement(this.viewProduct1Button);
        await this.waitAndClick(this.viewProduct1Button);
    }
}

module.exports = DashboardPage