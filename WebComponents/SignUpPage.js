const { By, until } = require ('selenium-webdriver');

class SignUpPage {
    constructor(driver){
        this.driver = driver;
        this.signUpPageTitle = By.xpath("//b[.='Enter Account Information']");
        this.titleMr = By.xpath("//input[@value='Mr']");
        this.passwordField = By.xpath("//input[@id='password']");
        this.dayDropDown = By.xpath("//select[@id='days']");
        this.monthDropDown = By.xpath("//select[@id='months']");
        this.yearDropDown = By.xpath("//select[@id='years']");
        this.newsLetterSignUpCheckBox = By.xpath("//input[@id='newsletter']");
        this.specialOffersCheckBox = By.xpath("//input[@id='optin']");
        this.firstNameField = By.xpath("//input[@id='first_name']");
        this.lastNameField = By.xpath("//input[@id='last_name']");
        this.companyField = By.xpath("//input[@id='company']");
        this.address1Field = By.xpath("//p[4]/input[@class='form-control']");
        this.countryDropDown = By.xpath("//select[@id='country']");
        this.stateField = By.xpath("//input[@id='state']");
        this.cityField = By.xpath("//input[@id='city']");
        this.zipCodeField = By.xpath("//input[@id='zipcode']");
        this.phoneNumberField = By.xpath("//input[@id='mobile_number']");
        this.createAccountButton = By.xpath("//button[.='Create Account']");
        this.timeout = 5000;
    }

    async scrollIntoSelectedElement(desiredElement){
        await driver.executeScript("arguments[0].scrollIntoView(true);", desiredElement);
    }

