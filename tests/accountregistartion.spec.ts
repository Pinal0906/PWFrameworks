import {test, expect, Locator, Page} from "@playwright/test"
import {TestConfig} from "../test.config"
import {HomePage} from "../pages/HomePage"
import {RegistrationPage} from "../pages/RegistrationPage"
import { RandomDataGenerator } from "../utils/randomdataGenerater"

let homePage: HomePage
let registrationPage: RegistrationPage
test.beforeEach("Navigate to Home Page",async({page})=>{
    const config = new TestConfig()
    await page.goto(config.appUrl) // navigate to base url
    homePage = new HomePage(page)
    await homePage.isHomePageLoaded() // verify home page is loaded
    registrationPage = new RegistrationPage(page)

})

test.afterEach("Close Browser",async({page})=>{
    await page.waitForTimeout(3000) // wait for 3 seconds before closing the browser     
    await page.close() // close the browser after each test
})

test("Account Registration",async({})=>{  

// goto registration page
await homePage.clickOnMyAccount()
await homePage.clickOnRegister()  

// fill registration form
await registrationPage.setFirstName(RandomDataGenerator.getFirstName())
await registrationPage.setLastName(RandomDataGenerator.getLastName())
await registrationPage.setEmail(RandomDataGenerator.getEmail())
await registrationPage.setPhone(RandomDataGenerator.getPhoneNumber())
const password = RandomDataGenerator.getPassword()
await registrationPage.setPassword(password)
await registrationPage.setConfirmPassword(password)
await registrationPage.acceptPrivacyPolicy()
await registrationPage.clickContinue()         
    
// Validate the confirmation message
const confirmationMessage = await registrationPage.getConfirmationMessage()
expect(confirmationMessage).toContain("Your Account Has Been Created!") 

})