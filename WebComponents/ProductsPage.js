const { By, until } = require ('selenium-webdriver');

class ProductsPage{
    constructor(driver){
        this.driver = driver;
        this.pageTitle = By.xpath("//h2[@class='title text-center']");
        this.productsContainer = By.xpath("//div[@class='features_items']//div[contains(@class, 'single-products')]");
        this.productsElement = By.xpath("//div[@class='features_items']//div[@class='productinfo text-center']/p");
        this.viewProducts1=By.xpath("//a[@href='/product_details/1']")
        this.productsSearchBarField = By.xpath("//input[@id='search_product']");
        this.productsSearchButton = By.xpath("//button[@id='submit_search']");
        this.productTitle = By.xpath("//div[@class='productinfo text-center']/p[.='Blue Top']");
        this.product1AddToCartButton = By.xpath("//div[@class='features_items']/div[2]//div[@class='product-overlay']//a[.='Add to cart']");
        this.product2AddToCartButton = By.xpath("//div[@class='features_items']/div[3]//div[@class='product-overlay']//a[.='Add to cart']");
        this.continueShoppingButton = By.xpath("//button[@class='btn btn-success close-modal btn-block']");
        this.viewCartButton = By.xpath("//u[.='View Cart']");
        this.product1Image = By.xpath("//img[@src='/get_product_picture/1']");
        this.product2Image = By.xpath("//img[@src='/get_product_picture/2']");
        this.timeout = 5000;
    }

    async scrollIntoSelectedElement(desiredElement){
        await driver.executeScript("arguments[0].scrollIntoView(true);", desiredElement);
    }

    async waitAndClick(element) {
        try {
            await this.driver.wait(until.elementLocated(element), this.timeout);
            const clickableElement = await this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), this.timeout);
            await clickableElement.click();
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

    async clickProduct1 (){
        await this.waitAndClick(this.viewProducts1);
    }

    async fillProductsSearchField(productName){
        try{
            await this.driver.wait(until.elementLocated(this.productsSearchBarField), this.timeout);
            await this.driver.findElement(this.productsSearchBarField).sendKeys(productName);
        } catch (error){
            console.error("Error in fillProductsSearchField: Could not find or interact with the element", error);
            return false;
        }
    }

    async clickSearchProductButton (){
        await this.waitAndClick(this.productsSearchButton);
    }

    async isProductTitleVisible (){
        try{
            await this.driver.wait(until.elementLocated(this.productTitle), this.timeout);
            const element = await this.driver.findElement(this.productTitle);
            return await element.isDisplayed();
        }catch(error){
            console.error("Error in isProductTitleVisible: Could not find or interact with the page title.", error);
            return false;
        }
    }

    async hoverAndClickAddToCartProduct1(){
        this.scrollIntoSelectedElement(this.product1Image);
        try{
            const elementToHover = await this.driver.findElement(this.product1Image);

            // Create an Actions instance
            const actions = this.driver.actions({ async: true });
    
             // Perform the hover action
             await actions.move({ origin: elementToHover }).perform();

             console.log('Hover action performed successfully.');
        }catch(error){
            console.error('Error performing hover:', error);
        }
        await this.waitAndClick(this.product1AddToCartButton);
    }

    async clickContinueShoppingButton (){
        await this.waitAndClick(this.continueShoppingButton);
    }
    
    async hoverAndClickAddToCartProduct2(){
        this.scrollIntoSelectedElement(this.product2Image);
        try{
            const elementToHover = await this.driver.findElement(this.product2Image);

            // Create an Actions instance
            const actions = this.driver.actions({ async: true });
    
             // Perform the hover action
             await actions.move({ origin: elementToHover }).perform();

             console.log('Hover action performed successfully.');
        }catch(error){
            console.error('Error performing hover:', error);
        }
        await this.waitAndClick(this.product2AddToCartButton);
    }

    async clickViewCartButton (){
        await this.waitAndClick(this.viewCartButton);
    }
}

module.exports = ProductsPage