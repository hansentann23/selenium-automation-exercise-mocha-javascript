const { By, until } = require ('selenium-webdriver');

class ProductsPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//h2[@class='title text-center']");
        this.productsContainer = By.xpath("//div[@class='features_items']//div[contains(@class, 'single-products')]");
        this.productsElement = By.xpath("//div[@class='features_items']//div[@class='productinfo text-center']/p");
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

    async isOnProductsPage (){
        try{
            await this.driver.wait(until.elementLocated(this.pageTitle), this.timeout);
            const titleElement = await this.driver.findElement(this.pageTitle);
            return await titleElement.getText();
        }catch(error){
            console.error("Error in isOnDashboard: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async getProductsName(){
        const productElements = await this.driver.wait(until.elementsLocated(this.productsElement), this.timeout);
        const productNames = []

        for (let i = 0; i < productElements.length; i++) {
            const productName = await productElements[i].getText();
            productNames.push(productName);  // Store each product name
        }
    
        return productNames; 
    }
}

module.exports = ProductsPage