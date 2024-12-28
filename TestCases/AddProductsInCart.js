const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
const ProductsPage = require('../WebComponents/ProductsPage');
const CartPage = require('../WebComponents/CartPage');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Add Products In Cart', function () {
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

    it('Add first product and second product to cart', async function(){
        const productsPage = new ProductsPage(driver);
        await productsPage.hoverAndClickAddToCartProduct1();
        await productsPage.clickContinueShoppingButton();
        await productsPage.hoverAndClickAddToCartProduct2();
        await productsPage.clickViewCartButton();
        isDashboardNavigationRequired = false;
    });

    it('Continue to cart page and validate that both product is visible', async function(){
        const cartPage = new CartPage(driver);
        const isProduct1Visible = await cartPage.product1IsInCart();
        assert.strictEqual(isProduct1Visible, true, "Product is not visible");
        const isProduct2Visible = await cartPage.product2IsInCart();
        assert.strictEqual(isProduct2Visible, true, "Product is not visible");
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