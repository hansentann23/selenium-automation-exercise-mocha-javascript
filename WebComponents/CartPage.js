const { By, until } = require ('selenium-webdriver');

class CartPage{
    constructor(driver){
        this.driver = driver;
        this.product1 = By.xpath("//a[.='Blue Top']");
        this.product2 = By.xpath("//a[.='Men Tshirt']");
        this.productQuantity = By.xpath("//button[@class='disabled']");
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

    async product1IsInCart(){
        try{
            await this.driver.wait(until.elementLocated(this.product1), this.timeout);
            const titleElement = await this.driver.findElement(this.product1);
            return await titleElement.isDisplayed();
        }catch(error){
            console.error("Error in product1IsInCart: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async product2IsInCart(){
        try{
            await this.driver.wait(until.elementLocated(this.product2), this.timeout);
            const titleElement = await this.driver.findElement(this.product2);
            return await titleElement.isDisplayed();
        }catch(error){
            console.error("Error in product2IsInCart: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async getProductQuantity(){
        try{
            await this.driver.wait(until.elementLocated(this.productQuantity), this.timeout);
            const element = await this.driver.findElement(this.productQuantity);
            return await element.getText();
        }catch(error){
            console.error("Error in product1IsInCart: Could not find or interact with the page title.", error);
            return false;
        }
    }
}

module.exports = CartPage