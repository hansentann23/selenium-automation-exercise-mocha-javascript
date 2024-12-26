const { By, until } = require ('selenium-webdriver');

class SignUpOrLoginPage {
    constructor(driver){
        this.driver = driver;
        this.newUserElement = By.xpath("//h2[.='New User Signup!']");
        this.loginToYourAccountTitle = By.xpath("//h2[.='Login to your account']");
        this.inputNameField = By.xpath("//input[@name='name']");
        this.inputEmailAddressSignUpField = By.xpath("//div[@class='signup-form']//input[@name='email']");
        this.signUpButton = By.xpath("//button[.='Signup']");
        this.inputEmailAddressLogInField = By.xpath("//div[@class='login-form']//input[@name='email']");
        this.inputPasswordLogInField = By.xpath("//input[@name='password']");
        this.loginButton = By.xpath("//button[.='Login']");
        this.invalidLoginDataErrorMessage = By.xpath("//p[.='Your email or password is incorrect!']");
        this.emailAlreadyExistsErrorMessage = By.xpath("//p[.='Email Address already exist!']");
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

    async logIn(emailAddressLogIn, password){
        try{
            await this.driver.wait(until.elementLocated(this.inputEmailAddressLogInField), this.timeout);
            await this.driver.findElement(this.inputEmailAddressLogInField).sendKeys(emailAddressLogIn);
        }catch(error){
            console.error("Error in logIn: Could not find or interact with element", error);
            return false;
        }
        try{
            await this.driver.wait(until.elementLocated(this.inputPasswordLogInField), this.timeout);
            await this.driver.findElement(this.inputPasswordLogInField).sendKeys(password);
        }catch(error){
            console.error("Error in signUp: Could not find or interact with element", error);
            return false;
        }
        await this.waitAndClick(this.loginButton);
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

    async isOnLoginPage(){
        try{
            await this.driver.wait(until.elementLocated(this.loginToYourAccountTitle), this.timeout);
            const loginTitlePage = await this.driver.findElement(this.loginToYourAccountTitle);
            return loginTitlePage.getText();
        }catch(error){
            console.error("Error in isOnLoginPage: Could not find the Sign Up Title", error);
            return false
        }
    }

    async invalidAccountErrorMesssage(){
        try{
            await this.driver.wait(until.elementLocated(this.invalidLoginDataErrorMessage), this.timeout);
            const invalidAccountErrorMssg = await this.driver.findElement(this.invalidLoginDataErrorMessage);
            return invalidAccountErrorMssg.getText();
        }catch(error){
            console.error("Error in invalidAccountErrorMesssage: Could not find the Sign Up Title", error);
            return false
        }
    }

    async emailAlreadyExistsErrorMesssage(){
        try{
            await this.driver.wait(until.elementLocated(this.emailAlreadyExistsErrorMessage), this.timeout);
            const emailAlreadyExistsErrorMssg = await this.driver.findElement(this.emailAlreadyExistsErrorMessage);
            return emailAlreadyExistsErrorMssg.getText();
        }catch(error){
            console.error("Error in emailAlreadyExistsErrorMesssage: Could not find the Sign Up Title", error);
            return false
        }
    }
}

module.exports = SignUpOrLoginPage