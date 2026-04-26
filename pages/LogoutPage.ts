import { Locator, Page } from "@playwright/test"

export class LogoutPage {
    private readonly page: Page

    //locators using css selectors
    private readonly successMessage: Locator
    private readonly continueButton: Locator

    // constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page
        //Initializing locators
        this.successMessage = this.page.locator("#content h1")
        this.continueButton = this.page.locator("a.btn-primary")
    }

    //actions
    //get success message text
    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.textContent() || ""
    }

    //click continue button
    async clickContinue(): Promise<void> {
        await this.continueButton.click()
    }
}