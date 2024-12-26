const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
const SignUpOrLoginPage = require('../WebComponents/SignUpOrLoginPage');

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Register User With Existing Email', function () {
    this.timeout(40000);
    let driver;
    let dashboardPage;
    let isDashboardNavigationRequired = true;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function () {
        if (isDashboardNavigationRequired) {
            dashboardPage = new DashboardPage(driver);
            await dashboardPage.navigate();
        }
    });

    it('Validate that homepage is visible', async function () {
        const isTitleVisible = await dashboardPage.isOnDashboard();
        assert.strictEqual(isTitleVisible, true, 'Dashboard Title Page Is Not Visible');
    });

    it('Click on Signup/Login button and Input Name And Email Sign Up', async function () {
        const signUpOrLoginPage = await dashboardPage.navigateToLoginOrSignUpPage();
        const signUpTitle = await signUpOrLoginPage.isOnSignUpOrLoginPage();
        assert.strictEqual(signUpTitle, 'New User Signup!', 'Title is not as expected!');
        await signUpOrLoginPage.signUp('Hansen', 'hansentandi01@gmail.com');
        isDashboardNavigationRequired = false;
    });

    it('Validate that error message is visible and as expected', async function () {
        const signUpOrLoginPage = new SignUpOrLoginPage(driver);
        const emailExistErrorMessage = await signUpOrLoginPage.emailAlreadyExistsErrorMesssage();
        assert.strictEqual(emailExistErrorMessage, 'Email Address already exist!', 'Error Message is not as expected!');
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
