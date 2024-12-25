const { By, until } = require ('selenium-webdriver');

class SignUpOrLoginPage {
    constructor(driver){
        this.driver = driver;
        this.newUserElement = By.xpath("//h2[.='New User Signup!']");
        this.inputNameField = By.xpath("//input[@name='name']");
        this.inputEmailAddressSignUpField = By.xpath("//div[@class='signup-form']//input[@name='email']");
        this.signUpButton = By.xpath("//button[.='Signup']");
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

    async signUp(name, emailAddressSignUp){
        try{
            await this.driver.wait(until.elementLocated(this.inputNameField), this.timeout);
            await this.driver.findElement(this.inputNameField).sendKeys(name);
        }catch(error){
            console.error("Error in signUp: Could not find or interact with element", error);
            return false;
        }
        try{
            await this.driver.wait(until.elementLocated(this.inputEmailAddressSignUpField), this.timeout);
            await this.driver.findElement(this.inputEmailAddressSignUpField).sendKeys(emailAddressSignUp);
        }catch(error){
            console.error("Error in signUp: Could not find or interact with element", error);
            return false;
        }
        await this.waitAndClick(this.signUpButton);
    }

    async isOnSignUpOrLoginPage(){
        try{
            await this.driver.wait(until.elementLocated(this.newUserElement), this.timeout);
            const newUserElement = await this.driver.findElement(this.newUserElement);
            return newUserElement.getText();
        }catch(error){
            console.error("Error in isOnSignUpOrLoginPage: Could not find the Sign Up Title", error);
            return false
        }
    }
}

module.exports = SignUpOrLoginPage