# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accountregistartion.spec.ts >> Account Registration
- Location: tests\accountregistartion.spec.ts:22:5

# Error details

```
ReferenceError: page is not defined
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
  11 |     await page.goto(config.appUrl) // navigate to base url
  12 |     homePage = new HomePage(page)
  13 |     await homePage.isHomePageLoaded() // verify home page is loaded
  14 |     registrationPage = new RegistrationPage(page)
  15 | 
  16 | })
  17 | 
  18 | test.afterEach("Close Browser",async({page})=>{
  19 |     await page.close() // close the browser after each test
  20 | })
  21 | 
  22 | test("Account Registration",async({})=>{  
  23 | 
  24 | // goto registration page
  25 | await homePage.clickOnMyAccount()
  26 | await homePage.clickOnRegister()  
  27 | 
  28 | // fill registration form
  29 | await registrationPage.setFirstName(RandomDataGenerator.getFirstName())
  30 | await registrationPage.setLastName(RandomDataGenerator.getLastName())
  31 | await registrationPage.setEmail(RandomDataGenerator.getEmail())
  32 | await registrationPage.setPhone(RandomDataGenerator.getPhoneNumber())
  33 | const password = RandomDataGenerator.getPassword()
  34 | await registrationPage.setPassword(password)
  35 | await registrationPage.setConfirmPassword(password)
  36 | await registrationPage.acceptPrivacyPolicy()
  37 | await registrationPage.clickContinue()         
  38 |     
  39 | // Validate the confirmation message
  40 | const confirmationMessage = await registrationPage.getConfirmationMessage()
  41 | expect(confirmationMessage).toContain("Your Account Has Been Created!") 
  42 | 
> 43 | await page.waitForTimeout(3000) // wait for 3 seconds before closing the browser     
     |  ^ ReferenceError: page is not defined
  44 | })
```