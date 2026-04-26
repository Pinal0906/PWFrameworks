import { Locator, Page } from "@playwright/test"

export class LoginPage {
    private readonly page: Page

    //locators using css selectors
    private readonly emailInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
    private readonly forgotPasswordLink: Locator
    private readonly continueButton: Locator

    // constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page
        //Initializing locators
        this.emailInput = this.page.locator("#input-email")
        this.passwordInput = this.page.locator("#input-password")
        this.loginButton = this.page.locator("input[value='Login']")
        this.forgotPasswordLink = this.page.locator("a:has-text('Forgotten Password')")
        this.continueButton = this.page.locator("input[value='Continue']")
    }

    //actions
    //set email
    async setEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }

    //set password
    async setPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }

    //click login button
    async clickLogin(): Promise<void> {
        await this.loginButton.click()
    }

    //click forgot password link
    async clickForgotPassword(): Promise<void> {
        await this.forgotPasswordLink.click()
    }

    //click continue button
    async clickContinue(): Promise<void> {
        await this.continueButton.click()
    }

    //login method
    async login(email: string, password: string): Promise<void> {
        await this.setEmail(email)
        await this.setPassword(password)
        await this.clickLogin()
    }

    //get error message for login
    async getloginErrorMessage(): Promise<string> {
        const errorLocator = this.page.locator(".alert-danger")
        const text = await errorLocator.textContent() ?? ""
        return text.trim()
    }
}