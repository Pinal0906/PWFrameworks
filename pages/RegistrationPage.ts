import { test, expect, Locator, Page } from "@playwright/test"

export class RegistrationPage {
    private readonly page: Page

    //locators using css selectors
    private readonly firstNameInput: Locator
    private readonly lastNameInput: Locator
    private readonly emailInput: Locator
    private readonly phoneInput: Locator
    private readonly passwordInput: Locator
    private readonly confirmPasswordInput: Locator
    private readonly termsCheckbox: Locator
    private readonly privacyPolicyCheckbox: Locator
    private readonly btnContinue: Locator
    private readonly msgConfirmation: Locator
    private readonly registerButton: Locator

    // constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page
        //Initializing locators
        this.firstNameInput = this.page.locator("#input-firstname")
        this.lastNameInput = this.page.locator("#input-lastname")
        this.emailInput = this.page.locator("#input-email")
        this.phoneInput = this.page.locator("#input-telephone")
        this.passwordInput = this.page.locator("#input-password")
        this.confirmPasswordInput = this.page.locator("#input-confirm")
        this.termsCheckbox = this.page.locator("input[name='agree']")
        this.privacyPolicyCheckbox = this.page.locator("input[type='checkbox']").last()
        this.btnContinue = this.page.locator("input[value='Continue']")
        this.msgConfirmation = this.page.locator("div#content h1")
        this.registerButton = this.page.locator("h1:has-text('Your Account Has Been Created!')")
    }
    //actions
    //set first name
    async setFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName)
    }

    //set last name
    async setLastName(lastName: string) {
        await this.lastNameInput.fill(lastName)
    }           
    //set email
    async setEmail(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }   
    //set phone number
    async setPhone(phone: string): Promise<void> {
        await this.phoneInput.fill(phone)
    }
    //set password
    async setPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }
    //set confirm password
    async setConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordInput.fill(confirmPassword)
    }   
    //accept terms and conditions
    async acceptTerms() : Promise<void> {
        await this.termsCheckbox.check()
    }   
    //accept privacy policy
    async acceptPrivacyPolicy() : Promise<void> {
        await this.privacyPolicyCheckbox.check()
    }
    //click continue button
    async clickContinue() : Promise<void> {
        await this.btnContinue.click()
    }   
    //get confirmation message
    async getConfirmationMessage() : Promise<string> {
        return await this.msgConfirmation.textContent() ??""
    }   
    //complete registration process
    async register(userData: {
        firstName: string,
         lastName: string, 
         email: string, 
         phone: string, 
         password: string, 
         confirmPassword: string}) : Promise<void> {
        await this.setFirstName(userData.firstName)  
        await this.setLastName(userData.lastName)
        await this.setEmail(userData.email)
        await this.setPhone(userData.phone)
        await this.setPassword(userData.password)
        await this.setConfirmPassword(userData.confirmPassword)
        await this.acceptTerms()
        await this.acceptPrivacyPolicy()
        await this.clickContinue()      
    }



}