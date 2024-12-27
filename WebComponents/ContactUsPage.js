const { By, until } = require ('selenium-webdriver');
const path = require('path');

class ContactUsPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//h2[.='Get In Touch']");
        this.nameField = By.xpath("//input[@name='name']");
        this.emailField = By.xpath("//input[@name='email']");
        this.subjectField = By.xpath("//input[@name='subject']");
        this.messageField = By.xpath("//textarea[@id='message']");
        this.uploadFileField = By.xpath("//input[@name='upload_file']");
        this.submitButton = By.xpath("//input[@name='submit']");
        this.submitSuccessMessage = By.xpath("//div[@class='status alert alert-success']");
        this.backToHomeButton = By.xpath("//div[@id='form-section']/a[contains(.,'Home')]");
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

    async isOnContactUs (){
        try{
            await this.driver.wait(until.elementLocated(this.pageTitle), this.timeout);
            const titleElement = await this.driver.findElement(this.pageTitle);
            return await titleElement.getText();
        }catch(error){
            console.error("Error in isOnDashboard: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async fillContactUsForm(name, email, subject, message){
        try{
            await this.driver.wait(until.elementLocated(this.nameField), this.timeout);
            await this.driver.findElement(this.nameField).sendKeys(name);
        } catch (error){
            console.error("Error in fillContactUsForm: Could not find or interact with the name field", error);
            return false;
        }
        try{
            await this.driver.wait(until.elementLocated(this.emailField), this.timeout);
            await this.driver.findElement(this.emailField).sendKeys(email);
        } catch (error){
            console.error("Error in fillContactUsForm: Could not find or interact with the email field", error);
            return false;
        }
        try{
            await this.driver.wait(until.elementLocated(this.subjectField), this.timeout);
            await this.driver.findElement(this.subjectField).sendKeys(subject);
        } catch (error){
            console.error("Error in fillContactUsForm: Could not find or interact with the subject field", error);
            return false;
        }
        try{
            await this.driver.wait(until.elementLocated(this.messageField), this.timeout);
            await this.driver.findElement(this.messageField).sendKeys(message);
        } catch (error){
            console.error("Error in fillContactUsForm: Could not find or interact with the message field", error);
            return false;
        }
    }

    async fileUploadSample(fileName){
        try{
            await this.driver.wait(until.elementLocated(this.uploadFileField), this.timeout);

            const filePath = path.resolve(__dirname, fileName);

            const fileInputElement = await this.driver.findElement(this.uploadFileField);

            await fileInputElement.sendKeys(filePath);

            console.log('File upload successful:', filePath);
        } catch(error){
            console.error('Error during file upload: ', error);
        }
    }

    async clickSubmitButton(){
        await this.waitAndClick(this.submitButton);
    }

    async handleConfirmationPopUp(){
        try{
            await this.driver.wait(until.alertIsPresent(), this.timeout);

            // Switch to the alert
            const alert = await this.driver.switchTo().alert();
    
            // Accept the alert (click OK)
            await alert.accept();
    
            console.log('Confirmation popup handled successfully.');
        } catch(error){
            console.error('Error handling confirmation popup:', error);
        }
    }

    async isSuccessMessagePresent (){
        try{
            await this.driver.wait(until.elementLocated(this.submitSuccessMessage), this.timeout);
            const successMessage = await this.driver.findElement(this.submitSuccessMessage);
            return await successMessage.isDisplayed();
        }catch(error){
            console.error("Error in isOnDashboard: Could not find or interact with the success message.", error);
            return false;
        }
    }

    async clickBackToHomeButton(){
        await this.waitAndClick(this.backToHomeButton);
    }
}

module.exports = ContactUsPage