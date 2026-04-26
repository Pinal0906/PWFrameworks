import { Locator, Page } from "@playwright/test"

export class MyAccountPage {
    private readonly page: Page

    //locators using css selectors
    private readonly myAccountHeading: Locator
    private readonly editAccountLink: Locator
    private readonly passwordLink: Locator
    private readonly addressBookLink: Locator
    private readonly wishListLink: Locator
    private readonly orderHistoryLink: Locator
    private readonly downloadsLink: Locator
    private readonly recurringPaymentsLink: Locator
    private readonly rewardPointsLink: Locator
    private readonly returnsLink: Locator
    private readonly transactionsLink: Locator
    private readonly newsletterLink: Locator
    private readonly logoutLink: Locator

    // constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page
        //Initializing locators
        this.myAccountHeading = this.page.locator("#content h1")
        this.editAccountLink = this.page.locator("a:has-text('Edit Account')")
        this.passwordLink = this.page.locator("a:has-text('Password')")
        this.addressBookLink = this.page.locator("a:has-text('Address Book')")
        this.wishListLink = this.page.locator("a:has-text('Wish List')")
        this.orderHistoryLink = this.page.locator("a:has-text('Order History')")
        this.downloadsLink = this.page.locator("a:has-text('Downloads')")
        this.recurringPaymentsLink = this.page.locator("a:has-text('Recurring payments')")
        this.rewardPointsLink = this.page.locator("a:has-text('Reward Points')")
        this.returnsLink = this.page.locator("a:has-text('Returns')")
        this.transactionsLink = this.page.locator("a:has-text('Transactions')")
        this.newsletterLink = this.page.locator("a:has-text('Newsletter')")
        this.logoutLink = this.page.locator("a:has-text('Logout')")
    }

    //actions
    //get my account heading text
    async getMyAccountHeading(): Promise<string> {
        return await this.myAccountHeading.textContent() ?? ""
    }

    //click edit account link
    async clickEditAccount(): Promise<void> {
        await this.editAccountLink.click()
    }

    //click password link
    async clickPassword(): Promise<void> {
        await this.passwordLink.click()
    }

    //click address book link
    async clickAddressBook(): Promise<void> {
        await this.addressBookLink.click()
    }

    //click wish list link
    async clickWishList(): Promise<void> {
        await this.wishListLink.click()
    }

    //click order history link
    async clickOrderHistory(): Promise<void> {
        await this.orderHistoryLink.click()
    }

    //click downloads link
    async clickDownloads(): Promise<void> {
        await this.downloadsLink.click()
    }

    //click recurring payments link
    async clickRecurringPayments(): Promise<void> {
        await this.recurringPaymentsLink.click()
    }

    //click reward points link
    async clickRewardPoints(): Promise<void> {
        await this.rewardPointsLink.click()
    }

    //click returns link
    async clickReturns(): Promise<void> {
        await this.returnsLink.click()
    }

    //click transactions link
    async clickTransactions(): Promise<void> {
        await this.transactionsLink.click()
    }

    //click newsletter link
    async clickNewsletter(): Promise<void> {
        await this.newsletterLink.click()
    }

    //click logout link
    async clickLogout(): Promise<void> {
        await this.logoutLink.click()
    }

    //verify my account page is loaded
    async isMyAccountPageLoaded(): Promise<boolean> {
        const heading = await this.getMyAccountHeading()
        return heading.includes("My Account")
    }

    //check if my account page exists
    async isMyAccountPageExists(): Promise<boolean> {
        return await this.myAccountHeading.isVisible()
    }
}