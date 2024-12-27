const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
const ProductsPage = require('../WebComponents/ProductsPage');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Verify Products Page', function () {
    this.timeout(40000);
    let driver;
    let dashboardPage;
    let isDashboardNavigationRequired = true;

    before(async function () {
        driver = await new Builder().forBrowser(browser).build();
    });

    beforeEach(async function () {
        if (isDashboardNavigationRequired) {
            dashboardPage = new DashboardPage(driver);
            await dashboardPage.navigate(baseUrl);
        }
    });

    it('Validate that homepage is visible', async function () {
        const isTitleVisible = await dashboardPage.isOnDashboard();
        assert.strictEqual(isTitleVisible, true, 'Dashboard Title Page Is Not Visible');
    });

    it('Navigate to Products Page and Validate', async function(){
        const productsPage = new ProductsPage(driver);
        await dashboardPage.clickProductsButton();
        const productsPageTitle = await productsPage.isOnProductsPage();
        assert.strictEqual(productsPageTitle, "ALL PRODUCTS", "Title is expected to be ALL PRODUCTS");
        isDashboardNavigationRequired = false;
    });

    it('Validate that products is visible', async function(){
        const productsPage = new ProductsPage(driver);
        const productsName = await productsPage.getProductsName();
        console.log('Products Name: ', productsName);

        const expectedProductNames = [
            'Blue Top', 'Men Tshirt', 'Sleeveless Dress', 'Stylish Dress', 'Winter Top', 
            'Summer White Top', 'Madame Top For Women', 'Fancy Green Top', 'Sleeves Printed Top - White', 
            'Half Sleeves Top Schiffli Detailing - Pink', 'Frozen Tops For Kids', 'Full Sleeves Top Cherry - Pink', 
            'Printed Off Shoulder Top - White', 'Sleeves Top and Short - Blue & Pink', 'Little Girls Mr. Panda Shirt', 
            'Sleeveless Unicorn Patch Gown - Pink', 'Cotton Mull Embroidered Dress', 'Blue Cotton Indie Mickey Dress', 
            'Long Maxi Tulle Fancy Dress Up Outfits -Pink', 'Sleeveless Unicorn Print Fit & Flare Net Dress - Multi', 
            'Colour Blocked Shirt – Sky Blue', 'Pure Cotton V-Neck T-Shirt', 'Green Side Placket Detail T-Shirt', 
            'Premium Polo T-Shirts', 'Pure Cotton Neon Green Tshirt', 'Soft Stretch Jeans', 'Regular Fit Straight Jeans', 
            'Grunt Blue Slim Fit Jeans', 'Rose Pink Embroidered Maxi Dress', 'Cotton Silk Hand Block Print Saree', 
            'Rust Red Linen Saree', 'Beautiful Peacock Blue Cotton Linen Saree', 'Lace Top For Women', 
            'GRAPHIC DESIGN MEN T SHIRT - BLUE'
        ];
        
        expectedProductNames.forEach((currentProduct) => {
            assert(productsName.includes(currentProduct), `Product '${product}' is not found on the page`);
        });
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const sanitizedTitle = this.currentTest.title.replace(/[\/\\:*?"<>|]/g, '_');
        const filePath = `${screenshotDir}${sanitizedTitle}_${Date.now()}_${this.currentTest.state}.png`;
        fs.writeFileSync(filePath, screenshot, 'base64');
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});