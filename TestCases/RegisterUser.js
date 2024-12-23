const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Register User', function () {
    this.timeout(40000);
    let driver;
    let dashboardPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function () {
        dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate();
    });

    it('Validate that homepage is visible', async function () {
        const isTitleVisible = await dashboardPage.isOnDashboard();
        assert.strictEqual(isTitleVisible, true, 'Dashboard Title Page Is Not Visible');
    });

    it('Click on Signup/Login button', async function () {
        const signUpOrLoginPage = await dashboardPage.navigateToLoginOrSignUpPage();
        const signUpTitle = await signUpOrLoginPage.isOnSignUpOrLoginPage();
        assert.strictEqual(signUpTitle, 'New User Signup!', 'Title is not as expected!');
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const sanitizedTitle = this.currentTest.title.replace(/[\/\\:*?"<>|]/g, '_');
        const filePath = `${screenshotDir}${sanitizedTitle}_${Date.now()}_${this.currentTest.state}.png`;
        fs.writeFileSync(filePath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
    });
});
