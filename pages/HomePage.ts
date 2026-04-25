import {Page,Locator,expect} from '@playwright/test'
export class HomePage{

    //locators
    private readonly page:Page
    protected readonly searchBox:Locator
    protected readonly searchButton:Locator
    protected readonly myAccountLink:Locator
    protected readonly registerLink:Locator
    protected readonly loginLink:Locator

    //constructor
constructor(page:Page){
    this.page=page
    this.searchBox=page.locator("input[name='search']")
    this.searchButton=page.locator("button[class='btn btn-default btn-lg']")
    this.myAccountLink=page.locator("#top-links a").filter({ hasText: 'My Account' }).first()
    this.registerLink=page.locator("#top-links a").filter({ hasText: 'Register' }).first()
    this.loginLink=page.locator("#top-links a").filter({ hasText: 'Login' }).first()
}
    //action methods
    // check if home page is loaded or exists
 async isHomePageLoaded() {
  await expect(this.myAccountLink).toBeVisible({ timeout: 10000 })
}
    //check if my account link is visible   
    async isMyAccountLinkVisible(){
        return await this.myAccountLink.isVisible()
    } 
    //click on my account link
    async clickOnMyAccount(){
        await this.myAccountLink.click()
    }

     //check if register link is visible
    async isRegisterLinkVisible(){
        return await this.registerLink.isVisible()
    }   
    //click on register link
    async clickOnRegister(){
        await this.registerLink.click()
    }
    //check if login link is visible
    async isLoginLinkVisible(){
        return await this.loginLink.isVisible()
    }   
    //click on login link
    async clickOnLogin(){
        await this.loginLink.click()
    }   
    //search for a product
    async searchForProduct(productName:string){
        await this.searchBox.fill(productName)
    }       
    // click on search button with product name
    async clickOnSearchButton(){
        await this.searchButton.click()
    }   
    // verify search results
    async verifySearchResults(productName:string){
        const productLink= this.page.locator(`a:has-text("${productName}")`)
        await expect(productLink).toBeVisible()
    }
   
      

}