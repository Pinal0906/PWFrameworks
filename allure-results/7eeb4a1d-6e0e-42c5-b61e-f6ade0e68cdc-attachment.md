# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accountregistartion.spec.ts >> Account Registration
- Location: tests\accountregistartion.spec.ts:23:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
Call log:
  - navigating to "http://localhost/opencart/", waiting until "load"

```

# Test source

```ts
  1  | import {test, expect, Locator, Page} from "@playwright/test"
  2  | import {TestConfig} from "../test.config"
  3  | import {HomePage} from "../pages/HomePage"
  4  | import {RegistrationPage} from "../pages/RegistrationPage"
  5  | import { RandomDataGenerator } from "../utils/randomdataGenerater"
  6  | 
  7  | let homePage: HomePage
  8  | let registrationPage: RegistrationPage
  9  | test.beforeEach("Navigate to Home Page",async({page})=>{
  10 |     const config = new TestConfig()
> 11 |     await page.goto(config.appUrl) // navigate to base url
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
  12 |     homePage = new HomePage(page)
  13 |     await homePage.isHomePageLoaded() // verify home page is loaded
  14 |     registrationPage = new RegistrationPage(page)
  15 | 
  16 | })
  17 | 
  18 | test.afterEach("Close Browser",async({page})=>{
  19 |     await page.waitForTimeout(3000) // wait for 3 seconds before closing the browser     
  20 |     await page.close() // close the browser after each test
  21 | })
  22 | 
  23 | test("Account Registration",async({})=>{  
  24 | 
  25 | // goto registration page
  26 | await homePage.clickOnMyAccount()
  27 | await homePage.clickOnRegister()  
  28 | 
  29 | // fill registration form
  30 | await registrationPage.setFirstName(RandomDataGenerator.getFirstName())
  31 | await registrationPage.setLastName(RandomDataGenerator.getLastName())
  32 | await registrationPage.setEmail(RandomDataGenerator.getEmail())
  33 | await registrationPage.setPhone(RandomDataGenerator.getPhoneNumber())
  34 | const password = RandomDataGenerator.getPassword()
  35 | await registrationPage.setPassword(password)
  36 | await registrationPage.setConfirmPassword(password)
  37 | await registrationPage.acceptPrivacyPolicy()
  38 | await registrationPage.clickContinue()         
  39 |     
  40 | // Validate the confirmation message
  41 | const confirmationMessage = await registrationPage.getConfirmationMessage()
  42 | expect(confirmationMessage).toContain("Your Account Has Been Created!") 
  43 | 
  44 | })
```