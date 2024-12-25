const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
const SignUpPage = require('../WebComponents/SignUpPage');
const { sign } = require('crypto');
const AccountCreatedPage = require('../WebComponents/AccountCreatedPage');
const DashboardLoggedInPage = require('../WebComponents/DashBoardLoggedInPage');

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Register User', function () {
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
        await signUpOrLoginPage.signUp('Hansen', 'hansentandi99@gmail.com');
        isDashboardNavigationRequired = false;
    });

    it('Fill Sign Up Data And verify the page', async function(){
        const signUpPage = new SignUpPage(driver);
        const signUpTitle = await signUpPage.isOnSignUpPage();
        assert.strictEqual(signUpTitle, 'ENTER ACCOUNT INFORMATION', 'Title is Incorrect!');
        await signUpPage.clickMrRadioButton();
        await signUpPage.fillPasswordField('secret_sauce');
        await signUpPage.handleDayDropDown('19');
        await signUpPage.handleMonthDropDown('March');
        await signUpPage.handleYearDropDown('2000');
        await signUpPage.clickSignUpNewsLetterCheckBox();
        await signUpPage.clickReceiveSpecialOffersCheckBox();
        await signUpPage.fillFirstNameField('Hansen');
        await signUpPage.fillLastNameField('Tandi');
        await signUpPage.fillCompanyField('Bank BSI');
        await signUpPage.fillAddressField('Jl. Delima 2');
        await signUpPage.handleCountryDropDown('Singapore');
        await signUpPage.fillStateField('DKI Jakarta');
        await signUpPage.fillCityField('Jakarta');
        await signUpPage.fillZipCodeField('29114');
        await signUpPage.fillPhoneNumberField('082268945066');
        await signUpPage.clickCreateAccountButton();
        isDashboardNavigationRequired = false;
    });

    it('Validate Account Is Created', async function(){
        const accountCreatedPage = new AccountCreatedPage(driver);
        const accountCreatedPageTitle = await accountCreatedPage.isOnAccountCreatedPage();
        assert.strictEqual(accountCreatedPageTitle, 'ACCOUNT CREATED!');
        await accountCreatedPage.clickContinueButton();
        dashboardPage.clickDeleteAccountButton();
        isDashboardNavigationRequired = false;
    }); 

    // it('Validate Logged in as user in dashboard and Delete Account', async function(){
    //     const accountLoggedInDashboardPage = new DashboardLoggedInPage(driver);
    //     const pageTitle = await accountLoggedInDashboardPage.isOnDashboard();
    //     assert.strictEqual(pageTitle, true, 'Dashboard Title Page Is Not Visible');
    //     accountLoggedInDashboardPage.clickDeleteAccountButton();
    // });

    // afterEach(async function () {
    //     const screenshot = await driver.takeScreenshot();
    //     const sanitizedTitle = this.currentTest.title.replace(/[\/\\:*?"<>|]/g, '_');
    //     const filePath = `${screenshotDir}${sanitizedTitle}_${Date.now()}_${this.currentTest.state}.png`;
    //     fs.writeFileSync(filePath, screenshot, 'base64');
    // });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});
