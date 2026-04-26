import {test, expect} from "@playwright/test"
import {TestConfig} from "../test.config"
import {HomePage} from "../pages/HomePage"
import {LoginPage} from "../pages/LoginPage"

let homePage: HomePage
let loginPage: LoginPage

test.beforeEach("Navigate to Home Page",async({page})=>{
    const config = new TestConfig()
    await page.goto(config.appUrl) // navigate to base url
    homePage = new HomePage(page)
    await homePage.isHomePageLoaded() // verify home page is loaded
    loginPage = new LoginPage(page)
})

test.afterEach("Close Browser",async({page})=>{
    await page.waitForTimeout(3000) // wait for 3 seconds before closing the browser      
    await page.close() // close the browser after each test
})

test("Login with valid credentials",async({page})=>{  

// goto login page
await homePage.clickOnMyAccount()
await homePage.clickOnLogin()  

// login with valid credentials
await loginPage.setEmail("test@example.com")
await loginPage.setPassword("Test@123")
await loginPage.clickLogin()          
    
// Validate the user is logged in (my account page should be displayed)
await expect(page).toHaveURL(/.*account/)

})