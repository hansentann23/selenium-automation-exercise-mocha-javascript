const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const DashboardPage = require('../WebComponents/DashboardPage');
const ContactUsPage = require('../WebComponents/ContactUsPage');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('Contact Us Form', function () {
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

    it('Navigate to Contact Us Form and Validate', async function(){
        const contactUsPage = new ContactUsPage(driver);
        await dashboardPage.clickContactUsButton();
        const contactUsPageTitle = await contactUsPage.isOnContactUs();
        assert.strictEqual(contactUsPageTitle, "GET IN TOUCH", "Title is expected to be GET IN TOUCH");
        isDashboardNavigationRequired = false;
    });

    it('Fill in contact us form', async function(){
        const contactUsPage = new ContactUsPage(driver);
        await contactUsPage.fillContactUsForm('Hansen', 'hansentandi01@gmail.com', 'Testing Subject', 'Testing Message');
        await contactUsPage.fileUploadSample('FileUploadsSample/iphone x frame.png');
        await contactUsPage.clickSubmitButton();
        await contactUsPage.handleConfirmationPopUp();
        isDashboardNavigationRequired = false;

    });

    it('Validate details have been submitted return back to home', async function(){
        const contactUsPage = new ContactUsPage(driver);
        const isSuccessMessagePresent = await contactUsPage.isSuccessMessagePresent();
        assert.strictEqual(isSuccessMessagePresent, true, "Success Message is not present");
        await contactUsPage.clickBackToHomeButton();
        const isTitleVisible = await dashboardPage.isOnDashboard();
        assert.strictEqual(isTitleVisible, true, 'Dashboard Title Page Is Not Visible');
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