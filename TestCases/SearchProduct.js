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

describe('Search Product', function () {
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

    it('Click search bar and input value to search and validate search result', async function(){
        const productsPage = new ProductsPage(driver);
        await productsPage.fillProductsSearchField("Blue Top");
        await productsPage.clickSearchProductButton();
        const searchedProductTitle = await productsPage.isProductTitleVisible();
        assert.strictEqual(searchedProductTitle, true, "Product title is not visible");
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