    async isOnSignUpPage(){
        try{
            await this.driver.wait(until.elementLocated(this.signUpPageTitle), this.timeout);
            const titleElement = await this.driver.findElement(this.signUpPageTitle);
            return await titleElement.getText();
        } catch (error){
            console.error("Error in isOnSignUpPage: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async clickMrRadioButton(){
        try{
            await this.driver.wait(until.elementLocated(this.titleMr), this.timeout);
            await this.driver.findElement(this.titleMr).click();
        }catch(error){
            console.error("Error in clickMrRadioButton: Could not find or interact with element.", error);
            return false;
        }
    }

    async fillPasswordField(password){
        try{
            await this.driver.wait(until.elementLocated(this.passwordField), this.timeout);
            await this.driver.findElement(this.passwordField).sendKeys(password);
        } catch (error){
            console.error("Error in isOnSignUpPage: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async handleDayDropDown(selectedOption){
        const dropdown = await this.driver.wait(until.elementLocated(this.dayDropDown), this.timeout);
        const options = await dropdown.findElements(By.css('option'));

        for(let option of options){
            const text = await option.getText();
            if(text === selectedOption){
                await option.click();
                break;
            }
        }
    }

    async handleMonthDropDown(selectedOption){
        const dropdown = await this.driver.wait(until.elementLocated(this.monthDropDown), this.timeout);
        const options = await dropdown.findElements(By.css('option'));

        for(let option of options){
            const text = await option.getText();
            if(text === selectedOption){
                await option.click();
                break;
            }
        }
    }

    async handleYearDropDown(selectedOption){
        const dropdown = await this.driver.wait(until.elementLocated(this.yearDropDown), this.timeout);
        const options = await dropdown.findElements(By.css('option'));

        for(let option of options){
            const text = await option.getText();
            if(text === selectedOption){
                await option.click();
                break;
            }
        }
    }

    async clickSignUpNewsLetterCheckBox(){
        try{
            await this.driver.wait(until.elementLocated(this.newsLetterSignUpCheckBox), this.timeout);
            await this.driver.findElement(this.newsLetterSignUpCheckBox).click();
        }catch(error){
            console.error("Error in clickSignUpNewsLetterCheckBox: Could not find or interact with element.", error);
            return false;
        }
    }

    async clickReceiveSpecialOffersCheckBox(){
        try{
            await this.driver.wait(until.elementLocated(this.specialOffersCheckBox), this.timeout);
            await this.driver.findElement(this.specialOffersCheckBox).click();
        }catch(error){
            console.error("Error in clickReceiveSpecialOffersCheckBox: Could not find or interact with element.", error);
            return false;
        }
    }

    async fillFirstNameField(firstName){
        this.scrollIntoSelectedElement(this.firstNameField);
        try{
            await this.driver.wait(until.elementLocated(this.firstNameField), this.timeout);
            await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        } catch (error){
            console.error("Error in fillFirstNameField: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async fillLastNameField(lastName){
        this.scrollIntoSelectedElement(this.lastNameField);
        try{
            await this.driver.wait(until.elementLocated(this.lastNameField), this.timeout);
            await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        } catch (error){
            console.error("Error in fillLastNameField: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async fillCompanyField(company){
        this.scrollIntoSelectedElement(this.companyField);
        try{
            await this.driver.wait(until.elementLocated(this.companyField), this.timeout);
            await this.driver.findElement(this.companyField).sendKeys(company);
        } catch (error){
            console.error("Error in fillCompanyField: Could not find or interact with the page title.", error);
            return false;
        }
    }  

    async fillAddressField(address){
        this.scrollIntoSelectedElement(this.address1Field);
        try{
            await this.driver.wait(until.elementLocated(this.address1Field), this.timeout);
            await this.driver.findElement(this.address1Field).sendKeys(address);
        } catch (error){
            console.error("Error in fillAddressField: Could not find or interact with the page title.", error);
            return false;
        }
    } 

    async handleCountryDropDown(selectedOption){
        const dropdown = await this.driver.wait(until.elementLocated(this.countryDropDown), this.timeout);
        const options = await dropdown.findElements(By.css('option'));

        for(let option of options){
            const text = await option.getText();
            if(text === selectedOption){
                await option.click();
                break;
            }
        }
    }

    async fillStateField(state){
        this.scrollIntoSelectedElement(this.stateField);
        try{
            await this.driver.wait(until.elementLocated(this.stateField), this.timeout);
            await this.driver.findElement(this.stateField).sendKeys(state);
        } catch (error){
            console.error("Error in fillStateField: Could not find or interact with the page title.", error);
            return false;
        }
    } 

    async fillCityField(city){
        this.scrollIntoSelectedElement(this.cityField);
        try{
            await this.driver.wait(until.elementLocated(this.cityField), this.timeout);
            await this.driver.findElement(this.cityField).sendKeys(city);
        } catch (error){
            console.error("Error in fillCityField: Could not find or interact with the page title.", error);
            return false;
        }
    } 

    async fillZipCodeField(zipCode){
        this.scrollIntoSelectedElement(this.zipCodeField);
        try{
            await this.driver.wait(until.elementLocated(this.zipCodeField), this.timeout);
            await this.driver.findElement(this.zipCodeField).sendKeys(zipCode);
        } catch (error){
            console.error("Error in fillZipCodeField: Could not find or interact with the page title.", error);
            return false;
        }
    } 

    async fillPhoneNumberField(phoneNumber){
        this.scrollIntoSelectedElement(this.phoneNumberField);
        try{
            await this.driver.wait(until.elementLocated(this.phoneNumberField), this.timeout);
            await this.driver.findElement(this.phoneNumberField).sendKeys(phoneNumber);
        } catch (error){
            console.error("Error in fillPhoneNumberField: Could not find or interact with the page title.", error);
            return false;
        }
    } 

    async clickCreateAccountButton(){
        this.scrollIntoSelectedElement(this.createAccountButton);
        try{
            await this.driver.wait(until.elementLocated(this.createAccountButton), this.timeout);
            await this.driver.findElement(this.createAccountButton).click();
        }catch(error){
            console.error("Error in clickCreateAccountButton: Could not find or interact with element.", error);
            return false;
        }
    }
}

module.exports = SignUpPage