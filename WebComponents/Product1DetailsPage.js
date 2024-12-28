const { By, until } = require ('selenium-webdriver');

class Product1DetailsPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//h2[.='Blue Top']");
        this.productCategory = By.xpath("//p[.='Category: Women > Tops']");
        this.productPrice = By.xpath("//span[.='Rs. 500']");
        this.productAvailability = By.xpath("//p[.='Availability: In Stock']");
        this.productCondition = By.xpath("//p[.='Condition: New']");
        this.productBrand = By.xpath("//p[.='Brand: Polo']");
        this.productQuantityField = By.xpath("//input[@id='quantity']");
        this.addToCartButton = By.xpath("//button[@class='btn btn-default cart']");
        this.viewCartButton = By.xpath("//u[.='View Cart']");
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

    async isOnProduct1DetailsPage (){
        try{
            await this.driver.wait(until.elementLocated(this.pageTitle), this.timeout);
            const titleElement = await this.driver.findElement(this.pageTitle);
            return await titleElement.getText();
        }catch(error){
            console.error("Error in isOnProduct1DetailsPage: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async isProductCategoryVisible (){
        try{
            await this.driver.wait(until.elementLocated(this.productCategory), this.timeout);
            const element = await this.driver.findElement(this.productCategory);
            return await element.isDisplayed();
        }catch(error){
            console.error("Error in isProductCategoryVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async isProductPriceVisible (){
        try{
            await this.driver.wait(until.elementLocated(this.productPrice), this.timeout);
            const element = await this.driver.findElement(this.productPrice);
            return await element.isDisplayed();
        }catch(error){
            console.error("Error in isProductPriceVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async isProductAvailabilityVisible (){
        try{
            await this.driver.wait(until.elementLocated(this.productAvailability), this.timeout);
            const element = await this.driver.findElement(this.productAvailability);
            return await element.isDisplayed();
        }catch(error){
            console.error("Error in isProductAvailabilityVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async isProductConditionVisible (){
        try{
            await this.driver.wait(until.elementLocated(this.productCondition), this.timeout);
            const element = await this.driver.findElement(this.productCondition);
            return await element.isDisplayed();
        }catch(error){
            console.error("Error in isProductConditionVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async isProductBrandVisible (){
        try{
            await this.driver.wait(until.elementLocated(this.productBrand), this.timeout);
            const element = await this.driver.findElement(this.productBrand);
            return await element.isDisplayed();
        }catch(error){
            console.error("Error in isProductBrandVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async clickProduct1 (){
        await this.waitAndClick(this.viewProducts1);
    }

    async changeProductQuantity(quantity){
        try{
            await this.driver.wait(until.elementLocated(this.productQuantityField), this.timeout);
            await this.driver.findElement(this.productQuantityField).sendKeys(quantity);
        } catch (error){
            console.error("Error in changeProductQuantity: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async clickAddToCartButton (){
        await this.waitAndClick(this.addToCartButton);
    }

    async clickViewCartButton (){
        await this.waitAndClick(this.viewCartButton);
    }
}

module.exports = Product1DetailsPage