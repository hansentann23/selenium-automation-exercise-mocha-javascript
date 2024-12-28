const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
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

    it('Scroll Down To Footer and verify text SUBSCRIPTION', async function(){
        const subscriptionTitle = await dashboardPage.isSubscriptionTitleVisible();
        assert.strictEqual(subscriptionTitle, true, "Title is not visible");
    });

    it('Fill Subscription email and submit', async function(){
        const subscriptionTitle = await dashboardPage.isSubscriptionTitleVisible();
        assert.strictEqual(subscriptionTitle, true, "Title is not visible");
        await dashboardPage.fillSubscriptionEmailField('hansentandi01@gmail.com');
        await dashboardPage.clickSubmitSubscriptionEmailButton();
        const subscriptionSuccessAlert = await dashboardPage.isSubscriptionSuccessMessageVisible();
        assert.strictEqual(subscriptionSuccessAlert, true, "Element is not visible");
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