const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
const Product1DetailsPage = require('../WebComponents/Product1DetailsPage');
const CartPage = require('../WebComponents/CartPage');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Verify Subscription Email In Homepage', function () {
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

    it('Navigate to product 1 from homescreen and verify', async function(){
        const product1DetailsPage = new Product1DetailsPage(driver);
        await dashboardPage.clickViewProduct1Button();
        const product1DetailPageTitle = await product1DetailsPage.isOnProduct1DetailsPage();
        assert.strictEqual(product1DetailPageTitle, 'Blue Top', "Title is not expected");
        isDashboardNavigationRequired = false;
    });

    it('Change product quantity and add to cart', async function(){
        const product1DetailsPage = new Product1DetailsPage(driver);
        await product1DetailsPage.changeProductQuantity('4');
        await product1DetailsPage.clickAddToCartButton();
        await product1DetailsPage.clickViewCartButton();
        isDashboardNavigationRequired = false;
    });

    it('Navigate to cart page and verify quantity is same', async function(){
        const cartPage = new CartPage(driver);
        const productQuantity = await cartPage.getProductQuantity();
        assert.strictEqual(productQuantity, '41', 'Quantity does not match');
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