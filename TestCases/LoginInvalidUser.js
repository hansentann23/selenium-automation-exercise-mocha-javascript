const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
const SignUpOrLoginPage = require('../WebComponents/SignUpOrLoginPage');
require('dotenv').config();

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const invalidEmail = process.env.INVALID_EMAIL;
const invalidPassword = process.env.INVALID_PASSWORD;

describe('Login Invalid User', function () {
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

    it('Click on Signup/Login button and Input Invalid Email And Password To Login', async function () {
        const signUpOrLoginPage = await dashboardPage.navigateToLoginOrSignUpPage();
        const loginTitle = await signUpOrLoginPage.isOnLoginPage();
        assert.strictEqual(loginTitle, 'Login to your account', 'Title is not as expected!');
        await signUpOrLoginPage.logIn(invalidEmail, invalidPassword);
        isDashboardNavigationRequired = false;
    });

    it('Validate that error message is visible', async function(){
        const signUpOrLoginPage = new SignUpOrLoginPage(driver);
        isErrorMessageVisible = await signUpOrLoginPage.invalidAccountErrorMesssage();
        assert.strictEqual(isErrorMessageVisible, "Your email or password is incorrect!", "Expected Message is Your email or password is incorrect!");
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
